import { NextResponse } from 'next/server';
import { findReservation, updateReservationStatus } from '@/lib/reservationStore';

export const dynamic = 'force-dynamic';

// GET /api/reservations/[id] — look up by id or qrToken
export async function GET(request, { params }) {
  const { id } = await params;
  const reservation = findReservation(id);

  if (!reservation) {
    return NextResponse.json({ error: 'ไม่พบข้อมูลการจอง' }, { status: 404 });
  }
  return NextResponse.json({ reservation });
}

// PATCH /api/reservations/[id] — update status
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ['confirmed', 'checked-in', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'สถานะไม่ถูกต้อง' }, { status: 400 });
    }

    const reservation = updateReservationStatus(id, status);
    if (!reservation) {
      return NextResponse.json({ error: 'ไม่พบข้อมูลการจอง' }, { status: 404 });
    }
    return NextResponse.json({ reservation });
  } catch {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
}
