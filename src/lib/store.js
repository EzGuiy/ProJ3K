import { readJson, writeJson } from "./jsonDb";

const FILE = "orders.json";
const EMPTY = { nextOrderId: 1, orders: [] };

function load() {
  const data = readJson(FILE, EMPTY);
  if (!data || !Array.isArray(data.orders)) return { ...EMPTY, orders: [] };
  return data;
}

function save(data) {
  writeJson(FILE, data);
}

export function getOrders() {
  return load().orders;
}

export function addOrder(order) {
  const data = load();
  const newOrder = {
    id: data.nextOrderId++,
    ...order,
    status: "pending",
    acceptedBy: null,
    acceptedAt: null,
    finishedAt: null,
    cookDurationMs: null,
    calledAt: null,
    createdAt: new Date().toISOString(),
  };
  data.orders.push(newOrder);
  save(data);
  return newOrder;
}

export function getOrderById(orderId) {
  return load().orders.find((order) => order.id === orderId) || null;
}

export function updateOrderStatus(orderId, status) {
  const data = load();
  const order = data.orders.find((item) => item.id === orderId);
  if (!order) return null;
  order.status = status;
  order.updatedAt = new Date().toISOString();
  save(data);
  return order;
}

export function acceptOrder(orderId, chefName) {
  const data = load();
  const order = data.orders.find((item) => item.id === orderId);
  if (!order) return null;
  if (!["pending", "preparing"].includes(order.status)) return null;

  const now = new Date().toISOString();
  order.status = "preparing";
  order.acceptedBy = chefName.trim();
  if (!order.acceptedAt) order.acceptedAt = now;
  order.updatedAt = now;
  save(data);
  return order;
}

export function finishOrder(orderId) {
  const data = load();
  const order = data.orders.find((item) => item.id === orderId);
  if (!order || order.status !== "preparing" || !order.acceptedAt) return null;

  const finishedAt = new Date();
  order.finishedAt = finishedAt.toISOString();
  order.cookDurationMs = finishedAt.getTime() - new Date(order.acceptedAt).getTime();
  order.status = "plated";
  order.updatedAt = order.finishedAt;
  save(data);
  return order;
}

export function callStaff(orderId) {
  const data = load();
  const order = data.orders.find((item) => item.id === orderId);
  if (!order || order.status !== "plated") return null;

  const now = new Date().toISOString();
  order.status = "ready";
  order.calledAt = now;
  order.updatedAt = now;
  save(data);
  return order;
}

export function updateOrderFields(orderId, fields) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    Object.assign(order, fields, { updatedAt: new Date().toISOString() });
    return order;
  }
  return null;
}
