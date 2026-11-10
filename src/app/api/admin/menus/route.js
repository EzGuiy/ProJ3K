import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import crypto from 'crypto';

// GET /api/admin/menus — ดึงรายการเมนูทั้งหมดพร้อมหมวดหมู่สำหรับแอดมิน
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query = `
      SELECT 
        mi.menu_id,
        mi.name,
        mi.name_en,
        mi.description,
        mi.price,
        mi.image_url,
        mi.is_available,
        mi.spicy_level,
        mi.is_popular,
        mc.category_id,
        mc.name AS category_name
      FROM menu_item mi
      LEFT JOIN menu_category mc ON mi.category_id = mc.category_id
      WHERE 1=1
    `;
    const params = [];

    if (category && category !== 'all') {
      query += ' AND mc.category_id = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (mi.name LIKE ? OR mi.name_en LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY mc.sort_order ASC, mi.name ASC';

    const [menus] = await pool.query(query, params);

    // ดึงหมวดหมู่ทั้งหมดสำหรับ Filter
    const [categories] = await pool.query(
      'SELECT category_id, name, sort_order FROM menu_category ORDER BY sort_order ASC, name ASC'
    );

    return NextResponse.json({ menus, categories });
  } catch (error) {
    console.error('Menus API error:', error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 500 }
    );
  }
}

// POST /api/admin/menus — เพิ่มเมนูอาหารใหม่
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, name_en, category_id, price, description, image_url, spicy_level, is_popular } = body;

    if (!name || price === undefined || !category_id) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อเมนู, หมวดหมู่ และราคา' },
        { status: 400 }
      );
    }

    const menu_id = 'menu_' + crypto.randomUUID().slice(0, 8);

    await pool.query(
      `INSERT INTO menu_item 
        (menu_id, category_id, name, name_en, description, price, image_url, is_available, spicy_level, is_popular)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)`,
      [
        menu_id,
        category_id,
        name.trim(),
        name_en || '',
        description || '',
        Number(price),
        image_url || '🍽️',
        parseInt(spicy_level) || 0,
        is_popular ? 1 : 0,
      ]
    );

    return NextResponse.json(
      { message: 'เพิ่มเมนูอาหารสำเร็จ', menu_id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create menu error:', error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/menus — สลับสถานะเปิด/ปิดขาย (is_available)
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { menu_id, is_available } = body;

    if (!menu_id) {
      return NextResponse.json({ error: 'ไม่พบรหัสเมนู' }, { status: 400 });
    }

    await pool.query(
      'UPDATE menu_item SET is_available = ? WHERE menu_id = ?',
      [is_available ? 1 : 0, menu_id]
    );

    return NextResponse.json({ success: true, menu_id, is_available });
  } catch (error) {
    console.error('Update menu error:', error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 500 }
    );
  }
}
