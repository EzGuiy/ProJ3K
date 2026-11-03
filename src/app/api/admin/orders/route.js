import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/admin/orders — ดึงประวัติออเดอร์ทั้งหมด (พร้อม filter)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const date = searchParams.get('date');
    const table = searchParams.get('table');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE 1=1';
    const params = [];

    if (status && status !== 'all') {
      whereClause += ' AND o.status = ?';
      params.push(status);
    }

    if (date) {
      whereClause += ' AND DATE(o.created_at) = ?';
      params.push(date);
    }

    if (table) {
      whereClause += ' AND dt.table_number = ?';
      params.push(table);
    }

    // นับจำนวนทั้งหมด
    const [countResult] = await pool.query(
      `SELECT COUNT(*) AS total 
       FROM \`ORDER\` o
       LEFT JOIN DINING_TABLE dt ON o.table_id = dt.table_id
       ${whereClause}`,
      params
    );

    // ดึงออเดอร์
    const [orders] = await pool.query(
      `SELECT 
        o.order_id,
        o.status,
        o.net_total,
        o.created_at,
        dt.table_number,
        m.name AS member_name,
        m.phone_number AS member_phone,
        s.name AS staff_name,
        (SELECT COUNT(*) FROM ORDER_ITEM oi WHERE oi.order_id = o.order_id) AS item_count
      FROM \`ORDER\` o
      LEFT JOIN DINING_TABLE dt ON o.table_id = dt.table_id
      LEFT JOIN MEMBER m ON o.member_id = m.member_id
      LEFT JOIN STAFF s ON o.staff_id_opened = s.staff_id
      ${whereClause}
      ORDER BY o.created_at DESC
      LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    // ดึงหมายเลขโต๊ะสำหรับ Filter
    const [tables] = await pool.query(
      'SELECT table_id, table_number, status FROM DINING_TABLE ORDER BY table_number ASC'
    );

    return NextResponse.json({
      orders,
      tables,
      pagination: {
        page,
        limit,
        total: countResult[0]?.total || 0,
        totalPages: Math.ceil((countResult[0]?.total || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Orders API error:', error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 500 }
    );
  }
}

