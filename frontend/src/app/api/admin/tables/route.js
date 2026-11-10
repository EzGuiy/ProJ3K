import { NextResponse } from 'next/server';
import crypto from 'crypto';
import pool from '@/lib/db';
import { listTables, addTable } from '@/lib/tableStore';
import { isDbUnavailable } from '@/lib/dbErrors';

export const dynamic = 'force-dynamic';

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
      LEFT JOIN orders o ON o.table_id = dt.table_id AND o.status = 'OPEN'
      ORDER BY CAST(dt.table_name_or_number AS UNSIGNED) ASC, dt.table_name_or_number ASC
    `);

    return NextResponse.json({ tables, offline: false });
  } catch (error) {
    if (isDbUnavailable(error)) {
      console.warn('Tables API: ใช้ข้อมูลชั่วคราว (ยังเชื่อมต่อ MySQL ไม่ได้)');
      return NextResponse.json({ tables: listTables(), offline: true });
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
