import { NextResponse } from 'next/server';
import { acceptOrder, completeOrder, getChefSession } from '@/lib/chefStore';
import { updateOrderStatus } from '@/lib/store';

// PATCH /api/chef/[id]  body: { action: 'accept' | 'complete', chefName?: string }
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const orderId = parseInt(id);
    const body = await request.json();
    const { action, chefName } = body;

    if (action === 'accept') {
      if (!chefName || !chefName.trim()) {
        return NextResponse.json(
          { error: 'กรุณาระบุชื่อเชฟ' },
          { status: 400 }
        );
      }
      const session = acceptOrder(orderId, chefName.trim());
      // Also update the main order status to 'preparing'
      updateOrderStatus(orderId, 'preparing');
      return NextResponse.json({ session });
    }

    if (action === 'complete') {
      const session = completeOrder(orderId);
      if (!session) {
        return NextResponse.json(
          { error: 'ไม่พบเซสชันของเชฟ' },
          { status: 404 }
        );
      }
      // Move order to 'ready' so staff can pick up
      updateOrderStatus(orderId, 'ready');
      return NextResponse.json({ session });
    }

    return NextResponse.json({ error: 'action ไม่ถูกต้อง' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
}

// GET /api/chef/[id] — return chef session for a specific order
export async function GET(request, { params }) {
  const { id } = await params;
  const session = getChefSession(parseInt(id));
  return NextResponse.json({ session });
}
