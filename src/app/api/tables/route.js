import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET /api/tables — ดึงข้อมูลผังโต๊ะสำหรับพนักงานและลูกค้า
export async function GET() {
  try {
    const [tables] = await pool.query(`
      SELECT 
        dt.table_id,
        dt.table_name_or_number AS table_number,
        dt.status,
        dt.qr_token,
        dt.occupied_at,
        COALESCE(dt.pos_x, 100) AS pos_x,
        COALESCE(dt.pos_y, 100) AS pos_y,
        COALESCE(dt.capacity, 4) AS capacity,
        COALESCE(dt.shape, 'square') AS shape,
        COALESCE(dt.zone, 'MAIN') AS zone,
        o.order_id AS current_order_id,
        o.net_total AS current_order_total,
        COALESCE(dt.occupied_at, o.created_at) AS session_start_at,
        o.created_at AS order_opened_at,
        (SELECT COUNT(*) FROM order_item oi WHERE oi.order_id = o.order_id) AS item_count
      FROM dining_table dt
      LEFT JOIN orders o ON (dt.table_id = o.table_id OR dt.current_order_id = o.order_id) AND o.status = 'OPEN'
      ORDER BY CAST(dt.table_name_or_number AS UNSIGNED) ASC, dt.table_name_or_number ASC
    `);

    let layout = {
      layout_id: 'default',
      name: 'Main Dining Hall',
      width: 920,
      height: 620,
      entrance_position: 'BOTTOM',
      landmarks: [
        { id: 'lm-entrance', type: 'ENTRANCE', label: '🚪 ทางเข้าร้าน (หน้าร้าน)', x: 350, y: 530, width: 220, height: 45 },
        { id: 'lm-cashier', type: 'CASHIER', label: '💵 แคชเชียร์ & บาร์น้ำ', x: 680, y: 500, width: 170, height: 60 },
        { id: 'lm-kitchen', type: 'KITCHEN', label: '🍳 ครัวหลัก & จุดรับอาหาร', x: 300, y: 20, width: 320, height: 50 },
        { id: 'lm-restroom', type: 'RESTROOM', label: '🚻 ห้องน้ำ', x: 40, y: 20, width: 120, height: 45 },
      ],
    };

    try {
      const [layoutRows] = await pool.query(
        'SELECT * FROM restaurant_layout WHERE layout_id = "default" LIMIT 1'
      );
      if (layoutRows && layoutRows.length > 0) {
        const row = layoutRows[0];
        let lm = row.landmarks;
        if (typeof lm === 'string') {
          try { lm = JSON.parse(lm); } catch { lm = []; }
        }
        layout = {
          layout_id: row.layout_id,
          name: row.name || 'Main Dining Hall',
          width: row.width || 920,
          height: row.height || 620,
          entrance_position: row.entrance_position || 'BOTTOM',
          landmarks: Array.isArray(lm) ? lm : layout.landmarks,
        };
      }
    } catch {
      // fallback to default
    }

    return NextResponse.json({ tables, layout });
  } catch (error) {
    console.error('Tables API error:', error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 500 }
    );
  }
}

// PATCH /api/tables — อัปเดตสถานะโต๊ะ (OCCUPIED / AVAILABLE) และจับเวลาเริ่มนั่ง
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { tableNumber, tableId, status, action } = body;

    if (!tableNumber && !tableId) {
      return NextResponse.json({ error: 'กรุณาระบุ tableNumber หรือ tableId' }, { status: 400 });
    }

    const identifier = tableNumber ? String(tableNumber).trim() : null;
    const whereClause = tableNumber ? 'table_name_or_number = ?' : 'table_id = ?';
    const whereVal = identifier || tableId;

    if (action === 'release' || status === 'AVAILABLE') {
      // เคลียร์โต๊ะกลับเป็นว่าง และรีเซ็ตเวลา
      await pool.query(
        `UPDATE dining_table 
         SET status = 'AVAILABLE', occupied_at = NULL, current_order_id = NULL, updated_at = NOW() 
         WHERE ${whereClause}`,
        [whereVal]
      );
      return NextResponse.json({ message: 'เคลียร์โต๊ะเรียบร้อยแล้ว', status: 'AVAILABLE' });
    }

    if (action === 'start_session' || action === 'occupy' || status === 'OCCUPIED') {
      // ล็อคโต๊ะว่ามีคนแล้ว และเริ่มจับเวลา ณ ตอนนั้นทันที
      await pool.query(
        `UPDATE dining_table 
         SET status = 'OCCUPIED', 
             occupied_at = COALESCE(occupied_at, NOW()), 
             updated_at = NOW() 
         WHERE ${whereClause}`,
        [whereVal]
      );

      const [updated] = await pool.query(
        `SELECT table_id, table_name_or_number, status, occupied_at FROM dining_table WHERE ${whereClause} LIMIT 1`,
        [whereVal]
      );

      return NextResponse.json({
        message: 'ล็อคโต๊ะและเริ่มจับเวลาเรียบร้อยแล้ว',
        table: updated[0] || null,
        status: 'OCCUPIED',
      });
    }

    return NextResponse.json({ error: 'การกระทำไม่ถูกต้อง' }, { status: 400 });
  } catch (error) {
    console.error('Update table status error:', error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 500 }
    );
  }
}
