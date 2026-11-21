import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import crypto from 'crypto';

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

    // นับจำนวนสมาชิก
    const [countResult] = await pool.query(
      `SELECT COUNT(*) AS total FROM member m ${whereClause}`,
      params
    );

    // ดึงสมาชิก + สรุปออเดอร์
    const [members] = await pool.query(
      `SELECT 
        m.member_id,
        m.name,
        m.phone_number,
        m.total_points,
        m.created_at,
        COUNT(o.order_id) AS total_orders,
        COALESCE(SUM(o.net_total), 0) AS total_spent
      FROM member m
      LEFT JOIN orders o ON m.member_id = o.member_id
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

// POST /api/admin/members — เพิ่มสมาชิกใหม่ลง MySQL
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone_number, total_points } = body;

    if (!name || !phone_number) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อและเบอร์โทรศัพท์ของสมาชิก' },
        { status: 400 }
      );
    }

    const cleanPhone = phone_number.trim().replace(/[-\s]/g, '');
    const member_id = 'mem_' + crypto.randomUUID().slice(0, 8);

    await pool.query(
      `INSERT INTO member (member_id, phone_number, name, total_points) VALUES (?, ?, ?, ?)`,
      [member_id, cleanPhone, name.trim(), parseInt(total_points) || 0]
    );

    return NextResponse.json(
      { message: 'เพิ่มสมาชิกสำเร็จ', member_id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create member error:', error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 500 }
    );
  }
}
