import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { TABLE_STATUSES } from '@/lib/tableStatus';
import { updateTable, deleteTable } from '@/lib/tableStore';
import { isDbUnavailable } from '@/lib/dbErrors';

export const dynamic = 'force-dynamic';

// PATCH /api/admin/tables/:id — เปลี่ยนสถานะ / เปลี่ยนหมายเลขโต๊ะ
export async function PATCH(request, { params }) {
  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'ข้อมูลที่ส่งมาไม่ถูกต้อง' }, { status: 400 });
  }

  const patch = {};

  if (body?.status !== undefined) {
    const status = String(body.status).toUpperCase();
    if (!TABLE_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'สถานะโต๊ะไม่ถูกต้อง' }, { status: 400 });
    }
    patch.status = status;
  }

  if (body?.table_number !== undefined) {
    const number = String(body.table_number).trim();
    if (!number) {
      return NextResponse.json({ error: 'กรุณาระบุหมายเลขโต๊ะ' }, { status: 400 });
    }
    patch.table_number = number;
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'ไม่มีข้อมูลให้แก้ไข' }, { status: 400 });
  }

  try {
    const fields = [];
    const values = [];

    if (patch.status) {
      fields.push('status = ?');
      values.push(patch.status);
    }
    if (patch.table_number) {
      fields.push('table_name_or_number = ?');
      values.push(patch.table_number);
    }

    values.push(id);
    const [result] = await pool.query(
      `UPDATE dining_table SET ${fields.join(', ')} WHERE table_id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'ไม่พบโต๊ะ' }, { status: 404 });
    }

    const order_opened_at =
      patch.status === 'OCCUPIED' ? new Date().toISOString() : patch.status ? null : undefined;

    return NextResponse.json({
      message: 'อัปเดตโต๊ะสำเร็จ',
      offline: false,
      ...(patch.status ? { status: patch.status, order_opened_at } : {}),
      ...(patch.table_number ? { table_number: patch.table_number } : {}),
    });
  } catch (error) {
    if (error?.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'หมายเลขโต๊ะนี้ถูกใช้แล้ว' }, { status: 409 });
    }
    if (isDbUnavailable(error)) {
      const result = updateTable(id, patch);
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 404 });
      }
      return NextResponse.json({
        message: 'อัปเดตโต๊ะสำเร็จ',
        offline: true,
        table: result.table,
        ...(result.table?.status ? { status: result.table.status, order_opened_at: result.table.order_opened_at ?? null } : {}),
      });
    }
    console.error('Update table error:', error);
    return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
  }
}

// DELETE /api/admin/tables/:id — ลบโต๊ะ
export async function DELETE(_request, { params }) {
  const { id } = await params;

  try {
    const [result] = await pool.query('DELETE FROM dining_table WHERE table_id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'ไม่พบโต๊ะ' }, { status: 404 });
    }

    return NextResponse.json({ message: 'ลบโต๊ะสำเร็จ', offline: false });
  } catch (error) {
    if (isDbUnavailable(error)) {
      const result = deleteTable(id);
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 404 });
      }
      return NextResponse.json({ message: 'ลบโต๊ะสำเร็จ', offline: true });
    }
    console.error('Delete table error:', error);
    return NextResponse.json({ error: error.message, code: error.code }, { status: 500 });
  }
}
