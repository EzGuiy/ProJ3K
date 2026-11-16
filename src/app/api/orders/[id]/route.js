import { NextResponse } from 'next/server';
import { acceptOrder, callStaff, finishOrder, getOrderById, updateOrderStatus } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, action, chefName } = body;
    const orderId = parseInt(id, 10);

    if (action === 'accept') {
      if (!chefName || !String(chefName).trim()) {
        return NextResponse.json({ error: 'กรุณาระบุชื่อเชฟ' }, { status: 400 });
      }
      const order = acceptOrder(orderId, chefName);
      if (!order) {
        return NextResponse.json({ error: 'รับออเดอร์นี้ไม่ได้' }, { status: 400 });
      }
      return NextResponse.json({ order });
    }

    if (action === 'finish') {
      const order = finishOrder(orderId);
      if (!order) {
        return NextResponse.json({ error: 'ปิดงานนี้ไม่ได้' }, { status: 400 });
      }
      return NextResponse.json({ order });
    }

    if (action === 'call') {
      const order = callStaff(orderId);
      if (!order) {
        return NextResponse.json({ error: 'เรียกพนักงานได้หลังทำเสร็จเท่านั้น' }, { status: 400 });
      }
      return NextResponse.json({ order });
    }

    const validStatuses = ['pending', 'preparing', 'plated', 'ready', 'served', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'สถานะไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    const order = updateOrderStatus(orderId, status);
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
