import { NextResponse } from 'next/server';
import { getOrders, addOrder } from '@/lib/store';

export async function GET() {
  const orders = getOrders();
  return NextResponse.json({ orders });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, isMember, tableNumber, items, note } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'กรุณาเลือกรายการอาหารอย่างน้อย 1 รายการ' },
        { status: 400 }
      );
    }

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = addOrder({
      customerName: customerName || 'ลูกค้าทั่วไป',
      customerPhone: customerPhone || '',
      isMember: isMember || false,
      tableNumber: tableNumber || '-',
      items,
      note: note || '',
      totalAmount,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการสร้างออเดอร์' },
      { status: 500 }
    );
  }
}
