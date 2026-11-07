import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/orders/[id] — ดึงรายละเอียดออเดอร์เดียว
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // หาออเดอร์ (รองรับทั้ง full UUID และ short_id 8 ตัวแรก)
    const [orders] = await pool.query(
      `SELECT 
        o.order_id,
        o.table_id,
        o.member_id,
        o.staff_id_opened,
        o.status AS db_status,
        o.subtotal,
        o.discount_amount,
        o.net_total,
        o.note,
        o.created_at,
        o.updated_at,
        dt.table_name_or_number AS table_number,
        m.name AS member_name,
        m.phone_number AS member_phone,
        s.name AS staff_name
      FROM orders o
      LEFT JOIN dining_table dt ON o.table_id = dt.table_id
      LEFT JOIN member m ON o.member_id = m.member_id
      LEFT JOIN staff s ON o.staff_id_opened = s.staff_id
      WHERE o.order_id = ? OR o.order_id LIKE ?
      LIMIT 1`,
      [id, `${id}%`]
    );

    if (orders.length === 0) {
      return NextResponse.json({ error: 'ไม่พบออเดอร์' }, { status: 404 });
    }

    const order = orders[0];

    // ดึงรายการอาหาร
    const [items] = await pool.query(
      `SELECT 
        oi.order_item_id,
        oi.menu_id,
        oi.quantity,
        oi.unit_price,
        oi.kitchen_status,
        oi.station_code,
        oi.quality_checked,
        oi.is_takeaway,
        mi.name AS menu_name,
        mi.image_url
      FROM order_item oi
      LEFT JOIN menu_item mi ON oi.menu_id = mi.menu_id
      WHERE oi.order_id = ?
      ORDER BY oi.created_at ASC`,
      [order.order_id]
    );

    const formattedItems = items.map((it) => ({
      id: it.menu_id,
      order_item_id: it.order_item_id,
      menu_id: it.menu_id,
      name: it.menu_name || 'รายการอาหาร',
      price: Number(it.unit_price),
      quantity: it.quantity,
      image: it.image_url || '🍽️',
      image_url: it.image_url || '🍽️',
      kitchen_status: it.kitchen_status,
      station_code: it.station_code,
      quality_checked: it.quality_checked === 1,
      is_takeaway: it.is_takeaway === 1,
    }));

    return NextResponse.json({
      order: {
        id: order.order_id.slice(0, 8),
        order_id: order.order_id,
        short_id: order.order_id.slice(0, 8),
        customerName: order.member_name || 'ลูกค้าทั่วไป',
        customerPhone: order.member_phone || '',
        isMember: !!order.member_id,
        tableNumber: order.table_number || '-',
        totalAmount: Number(order.net_total),
        net_total: Number(order.net_total),
        status: order.db_status,
        note: order.note || '',
        createdAt: order.created_at,
        created_at: order.created_at,
        items: formattedItems,
      },
    });
  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์', details: error.message },
      { status: 500 }
    );
  }
}

