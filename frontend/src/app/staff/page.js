"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "./staff.module.css";

const statusConfig = {
  pending: { label: "รอดำเนินการ", icon: "⏳", color: "orange", next: "preparing" },
  preparing: { label: "กำลังปรุง", icon: "🔥", color: "blue", next: "ready" },
  ready: { label: "🔔 พร้อมเสิร์ฟ (เชฟตรวจผ่าน QC แล้ว)", icon: "⭐", color: "green", next: "served" },
  served: { label: "เสิร์ฟแล้ว", icon: "✅", color: "purple", next: null },
  cancelled: { label: "ยกเลิก", icon: "❌", color: "red", next: null },
};

export default function StaffPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data.orders || []);
      setLastRefresh(new Date());
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Auto-refresh every 5 seconds
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // เสิร์ฟเฉพาะ 1 จาน
  const handleServeItem = async (orderId, orderItemId, e) => {
    if (e) e.stopPropagation();
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "serve_item", order_item_id: orderItemId }),
      });
      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Error serving item:", error);
    }
  };

  // เสิร์ฟเฉพาะรายการที่เชฟทำเสร็จแล้วในออเดอร์นี้
  const handleServeReady = async (orderId, e) => {
    if (e) e.stopPropagation();
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "serve_ready" }),
      });
      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Error serving ready items:", error);
    }
  };

  const filteredOrders = orders
    .filter((o) => {
      if (filterStatus === "all") return true;
      if (filterStatus === "ready") return o.readyCount > 0 || o.status === "ready";
      if (filterStatus === "preparing") return (o.cookingCount > 0 && o.readyCount === 0) || o.status === "preparing";
      if (filterStatus === "pending") return (o.pendingCount > 0 && o.cookingCount === 0 && o.readyCount === 0) || o.status === "pending";
      if (filterStatus === "served") return o.status === "served" || (o.items?.length > 0 && o.servedCount === o.items.length);
      return o.status === filterStatus;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const orderCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.pendingCount > 0 && o.cookingCount === 0 && o.readyCount === 0).length,
    preparing: orders.filter((o) => o.cookingCount > 0 && o.readyCount === 0).length,
    ready: orders.filter((o) => o.readyCount > 0 || o.status === "ready").length,
    served: orders.filter((o) => o.status === "served" || (o.items?.length > 0 && o.servedCount === o.items.length)).length,
  };

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeDiff = (dateStr) => {
    const diff = Math.floor((new Date() - new Date(dateStr)) / 60000);
    if (diff < 1) return "เมื่อสักครู่";
    if (diff < 60) return `${diff} นาทีที่แล้ว`;
    return `${Math.floor(diff / 60)} ชม.ที่แล้ว`;
  };

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className="spinner"></div>
        <p>กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => router.push("/")}>
            ← กลับ
          </button>
          <div>
            <h1 className={styles.headerTitle}>ระบบจัดการออเดอร์</h1>
            <p className={styles.headerSub}>
              อัพเดทล่าสุด: {formatTime(lastRefresh)}
            </p>
          </div>
        </div>
        <button className={styles.refreshBtn} onClick={fetchOrders}>
          🔄 รีเฟรช
        </button>
      </header>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={`${styles.statCard} ${styles.statPending}`}>
          <span className={styles.statIcon}></span>
          <div>
            <span className={styles.statValue}>{orderCounts.pending}</span>
            <span className={styles.statLabel}>รอดำเนินการ</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.statPreparing}`}>
          <span className={styles.statIcon}></span>
          <div>
            <span className={styles.statValue}>{orderCounts.preparing}</span>
            <span className={styles.statLabel}>กำลังเตรียม</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.statReady}`}>
          <span className={styles.statIcon}></span>
          <div>
            <span className={styles.statValue}>{orderCounts.ready}</span>
            <span className={styles.statLabel}>พร้อมเสิร์ฟ</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.statTotal}`}>
          <span className={styles.statIcon}></span>
          <div>
            <span className={styles.statValue}>{orderCounts.all}</span>
            <span className={styles.statLabel}>ออเดอร์ทั้งหมด</span>
          </div>
        </div>
      </div>

      {/* Ready Alert Banner */}
      {orderCounts.ready > 0 && (
        <div
          style={{
            margin: "0 1.5rem 1rem",
            padding: "0.85rem 1.25rem",
            background: "rgba(45, 212, 168, 0.15)",
            border: "1px solid var(--accent-green)",
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            animation: "pulse 2s infinite",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1.4rem" }}>⭐🔔</span>
            <div>
              <strong style={{ color: "var(--accent-green)" }}>
                มี {orderCounts.ready} ออเดอร์พร้อมเสิร์ฟ! (เชฟปรุงเสร็จและผ่านการตรวจคุณภาพแล้ว)
              </strong>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                กรุณาตรวจสอบหมายเลขโต๊ะและนำอาหารไปส่งให้ลูกค้า
              </div>
            </div>
          </div>
          <button
            type="button"
            className={styles.filterBtn}
            style={{ background: "var(--accent-green)", color: "#0a0a0f", fontWeight: 700 }}
            onClick={() => setFilterStatus("ready")}
          >
            ดูออเดอร์ที่พร้อมเสิร์ฟ
          </button>
        </div>
      )}

      {/* Filters */}
      <div className={styles.filters}>
        {[
          { key: "all", label: "ทั้งหมด" },
          { key: "pending", label: "รอ" },
          { key: "preparing", label: "กำลังเตรียม" },
          { key: "ready", label: "พร้อมเสิร์ฟ" },
          { key: "served", label: "เสิร์ฟแล้ว" },
        ].map((f) => (
          <button
            key={f.key}
            className={`${styles.filterBtn} ${
              filterStatus === f.key ? styles.filterActive : ""
            }`}
            onClick={() => setFilterStatus(f.key)}
          >
            {f.label}
            {orderCounts[f.key] > 0 && (
              <span className={styles.filterCount}>{orderCounts[f.key]}</span>
            )}
          </button>
        ))}
      </div>

      {/* Orders */}
      {filteredOrders.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}></span>
          <h3>ยังไม่มีออเดอร์</h3>
          <p>ออเดอร์ใหม่จะปรากฏที่นี่โดยอัตโนมัติ</p>
        </div>
      ) : (
        <div className={styles.orderGrid}>
          {filteredOrders.map((order) => {
            const config = statusConfig[order.status];
            const isExpanded = expandedOrder === order.id;

            return (
              <div
                key={order.id}
                className={`${styles.orderCard} ${styles[`order${config.color.charAt(0).toUpperCase() + config.color.slice(1)}`]}`}
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
              >
                {/* Card Header */}
                <div className={styles.orderCardHeader}>
                  <div className={styles.orderCardId}>
                    <span className={styles.orderId}>#{order.id}</span>
                    <span className={`badge badge-${config.color}`}>
                      {config.icon} {config.label}
                    </span>
                  </div>
                  <div className={styles.orderMeta}>
                    <span className={styles.orderTime}>
                      {formatTime(order.createdAt)}
                    </span>
                    <span className={styles.orderTimeDiff}>
                      {getTimeDiff(order.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Customer Info */}
                <div className={styles.orderCustomer}>
                  <div className={styles.customerInfo}>
                    <span className={styles.customerName}>
                      {order.isMember ? "⭐ " : ""}{order.customerName}
                    </span>
                    {order.tableNumber !== "-" && (
                      <span className={styles.tableNum}>
                        📍 โต๊ะ {order.tableNumber}
                      </span>
                    )}
                  </div>
                  <span className={styles.orderTotal}>
                    ฿{order.totalAmount?.toLocaleString()}
                  </span>
                </div>

                {/* Progress Summary */}
                <div className={styles.orderProgressSummary}>
                  <span>
                    เสิร์ฟแล้ว {order.servedCount || 0}/{order.items?.length || 0} จาน
                  </span>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    {order.readyCount > 0 && (
                      <span style={{ color: "#2dd4a8", fontWeight: 700 }}>
                        ⭐ พร้อมเสิร์ฟ {order.readyCount}
                      </span>
                    )}
                    {order.cookingCount > 0 && (
                      <span style={{ color: "#60a5fa" }}>
                        🔥 กำลังปรุง {order.cookingCount}
                      </span>
                    )}
                    {order.pendingCount > 0 && (
                      <span style={{ color: "#fbbf24" }}>
                        ⏳ รอคิว {order.pendingCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Items Summary with per-item status & serve button */}
                <div className={styles.orderItems}>
                  {order.items
                    .slice(0, isExpanded ? order.items.length : 5)
                    .map((item, idx) => {
                      const isReady = item.kitchen_status === "READY";
                      const isCooking = item.kitchen_status === "COOKING";
                      const isServed = item.kitchen_status === "SERVED";
                      const isPending = item.kitchen_status === "PENDING";

                      return (
                        <div
                          key={item.order_item_id || idx}
                          className={`${styles.orderItem} ${isReady ? styles.itemReadyHighlight : ""} ${isServed ? styles.itemServed : ""}`}
                        >
                          <span className={styles.orderItemEmoji}>
                            {item.image}
                          </span>
                          <div className={styles.orderItemDetails}>
                            <div className={styles.orderItemHeaderRow}>
                              <span className={styles.orderItemName} style={{ textDecoration: isServed ? "line-through" : "none" }}>
                                {item.name}
                              </span>
                              <span className={styles.orderItemQty}>
                                x{item.quantity}
                              </span>
                            </div>
                            <div className={styles.orderItemSubRow}>
                              {item.station_code && (
                                <span className={styles.stationBadge}>
                                  {item.station_code}
                                </span>
                              )}
                              {isReady && (
                                <span className={styles.statusBadgeReady}>
                                  ⭐ เชฟปรุงเสร็จ พร้อมเสิร์ฟ!
                                </span>
                              )}
                              {isCooking && (
                                <span className={styles.statusBadgeCooking}>
                                  🔥 กำลังปรุง
                                </span>
                              )}
                              {isPending && (
                                <span className={styles.statusBadgePending}>
                                  ⏳ รอคิวปรุง
                                </span>
                              )}
                              {isServed && (
                                <span className={styles.statusBadgeServed}>
                                  ✅ เสิร์ฟแล้ว
                                </span>
                              )}
                            </div>
                          </div>

                          {/* ปุ่มเสิร์ฟเฉพาะจานนี้ */}
                          {isReady && (
                            <button
                              type="button"
                              className={styles.serveItemBtn}
                              onClick={(e) =>
                                handleServeItem(
                                  order.order_id,
                                  item.order_item_id,
                                  e
                                )
                              }
                              title="เสิร์ฟจานนี้ให้ลูกค้าทันที"
                            >
                              🍽️ เสิร์ฟจานนี้
                            </button>
                          )}
                        </div>
                      );
                    })}
                  {!isExpanded && order.items.length > 5 && (
                    <div className={styles.moreItems}>
                      +{order.items.length - 5} รายการเพิ่มเติม (คลิกเพื่อดูทั้งหมด)
                    </div>
                  )}
                </div>

                {/* Note */}
                {order.note && (
                  <div className={styles.orderNote}>
                    📝 {order.note}
                  </div>
                )}

                {/* Actions */}
                <div
                  className={styles.orderActions}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* ปุ่มเสิร์ฟรายการที่พร้อมทั้งหมด */}
                  {order.readyCount > 0 && (
                    <button
                      type="button"
                      className={styles.actionBtnPrimary}
                      onClick={(e) => handleServeReady(order.order_id, e)}
                    >
                      ⭐ เสิร์ฟเฉพาะรายการที่พร้อม ({order.readyCount} จาน)
                    </button>
                  )}

                  {/* ป้ายแจ้งเตือนเมื่อกำลังทำและไม่มีรายการพร้อม */}
                  {order.readyCount === 0 && (order.cookingCount > 0 || order.pendingCount > 0) && (
                    <div className={styles.kitchenProgressNotice}>
                      <span>⏳ ครัวกำลังดำเนินการ ({order.cookingCount} ปรุง, {order.pendingCount} รอคิว)</span>
                    </div>
                  )}

                  {/* ป้ายเมื่อเสิร์ฟครบทุกรายการแล้ว */}
                  {order.items.length > 0 && order.servedCount === order.items.length && (
                    <div className={styles.allServedNotice}>
                      <span>✅ เสิร์ฟครบทุกรายการแล้ว ({order.servedCount}/{order.items.length})</span>
                    </div>
                  )}

                  {/* ปุ่มยกเลิกเมื่อยังไม่มีรายการใดเริ่มทำ */}
                  {order.status === "pending" && order.servedCount === 0 && order.readyCount === 0 && order.cookingCount === 0 && (
                    <button
                      type="button"
                      className={styles.actionBtnCancel}
                      onClick={() => handleStatusChange(order.order_id, "cancelled")}
                    >
                      ยกเลิกออเดอร์
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
