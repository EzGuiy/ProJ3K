import { NextResponse } from 'next/server';
import { findReservation, updateReservationStatus } from '@/lib/reservationStore';

export const dynamic = 'force-dynamic';

// GET /api/reservations/[id] — look up by id or qrToken
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const reservation = await findReservation(id);

    if (!reservation) {
      return NextResponse.json({ error: 'ไม่พบข้อมูลการจอง' }, { status: 404 });
    }
    return NextResponse.json({ reservation });
  } catch (error) {
    console.error('Reservation GET by id error:', error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการค้นหา' }, { status: 500 });
  }
}

// PATCH /api/reservations/[id] — update status and optionally assign table
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, tableNumber } = body;

    const validStatuses = ['confirmed', 'seated', 'checked-in', 'cancelled', 'no_show'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'สถานะไม่ถูกต้อง' }, { status: 400 });
    }

    const reservation = await updateReservationStatus(id, status, tableNumber);
    if (!reservation) {
      return NextResponse.json({ error: 'ไม่พบข้อมูลการจอง' }, { status: 404 });
    }
    return NextResponse.json({ reservation });
  } catch (err) {
    console.error('Reservation PATCH error:', err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการอัปเดต' }, { status: 500 });
  }
}
