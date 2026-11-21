import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import crypto from 'crypto';

// GET /api/menus — ดึงรายการเมนูและหมวดหมู่ทั้งหมดสำหรับหน้าสั่งอาหารและทั่วไป
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const all = searchParams.get('all') === 'true'; // รวมที่ปิดขายด้วยหรือไม่

    // 1. ดึงหมวดหมู่ทั้งหมด
    const [categories] = await pool.query(
      'SELECT category_id, name, sort_order FROM menu_category ORDER BY sort_order ASC, name ASC'
    );

    // 2. ดึงรายการเมนู
    let query = `
      SELECT 
        m.menu_id,
        m.category_id,
        c.name AS category_name,
        m.name,
        m.name_en,
        m.description,
        m.price,
        m.image_url,
        m.is_available,
        m.spicy_level,
        m.is_popular
      FROM menu_item m
      LEFT JOIN menu_category c ON m.category_id = c.category_id
      WHERE 1=1
    `;
    const params = [];

    if (!all) {
      query += ' AND m.is_available = 1';
    }

    if (category && category !== 'all') {
      query += ' AND m.category_id = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (m.name LIKE ? OR m.name_en LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY c.sort_order ASC, m.name ASC';

    const [menus] = await pool.query(query, params);

    return NextResponse.json({
      categories,
      menus,
    });
  } catch (error) {
    console.error('Menu API error:', error);
    return NextResponse.json(
      { error: 'ไม่สามารถดึงข้อมูลเมนูได้', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/menus — เพิ่มเมนูอาหารใหม่ลง Database
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, name_en, category_id, price, description, image_url, spicy_level, is_popular } = body;

    if (!name || !price || !category_id) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อเมนู, ราคา และหมวดหมู่อาหาร' },
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
        name,
        name_en || '',
        description || '',
        Number(price),
        image_url || '🍽️',
        spicy_level || 0,
        is_popular ? 1 : 0,
      ]
    );

    return NextResponse.json(
      {
        message: 'เพิ่มเมนูสำเร็จ',
        menu_id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create menu error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการสร้างเมนู', details: error.message },
      { status: 500 }
    );
  }
}

