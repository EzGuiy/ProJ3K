import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import crypto from 'crypto';
import {
  PROMPTPAY_PHONE,
  generatePromptPayPayload,
  generatePromptPayQrDataUrl,
} from '@/lib/promptpay';

export const dynamic = 'force-dynamic';

// GET /api/payments — ดึงประวัติการชำระเงิน หรือสร้าง QR Data URL สำหรับชำระเงิน
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const tableNumber = searchParams.get('tableNumber') || searchParams.get('table');
    const qrOnly = searchParams.get('qr') === 'true';
    const amountParam = searchParams.get('amount');

    // ── กรณีขอ QR Code สำหรับสแกนจ่าย ──
    if (qrOnly && amountParam) {
      const amount = parseFloat(amountParam) || 0;
      const phone = searchParams.get('phone') || PROMPTPAY_PHONE;
      const payload = generatePromptPayPayload(phone, amount);
      const qrDataUrl = await generatePromptPayQrDataUrl(phone, amount);

      return NextResponse.json({
        success: true,
        phone,
        amount,
        payload,
        qrDataUrl,
      });
    }

    // ── ดึงประวัติการชำระเงินจากตาราง payment ──
    let query = `
      SELECT 
        p.payment_id,
        p.order_id,
        p.payment_method,
        p.amount,
        p.status,
        p.reference_no,
        p.paid_at,
        o.table_id,
        o.member_id,
        dt.table_name_or_number AS table_number,
        m.name AS member_name,
        m.phone_number AS member_phone
      FROM payment p
      LEFT JOIN orders o ON p.order_id = o.order_id
      LEFT JOIN dining_table dt ON o.table_id = dt.table_id
      LEFT JOIN member m ON o.member_id = m.member_id
      WHERE 1=1
    `;
    const params = [];

    if (orderId) {
      query += ` AND (p.order_id = ? OR p.order_id LIKE ?)`;
      params.push(orderId, `${orderId}%`);
    }

    if (tableNumber) {
      query += ` AND dt.table_name_or_number = ?`;
      params.push(String(tableNumber).trim());
    }

    query += ` ORDER BY p.paid_at DESC LIMIT 50`;

    const [rows] = await pool.query(query, params);

    return NextResponse.json({
      payments: rows.map((r) => ({
        paymentId: r.payment_id,
        orderId: r.order_id,
        shortOrderId: r.order_id ? r.order_id.slice(0, 8) : '-',
        paymentMethod: r.payment_method,
        amount: Number(r.amount),
        status: r.status,
        referenceNo: r.reference_no,
        paidAt: r.paid_at,
        tableNumber: r.table_number || '-',
        memberName: r.member_name || null,
        memberPhone: r.member_phone || null,
      })),
    });
  } catch (error) {
    console.error('Get payments error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลการชำระเงิน', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/payments — บันทึกการชำระเงินสำเร็จ (พร้อมเพย์) และปิดบิล/คืนสถานะโต๊ะ
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      orderId,
      tableNumber,
      amount,
      paymentMethod = 'PROMPTPAY',
      referenceNo,
      clearTable = true,
    } = body;

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 0) {
      return NextResponse.json({ error: 'ยอดเงินไม่ถูกต้อง' }, { status: 400 });
    }

    const paymentId = crypto.randomUUID();
    const finalRef = referenceNo || `PP-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let targetOrderId = null;
    let targetTableId = null;
    let targetTableNumber = tableNumber ? String(tableNumber).trim() : null;
    let memberId = null;

    // ── 1. ค้นหาออเดอร์เป้าหมาย ──
    if (orderId) {
      const [orders] = await pool.query(
        `SELECT o.order_id, o.table_id, o.member_id, o.net_total, o.status, dt.table_name_or_number
         FROM orders o
         LEFT JOIN dining_table dt ON o.table_id = dt.table_id
         WHERE o.order_id = ? OR o.order_id LIKE ?
         LIMIT 1`,
        [orderId, `${orderId}%`]
      );

      if (orders.length > 0) {
        targetOrderId = orders[0].order_id;
        targetTableId = orders[0].table_id;
        memberId = orders[0].member_id;
        if (!targetTableNumber) {
          targetTableNumber = orders[0].table_name_or_number;
        }
      }
    }

    // ── 2. ถ้าไม่มี orderId แต่มี tableNumber ให้หาออเดอร์ OPEN ล่าสุดของโต๊ะ ──
    if (!targetOrderId && targetTableNumber) {
      const [tables] = await pool.query(
        `SELECT dt.table_id, dt.table_name_or_number, o.order_id, o.member_id
         FROM dining_table dt
         LEFT JOIN orders o ON dt.table_id = o.table_id AND o.status = 'OPEN'
         WHERE dt.table_name_or_number = ?
         ORDER BY o.created_at DESC
         LIMIT 1`,
        [targetTableNumber]
      );

      if (tables.length > 0) {
        targetTableId = tables[0].table_id;
        targetOrderId = tables[0].order_id;
        memberId = tables[0].member_id;
      }
    }

    // ── 3. บันทึกข้อมูลลงตาราง payment ──
    await pool.query(
      `INSERT INTO payment (payment_id, order_id, payment_method, amount, status, reference_no, paid_at)
       VALUES (?, ?, ?, ?, 'SUCCESS', ?, NOW())`,
      [paymentId, targetOrderId, paymentMethod, numAmount, finalRef]
    );

    // ── 4. อัปเดตสถานะออเดอร์เป็น CLOSED ──
    if (targetOrderId) {
      await pool.query(
        `UPDATE orders SET status = 'CLOSED', updated_at = NOW() WHERE order_id = ?`,
        [targetOrderId]
      );

      // อัปเดตรายการอาหารทั้งหมดให้เป็น SERVED
      await pool.query(
        `UPDATE order_item SET kitchen_status = 'SERVED' WHERE order_id = ? AND kitchen_status != 'SERVED'`,
        [targetOrderId]
      );
    } else if (targetTableId) {
      // ปิดทุกออเดอร์ที่ยัง OPEN ของโต๊ะนี้
      await pool.query(
        `UPDATE orders SET status = 'CLOSED', updated_at = NOW() WHERE table_id = ? AND status = 'OPEN'`,
        [targetTableId]
      );
    }

    // ── 5. สะสมแต้มสมาชิก (1 แต้ม ต่อ ทุกๆ 25 บาท) ──
    let pointsEarned = 0;
    if (memberId && numAmount >= 25) {
      pointsEarned = Math.floor(numAmount / 25);
      const ledgerId = crypto.randomUUID();

      await pool.query(
        `INSERT INTO point_ledger (ledger_id, member_id, order_id, points_changed, transaction_type, created_at)
         VALUES (?, ?, ?, ?, 'EARN', NOW())`,
        [ledgerId, memberId, targetOrderId, pointsEarned]
      );

      await pool.query(
        `UPDATE member SET total_points = total_points + ?, updated_at = NOW() WHERE member_id = ?`,
        [pointsEarned, memberId]
      );
    }

    // ── 6. เคลียร์สถานะโต๊ะเป็น AVAILABLE ──
    let resolvedTableId = targetTableId;
    if (!resolvedTableId && targetTableNumber) {
      const [tblRows] = await pool.query(
        'SELECT table_id FROM dining_table WHERE table_name_or_number = ? LIMIT 1',
        [targetTableNumber]
      );
      if (tblRows.length > 0) {
        resolvedTableId = tblRows[0].table_id;
      }
    }

    if (clearTable && resolvedTableId) {
      // ปิดทุกออเดอร์ของโต๊ะนี้ให้เป็น CLOSED (ลูกค้าชำระเงินจบแล้ว)
      await pool.query(
        `UPDATE orders SET status = 'CLOSED', updated_at = NOW() WHERE table_id = ? AND status = 'OPEN'`,
        [resolvedTableId]
      );

      // หยุดเวลาและเคลียร์สถานะโต๊ะคืนเป็น AVAILABLE ทันที
      await pool.query(
        `UPDATE dining_table 
         SET status = 'AVAILABLE', occupied_at = NULL, current_order_id = NULL, updated_at = NOW() 
         WHERE table_id = ?`,
        [resolvedTableId]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'บันทึกการชำระเงินผ่านพร้อมเพย์สำเร็จเรียบร้อย',
      payment: {
        paymentId,
        orderId: targetOrderId,
        tableNumber: targetTableNumber,
        amount: numAmount,
        paymentMethod,
        referenceNo: finalRef,
        pointsEarned,
      },
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการประมวลผลการชำระเงิน', details: error.message },
      { status: 500 }
    );
  }
}
