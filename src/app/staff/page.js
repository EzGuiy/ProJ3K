"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

/* ---------- Shared design constants (mirrors order/page.js) ---------- */

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";

const ICONS = {
  back:        "M15 5l-7 7 7 7",
  refresh:     "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  chevronDown: "M6 9l6 6 6-6",
  ticket:      "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z",
  order:       "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  qrcode:      "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z",
  bell:        "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  plus:        "M12 4v16m8-8H4",
  close:       "M6 18L18 6M6 6l12 12",
  phone:       "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  users:       "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
};

function Icon({ name, className = "size-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

/* ---------- Status config ---------- */

// หมายเหตุ: ต้องเขียน class แบบเต็ม ๆ ห้ามต่อ string แบบ dynamic
// ไม่เช่นนั้น Tailwind จะไม่ generate class ให้
const statusConfig = {
  pending: {
    label: "รอดำเนินการ",
    icon: "⏳",
    badgeClass: "bg-orange/15 text-orange",
    topBorder: "border-t-orange",
  },
  preparing: {
    label: "กำลังปรุง",
    icon: "🔥",
    badgeClass: "bg-blue/15 text-blue",
    topBorder: "border-t-blue",
  },
  ready: {
    label: "🔔 พร้อมเสิร์ฟ (เชฟตรวจผ่าน QC แล้ว)",
    icon: "⭐",
    badgeClass: "bg-green/15 text-green",
    topBorder: "border-t-green",
  },
  served: {
    label: "เสิร์ฟแล้ว",
    icon: "✅",
    badgeClass: "bg-purple/15 text-purple",
    topBorder: "border-t-purple",
  },
  cancelled: {
    label: "ยกเลิก",
    icon: "❌",
    badgeClass: "bg-red/15 text-red",
    topBorder: "border-t-red",
  },
};

const statCards = [
  { key: "pending",   label: "รอดำเนินการ",   dotClass: "bg-orange"  },
  { key: "preparing", label: "กำลังเตรียม",   dotClass: "bg-blue"    },
  { key: "ready",     label: "พร้อมเสิร์ฟ",   dotClass: "bg-green"   },
  { key: "all",       label: "ออเดอร์ทั้งหมด", dotClass: "bg-purple"  },
];

const filterOptions = [
  { key: "all",       label: "ทั้งหมด"     },
  { key: "pending",   label: "รอ"          },
  { key: "preparing", label: "กำลังเตรียม" },
  { key: "ready",     label: "พร้อมเสิร์ฟ" },
  { key: "served",    label: "เสิร์ฟแล้ว"  },
];

/* ---------- Queue System Configuration (ระบบจัดการคิวจาก QR Code) ---------- */

const queueStatusConfig = {
  waiting: {
    label: "รอเรียกคิว",
    icon: "⏳",
    badgeClass: "bg-amber/15 text-amber",
    topBorder: "border-t-amber",
  },
  called: {
    label: "📢 กำลังเรียก",
    icon: "🔔",
    badgeClass: "bg-blue/15 text-blue animate-pulse",
    topBorder: "border-t-blue",
  },
  seated: {
    label: "เข้าโต๊ะแล้ว",
    icon: "✅",
    badgeClass: "bg-green/15 text-green",
    topBorder: "border-t-green",
  },
  cancelled: {
    label: "สละสิทธิ์ / ยกเลิก",
    icon: "❌",
    badgeClass: "bg-red/15 text-red",
    topBorder: "border-t-red",
  },
};

const queueFilterOptions = [
  { key: "all",       label: "คิวทั้งหมด"   },
  { key: "waiting",   label: "รอเรียก"      },
  { key: "called",    label: "กำลังเรียก"   },
  { key: "seated",    label: "เข้าโต๊ะแล้ว" },
  { key: "cancelled", label: "สละสิทธิ์"    },
];

// ข้อมูลจำลองคิว (Mock Data ของลูกค้าที่สแกนจองคิวผ่าน QR Code และ Walk-in)
const initialQueueData = [
  {
    id: "Q-01",
    customerName: "คุณกิตติศักดิ์ เจริญพร",
    phone: "089-123-4567",
    partySize: 2,
    tableType: "โต๊ะ 1-2 ท่าน",
    status: "called",
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
    time: "12:30",
    note: "ขอนั่งริมหน้าต่าง",
    tableNumber: null,
    source: "QR Code หน้าร้าน",
  },
  {
    id: "Q-02",
    customerName: "คุณปวีณา สมบูรณ์พานิช",
    phone: "081-987-6543",
    partySize: 4,
    tableType: "โต๊ะ 3-4 ท่าน",
    status: "waiting",
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    time: "12:40",
    note: "ขอเก้าอี้เด็ก 1 ตัว",
    tableNumber: null,
    source: "QR Code หน้าร้าน",
  },
  {
    id: "Q-03",
    customerName: "คุณธนภัทร รุ่งเรือง",
    phone: "095-555-1234",
    partySize: 6,
    tableType: "โต๊ะใหญ่ 5-8 ท่าน",
    status: "waiting",
    createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
    time: "12:45",
    note: "ฉลองวันเกิด ขอโต๊ะโซนด้านใน",
    tableNumber: null,
    source: "QR Code หน้าร้าน",
  },
  {
    id: "Q-04",
    customerName: "คุณศิริพร บุญมี",
    phone: "082-345-6789",
    partySize: 1,
    tableType: "บาร์ / โต๊ะเดี่ยว",
    status: "waiting",
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
    time: "12:50",
    note: "ทานด่วน",
    tableNumber: null,
    source: "QR Code หน้าร้าน",
  },
  {
    id: "Q-05",
    customerName: "คุณวรินทร (Walk-in)",
    phone: "091-222-3344",
    partySize: 3,
    tableType: "โต๊ะ 3-4 ท่าน",
    status: "seated",
    createdAt: new Date(Date.now() - 40 * 60000).toISOString(),
    time: "12:15",
    note: "-",
    tableNumber: "4",
    source: "พนักงานออกบัตรคิว",
  },
  {
    id: "Q-06",
    customerName: "คุณอนุชา ชัยสิทธิ์",
    phone: "088-777-8899",
    partySize: 2,
    tableType: "โต๊ะ 1-2 ท่าน",
    status: "cancelled",
    createdAt: new Date(Date.now() - 50 * 60000).toISOString(),
    time: "12:05",
    note: "โทรเรียก 3 ครั้งไม่มา / ขอสละสิทธิ์",
    tableNumber: null,
    source: "QR Code หน้าร้าน",
  },
];

/* ========== Main Page ========== */

export default function StaffPage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("orders"); // "orders" | "queue"
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // สถานะสำหรับระบบคิว (Queue Management)
  const [queues, setQueues] = useState(initialQueueData);
  const [filterQueueStatus, setFilterQueueStatus] = useState("all");
  const [showAddQueueModal, setShowAddQueueModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedQueueForTable, setSelectedQueueForTable] = useState(null);
  const [selectedTableNumber, setSelectedTableNumber] = useState("1");
  const [toastMessage, setToastMessage] = useState(null);
  const [newQueueForm, setNewQueueForm] = useState({
    customerName: "",
    phone: "",
    partySize: 2,
    note: "",
  });

  // ซ่อน Toast แจ้งเตือนอัตโนมัติ
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

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

  /* ── Queue Handlers ── */

  // เรียกคิวลูกค้า
  const handleCallQueue = (queueId) => {
    setQueues((prev) =>
      prev.map((q) => (q.id === queueId ? { ...q, status: "called" } : q))
    );
    const target = queues.find((q) => q.id === queueId);
    setToastMessage(`📢 กำลังเรียกคิว ${queueId} (${target?.customerName || ""})`);
  };

  // จัดโต๊ะให้ลูกค้า
  const handleConfirmAssignTable = (queueId, tableNum) => {
    if (!tableNum) return;
    setQueues((prev) =>
      prev.map((q) =>
        q.id === queueId
          ? { ...q, status: "seated", tableNumber: String(tableNum) }
          : q
      )
    );
    const target = queues.find((q) => q.id === queueId);
    setSelectedQueueForTable(null);
    setToastMessage(
      `✅ จัดคิว ${queueId} (${target?.customerName || ""}) นั่งโต๊ะ ${tableNum} เรียบร้อยแล้ว`
    );
  };

  // ยกเลิก / ข้ามคิว / สละสิทธิ์
  const handleCancelQueue = (queueId) => {
    setQueues((prev) =>
      prev.map((q) => (q.id === queueId ? { ...q, status: "cancelled" } : q))
    );
    setToastMessage(`❌ คิว ${queueId} ถูกทำเครื่องหมายว่าสละสิทธิ์`);
  };

  // กู้คืนคิวกลับมาเป็นรอเรียก
  const handleRestoreQueue = (queueId) => {
    setQueues((prev) =>
      prev.map((q) => (q.id === queueId ? { ...q, status: "waiting" } : q))
    );
    setToastMessage(`🔄 คืนสถานะคิว ${queueId} เป็นรอเรียก`);
  };

  // พนักงานออกบัตรคิวหน้าร้านให้ลูกค้า Walk-in
  const handleAddManualQueue = (e) => {
    e.preventDefault();
    if (!newQueueForm.customerName.trim()) return;

    const size = Number(newQueueForm.partySize) || 2;
    const tableType =
      size <= 2
        ? "โต๊ะ 1-2 ท่าน"
        : size <= 4
        ? "โต๊ะ 3-4 ท่าน"
        : "โต๊ะใหญ่ 5-8 ท่าน";

    const nextNumber = queues.length + 1;
    const newId = `Q-${String(nextNumber).padStart(2, "0")}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newQueueItem = {
      id: newId,
      customerName: newQueueForm.customerName.trim(),
      phone: newQueueForm.phone.trim() || "-",
      partySize: size,
      tableType,
      status: "waiting",
      createdAt: now.toISOString(),
      time: timeStr,
      note: newQueueForm.note.trim() || "-",
      tableNumber: null,
      source: "พนักงานออกบัตรคิวหน้าร้าน",
    };

    setQueues((prev) => [newQueueItem, ...prev]);
    setShowAddQueueModal(false);
    setNewQueueForm({ customerName: "", phone: "", partySize: 2, note: "" });
    setToastMessage(`🎉 ออกบัตรคิว ${newId} (${newQueueItem.customerName}) สำเร็จ`);
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
    all:       orders.length,
    pending:   orders.filter((o) => o.pendingCount > 0 && o.cookingCount === 0 && o.readyCount === 0).length,
    preparing: orders.filter((o) => o.cookingCount > 0 && o.readyCount === 0).length,
    ready:     orders.filter((o) => o.readyCount > 0 || o.status === "ready").length,
    served:    orders.filter((o) => o.status === "served" || (o.items?.length > 0 && o.servedCount === o.items.length)).length,
  };

  // ข้อมูลสถิติของคิว
  const queueCounts = {
    all:       queues.length,
    waiting:   queues.filter((q) => q.status === "waiting").length,
    called:    queues.filter((q) => q.status === "called").length,
    seated:    queues.filter((q) => q.status === "seated").length,
    cancelled: queues.filter((q) => q.status === "cancelled").length,
  };

  const queueStatCards = [
    { key: "waiting",   label: "รอเรียกคิว",         dotClass: "bg-amber",  count: queueCounts.waiting   },
    { key: "called",    label: "กำลังเรียก / มาโต๊ะ", dotClass: "bg-blue",   count: queueCounts.called    },
    { key: "seated",    label: "จัดโต๊ะเรียบร้อย",     dotClass: "bg-green",  count: queueCounts.seated    },
    { key: "all",       label: "คิวทั้งหมดวันนี้",     dotClass: "bg-purple", count: queueCounts.all       },
  ];

  const filteredQueues = queues.filter((q) => {
    if (filterQueueStatus === "all") return true;
    return q.status === filterQueueStatus;
  });

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
  };

  const getTimeDiff = (dateStr) => {
    const diff = Math.floor((new Date() - new Date(dateStr)) / 60000);
    if (diff < 1) return "เมื่อสักครู่";
    if (diff < 60) return `${diff} นาทีที่แล้ว`;
    return `${Math.floor(diff / 60)} ชม.ที่แล้ว`;
  };

  /* ---------- Loading state ---------- */
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-ink-3">
        <div className="spinner"></div>
        <p className="text-sm text-ink-2">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  /* ---------- Main render ---------- */
  return (
    <div className="min-h-screen pb-10">

      {/* ── Toast Alert Notification ── */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-[9999] flex animate-pop items-center gap-2 rounded-lg border border-line bg-panel px-4 py-3 shadow-xl">
          <span className="text-sm font-semibold text-ink">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs text-ink-3 hover:text-ink ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Header ── */}
      <header className="sticky top-0 z-[100] border-b border-line bg-app backdrop-blur-[20px] animate-drop-in">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6 max-md:flex-wrap max-md:gap-3">

          {/* Left: back button + title */}
          <div className="flex items-center gap-3">
            <button
              className={`flex items-center gap-1.5 rounded-md border border-line px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-glass hover:text-ink ${FOCUS}`}
              onClick={() => router.push("/")}
            >
              <Icon name="back" className="size-4" />
              กลับ
            </button>
            <div>
              <h1 className="text-lg font-bold leading-tight">
                {activeNav === "orders" ? "ระบบจัดการออเดอร์" : "ระบบจัดการคิวลูกค้า (QR Code)"}
              </h1>
              <p className="mt-0.5 text-xs text-ink-3">
                อัพเดทล่าสุด: {formatTime(lastRefresh)}
              </p>
            </div>
          </div>

          {/* Center: Navigation Bar (Navbar สลับโหมด ออเดอร์ / จัดการคิว) */}
          <nav className="flex items-center rounded-lg border border-line bg-glass p-1 max-sm:w-full max-sm:justify-center">
            <button
              type="button"
              onClick={() => setActiveNav("orders")}
              className={`flex items-center gap-2 rounded-md px-3.5 py-1.5 text-xs font-semibold transition ${FOCUS} ${
                activeNav === "orders"
                  ? "bg-orange text-[#0a0a0f] shadow-sm font-bold"
                  : "text-ink-2 hover:text-ink"
              }`}
            >
              <Icon name="order" className="size-3.5" />
              <span>ออเดอร์อาหาร</span>
              {orders.length > 0 && (
                <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  activeNav === "orders" ? "bg-black/15 text-[#0a0a0f]" : "bg-glass text-ink-3"
                }`}>
                  {orders.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveNav("queue")}
              className={`flex items-center gap-2 rounded-md px-3.5 py-1.5 text-xs font-semibold transition ${FOCUS} ${
                activeNav === "queue"
                  ? "bg-orange text-[#0a0a0f] shadow-sm font-bold"
                  : "text-ink-2 hover:text-ink"
              }`}
            >
              <Icon name="ticket" className="size-3.5" />
              <span>จัดการคิวลูกค้า</span>
              {queueCounts.waiting > 0 && (
                <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  activeNav === "queue"
                    ? "bg-black/20 text-[#0a0a0f]"
                    : "bg-amber/20 text-amber"
                }`}>
                  รอ {queueCounts.waiting}
                </span>
              )}
            </button>
          </nav>

          {/* Right: Actions */}

        </div>
      </header>

      <main className="mx-auto max-w-7xl">

        {/* ============================================================== */}
        {/* VIEW 1: จัดการออเดอร์ (ORDERS VIEW)                           */}
        {/* ============================================================== */}
        {activeNav === "orders" && (
          <div className="animate-fade-quick">
            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 gap-px p-4 animate-rise md:grid-cols-4 md:p-6">
              {/* outer wrapper กั้น gap ด้วย bg เพื่อให้เส้นแบ่งดูเรียบ */}
              <div className="col-span-2 grid grid-cols-2 overflow-hidden rounded-lg border border-line md:col-span-4 md:grid-cols-4">
                {statCards.map((s, i) => (
                  <div
                    key={s.key}
                    className={`flex flex-col gap-1.5 px-5 py-5 transition-colors hover:bg-glass ${
                      i !== statCards.length - 1 ? "border-r border-line" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${s.dotClass}`} />
                      <span className="text-xs font-medium text-ink-3">{s.label}</span>
                    </div>
                    <span className="text-[2rem] font-bold leading-none tracking-tight text-ink">
                      {orderCounts[s.key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Ready Alert Banner ── */}
            {orderCounts.ready > 0 && (
              <div className="mx-4 mb-4 flex animate-pop items-center justify-between gap-4 rounded-md border border-green bg-green/10 px-5 py-3.5 md:mx-6 max-sm:flex-col max-sm:items-start">
                <div className="flex items-center gap-2.5">
                  <span className="text-[1.4rem]">⭐🔔</span>
                  <div>
                    <strong className="text-green block text-sm">
                      มี {orderCounts.ready} ออเดอร์พร้อมเสิร์ฟ! (เชฟปรุงเสร็จและผ่านการตรวจคุณภาพแล้ว)
                    </strong>
                    <div className="text-[0.8rem] text-ink-2">
                      กรุณาตรวจสอบหมายเลขโต๊ะและนำอาหารไปส่งให้ลูกค้า
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className={`shrink-0 rounded-md bg-green px-4 py-2 text-[0.85rem] font-bold text-[#0a0a0f] transition hover:brightness-110 ${FOCUS}`}
                  onClick={() => setFilterStatus("ready")}
                >
                  ดูออเดอร์ที่พร้อมเสิร์ฟ
                </button>
              </div>
            )}

            {/* ── Filter Tabs — same style as order/page.js category tabs ── */}
            <div
              className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line px-4 md:px-6"
              role="tablist"
              aria-label="กรองสถานะออเดอร์"
            >
              {filterOptions.map((f) => {
                const active = filterStatus === f.key;
                return (
                  <button
                    key={f.key}
                    role="tab"
                    aria-selected={active}
                    className={`-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors duration-150 ${FOCUS} ${
                      active
                        ? "border-orange text-ink font-semibold"
                        : "border-transparent text-ink-3 hover:text-ink"
                    }`}
                    onClick={() => setFilterStatus(f.key)}
                  >
                    {f.label}
                    {orderCounts[f.key] > 0 && (
                      <span
                        className={`rounded-full px-2 py-px text-[0.72rem] font-bold ${
                          active ? "bg-orange/20 text-orange" : "bg-glass text-ink-3"
                        }`}
                      >
                        {orderCounts[f.key]}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Orders Grid ── */}
            {filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-5 py-20 text-center animate-card-in">
                <span className="mb-4 text-[4rem] opacity-50">📋</span>
                <h3 className="mb-2 text-[1.2rem] font-semibold text-ink-2">
                  ยังไม่มีออเดอร์
                </h3>
                <p className="text-[0.9rem] text-ink-3">
                  ออเดอร์ใหม่จะปรากฏที่นี่โดยอัตโนมัติ
                </p>
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-6 xl:grid-cols-3">
                {filteredOrders.map((order) => {
                  const config = statusConfig[order.status] ?? statusConfig.pending;
                  const isExpanded = expandedOrder === order.id;

                  return (
                    <li
                      key={order.id}
                      className={`flex cursor-pointer animate-card-in flex-col gap-3.5 rounded-lg border border-t-[3px] border-line bg-gradient-card p-5 transition-all duration-200 hover:border-line-light hover:shadow-[var(--shadow-md)] ${config.topBorder}`}
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    >

                      {/* Card Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[1.1rem] font-extrabold text-ink">
                            #{order.id}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.72rem] font-semibold ${config.badgeClass}`}
                          >
                            {config.icon} {config.label}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[0.82rem] text-ink-2">
                            {formatTime(order.createdAt)}
                          </span>
                          <span className="text-[0.72rem] text-ink-3">
                            {getTimeDiff(order.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div className="flex items-center justify-between rounded-md bg-glass px-3.5 py-2.5">
                        <div className="flex items-center gap-3">
                          <span className="text-[0.9rem] font-semibold text-ink">
                            {order.isMember ? "⭐ " : ""}
                            {order.customerName}
                          </span>
                          {order.tableNumber !== "-" && (
                            <span className="rounded-full bg-orange/10 px-2.5 py-0.5 text-[0.78rem] font-medium text-orange">
                              📍 โต๊ะ {order.tableNumber}
                            </span>
                          )}
                        </div>
                        <span className="text-[1.05rem] font-extrabold text-orange">
                          ฿{order.totalAmount?.toLocaleString()}
                        </span>
                      </div>

                      {/* Progress Summary */}
                      <div className="flex items-center justify-between rounded-md bg-glass/50 px-2.5 py-1.5 text-[0.76rem] text-ink-2">
                        <span>
                          เสิร์ฟแล้ว {order.servedCount || 0}/{order.items?.length || 0} จาน
                        </span>
                        <div className="flex flex-wrap items-center justify-end gap-2">
                          {order.readyCount > 0 && (
                            <span className="font-bold text-green">
                              ⭐ พร้อมเสิร์ฟ {order.readyCount}
                            </span>
                          )}
                          {order.cookingCount > 0 && (
                            <span className="text-blue">
                              🔥 กำลังปรุง {order.cookingCount}
                            </span>
                          )}
                          {order.pendingCount > 0 && (
                            <span className="text-amber">
                              ⏳ รอคิว {order.pendingCount}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Items List with per-item status & serve button */}
                      <div className="flex flex-col gap-1.5">
                        {order.items
                          .slice(0, isExpanded ? order.items.length : 5)
                          .map((item, idx) => {
                            const isReady   = item.kitchen_status === "READY";
                            const isCooking = item.kitchen_status === "COOKING";
                            const isServed  = item.kitchen_status === "SERVED";
                            const isPending = item.kitchen_status === "PENDING";

                            return (
                              <div
                                key={item.order_item_id || idx}
                                className={`flex items-center gap-2.5 ${
                                  isReady
                                    ? "rounded-md border border-green/35 bg-green/[0.06] px-2.5 py-2"
                                    : "py-1.5"
                                } ${isServed ? "opacity-60" : ""}`}
                              >
                                <span className="w-7 shrink-0 text-center text-[1.2rem]">
                                  {item.image}
                                </span>
                                <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                                  <div className="flex items-center justify-between gap-2">
                                    <span
                                      className={`flex-1 text-[0.85rem] text-ink-2 ${
                                        isServed ? "line-through" : ""
                                      }`}
                                    >
                                      {item.name}
                                    </span>
                                    <span className="rounded-full bg-amber/10 px-2.5 py-0.5 text-[0.78rem] font-bold text-amber">
                                      x{item.quantity}
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    {item.station_code && (
                                      <span className="rounded border border-line bg-glass px-1.5 py-px text-[0.65rem] font-bold uppercase text-ink-3">
                                        {item.station_code}
                                      </span>
                                    )}
                                    {isReady && (
                                      <span className="animate-[pulse_2s_infinite] rounded-full border border-green bg-green/20 px-2 py-0.5 text-[0.72rem] font-bold text-green">
                                        ⭐ เชฟปรุงเสร็จ พร้อมเสิร์ฟ!
                                      </span>
                                    )}
                                    {isCooking && (
                                      <span className="rounded-full border border-blue/30 bg-blue/15 px-2 py-0.5 text-[0.72rem] font-semibold text-blue">
                                        🔥 กำลังปรุง
                                      </span>
                                    )}
                                    {isPending && (
                                      <span className="rounded-full border border-amber/25 bg-amber/10 px-2 py-0.5 text-[0.72rem] font-medium text-amber">
                                        ⏳ รอคิวปรุง
                                      </span>
                                    )}
                                    {isServed && (
                                      <span className="rounded-full bg-purple/10 px-2 py-0.5 text-[0.72rem] font-medium text-purple">
                                        ✅ เสิร์ฟแล้ว
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* ปุ่มเสิร์ฟเฉพาะจานนี้ */}
                                {isReady && (
                                  <button
                                    type="button"
                                    className={`shrink-0 cursor-pointer whitespace-nowrap rounded-md bg-green px-3 py-1.5 text-[0.78rem] font-bold text-[#0a0a0f] shadow-[0_2px_6px_rgba(45,212,168,0.3)] transition hover:-translate-y-px hover:brightness-110 ${FOCUS}`}
                                    onClick={(e) =>
                                      handleServeItem(order.order_id, item.order_item_id, e)
                                    }
                                    title="เสิร์ฟจานนี้ให้ลูกค้าทันที"
                                  >
                                    🍽️ เสิร์ฟ
                                  </button>
                                )}
                              </div>
                            );
                          })}

                        {!isExpanded && order.items.length > 5 && (
                          <div className="flex items-center justify-center gap-1 py-1 text-[0.8rem] italic text-ink-3">
                            <Icon name="chevronDown" className="size-3.5" />
                            +{order.items.length - 5} รายการเพิ่มเติม (คลิกเพื่อดูทั้งหมด)
                          </div>
                        )}
                      </div>

                      {/* Note */}
                      {order.note && (
                        <div className="rounded-md border border-amber/10 bg-amber/[0.06] px-3.5 py-2.5 text-[0.82rem] text-amber">
                          📝 {order.note}
                        </div>
                      )}

                      {/* Actions */}
                      <div
                        className="flex gap-2.5 border-t border-line pt-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* ปุ่มเสิร์ฟรายการที่พร้อมทั้งหมด */}
                        {order.readyCount > 0 && (
                          <button
                            type="button"
                            className={`flex-1 rounded-md bg-gradient-primary px-4 py-2.5 text-[0.85rem] font-bold text-white transition hover:-translate-y-px hover:shadow-[var(--shadow-glow-orange)] ${FOCUS}`}
                            onClick={(e) => handleServeReady(order.order_id, e)}
                          >
                            ⭐ เสิร์ฟเฉพาะรายการที่พร้อม ({order.readyCount} จาน)
                          </button>
                        )}

                        {/* ป้ายแจ้งเตือนเมื่อกำลังทำและไม่มีรายการพร้อม */}
                        {order.readyCount === 0 && (order.cookingCount > 0 || order.pendingCount > 0) && (
                          <div className="w-full rounded-md border border-blue/25 bg-blue/10 px-3 py-2 text-center text-[0.8rem] font-semibold text-blue">
                            <span>⏳ ครัวกำลังดำเนินการ ({order.cookingCount} ปรุง, {order.pendingCount} รอคิว)</span>
                          </div>
                        )}

                        {/* ป้ายเมื่อเสิร์ฟครบทุกรายการแล้ว */}
                        {order.items.length > 0 && order.servedCount === order.items.length && (
                          <div className="w-full rounded-md border border-purple/30 bg-purple/10 px-3 py-2 text-center text-[0.82rem] font-bold text-purple">
                            <span>✅ เสิร์ฟครบทุกรายการแล้ว ({order.servedCount}/{order.items.length})</span>
                          </div>
                        )}

                        {/* ปุ่มยกเลิกเมื่อยังไม่มีรายการใดเริ่มทำ */}
                        {order.status === "pending" && order.servedCount === 0 && order.readyCount === 0 && order.cookingCount === 0 && (
                          <button
                            type="button"
                            className={`rounded-md border border-red/20 bg-red/10 px-4 py-2.5 text-[0.85rem] font-semibold text-red transition hover:bg-red/20 ${FOCUS}`}
                            onClick={() => handleStatusChange(order.order_id, "cancelled")}
                          >
                            ยกเลิกออเดอร์
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: จัดการคิวลูกค้าจาก QR Code (QUEUE VIEW)                 */}
        {/* ============================================================== */}
        {activeNav === "queue" && (
          <div className="animate-fade-quick">
            {/* ── Queue Stat Cards (Minimalist connected grid) ── */}
            <div className="grid grid-cols-2 gap-px p-4 animate-rise md:grid-cols-4 md:p-6">
              <div className="col-span-2 grid grid-cols-2 overflow-hidden rounded-lg border border-line md:col-span-4 md:grid-cols-4">
                {queueStatCards.map((s, i) => (
                  <div
                    key={s.key}
                    className={`flex flex-col gap-1.5 px-5 py-5 transition-colors hover:bg-glass ${
                      i !== queueStatCards.length - 1 ? "border-r border-line" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${s.dotClass}`} />
                      <span className="text-xs font-medium text-ink-3">{s.label}</span>
                    </div>
                    <span className="text-[2rem] font-bold leading-none tracking-tight text-ink">
                      {s.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Active Calling Alert Banner ── */}
            {queueCounts.called > 0 && (
              <div className="mx-4 mb-4 flex animate-pop items-center justify-between gap-4 rounded-md border border-blue bg-blue/10 px-5 py-3.5 md:mx-6 max-sm:flex-col max-sm:items-start">
                <div className="flex items-center gap-2.5">
                  <span className="text-[1.4rem]">📢🔔</span>
                  <div>
                    <strong className="text-blue block text-sm">
                      มี {queueCounts.called} คิวที่กำลังเรียกอยู่!
                    </strong>
                    <div className="text-[0.8rem] text-ink-2">
                      กรุณาเตรียมโต๊ะและรอต้อนรับลูกค้าที่เคาน์เตอร์หน้าร้าน
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className={`shrink-0 rounded-md bg-blue px-4 py-2 text-[0.85rem] font-bold text-white transition hover:brightness-110 ${FOCUS}`}
                  onClick={() => setFilterQueueStatus("called")}
                >
                  ดูคิวที่กำลังเรียก
                </button>
              </div>
            )}

            {/* ── Filter Tabs for Queue ── */}
            <div
              className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line px-4 md:px-6"
              role="tablist"
              aria-label="กรองสถานะคิว"
            >
              {queueFilterOptions.map((f) => {
                const active = filterQueueStatus === f.key;
                const count =
                  f.key === "all" ? queueCounts.all : queueCounts[f.key] ?? 0;

                return (
                  <button
                    key={f.key}
                    role="tab"
                    aria-selected={active}
                    className={`-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors duration-150 ${FOCUS} ${
                      active
                        ? "border-orange text-ink font-semibold"
                        : "border-transparent text-ink-3 hover:text-ink"
                    }`}
                    onClick={() => setFilterQueueStatus(f.key)}
                  >
                    <span>{f.label}</span>
                    {count > 0 && (
                      <span
                        className={`rounded-full px-2 py-px text-[0.72rem] font-bold ${
                          active
                            ? "bg-orange/20 text-orange"
                            : "bg-glass text-ink-3"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Queue Cards Grid ── */}
            {filteredQueues.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-5 py-20 text-center animate-card-in">
                <span className="mb-4 text-[4rem] opacity-50">🎟️</span>
                <h3 className="mb-2 text-[1.2rem] font-semibold text-ink-2">
                  ไม่พบคิวในสถานะนี้
                </h3>
                <p className="text-[0.9rem] text-ink-3 mb-5">
                  ลูกค้าสามารถสแกน QR Code หน้าร้านเพื่อรับบัตรคิว หรือกดออกบัตรคิวให้ลูกค้าได้
                </p>
                <button
                  className={`rounded-md bg-orange px-4 py-2 text-sm font-bold text-[#0a0a0f] hover:brightness-110 ${FOCUS}`}
                  onClick={() => setShowAddQueueModal(true)}
                >
                  + ออกบัตรคิวใหม่หน้าร้าน
                </button>
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-6 xl:grid-cols-3">
                {filteredQueues.map((item) => {
                  const config =
                    queueStatusConfig[item.status] ?? queueStatusConfig.waiting;
                  const isWaiting = item.status === "waiting";
                  const isCalled = item.status === "called";
                  const isSeated = item.status === "seated";
                  const isCancelled = item.status === "cancelled";

                  return (
                    <li
                      key={item.id}
                      className={`flex animate-card-in flex-col gap-3.5 rounded-lg border border-t-[3px] border-line bg-gradient-card p-5 transition-all duration-200 hover:border-line-light hover:shadow-[var(--shadow-md)] ${config.topBorder}`}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[1.35rem] font-extrabold text-ink tracking-tight">
                            {item.id}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.72rem] font-semibold ${config.badgeClass}`}
                          >
                            {config.icon} {config.label}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[0.82rem] text-ink-2">
                            จองเวลา {item.time} น.
                          </span>
                          <span className="text-[0.72rem] text-ink-3">
                            {getTimeDiff(item.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Customer Details Box */}
                      <div className="flex flex-col gap-2 rounded-md bg-glass px-3.5 py-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[0.95rem] font-bold text-ink truncate">
                            👤 {item.customerName}
                          </span>
                          <span className="rounded-full bg-orange/10 px-2.5 py-0.5 text-[0.78rem] font-semibold text-orange shrink-0">
                            👥 {item.partySize} ท่าน
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-ink-3 pt-1 border-t border-line/40">
                          <span className="flex items-center gap-1">
                            <Icon name="phone" className="size-3.5" />
                            {item.phone}
                          </span>
                          <span className="rounded border border-line bg-glass px-2 py-0.5 text-[0.7rem] font-medium text-ink-2">
                            {item.tableType}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[0.75rem] text-ink-3">
                          <span className="text-orange/80">📱 {item.source}</span>
                          {item.tableNumber && (
                            <span className="font-bold text-green">
                              📍 นั่งโต๊ะ {item.tableNumber}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Note (if any) */}
                      {item.note && item.note !== "-" && (
                        <div className="rounded-md border border-amber/15 bg-amber/[0.06] px-3.5 py-2 text-[0.82rem] text-amber">
                          📝 {item.note}
                        </div>
                      )}

                      {/* Actions row */}
                      <div className="flex gap-2 border-t border-line pt-3 mt-auto">
                        {isWaiting && (
                          <>
                            <button
                              type="button"
                              className={`flex-1 flex items-center justify-center gap-1.5 rounded-md bg-blue px-3 py-2 text-xs font-bold text-white transition hover:brightness-110 ${FOCUS}`}
                              onClick={() => handleCallQueue(item.id)}
                            >
                              <Icon name="bell" className="size-3.5" />
                              เรียกคิว
                            </button>

                            <button
                              type="button"
                              className={`flex-1 flex items-center justify-center gap-1.5 rounded-md bg-green px-3 py-2 text-xs font-bold text-[#0a0a0f] transition hover:brightness-110 ${FOCUS}`}
                              onClick={() => {
                                setSelectedQueueForTable(item);
                                setSelectedTableNumber("1");
                              }}
                            >
                              📍 จัดโต๊ะ
                            </button>

                            <button
                              type="button"
                              className={`rounded-md border border-line px-2.5 py-2 text-xs font-medium text-ink-3 hover:text-red hover:bg-red/10 ${FOCUS}`}
                              onClick={() => handleCancelQueue(item.id)}
                              title="สละสิทธิ์ / ข้ามคิว"
                            >
                              สละสิทธิ์
                            </button>
                          </>
                        )}

                        {isCalled && (
                          <>
                            <button
                              type="button"
                              className={`flex-[1.5] flex items-center justify-center gap-1.5 rounded-md bg-green px-3 py-2 text-xs font-bold text-[#0a0a0f] shadow-md transition hover:brightness-110 ${FOCUS}`}
                              onClick={() => {
                                setSelectedQueueForTable(item);
                                setSelectedTableNumber("1");
                              }}
                            >
                              ✅ ยืนยันเข้าโต๊ะ
                            </button>

                            <button
                              type="button"
                              className={`flex-1 flex items-center justify-center gap-1 rounded-md border border-blue/40 bg-blue/10 px-2.5 py-2 text-xs font-semibold text-blue hover:bg-blue/20 ${FOCUS}`}
                              onClick={() => handleCallQueue(item.id)}
                            >
                              📢 เรียกซ้ำ
                            </button>

                            <button
                              type="button"
                              className={`rounded-md border border-line px-2.5 py-2 text-xs font-medium text-ink-3 hover:text-red hover:bg-red/10 ${FOCUS}`}
                              onClick={() => handleCancelQueue(item.id)}
                              title="ลูกค้าไม่มา / สละสิทธิ์"
                            >
                              ไม่มา
                            </button>
                          </>
                        )}

                        {isSeated && (
                          <div className="w-full rounded-md border border-green/30 bg-green/10 px-3 py-2 text-center text-xs font-bold text-green flex items-center justify-center gap-1.5">
                            <span>✓ เข้าทานที่โต๊ะ {item.tableNumber} เรียบร้อยแล้ว</span>
                          </div>
                        )}

                        {isCancelled && (
                          <div className="flex w-full items-center justify-between gap-2">
                            <span className="text-xs text-ink-3 italic">
                              สละสิทธิ์ / คิวถูกยกเลิก
                            </span>
                            <button
                              type="button"
                              className={`rounded-md border border-line bg-glass px-3 py-1.5 text-xs font-medium text-ink-2 hover:bg-glass-strong hover:text-ink ${FOCUS}`}
                              onClick={() => handleRestoreQueue(item.id)}
                            >
                              🔄 กู้คืนคิว
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </main>

      {/* ── Modal 1: จัดโต๊ะสำหรับคิว (Assign Table Modal) ── */}
      {selectedQueueForTable && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-quick"
          onClick={() => setSelectedQueueForTable(null)}
        >
          <div
            className="w-full max-w-sm rounded-xl border border-line bg-panel p-6 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-ink">
                  📍 จัดโต๊ะให้คิว {selectedQueueForTable.id}
                </h3>
                <p className="text-xs text-ink-3 mt-0.5">
                  ลูกค้า: {selectedQueueForTable.customerName} ({selectedQueueForTable.partySize} ท่าน)
                </p>
              </div>
              <button
                className="text-ink-3 hover:text-ink text-base"
                onClick={() => setSelectedQueueForTable(null)}
              >
                ✕
              </button>
            </div>

            <p className="mb-3 text-xs font-semibold text-ink-2">
              เลือกหมายเลขโต๊ะที่พร้อมให้บริการ:
            </p>

            {/* Grid โต๊ะ 1 - 10 */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`flex h-11 items-center justify-center rounded-lg border font-bold text-sm transition ${
                    selectedTableNumber === String(num)
                      ? "border-orange bg-orange text-[#0a0a0f]"
                      : "border-line bg-glass text-ink hover:border-orange/50"
                  }`}
                  onClick={() => setSelectedTableNumber(String(num))}
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="หรือระบุเลขโต๊ะอื่นๆ"
                value={selectedTableNumber}
                onChange={(e) => setSelectedTableNumber(e.target.value)}
                className="flex-1 rounded-md border border-line bg-glass px-3 py-2 text-sm text-ink placeholder:text-ink-3 focus:border-orange focus:outline-none"
              />
              <button
                type="button"
                className={`rounded-md bg-orange px-4 py-2 text-sm font-bold text-[#0a0a0f] hover:brightness-110 ${FOCUS}`}
                onClick={() =>
                  handleConfirmAssignTable(
                    selectedQueueForTable.id,
                    selectedTableNumber
                  )
                }
              >
                ยืนยันนั่งโต๊ะ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal 2: ออกบัตรคิวหน้าร้าน Walk-in (Add Queue Modal) ── */}
      {showAddQueueModal && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-quick"
          onClick={() => setShowAddQueueModal(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-line bg-panel p-6 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-ink">
                  🎟️ ออกบัตรคิวหน้าร้าน (Walk-in)
                </h3>
                <p className="text-xs text-ink-3 mt-0.5">
                  สำหรับลูกค้าหน้าร้านที่ไม่ได้สแกน QR Code ด้วยตนเอง
                </p>
              </div>
              <button
                className="text-ink-3 hover:text-ink text-base"
                onClick={() => setShowAddQueueModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddManualQueue} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink-2 mb-1">
                  ชื่อลูกค้า *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น คุณสมชาย"
                  value={newQueueForm.customerName}
                  onChange={(e) =>
                    setNewQueueForm({ ...newQueueForm, customerName: e.target.value })
                  }
                  className="w-full rounded-md border border-line bg-glass px-3.5 py-2 text-sm text-ink placeholder:text-ink-3 focus:border-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-2 mb-1">
                  เบอร์โทรศัพท์ (ถ้ามี)
                </label>
                <input
                  type="tel"
                  placeholder="เช่น 081-234-5678"
                  value={newQueueForm.phone}
                  onChange={(e) =>
                    setNewQueueForm({ ...newQueueForm, phone: e.target.value })
                  }
                  className="w-full rounded-md border border-line bg-glass px-3.5 py-2 text-sm text-ink placeholder:text-ink-3 focus:border-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-2 mb-1">
                  จำนวนลูกค้า (ท่าน) *
                </label>
                <div className="flex gap-2 mb-2">
                  {[1, 2, 4, 6, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`flex-1 py-1.5 rounded border text-xs font-bold transition ${
                        Number(newQueueForm.partySize) === num
                          ? "border-orange bg-orange text-[#0a0a0f]"
                          : "border-line bg-glass text-ink-2 hover:border-orange/50"
                      }`}
                      onClick={() =>
                        setNewQueueForm({ ...newQueueForm, partySize: num })
                      }
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={newQueueForm.partySize}
                  onChange={(e) =>
                    setNewQueueForm({ ...newQueueForm, partySize: e.target.value })
                  }
                  className="w-full rounded-md border border-line bg-glass px-3.5 py-2 text-sm text-ink focus:border-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-2 mb-1">
                  หมายเหตุเพิ่มเติม (ถ้ามี)
                </label>
                <input
                  type="text"
                  placeholder="เช่น มีเด็กเล็ก, ขอโต๊ะริม"
                  value={newQueueForm.note}
                  onChange={(e) =>
                    setNewQueueForm({ ...newQueueForm, note: e.target.value })
                  }
                  className="w-full rounded-md border border-line bg-glass px-3.5 py-2 text-sm text-ink placeholder:text-ink-3 focus:border-orange focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  className={`flex-1 rounded-md border border-line py-2.5 text-sm font-medium text-ink-2 hover:bg-glass hover:text-ink ${FOCUS}`}
                  onClick={() => setShowAddQueueModal(false)}
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className={`flex-1 rounded-md bg-orange py-2.5 text-sm font-bold text-[#0a0a0f] hover:brightness-110 ${FOCUS}`}
                >
                  ออกบัตรคิว
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
