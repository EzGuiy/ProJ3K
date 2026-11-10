// Backend API Client Layer for POS System

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`[Backend API] Request failed for ${endpoint}:`, error.message);
    throw error;
  }
}

// ===== Admin API Endpoints =====

/**
 * Fetch dashboard overview statistics (ยอดขาย, ออเดอร์, ฯลฯ)
 * Endpoint Target: GET /api/admin/stats
 */
export async function getAdminStats() {
  return await fetchAPI("/admin/stats");
}

/**
 * Fetch all orders for Admin view
 * Endpoint Target: GET /api/admin/orders
 */
export async function getAdminOrders(params = {}) {
  const query = new URLSearchParams(params).toString();
  return await fetchAPI(`/admin/orders${query ? `?${query}` : ""}`);
}

/**
 * Update status of an order
 * Endpoint Target: PATCH /api/admin/orders/:id
 */
export async function updateAdminOrderStatus(orderId, status) {
  return await fetchAPI(`/admin/orders/${orderId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

/**
 * Fetch menu items for menu management
 * Endpoint Target: GET /api/admin/menu
 */
export async function getAdminMenuItems() {
  return await fetchAPI("/admin/menu");
}

/**
 * Create a new menu item
 * Endpoint Target: POST /api/admin/menu
 */
export async function createMenuItem(menuData) {
  return await fetchAPI("/admin/menu", {
    method: "POST",
    body: JSON.stringify(menuData),
  });
}

/**
 * Update menu item
 * Endpoint Target: PUT /api/admin/menu/:id
 */
export async function updateMenuItem(menuId, menuData) {
  return await fetchAPI(`/admin/menu/${menuId}`, {
    method: "PUT",
    body: JSON.stringify(menuData),
  });
}

/**
 * Delete or toggle availability of a menu item
 * Endpoint Target: DELETE /api/admin/menu/:id
 */
export async function deleteMenuItem(menuId) {
  return await fetchAPI(`/admin/menu/${menuId}`, {
    method: "DELETE",
  });
}
