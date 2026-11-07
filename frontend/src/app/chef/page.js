"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { menuIngredients } from "@/lib/ingredients";
import styles from "./chef.module.css";

// ── helpers ──────────────────────────────────────────────────────────────────
function formatTime(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function elapsedSeconds(startIso) {
  if (!startIso) return 0;
  return Math.floor((Date.now() - new Date(startIso).getTime()) / 1000);
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ── CookingTimer component (live countdown) ───────────────────────────────────
function CookingTimer({ startIso, completedAt }) {
  const [elapsed, setElapsed] = useState(
    completedAt
      ? Math.floor(
          (new Date(completedAt).getTime() - new Date(startIso).getTime()) /
            1000
        )
      : elapsedSeconds(startIso)
  );

  useEffect(() => {
    if (completedAt) return; // frozen
    const id = setInterval(() => setElapsed(elapsedSeconds(startIso)), 1000);
    return () => clearInterval(id);
  }, [startIso, completedAt]);

  return (
    <span className={styles.timerValue}>
      {formatDuration(elapsed)}
    </span>
  );
}

// ── AcceptModal ───────────────────────────────────────────────────────────────
function AcceptModal({ order, onAccept, onClose }) {
  const [chefName, setChefName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = () => {
    if (!chefName.trim()) return;
    onAccept(order.id, chefName.trim());
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <span className={styles.modalIcon}>👨‍🍳</span>
          <h2 className={styles.modalTitle}>รับออเดอร์ #{order.id}</h2>
        </div>

        <div className={styles.modalOrderSummary}>
          {order.items.map((item, i) => (
            <div key={i} className={styles.modalItem}>
              <span className={styles.modalItemName}>{item.name}</span>
              <span className={styles.modalItemQty}>×{item.quantity}</span>
            </div>
          ))}
        </div>

        <div className={styles.modalField}>
          <label className={styles.modalLabel}>ชื่อเชฟ</label>
          <input
            ref={inputRef}
            className={styles.modalInput}
            type="text"
            placeholder="กรอกชื่อของคุณ..."
            value={chefName}
            onChange={(e) => setChefName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
        </div>

        <div className={styles.modalActions}>
          <button
            className={styles.modalBtnPrimary}
            onClick={submit}
            disabled={!chefName.trim()}
          >
            ✅ รับออเดอร์
          </button>
          <button className={styles.modalBtnSecondary} onClick={onClose}>
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}

// ── IngredientsPanel ──────────────────────────────────────────────────────────
function IngredientsPanel({ items }) {
  // Aggregate ingredients across all items in the order
  const allIngredients = items.flatMap((orderItem) => {
    const baseIngredients = menuIngredients[orderItem.id];
    if (!baseIngredients) return [];
    return baseIngredients.map((ing) => ({
      ...ing,
      amount: ing.amount * orderItem.quantity,
      dish: orderItem.name,
    }));
  });

  return (
    <div className={styles.ingredientsPanel}>
      <h4 className={styles.ingredientsTitle}>🧂 วัตถุดิบที่ต้องใช้</h4>
      {allIngredients.length === 0 ? (
        <p className={styles.noIngredients}>ไม่มีข้อมูลวัตถุดิบ</p>
      ) : (
        <div className={styles.ingredientList}>
          {allIngredients.map((ing, i) => (
            <div key={i} className={styles.ingredientRow}>
              <span className={styles.ingredientDish}>{ing.dish}</span>
              <span className={styles.ingredientName}>{ing.name}</span>
              <span className={styles.ingredientAmount}>
                {ing.amount} {ing.unit}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── OrderCard ─────────────────────────────────────────────────────────────────
function OrderCard({ order, onAccept, onComplete, expanded, onToggle }) {
  const session = order.chefSession;
  const isCooking = session && session.status === "cooking";
  const isDone = session && session.status === "done";
  const isPending = order.status === "pending";

  return (
    <div
      className={`${styles.card} ${
        isPending
          ? styles.cardPending
          : isCooking
          ? styles.cardCooking
          : styles.cardDone
      }`}
    >
      {/* ── Card Header ─────────────────────────────── */}
      <div className={styles.cardHeader} onClick={onToggle}>
        <div className={styles.cardHeaderLeft}>
          <div className={styles.orderIdRow}>
            <span className={styles.orderId}>#{order.id}</span>
            {isPending && (
              <span className={`${styles.statusBadge} ${styles.badgePending}`}>
                รอรับ
              </span>
            )}
            {isCooking && (
              <span className={`${styles.statusBadge} ${styles.badgeCooking}`}>
                🔥 กำลังทำ
              </span>
            )}
            {isDone && (
              <span className={`${styles.statusBadge} ${styles.badgeDone}`}>
                ✅ เสร็จแล้ว
              </span>
            )}
          </div>

          {order.tableNumber && order.tableNumber !== "-" && (
            <span className={styles.tableLabel}>โต๊ะ {order.tableNumber}</span>
          )}
        </div>

        <div className={styles.cardHeaderRight}>
          {/* Timer */}
          {session && (
            <div className={styles.timerBox}>
              <span className={styles.timerLabel}>เวลาทำ</span>
              <CookingTimer
                startIso={session.acceptedAt}
                completedAt={session.completedAt}
              />
            </div>
          )}
          <span className={styles.expandArrow}>{expanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* ── Chef info (if accepted) ──────────────────── */}
      {session && (
        <div className={styles.chefInfo}>
          <span className={styles.chefIcon}>👨‍🍳</span>
          <span className={styles.chefName}>{session.chefName}</span>
          <span className={styles.chefTime}>
            รับเมื่อ {formatTime(session.acceptedAt)}
          </span>
          {session.completedAt && (
            <span className={styles.chefTime}>
              · เสร็จ {formatTime(session.completedAt)}
            </span>
          )}
        </div>
      )}

      {/* ── Items list ──────────────────────────────── */}
      <div className={styles.itemList}>
        {order.items.map((item, i) => (
          <div key={i} className={styles.itemRow}>
            <span className={styles.itemEmoji}>{item.image || "🍽️"}</span>
            <span className={styles.itemName}>{item.name}</span>
            <span className={styles.itemQty}>×{item.quantity}</span>
          </div>
        ))}
      </div>

      {/* ── Note ────────────────────────────────────── */}
      {order.note && (
        <div className={styles.orderNote}>
          <span className={styles.noteIcon}>📝</span>
          {order.note}
        </div>
      )}

      {/* ── Expandable: ingredients ─────────────────── */}
      {expanded && <IngredientsPanel items={order.items} />}

      {/* ── Actions ─────────────────────────────────── */}
      <div className={styles.cardActions}>
        {isPending && (
          <button
            className={styles.btnAccept}
            onClick={(e) => {
              e.stopPropagation();
              onAccept(order);
            }}
          >
            👨‍🍳 รับทำ
          </button>
        )}

        {isCooking && (
          <button
            className={styles.btnComplete}
            onClick={(e) => {
              e.stopPropagation();
              onComplete(order.id);
            }}
          >
            🔔 ส่งเรียกพนักงาน
          </button>
        )}

        {isDone && (
          <div className={styles.doneMsg}>
            พนักงานรับทราบแล้ว — รอเสิร์ฟ
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ChefPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptingOrder, setAcceptingOrder] = useState(null); // order to confirm
  const [expandedId, setExpandedId] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [tab, setTab] = useState("active"); // 'active' | 'done'

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/chef");
      const data = await res.json();
      setOrders(data.orders || []);
      setLastRefresh(new Date());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const id = setInterval(fetchOrders, 5000);
    return () => clearInterval(id);
  }, [fetchOrders]);

  const handleAccept = async (orderId, chefName) => {
    try {
      await fetch(`/api/chef/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "accept", chefName }),
      });
      setAcceptingOrder(null);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = async (orderId) => {
    try {
      await fetch(`/api/chef/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "complete" }),
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const activeOrders = orders.filter(
    (o) =>
      o.status === "pending" ||
      (o.chefSession && o.chefSession.status === "cooking")
  );

  const doneOrders = orders.filter(
    (o) => o.chefSession && o.chefSession.status === "done"
  );

  const counts = {
    pending: orders.filter((o) => o.status === "pending").length,
    cooking: orders.filter(
      (o) => o.chefSession && o.chefSession.status === "cooking"
    ).length,
    done: doneOrders.length,
  };

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className="spinner" />
        <p>กำลังโหลด...</p>
      </div>
    );
  }

  const displayOrders = tab === "active" ? activeOrders : doneOrders;

  return (
    <div className={styles.page}>
      {/* ── Accept modal ── */}
      {acceptingOrder && (
        <AcceptModal
          order={acceptingOrder}
          onAccept={handleAccept}
          onClose={() => setAcceptingOrder(null)}
        />
      )}

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => router.push("/")}>
            ← กลับ
          </button>
          <div>
            <h1 className={styles.headerTitle}>🍳 ห้องครัว</h1>
            <p className={styles.headerSub}>
              อัพเดทล่าสุด {formatTime(lastRefresh.toISOString())}
            </p>
          </div>
        </div>
        <button className={styles.refreshBtn} onClick={fetchOrders}>
          🔄 รีเฟรช
        </button>
      </header>

      {/* ── Stats bar ── */}
      <div className={styles.statsBar}>
        <div className={`${styles.statItem} ${styles.statWait}`}>
          <span className={styles.statNum}>{counts.pending}</span>
          <span className={styles.statLbl}>รอรับ</span>
        </div>
        <div className={`${styles.statItem} ${styles.statCooking}`}>
          <span className={styles.statNum}>{counts.cooking}</span>
          <span className={styles.statLbl}>กำลังทำ</span>
        </div>
        <div className={`${styles.statItem} ${styles.statDone}`}>
          <span className={styles.statNum}>{counts.done}</span>
          <span className={styles.statLbl}>เสร็จแล้ว</span>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === "active" ? styles.tabActive : ""}`}
          onClick={() => setTab("active")}
          id="tab-active"
        >
          ออเดอร์ที่ต้องทำ
          {activeOrders.length > 0 && (
            <span className={styles.tabBadge}>{activeOrders.length}</span>
          )}
        </button>
        <button
          className={`${styles.tab} ${tab === "done" ? styles.tabActive : ""}`}
          onClick={() => setTab("done")}
          id="tab-done"
        >
          เสร็จแล้ว
          {doneOrders.length > 0 && (
            <span className={styles.tabBadge}>{doneOrders.length}</span>
          )}
        </button>
      </div>

      {/* ── Order list ── */}
      <main className={styles.main}>
        {displayOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>
              {tab === "active" ? "🥳" : "📋"}
            </span>
            <p className={styles.emptyText}>
              {tab === "active"
                ? "ไม่มีออเดอร์ค้างอยู่ — ยอดเยี่ยม!"
                : "ยังไม่มีออเดอร์ที่เสร็จ"}
            </p>
          </div>
        ) : (
          <div className={styles.orderGrid}>
            {displayOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onAccept={setAcceptingOrder}
                onComplete={handleComplete}
                expanded={expandedId === order.id}
                onToggle={() =>
                  setExpandedId(expandedId === order.id ? null : order.id)
                }
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
