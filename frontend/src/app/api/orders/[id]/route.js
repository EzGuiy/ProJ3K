import { NextResponse } from 'next/server';
import { updateOrderStatus, getOrderById } from '@/lib/store';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ['pending', 'preparing', 'ready', 'served', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'สถานะไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    const order = updateOrderStatus(parseInt(id), status);
    if (!order) {
      return NextResponse.json(
        { error: 'ไม่พบออเดอร์' },
        { status: 404 }
      );
    }

    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาด' },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  const { id } = await params;
  const order = getOrderById(parseInt(id));
  if (!order) {
    return NextResponse.json({ error: 'ไม่พบออเดอร์' }, { status: 404 });
  }
  return NextResponse.json({ order });
}
