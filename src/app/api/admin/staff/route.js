import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/admin/staff — ดึงข้อมูลพนักงานทั้งหมด
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const role = searchParams.get('role');

    let query = `
      SELECT 
        s.staff_id,
        s.name,
        s.role,
        s.pin_code,
        s.created_at,
        COUNT(o.order_id) AS total_orders_opened
      FROM STAFF s
      LEFT JOIN \`ORDER\` o ON s.staff_id = o.staff_id_opened
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      query += ' AND s.name LIKE ?';
      params.push(`%${search}%`);
    }

    if (role && role !== 'all') {
      query += ' AND s.role = ?';
      params.push(role);
    }

    query += ' GROUP BY s.staff_id, s.name, s.role, s.pin_code, s.created_at';
    query += ' ORDER BY s.created_at DESC';

    const [staff] = await pool.query(query, params);

    return NextResponse.json({ staff });
  } catch (error) {
    console.error('Staff API error:', error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 500 }
    );
  }
}

