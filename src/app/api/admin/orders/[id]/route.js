import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/admin/orders/[id] — ดึงรายละเอียดออเดอร์เต็ม (รายการอาหาร + Modifier + การชำระเงิน)
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // ข้อมูลออเดอร์หลัก
    const [orderRows] = await pool.query(
      `SELECT 
        o.order_id,
        o.status,
        o.net_total,
        o.created_at,
        dt.table_number,
        m.name AS member_name,
        m.phone_number AS member_phone,
        m.total_points AS member_points,
        s.name AS staff_name,
        s.role AS staff_role
      FROM \`ORDER\` o
      LEFT JOIN DINING_TABLE dt ON o.table_id = dt.table_id
      LEFT JOIN MEMBER m ON o.member_id = m.member_id
      LEFT JOIN STAFF s ON o.staff_id_opened = s.staff_id
      WHERE o.order_id = ?`,
      [id]
    );

    if (orderRows.length === 0) {
      return NextResponse.json({ error: 'ไม่พบออเดอร์' }, { status: 404 });
    }

    // รายการอาหาร
    const [items] = await pool.query(
      `SELECT 
        oi.order_item_id,
        oi.quantity,
        oi.kitchen_status,
        oi.is_takeaway,
        mi.name AS menu_name,
        mi.price AS menu_price,
        mc.name AS category_name
      FROM ORDER_ITEM oi
      JOIN MENU_ITEM mi ON oi.menu_id = mi.menu_id
      LEFT JOIN MENU_CATEGORY mc ON mi.category_id = mc.category_id
      WHERE oi.order_id = ?
      ORDER BY oi.order_item_id ASC`,
      [id]
    );

    // Modifier ของแต่ละรายการ
    for (const item of items) {
      const [modifiers] = await pool.query(
        `SELECT 
          m.name AS modifier_name,
          m.extra_price,
          mg.name AS group_name
        FROM ORDER_ITEM_MODIFIER oim
        JOIN MODIFIER m ON oim.modifier_id = m.modifier_id
        JOIN MODIFIER_GROUP mg ON m.group_id = mg.group_id
        WHERE oim.order_item_id = ?`,
        [item.order_item_id]
      );
      item.modifiers = modifiers;
    }

    // การชำระเงิน
    const [payments] = await pool.query(
      `SELECT 
        payment_id,
        payment_method,
        amount,
        status,
        created_at
      FROM PAYMENT
      WHERE order_id = ?
      ORDER BY created_at ASC`,
      [id]
    );

    // ประวัติแต้มที่เกี่ยวข้อง
    const [points] = await pool.query(
      `SELECT 
        ledger_id,
        points_changed,
        transaction_type,
        created_at
      FROM POINT_LEDGER
      WHERE order_id = ?
      ORDER BY created_at ASC`,
      [id]
    );

    return NextResponse.json({
      order: orderRows[0],
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

