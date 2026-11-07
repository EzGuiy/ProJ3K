import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { menuIngredients } from '@/lib/ingredients';

// GET /api/chef — ดึงรายการอาหารในครัวตามสเตชั่น (KDS - Kitchen Display System)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const stationFilter = searchParams.get('station'); // 'MAIN', 'GRILL', 'NOODLE', 'APPETIZER', 'DESSERT' หรือ 'all'

    // 1. ดึงข้อมูลสเตชั่นทั้งหมดพร้อมเชฟที่ประจำการ
    const [stations] = await pool.query(`
      SELECT station_code, name, icon, description
      FROM kitchen_station
      ORDER BY FIELD(station_code, 'MAIN', 'GRILL', 'NOODLE', 'APPETIZER', 'DESSERT')
    `);

    const [activeShifts] = await pool.query(`
      SELECT 
        ks.station_code,
        s.name AS chef_name,
        ks.started_at,
        TIMESTAMPDIFF(MINUTE, ks.started_at, NOW()) AS duration_minutes
      FROM kitchen_shift ks
      JOIN staff s ON ks.staff_id = s.staff_id
      WHERE ks.ended_at IS NULL
      ORDER BY ks.started_at ASC
    `);

    const chefsByStation = {};
    for (const sh of activeShifts) {
      if (!chefsByStation[sh.station_code]) chefsByStation[sh.station_code] = [];
      chefsByStation[sh.station_code].push({
        name: sh.chef_name,
        started_at: sh.started_at,
        duration_minutes: sh.duration_minutes,
      });
    }

    // 2. ดึงรายการอาหารที่ยังทำไม่เสร็จ (OPEN orders)
    let itemQuery = `
      SELECT 
        oi.order_item_id,
        oi.order_id,
        oi.menu_id,
        oi.quantity,
        oi.unit_price,
        oi.kitchen_status,
        oi.station_code,
        oi.dispatched,
        oi.quality_checked,
        oi.is_takeaway,
        oi.created_at,
        mi.name AS menu_name,
        mi.image_url,
        o.note AS order_note,
        dt.table_name_or_number AS table_number
      FROM order_item oi
      JOIN orders o ON oi.order_id = o.order_id
      LEFT JOIN menu_item mi ON oi.menu_id = mi.menu_id
      LEFT JOIN dining_table dt ON o.table_id = dt.table_id
      WHERE o.status = 'OPEN' AND oi.kitchen_status IN ('PENDING', 'COOKING', 'READY')
    `;
    const params = [];

    if (stationFilter && stationFilter !== 'all') {
      itemQuery += ` AND oi.station_code = ?`;
      params.push(stationFilter);
    }

    itemQuery += ` ORDER BY oi.created_at ASC`;

    const [items] = await pool.query(itemQuery, params);

    // Map ingredients from menuIngredients
    const enrichedItems = items.map((it) => {
      const numericId = parseInt(String(it.menu_id).replace(/\D/g, '')) || it.menu_id;
      const baseIngredients = menuIngredients[numericId] || [];
      const calculatedIngredients = baseIngredients.map((ing) => ({
        name: ing.name,
        amount: ing.amount * it.quantity,
        unit: ing.unit,
      }));

      return {
        order_item_id: it.order_item_id,
        order_id: it.order_id,
        short_id: it.order_id.slice(0, 8),
        table_number: it.table_number || '-',
        menu_id: it.menu_id,
        menu_name: it.menu_name || 'อาหาร',
        image_url: it.image_url || '🍽️',
        quantity: it.quantity,
        kitchen_status: it.kitchen_status,
        station_code: it.station_code,
        dispatched: it.dispatched === 1,
        quality_checked: it.quality_checked === 1,
        is_takeaway: it.is_takeaway === 1,
        order_note: it.order_note || '',
        created_at: it.created_at,
        ingredients: calculatedIngredients,
      };
    });

    // สรุปจำนวนอาหารของแต่ละสเตชั่น
    const stationStats = stations.map((st) => {
      const stationChefs = chefsByStation[st.station_code] || [];
      const stationItems = enrichedItems.filter((i) => i.station_code === st.station_code);
      return {
        ...st,
        chefs: stationChefs,
        chef_count: stationChefs.length,
        pending_count: stationItems.filter((i) => i.kitchen_status === 'PENDING').length,
        cooking_count: stationItems.filter((i) => i.kitchen_status === 'COOKING').length,
        ready_count: stationItems.filter((i) => i.kitchen_status === 'READY').length,
        total_items: stationItems.length,
      };
    });

    return NextResponse.json({
      stations: stationStats,
      items: enrichedItems,
    });
  } catch (error) {
    console.error('Kitchen KDS error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลครัว', details: error.message },
      { status: 500 }
    );
  }
}

// PATCH /api/chef — ดำเนินการออเดอร์ในครัว (เริ่มทำ, ตรวจคุณภาพเสร็จเรียกเสิร์ฟ, ย้ายสเตชั่น)
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { action, order_item_id, station_code } = body;

    if (!order_item_id) {
      return NextResponse.json({ error: 'ไม่พบรหัสรายการอาหาร' }, { status: 400 });
    }

    if (action === 'start_cooking') {
      // 1. เชฟเริ่มปรุงอาหารประจำสเตชั่น
      await pool.query(
        `UPDATE order_item SET kitchen_status = 'COOKING' WHERE order_item_id = ?`,
        [order_item_id]
      );
      return NextResponse.json({ success: true, message: 'เริ่มปรุงอาหารแล้ว', kitchen_status: 'COOKING' });
    }

    if (action === 'pass_quality_and_serve') {
      // 2. เชฟตรวจคุณภาพผ่านแล้ว กดเสิร์ฟเรียกพนักงาน
      await pool.query(
        `UPDATE order_item SET kitchen_status = 'READY', quality_checked = 1 WHERE order_item_id = ?`,
        [order_item_id]
      );
      return NextResponse.json({
        success: true,
        message: 'ตรวจคุณภาพผ่านแล้ว แจ้งพนักงานเสิร์ฟเรียบร้อย',
        kitchen_status: 'READY',
      });
    }

    if (action === 'change_station') {
      // 3. คนคุมออเดอร์ (Expo) เปลี่ยนสเตชั่นที่รับผิดชอบจานนี้
      if (!station_code) {
        return NextResponse.json({ error: 'กรุณาระบุสเตชั่นใหม่' }, { status: 400 });
      }
      await pool.query(
        `UPDATE order_item SET station_code = ? WHERE order_item_id = ?`,
        [station_code, order_item_id]
      );
      return NextResponse.json({ success: true, message: 'เปลี่ยนสเตชั่นสำเร็จ', station_code });
    }

    return NextResponse.json({ error: 'action ไม่ถูกต้อง' }, { status: 400 });
  } catch (error) {
    console.error('Chef action error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการประมวลผล', details: error.message },
      { status: 500 }
    );
  }
}
