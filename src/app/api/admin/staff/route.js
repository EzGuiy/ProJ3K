import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import crypto from 'crypto';

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
        s.is_active,
        s.created_at,
        COUNT(o.order_id) AS total_orders_opened
      FROM staff s
      LEFT JOIN orders o ON s.staff_id = o.staff_id_opened
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

    query += ' GROUP BY s.staff_id, s.name, s.role, s.pin_code, s.is_active, s.created_at';
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

// POST /api/admin/staff — เพิ่มพนักงานใหม่ลง MySQL
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, role, pin_code } = body;

    if (!name || !role) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อและตำแหน่งพนักงาน' },
        { status: 400 }
      );
    }

    const staff_id = 'staff_' + crypto.randomUUID().slice(0, 8);

    await pool.query(
      `INSERT INTO staff (staff_id, name, role, pin_code, is_active) VALUES (?, ?, ?, ?, 1)`,
      [staff_id, name.trim(), role, pin_code || '0000']
    );

    return NextResponse.json(
      { message: 'เพิ่มพนักงานสำเร็จ', staff_id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create staff error:', error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 500 }
    );
  }
}
