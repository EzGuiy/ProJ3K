import { NextResponse } from 'next/server';
import { getOrders } from '@/lib/store';
import { getAllChefSessions } from '@/lib/chefStore';

// GET /api/chef — return all pending/preparing orders merged with chef session info
export async function GET() {
  const orders = getOrders();
  const sessions = getAllChefSessions();

  // Only show orders that are relevant to the kitchen
  const kitchenOrders = orders
    .filter((o) => ['pending', 'preparing', 'ready'].includes(o.status))
    .map((o) => ({
      ...o,
      chefSession: sessions[o.id] || null,
    }))
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return NextResponse.json({ orders: kitchenOrders });
}
