import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/admin/tables — ดึงข้อมูลโต๊ะทั้งหมดพร้อมออเดอร์ปัจจุบัน
export async function GET() {
  try {
    const [tables] = await pool.query(`
      SELECT 
        dt.table_id,
        dt.table_number,
        dt.status,
        dt.qr_token,
        o.order_id AS current_order_id,
        o.net_total AS current_order_total,
        o.created_at AS order_opened_at,
        (SELECT COUNT(*) FROM ORDER_ITEM oi WHERE oi.order_id = o.order_id) AS item_count
      FROM DINING_TABLE dt
      LEFT JOIN \`ORDER\` o ON dt.table_id = o.table_id AND o.status = 'OPEN'
      ORDER BY dt.table_number ASC
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

