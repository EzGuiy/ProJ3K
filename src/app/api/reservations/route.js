import { NextResponse } from 'next/server';
import { getReservations, addReservation } from '@/lib/reservationStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ reservations: getReservations() });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, partySize, timeSlot, orderType, promotionId } = body;

    // Validate required fields
    if (!name || !phone || !partySize || !timeSlot || !orderType) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    // Validate orderType
    if (!['buffet', 'alacarte'].includes(orderType)) {
      return NextResponse.json(
        { error: 'ประเภทการรับประทานไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    // Validate timeSlot — must be within 3 hours from now, same day
    const slotTime = new Date(timeSlot);
    const now = new Date();
    const threeHoursLater = new Date(now.getTime() + 3 * 60 * 60 * 1000);

    if (slotTime <= now) {
      return NextResponse.json(
        { error: 'เวลาที่เลือกต้องอยู่หลังจากเวลาปัจจุบัน' },
        { status: 400 }
      );
    }
    if (slotTime > threeHoursLater) {
      return NextResponse.json(
        { error: 'จองได้ไม่เกิน 3 ชั่วโมงข้างหน้า' },
        { status: 400 }
      );
    }

    const reservation = addReservation({
      name,
      phone,
      partySize,
      timeSlot,
      orderType,
      promotionId,
    });

    return NextResponse.json({ reservation }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
}
