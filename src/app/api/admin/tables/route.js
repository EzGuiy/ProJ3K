import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import crypto from 'crypto';

// GET /api/admin/tables — ดึงข้อมูลโต๊ะทั้งหมดพร้อมสถานะออเดอร์ปัจจุบัน
export async function GET() {
  try {
    const [tables] = await pool.query(`
      SELECT 
        dt.table_id,
        dt.table_name_or_number AS table_number,
        dt.status,
        dt.qr_token,
        o.order_id AS current_order_id,
        o.net_total AS current_order_total,
        o.created_at AS order_opened_at,
        (SELECT COUNT(*) FROM order_item oi WHERE oi.order_id = o.order_id) AS item_count
      FROM dining_table dt
      LEFT JOIN orders o ON (dt.table_id = o.table_id OR dt.current_order_id = o.order_id) AND o.status = 'OPEN'
      ORDER BY CAST(dt.table_name_or_number AS UNSIGNED) ASC, dt.table_name_or_number ASC
    `);

    return NextResponse.json({ tables });
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
    const { table_number } = body;

    if (!table_number) {
      return NextResponse.json({ error: 'กรุณาระบุหมายเลขโต๊ะ' }, { status: 400 });
    }

    const table_id = 'tbl_' + crypto.randomUUID().slice(0, 8);

    await pool.query(
      `INSERT INTO dining_table (table_id, table_name_or_number, status) VALUES (?, ?, 'AVAILABLE')`,
      [table_id, String(table_number).trim()]
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
