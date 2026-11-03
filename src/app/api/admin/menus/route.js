import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/admin/menus — ดึงรายการเมนูทั้งหมดพร้อมหมวดหมู่
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query = `
      SELECT 
        mi.menu_id,
        mi.name,
        mi.price,
        mi.is_available,
        mc.category_id,
        mc.name AS category_name
      FROM MENU_ITEM mi
      LEFT JOIN MENU_CATEGORY mc ON mi.category_id = mc.category_id
      WHERE 1=1
    `;
    const params = [];

    if (category && category !== 'all') {
      query += ' AND mc.category_id = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND mi.name LIKE ?';
      params.push(`%${search}%`);
    }

    query += ' ORDER BY mc.name ASC, mi.name ASC';

    const [menus] = await pool.query(query, params);

    // ดึงหมวดหมู่ทั้งหมดสำหรับ Filter
    const [categories] = await pool.query(
      'SELECT category_id, name FROM MENU_CATEGORY ORDER BY name ASC'
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

