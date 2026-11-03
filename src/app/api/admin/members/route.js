import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/admin/members — ดึงข้อมูลสมาชิกทั้งหมด
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    let whereClause = '';
    const params = [];

    if (search) {
      whereClause = 'WHERE m.name LIKE ? OR m.phone_number LIKE ?';
      params.push(`%${search}%`, `%${search}%`);
    }

    // นับจำนวน
    const [countResult] = await pool.query(
      `SELECT COUNT(*) AS total FROM MEMBER m ${whereClause}`,
      params
    );

    // ดึงสมาชิก + จำนวนออเดอร์ + ยอดใช้จ่ายรวม
    const [members] = await pool.query(
      `SELECT 
        m.member_id,
        m.name,
        m.phone_number,
        m.total_points,
        m.created_at,
        COUNT(o.order_id) AS total_orders,
        COALESCE(SUM(o.net_total), 0) AS total_spent
      FROM MEMBER m
      LEFT JOIN \`ORDER\` o ON m.member_id = o.member_id
      ${whereClause}
      GROUP BY m.member_id, m.name, m.phone_number, m.total_points, m.created_at
      ORDER BY m.created_at DESC
      LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return NextResponse.json({
      members,
      pagination: {
        page,
        limit,
        total: countResult[0]?.total || 0,
        totalPages: Math.ceil((countResult[0]?.total || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Members API error:', error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 500 }
    );
  }
}

