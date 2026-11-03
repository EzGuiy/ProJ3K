// In-memory store for orders (shared across API routes within the same server process)
// In production, this would be a database

let orders = [];
let nextOrderId = 1;

export function getOrders() {
  return orders;
}

export function addOrder(order) {
  const newOrder = {
    id: nextOrderId++,
    ...order,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  return newOrder;
}

export function updateOrderStatus(orderId, status) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    order.updatedAt = new Date().toISOString();
    return order;
  }
  return null;
}

export function getOrderById(orderId) {
  return orders.find(o => o.id === orderId) || null;
}
