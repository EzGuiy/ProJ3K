import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// PATCH /api/chef/[id] — เชฟรับทำ หรือ ทำเสร็จ
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, chefName } = body;

    // หา full order_id
    const [orders] = await pool.query(
      'SELECT order_id FROM orders WHERE order_id = ? OR order_id LIKE ? LIMIT 1',
      [id, `${id}%`]
    );

    if (orders.length === 0) {
      return NextResponse.json({ error: 'ไม่พบออเดอร์' }, { status: 404 });
    }

    const fullOrderId = orders[0].order_id;

    if (action === 'accept') {
      // 1. รับทำออเดอร์ -> เปลี่ยนสถานะเป็น COOKING
      await pool.query(
        `UPDATE order_item SET kitchen_status = 'COOKING' WHERE order_id = ? AND kitchen_status = 'PENDING'`,
        [fullOrderId]
      );

      // ถ้ามีชื่อเชฟ ตรวจสอบหรือหา staff
      if (chefName && chefName.trim()) {
        const [staffRows] = await pool.query(
          `SELECT staff_id FROM staff WHERE name LIKE ? LIMIT 1`,
          [`%${chefName.trim()}%`]
        );
        if (staffRows.length > 0) {
          await pool.query(
            `UPDATE orders SET staff_id_opened = ?, updated_at = CURRENT_TIMESTAMP WHERE order_id = ?`,
            [staffRows[0].staff_id, fullOrderId]
          );
        } else {
          await pool.query(
            `UPDATE orders SET updated_at = CURRENT_TIMESTAMP WHERE order_id = ?`,
            [fullOrderId]
          );
        }
      } else {
        await pool.query(
          `UPDATE orders SET updated_at = CURRENT_TIMESTAMP WHERE order_id = ?`,
          [fullOrderId]
        );
      }

      return NextResponse.json({
        success: true,
        order_id: fullOrderId,
        status: 'cooking',
      });
    }

    if (action === 'complete') {
      // 2. ทำเสร็จแล้ว -> เปลี่ยนสถานะเป็น READY
      await pool.query(
        `UPDATE order_item SET kitchen_status = 'READY' WHERE order_id = ?`,
        [fullOrderId]
      );
      await pool.query(
        `UPDATE orders SET updated_at = CURRENT_TIMESTAMP WHERE order_id = ?`,
        [fullOrderId]
      );

      return NextResponse.json({
        success: true,
        order_id: fullOrderId,
        status: 'ready',
      });
    }

    return NextResponse.json({ error: 'action ไม่ถูกต้อง' }, { status: 400 });
  } catch (error) {
    console.error('Chef action error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการประมวลผล', details: error.message },
      { status: 500 }
    );
  }
}
