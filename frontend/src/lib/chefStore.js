// Chef-specific store — mirrors a JSON file structure
// In production this would read/write to data/chef_sessions.json

/**
 * chefSessions shape:
 * {
 *   [orderId]: {
 *     orderId: number,
 *     chefName: string,
 *     acceptedAt: ISO string,
 *     completedAt: ISO string | null,
 *     status: 'cooking' | 'done',
 *   }
 * }
 */
let chefSessions = {};

export function getChefSession(orderId) {
  return chefSessions[orderId] || null;
}

export function getAllChefSessions() {
  return { ...chefSessions };
}

export function acceptOrder(orderId, chefName) {
  chefSessions[orderId] = {
    orderId,
    chefName,
    acceptedAt: new Date().toISOString(),
    completedAt: null,
    status: 'cooking',
  };
  return chefSessions[orderId];
}

export function completeOrder(orderId) {
  if (!chefSessions[orderId]) return null;
  chefSessions[orderId].completedAt = new Date().toISOString();
  chefSessions[orderId].status = 'done';
  return chefSessions[orderId];
}
