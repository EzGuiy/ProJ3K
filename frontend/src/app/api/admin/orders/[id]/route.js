import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/admin/orders/[id] — ดึงรายละเอียดออเดอร์สำหรับแอดมิน
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // 1. ข้อมูลออเดอร์หลัก
    const [orderRows] = await pool.query(
      `SELECT 
        o.order_id,
        o.status,
        o.subtotal,
        o.discount_amount,
        o.net_total,
        o.note,
        o.created_at,
        dt.table_name_or_number AS table_number,
        m.name AS member_name,
        m.phone_number AS member_phone,
        m.total_points AS member_points,
        s.name AS staff_name,
        s.role AS staff_role
      FROM orders o
      LEFT JOIN dining_table dt ON o.table_id = dt.table_id
      LEFT JOIN member m ON o.member_id = m.member_id
      LEFT JOIN staff s ON o.staff_id_opened = s.staff_id
      WHERE o.order_id = ? OR o.order_id LIKE ?
      LIMIT 1`,
      [id, `${id}%`]
    );

    if (orderRows.length === 0) {
      return NextResponse.json({ error: 'ไม่พบออเดอร์' }, { status: 404 });
    }

    const order = orderRows[0];

    // 2. รายการอาหาร
    const [items] = await pool.query(
      `SELECT 
        oi.order_item_id,
        oi.quantity,
        oi.unit_price AS menu_price,
        oi.kitchen_status,
        oi.is_takeaway,
        mi.name AS menu_name,
        mi.image_url,
        mc.name AS category_name
      FROM order_item oi
      JOIN menu_item mi ON oi.menu_id = mi.menu_id
      LEFT JOIN menu_category mc ON mi.category_id = mc.category_id
      WHERE oi.order_id = ?
      ORDER BY oi.created_at ASC`,
      [order.order_id]
    );

    // 3. Modifier (ถ้ามี)
    for (const item of items) {
      const [modifiers] = await pool.query(
        `SELECT 
          m.name AS modifier_name,
          m.extra_price,
          mg.name AS group_name
        FROM order_item_modifier oim
        JOIN modifier m ON oim.modifier_id = m.modifier_id
        JOIN modifier_group mg ON m.group_id = mg.group_id
        WHERE oim.order_item_id = ?`,
        [item.order_item_id]
      );
      item.modifiers = modifiers;
    }

    // 4. การชำระเงิน
    const [payments] = await pool.query(
      `SELECT 
        payment_id,
        payment_method,
        amount,
        status,
        paid_at AS created_at
      FROM payment
      WHERE order_id = ?
      ORDER BY paid_at ASC`,
      [order.order_id]
    );

    // 5. แต้มสะสม
    const [points] = await pool.query(
      `SELECT 
        ledger_id,
        points_changed,
        transaction_type,
        created_at
      FROM point_ledger
      WHERE order_id = ?
      ORDER BY created_at ASC`,
      [order.order_id]
    );

    return NextResponse.json({
      order,
      items,
      payments,
      points,
    });
  } catch (error) {
    console.error('Order detail API error:', error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 500 }
    );
  }
}
