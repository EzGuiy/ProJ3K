import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

// GET /api/admin/tables — ดึงข้อมูลโต๊ะทั้งหมดพร้อมตำแหน่งผังร้านและสถานะออเดอร์
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

    // ดึงข้อมูล Floor Plan Layout (ขนาด, ตำแหน่งหน้าร้าน, landmarks)
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
    } catch (e) {
      console.warn('Could not read restaurant_layout table, using default:', e?.message);
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

// POST /api/admin/tables — เพิ่มโต๊ะอาหารใหม่ลง MySQL
export async function POST(request) {
  try {
    const body = await request.json();
    const { table_number, capacity = 4, shape = 'square', pos_x = 100, pos_y = 100, zone = 'MAIN' } = body;

    if (!table_number) {
      return NextResponse.json({ error: 'กรุณาระบุหมายเลขโต๊ะ' }, { status: 400 });
    }

    const table_id = 'tbl_' + crypto.randomUUID().slice(0, 8);

    await pool.query(
      `INSERT INTO dining_table 
       (table_id, table_name_or_number, status, pos_x, pos_y, capacity, shape, zone) 
       VALUES (?, ?, 'AVAILABLE', ?, ?, ?, ?, ?)`,
      [table_id, String(table_number).trim(), Number(pos_x) || 100, Number(pos_y) || 100, Number(capacity) || 4, shape, zone]
    );

    return NextResponse.json({ message: 'เพิ่มโต๊ะสำเร็จ', table_id }, { status: 201 });
  } catch (error) {
    console.error('Create table error:', error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 500 }
    );
  }
}

// PUT /api/admin/tables — บันทึกตำแหน่งและผังโต๊ะ (Drag & Drop Blueprint Update)
export async function PUT(request) {
  try {
    const body = await request.json();
    const { tables, layout } = body;

    // อัปเดตตำแหน่งโต๊ะทั้งหมดในคราวเดียว
    if (Array.isArray(tables) && tables.length > 0) {
      for (const t of tables) {
        if (!t.table_id) continue;
        await pool.query(
          `UPDATE dining_table 
           SET pos_x = ?, pos_y = ?, capacity = COALESCE(?, capacity), shape = COALESCE(?, shape), zone = COALESCE(?, zone), updated_at = NOW() 
           WHERE table_id = ?`,
          [
            Math.round(Number(t.pos_x) || 0),
            Math.round(Number(t.pos_y) || 0),
            t.capacity ? Number(t.capacity) : null,
            t.shape || null,
            t.zone || null,
            t.table_id,
          ]
        );
      }
    }

    // อัปเดตผังและ landmarks ถ้ามีการส่งมา
    if (layout) {
      const lmString = JSON.stringify(layout.landmarks || []);
      await pool.query(
        `INSERT INTO restaurant_layout (layout_id, name, width, height, entrance_position, landmarks)
         VALUES ('default', ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
           name = VALUES(name),
           width = VALUES(width),
           height = VALUES(height),
           entrance_position = VALUES(entrance_position),
           landmarks = VALUES(landmarks),
           updated_at = NOW()`,
        [
          layout.name || 'Main Dining Hall',
          Number(layout.width) || 920,
          Number(layout.height) || 620,
          layout.entrance_position || 'BOTTOM',
          lmString,
        ]
      );
    }

    return NextResponse.json({
      message: 'บันทึกผังตำแหน่งโต๊ะอาหารสำเร็จ! 🎉',
      updatedCount: tables?.length || 0,
    });
  } catch (error) {
    console.error('Update table layout error:', error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/tables — ลบโต๊ะอาหาร
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tableId = searchParams.get('table_id');

    if (!tableId) {
      return NextResponse.json({ error: 'กรุณาระบุ table_id' }, { status: 400 });
    }

    // ตรวจสอบว่าโต๊ะมีออเดอร์ค้างอยู่หรือไม่
    const [check] = await pool.query(
      'SELECT status, current_order_id FROM dining_table WHERE table_id = ?',
      [tableId]
    );

    if (check.length > 0 && check[0].status === 'OCCUPIED') {
      return NextResponse.json(
        { error: 'ไม่สามารถลบโต๊ะได้ เนื่องจากมีลูกค้ากำลังใช้งานอยู่' },
        { status: 400 }
      );
    }

    await pool.query('DELETE FROM dining_table WHERE table_id = ?', [tableId]);
    return NextResponse.json({ message: 'ลบโต๊ะสำเร็จ' });
  } catch (error) {
    console.error('Delete table error:', error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 500 }
    );
  }
}
