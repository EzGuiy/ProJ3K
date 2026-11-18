import { NextResponse } from 'next/server';
import { getReservations, addReservation } from '@/lib/reservationStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const reservations = await getReservations();
    return NextResponse.json({ reservations });
  } catch (error) {
    console.error('Reservations GET error:', error);
    return NextResponse.json({ error: 'ไม่สามารถดึงข้อมูลการจองได้' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      partySize,
      date,
      time,
      timeSlot,
      orderType = 'buffet',
      specialRequests = '',
      promotionId = null,
    } = body;

    // Validate required fields
    if (!name || !phone || !partySize) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อ เบอร์โทรศัพท์ และจำนวนท่าน' },
        { status: 400 }
      );
    }

    if (!timeSlot && (!date || !time)) {
      return NextResponse.json(
        { error: 'กรุณาเลือกวันที่และเวลาที่ต้องการจอง' },
        { status: 400 }
      );
    }

    // Determine target timestamp
    let slotTime;
    if (date && time) {
      slotTime = new Date(`${date}T${time}:00`);
    } else {
      slotTime = new Date(timeSlot);
    }

    if (isNaN(slotTime.getTime())) {
      return NextResponse.json(
        { error: 'รูปแบบวันที่หรือเวลาไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    // Check that booking is not in the past (allow 10-minute grace window)
    const nowWithGrace = new Date(Date.now() - 10 * 60 * 1000);
    if (slotTime < nowWithGrace) {
      return NextResponse.json(
        { error: 'เวลาที่เลือกต้องเป็นเวลาปัจจุบันหรือเวลาในอนาคต' },
        { status: 400 }
      );
    }

    const reservation = await addReservation({
      name,
      phone,
      partySize,
      bookingDate: date,
      bookingTime: time,
      timeSlot: slotTime.toISOString(),
      orderType: orderType === 'alacarte' ? 'alacarte' : 'buffet',
      specialRequests,
      promotionId,
    });

    return NextResponse.json({ reservation }, { status: 201 });
  } catch (err) {
    console.error('Reservations POST error:', err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการบันทึกการจอง' }, { status: 500 });
  }
}
