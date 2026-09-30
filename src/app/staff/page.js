"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "./staff.module.css";

const statusConfig = {
  pending: { label: "รอดำเนินการ", icon: " ", color: "orange", next: "preparing" },
  preparing: { label: "กำลังเตรียม", icon: "", color: "blue", next: "ready" },
  ready: { label: "พร้อมเสิร์ฟ", icon: "", color: "green", next: "served" },
  served: { label: "เสิร์ฟแล้ว", icon: "", color: "purple", next: null },
  cancelled: { label: "ยกเลิก", icon: "", color: "red", next: null },
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

  const filteredOrders = orders
    .filter((o) => filterStatus === "all" || o.status === filterStatus)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const orderCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    ready: orders.filter((o) => o.status === "ready").length,
    served: orders.filter((o) => o.status === "served").length,
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
                      {order.isMember ? "" : ""} {order.customerName}
                    </span>
                    {order.tableNumber !== "-" && (
                      <span className={styles.tableNum}>
                        โต๊ะ {order.tableNumber}
                      </span>
                    )}
                  </div>
                  <span className={styles.orderTotal}>
                    ฿{order.totalAmount?.toLocaleString()}
                  </span>
                </div>

                {/* Items Summary */}
                <div className={styles.orderItems}>
                  {order.items
                    .slice(0, isExpanded ? order.items.length : 3)
                    .map((item, idx) => (
                      <div key={idx} className={styles.orderItem}>
                        <span className={styles.orderItemEmoji}>
                          {item.image}
                        </span>
                        <span className={styles.orderItemName}>
                          {item.name}
                        </span>
                        <span className={styles.orderItemQty}>
                          x{item.quantity}
                        </span>
                      </div>
                    ))}
                  {!isExpanded && order.items.length > 3 && (
                    <div className={styles.moreItems}>
                      +{order.items.length - 3} รายการเพิ่มเติม
                    </div>
                  )}
                </div>

                {/* Note */}
                {order.note && (
                  <div className={styles.orderNote}>
                    {order.note}
                  </div>
                )}

                {/* Actions */}
                {config.next && (
                  <div
                    className={styles.orderActions}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className={styles.actionBtnPrimary}
                      onClick={() => handleStatusChange(order.id, config.next)}
                    >
                      {statusConfig[config.next].icon}{" "}
                      {config.next === "preparing"
                        ? "เริ่มเตรียม"
                        : config.next === "ready"
                        ? "เตรียมเสร็จ"
                        : "เสิร์ฟแล้ว"}
                    </button>
                    {order.status === "pending" && (
                      <button
                        className={styles.actionBtnCancel}
                        onClick={() =>
                          handleStatusChange(order.id, "cancelled")
                        }
                      >
                        ยกเลิก
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
