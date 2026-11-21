import { NextResponse } from 'next/server';
import crypto from 'crypto';
import pool from '@/lib/db';
import { listTables, addTable } from '@/lib/tableStore';
import { isDbUnavailable } from '@/lib/dbErrors';

export const dynamic = 'force-dynamic';

const DEFAULT_LAYOUT = {
  layout_id: 'default',
  name: 'Main Dining Hall',
  width: 920,
  height: 620,
  entrance_position: 'BOTTOM',
  landmarks: [
    { id: 'lm-entrance', type: 'ENTRANCE', label: 'ทางเข้าร้าน (หน้าร้าน)', x: 350, y: 530, width: 220, height: 45 },
    { id: 'lm-cashier', type: 'CASHIER', label: 'แคชเชียร์ & บาร์น้ำ', x: 680, y: 500, width: 170, height: 60 },
    { id: 'lm-kitchen', type: 'KITCHEN', label: 'ครัวหลัก & จุดรับอาหาร', x: 300, y: 20, width: 320, height: 50 },
    { id: 'lm-restroom', type: 'RESTROOM', label: 'ห้องน้ำ', x: 40, y: 20, width: 120, height: 45 },
  ],
};

// GET /api/admin/tables — ดึงข้อมูลโต๊ะทั้งหมดพร้อมสถานะออเดอร์ปัจจุบัน
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
        COALESCE(dt.occupied_at, o.created_at) AS order_opened_at,
        (SELECT COUNT(*) FROM order_item oi WHERE oi.order_id = o.order_id) AS item_count
      FROM dining_table dt
      LEFT JOIN orders o ON (dt.table_id = o.table_id OR dt.current_order_id = o.order_id) AND o.status = 'OPEN'
      ORDER BY CAST(dt.table_name_or_number AS UNSIGNED) ASC, dt.table_name_or_number ASC
    `);

    let layout = DEFAULT_LAYOUT;
    try {
      const [layoutRows] = await pool.query(
        'SELECT * FROM restaurant_layout WHERE layout_id = "default" LIMIT 1'
      );
      if (layoutRows.length > 0) {
        const row = layoutRows[0];
        let landmarks = row.landmarks;
        if (typeof landmarks === 'string') {
          try {
            landmarks = JSON.parse(landmarks);
          } catch {
            landmarks = [];
          }
        }
        layout = {
          ...DEFAULT_LAYOUT,
          ...row,
          landmarks: Array.isArray(landmarks) ? landmarks : DEFAULT_LAYOUT.landmarks,
        };
      }
    } catch (error) {
      if (!isDbUnavailable(error)) throw error;
      console.warn('Could not read restaurant_layout; using the default layout:', error.message);
    }

    return NextResponse.json({ tables, layout, offline: false });
  } catch (error) {
    if (isDbUnavailable(error)) {
      console.warn('Tables API: ใช้ข้อมูลชั่วคราว (ยังเชื่อมต่อ MySQL ไม่ได้)');
      const tables = listTables().map((table) => ({
        ...table,
        pos_x: table.pos_x ?? 100,
        pos_y: table.pos_y ?? 100,
        capacity: table.capacity ?? 4,
        shape: table.shape ?? 'square',
        zone: table.zone ?? 'MAIN',
      }));
      return NextResponse.json({ tables, layout: DEFAULT_LAYOUT, offline: true });
    }
    console.error('Tables API error:', error);
    return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
  }
}

// POST /api/admin/tables — เพิ่มโต๊ะอาหารใหม่
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'ข้อมูลที่ส่งมาไม่ถูกต้อง' }, { status: 400 });
  }

  const table_number = String(body?.table_number ?? '').trim();
  if (!table_number) {
    return NextResponse.json({ error: 'กรุณาระบุหมายเลขโต๊ะ' }, { status: 400 });
  }

  try {
    const table_id = 'tbl_' + crypto.randomUUID().slice(0, 8);

    await pool.query(
      `INSERT INTO dining_table (table_id, table_name_or_number, status) VALUES (?, ?, 'AVAILABLE')`,
      [table_id, table_number]
    );

    return NextResponse.json({ message: 'เพิ่มโต๊ะสำเร็จ', table_id, offline: false }, { status: 201 });
  } catch (error) {
    if (error?.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: `มีโต๊ะหมายเลข ${table_number} อยู่แล้ว` }, { status: 409 });
    }
    if (isDbUnavailable(error)) {
      const result = addTable(table_number);
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 409 });
      }
      return NextResponse.json({ message: 'เพิ่มโต๊ะสำเร็จ', ...result, offline: true }, { status: 201 });
    }
    console.error('Create table error:', error);
    return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
  }
}

// PUT /api/admin/tables — บันทึกตำแหน่งโต๊ะและผังร้าน
export async function PUT(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'ข้อมูลที่ส่งมาไม่ถูกต้อง' }, { status: 400 });
  }

  const tables = Array.isArray(body?.tables) ? body.tables : [];
  const layout = body?.layout;
  if (!Array.isArray(body?.tables) && (!layout || typeof layout !== 'object')) {
    return NextResponse.json({ error: 'ไม่มีข้อมูลผังโต๊ะให้บันทึก' }, { status: 400 });
  }

  try {
    for (const table of tables) {
      if (!table?.table_id) continue;
      await pool.query(
        `UPDATE dining_table
         SET pos_x = ?, pos_y = ?, capacity = COALESCE(?, capacity),
             shape = COALESCE(?, shape), zone = COALESCE(?, zone), updated_at = NOW()
         WHERE table_id = ?`,
        [
          Math.round(Number(table.pos_x) || 0),
          Math.round(Number(table.pos_y) || 0),
          table.capacity ? Number(table.capacity) : null,
          table.shape || null,
          table.zone || null,
          table.table_id,
        ]
      );
    }

    if (layout && typeof layout === 'object') {
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
          layout.name || DEFAULT_LAYOUT.name,
          Number(layout.width) || DEFAULT_LAYOUT.width,
          Number(layout.height) || DEFAULT_LAYOUT.height,
          layout.entrance_position || DEFAULT_LAYOUT.entrance_position,
          JSON.stringify(Array.isArray(layout.landmarks) ? layout.landmarks : DEFAULT_LAYOUT.landmarks),
        ]
      );
    }

    return NextResponse.json({
      message: 'บันทึกผังโต๊ะสำเร็จ',
      updatedCount: tables.length,
      offline: false,
    });
  } catch (error) {
    if (isDbUnavailable(error)) {
      return NextResponse.json(
        { error: 'ไม่สามารถบันทึกผังโต๊ะได้ กรุณาตรวจสอบฐานข้อมูลและ migration' },
        { status: 503 }
      );
    }
    console.error('Save table layout error:', error);
    return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
  }
}
