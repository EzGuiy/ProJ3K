import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import crypto from 'crypto';

// GET /api/kitchen/stations — ดึงข้อมูลสเตชั่นครัว และเชฟที่เข้ากะอยู่ในแต่ละสเตชั่น
export async function GET() {
  try {
    // 1. ดึงสเตชั่นทั้งหมด
    const [stations] = await pool.query(`
      SELECT station_code, name, icon, description
      FROM kitchen_station
      ORDER BY FIELD(station_code, 'MAIN', 'GRILL', 'NOODLE', 'APPETIZER', 'DESSERT')
    `);

    // 2. ดึงกะการทำงานของเชฟที่ยังไม่สิ้นสุด (active shifts)
    const [activeShifts] = await pool.query(`
      SELECT 
        ks.shift_id,
        ks.station_code,
        ks.staff_id,
        ks.started_at,
        s.name AS staff_name,
        s.role,
        TIMESTAMPDIFF(MINUTE, ks.started_at, NOW()) AS duration_minutes
      FROM kitchen_shift ks
      JOIN staff s ON ks.staff_id = s.staff_id
      WHERE ks.ended_at IS NULL
      ORDER BY ks.started_at ASC
    `);

    // 3. ดึงจำนวนรายการอาหารที่ค้างอยู่ในแต่ละสเตชั่น
    const [itemCounts] = await pool.query(`
      SELECT 
        oi.station_code,
        COUNT(CASE WHEN oi.kitchen_status = 'PENDING' THEN 1 END) AS pending_count,
        COUNT(CASE WHEN oi.kitchen_status = 'COOKING' THEN 1 END) AS cooking_count,
        COUNT(CASE WHEN oi.kitchen_status = 'READY' THEN 1 END) AS ready_count
      FROM order_item oi
      JOIN orders o ON oi.order_id = o.order_id
      WHERE o.status = 'OPEN'
      GROUP BY oi.station_code
    `);

    const countMap = {};
    for (const c of itemCounts) {
      countMap[c.station_code] = c;
    }

    // จัดกลุ่มเชฟตามสเตชั่น (จำกัดไม่เกิน 2 คนต่อสเตชั่น)
    const shiftsByStation = {};
    for (const sh of activeShifts) {
      if (!shiftsByStation[sh.station_code]) {
        shiftsByStation[sh.station_code] = [];
      }
      shiftsByStation[sh.station_code].push({
        shift_id: sh.shift_id,
        staff_id: sh.staff_id,
        staff_name: sh.staff_name,
        role: sh.role,
        started_at: sh.started_at,
        duration_minutes: sh.duration_minutes,
      });
    }

    // ดึงรายชื่อเชฟทั้งหมดที่ว่างอยู่ (ยังไม่ได้เข้ากะในสเตชั่นใด)
    const activeStaffIds = activeShifts.map((s) => s.staff_id);
    let availableChefs = [];
    if (activeStaffIds.length > 0) {
      const placeholders = activeStaffIds.map(() => '?').join(',');
      const [chefs] = await pool.query(
        `SELECT staff_id, name, role FROM staff WHERE (role = 'CHEF' OR role = 'EXPO') AND staff_id NOT IN (${placeholders}) AND is_active = 1`,
        activeStaffIds
      );
      availableChefs = chefs;
    } else {
      const [chefs] = await pool.query(
        `SELECT staff_id, name, role FROM staff WHERE (role = 'CHEF' OR role = 'EXPO') AND is_active = 1`
      );
      availableChefs = chefs;
    }

    const stationsWithStaff = stations.map((st) => {
      const chefs = shiftsByStation[st.station_code] || [];
      const counts = countMap[st.station_code] || { pending_count: 0, cooking_count: 0, ready_count: 0 };
      return {
        ...st,
        chefs,
        chef_count: chefs.length,
        is_full: chefs.length >= 2, // สเตชั่นหนึ่งไม่เกิน 2 คน
        pending_count: Number(counts.pending_count),
        cooking_count: Number(counts.cooking_count),
        ready_count: Number(counts.ready_count),
      };
    });

    return NextResponse.json({
      stations: stationsWithStaff,
      available_chefs: availableChefs,
    });
  } catch (error) {
    console.error('Kitchen stations error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสเตชั่น', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/kitchen/stations — มอบหมายเชฟเข้าสเตชั่น (จำกัดไม่เกิน 2 คนต่อสเตชั่น) หรือ สิ้นสุดกะ
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, staff_id, station_code, shift_id } = body;

    if (action === 'assign') {
      if (!staff_id || !station_code) {
        return NextResponse.json(
          { error: 'กรุณาระบุพนักงานและสเตชั่น' },
          { status: 400 }
        );
      }

      // ตรวจสอบว่าสเตชั่นนี้มีเชฟเกิน 2 คนหรือยัง
      const [currentChefs] = await pool.query(
        'SELECT COUNT(*) AS c FROM kitchen_shift WHERE station_code = ? AND ended_at IS NULL',
        [station_code]
      );
      if (currentChefs[0].c >= 2) {
        return NextResponse.json(
          { error: 'สเตชั่นนี้มีเชฟปฏิบัติหน้าที่ครบ 2 คนแล้ว (ไม่สามารถเพิ่มได้เกิน 2 คนต่อสเตชั่น)' },
          { status: 400 }
        );
      }

      // ถ้าเชฟคนนี้มีกะเดิมที่ยังเปิดอยู่ ให้ปิดกะเดิมก่อน
      await pool.query(
        'UPDATE kitchen_shift SET ended_at = CURRENT_TIMESTAMP WHERE staff_id = ? AND ended_at IS NULL',
        [staff_id]
      );

      // สร้างกะใหม่
      const new_shift_id = 'shift_' + crypto.randomUUID().slice(0, 8);
      await pool.query(
        'INSERT INTO kitchen_shift (shift_id, staff_id, station_code, started_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
        [new_shift_id, staff_id, station_code]
      );

      return NextResponse.json({
        success: true,
        message: 'มอบหมายเชฟเข้าสเตชั่นเรียบร้อย',
        shift_id: new_shift_id,
      });
    }

    if (action === 'end_shift') {
      const targetId = shift_id || staff_id;
      if (!targetId) {
        return NextResponse.json({ error: 'ไม่พบข้อมูลกะ' }, { status: 400 });
      }

      await pool.query(
        'UPDATE kitchen_shift SET ended_at = CURRENT_TIMESTAMP WHERE (shift_id = ? OR staff_id = ?) AND ended_at IS NULL',
        [targetId, targetId]
      );

      return NextResponse.json({ success: true, message: 'สิ้นสุดกะเรียบร้อย' });
    }

    return NextResponse.json({ error: 'action ไม่ถูกต้อง' }, { status: 400 });
  } catch (error) {
    console.error('Station shift action error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการจัดการกะ', details: error.message },
      { status: 500 }
    );
  }
}