// PATCH /api/orders/[id] — อัปเดตสถานะออเดอร์หรือเสิร์ฟอาหารแยกจาน
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, kitchen_status, action, order_item_id } = body;

    // หา full order_id และ table_id
    const [orders] = await pool.query(
      'SELECT order_id, table_id, status FROM orders WHERE order_id = ? OR order_id LIKE ? LIMIT 1',
      [id, `${id}%`]
    );

    if (orders.length === 0) {
      return NextResponse.json({ error: 'ไม่พบออเดอร์' }, { status: 404 });
    }

    const fullOrderId = orders[0].order_id;
    const tableId = orders[0].table_id;

    // ── กรณีที่ 1: เสิร์ฟเฉพาะ 1 จานที่พร้อม (order_item_id) ──
    if (order_item_id || action === 'serve_item') {
      const targetItemId = order_item_id || body.item_id;
      if (targetItemId) {
        await pool.query(
          `UPDATE order_item SET kitchen_status = 'SERVED' WHERE order_item_id = ? AND order_id = ?`,
          [targetItemId, fullOrderId]
        );
      }
    }
    // ── กรณีที่ 2: เสิร์ฟเฉพาะรายการที่เชฟทำเสร็จแล้ว (READY -> SERVED) ──
    else if (action === 'serve_ready') {
      await pool.query(
        `UPDATE order_item SET kitchen_status = 'SERVED' WHERE order_id = ? AND kitchen_status = 'READY'`,
        [fullOrderId]
      );
    }
    // ── กรณีที่ 3: ปรับสถานะตามคำสั่งทั่วไป ──
    else {
      const targetStatus = (status || kitchen_status || '').toLowerCase();

      if (targetStatus === 'preparing' || targetStatus === 'cooking') {
        // เริ่มปรุงรายการที่ยัง PENDING
        await pool.query(
          `UPDATE order_item SET kitchen_status = 'COOKING' WHERE order_id = ? AND kitchen_status = 'PENDING'`,
          [fullOrderId]
        );
        await pool.query(
          `UPDATE orders SET updated_at = CURRENT_TIMESTAMP WHERE order_id = ?`,
          [fullOrderId]
        );
      } else if (targetStatus === 'ready') {
        // รายการที่กำลังปรุง เปลี่ยนเป็นพร้อมเสิร์ฟ
        await pool.query(
          `UPDATE order_item SET kitchen_status = 'READY' WHERE order_id = ? AND kitchen_status = 'COOKING'`,
          [fullOrderId]
        );
        await pool.query(
          `UPDATE orders SET updated_at = CURRENT_TIMESTAMP WHERE order_id = ?`,
          [fullOrderId]
        );
      } else if (targetStatus === 'served' || action === 'serve_all') {
        // เสิร์ฟเฉพาะรายการที่ READY ให้เป็น SERVED
        // (ไม่แตะต้องรายการที่ยัง PENDING หรือ COOKING เพื่อป้องกันไม่ให้อาหารที่ยังทำไม่เสร็จหายไป!)
        await pool.query(
          `UPDATE order_item SET kitchen_status = 'SERVED' WHERE order_id = ? AND kitchen_status = 'READY'`,
          [fullOrderId]
        );
      } else if (targetStatus === 'cancelled') {
        // ยกเลิกออเดอร์
        await pool.query(
          `UPDATE orders SET status = 'CLOSED', updated_at = CURRENT_TIMESTAMP WHERE order_id = ?`,
          [fullOrderId]
        );
        if (tableId) {
          // ตรวจสอบว่าโต๊ะนี้มีออเดอร์ OPEN อื่นอีกหรือไม่
          const [openRemaining] = await pool.query(
            `SELECT COUNT(*) AS c FROM orders WHERE table_id = ? AND status = 'OPEN'`,
            [tableId]
          );
          if (openRemaining[0].c === 0) {
            await pool.query(
              `UPDATE dining_table SET status = 'AVAILABLE', current_order_id = NULL WHERE table_id = ?`,
              [tableId]
            );
          }
        }
        return NextResponse.json({ success: true, message: 'ยกเลิกออเดอร์แล้ว' });
      }
    }

    // ── ตรวจสอบว่า "อาหารทุกจานในออเดอร์นี้" เสิร์ฟครบ 100% แล้วหรือยัง ──
    const [unservedRows] = await pool.query(
      `SELECT COUNT(*) AS unserved_count 
       FROM order_item 
       WHERE order_id = ? AND kitchen_status != 'SERVED'`,
      [fullOrderId]
    );

    const isAllServed = unservedRows[0].unserved_count === 0;

    if (isAllServed) {
      // เมื่อเสิร์ฟครบทุกจานแล้วเท่านั้น จึงจะปิดออเดอร์นี้
      await pool.query(
        `UPDATE orders SET status = 'CLOSED', updated_at = CURRENT_TIMESTAMP WHERE order_id = ?`,
        [fullOrderId]
      );

      // ตรวจสอบว่าโต๊ะนี้ยังมีออเดอร์ OPEN อื่นอีกหรือไม่ (รองรับลูกค้าสั่งหลายรอบ)
      if (tableId) {
        const [openOrders] = await pool.query(
          `SELECT COUNT(*) AS open_count FROM orders WHERE table_id = ? AND status = 'OPEN'`,
          [tableId]
        );
        if (openOrders[0].open_count === 0) {
          await pool.query(
            `UPDATE dining_table SET status = 'AVAILABLE', current_order_id = NULL WHERE table_id = ?`,
            [tableId]
          );
        }
      }
    } else {
      // ถ้ายังมีอาหารที่ยังไม่เสิร์ฟ (กำลังทำหรือรอคิว) -> ออเดอร์และโต๊ะต้องยังคง OPEN และ OCCUPIED อยู่เสมอ!
      await pool.query(
        `UPDATE orders SET status = 'OPEN', updated_at = CURRENT_TIMESTAMP WHERE order_id = ?`,
        [fullOrderId]
      );
      if (tableId) {
        await pool.query(
          `UPDATE dining_table SET status = 'OCCUPIED', current_order_id = ? WHERE table_id = ?`,
          [fullOrderId, tableId]
        );
      }
    }

    return NextResponse.json({
      success: true,
      order_id: fullOrderId,
      all_served: isAllServed,
      unserved_remaining: unservedRows[0].unserved_count,
    });
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการอัปเดตออเดอร์', details: error.message },
      { status: 500 }
    );
  }
}
