import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

// GET /api/members?phone=0812345678 — ค้นหาสมาชิกด้วยเบอร์โทร
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawPhone = searchParams.get('phone') || searchParams.get('phone_number') || '';
    const cleanPhone = rawPhone.trim().replace(/[-\s]/g, '');

    if (!cleanPhone) {
      return NextResponse.json({ error: 'กรุณาระบุเบอร์โทรศัพท์' }, { status: 400 });
    }

    const [rows] = await pool.query(
      `SELECT member_id, name, phone_number, total_points, created_at 
       FROM member 
       WHERE phone_number = ? OR phone_number LIKE ? 
       LIMIT 1`,
      [cleanPhone, `%${cleanPhone}%`]
    );

    if (rows && rows.length > 0) {
      return NextResponse.json({ member: rows[0] });
    }

    return NextResponse.json({ member: null });
  } catch (error) {
    console.error('Member lookup error:', error);
    return NextResponse.json({ error: 'ค้นหาสมาชิกไม่สำเร็จ' }, { status: 500 });
  }
}

// POST /api/members — สมัครสมาชิกใหม่จากหน้า Landing Page
export async function POST(request) {
  try {
    const body = await request.json();
    const name = (body.name || '').trim();
    const rawPhone = (body.phone || body.phone_number || '').trim();
    const cleanPhone = rawPhone.replace(/[-\s]/g, '');

    if (!name || !cleanPhone) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อและเบอร์โทรศัพท์' },
        { status: 400 }
      );
    }

    // Check if phone already registered
    const [existing] = await pool.query(
      `SELECT member_id, name, phone_number, total_points FROM member WHERE phone_number = ? LIMIT 1`,
      [cleanPhone]
    );

    if (existing && existing.length > 0) {
      const mem = existing[0];
      return NextResponse.json({
        isExisting: true,
        member: mem,
        message: `คุณ ${mem.name} เป็นสมาชิกของร้านอยู่แล้ว! (แต้มสะสม: ${mem.total_points} คะแนน)`,
      });
    }

    // New member registration: give 100 welcome bonus points
    const member_id = 'mem_' + crypto.randomUUID().slice(0, 8);
    const welcomePoints = 100;

    await pool.query(
      `INSERT INTO member (member_id, phone_number, name, total_points) VALUES (?, ?, ?, ?)`,
      [member_id, cleanPhone, name, welcomePoints]
    );

    const newMember = {
      member_id,
      name,
      phone_number: cleanPhone,
      total_points: welcomePoints,
    };

    return NextResponse.json(
      {
        isExisting: false,
        member: newMember,
        message: `ยินดีต้อนรับสู่ The Chef's Privilege Club! ได้รับแต้มต้อนรับฟรี ${welcomePoints} คะแนนเรียบร้อยแล้ว`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Member registration error:', error);
    return NextResponse.json(
      { error: error.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก' },
      { status: 500 }
    );
  }
}
