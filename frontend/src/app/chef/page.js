"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "./chef.module.css";

function formatTime(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function elapsedSeconds(startIso) {
  if (!startIso) return 0;
  return Math.max(0, Math.floor((Date.now() - new Date(startIso).getTime()) / 1000));
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function LiveTimer({ startIso }) {
  const [elapsed, setElapsed] = useState(elapsedSeconds(startIso));

  useEffect(() => {
    const id = setInterval(() => setElapsed(elapsedSeconds(startIso)), 1000);
    return () => clearInterval(id);
  }, [startIso]);

  return <span>{formatDuration(elapsed)}</span>;
}

export default function ChefKDSPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState("station"); // 'station' | 'expo'
  const [selectedStation, setSelectedStation] = useState("all");
  const [stations, setStations] = useState([]);
  const [items, setItems] = useState([]);
  const [availableChefs, setAvailableChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Modal ดูรายละเอียดวัตถุดิบ (Recipe / Ingredient Modal)
  const [selectedItemForRecipe, setSelectedItemForRecipe] = useState(null);

  // ดึงข้อมูลครัว (KDS) & สเตชั่น
  const fetchKitchenData = useCallback(async () => {
    try {
      const [chefRes, stationRes] = await Promise.all([
        fetch(`/api/chef?station=${selectedStation}`),
        fetch("/api/kitchen/stations"),
      ]);

      const chefData = await chefRes.json();
      const stationData = await stationRes.json();

      setItems(chefData.items || []);
      setStations(stationData.stations || []);
      setAvailableChefs(stationData.available_chefs || []);
      setLastRefresh(new Date());
    } catch (err) {
      console.error("Fetch kitchen data error:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedStation]);

  useEffect(() => {
    fetchKitchenData();
    const timer = setInterval(fetchKitchenData, 4000); // อัปเดตข้อมูลทุก 4 วินาที
    return () => clearInterval(timer);
  }, [fetchKitchenData]);

  // เชฟกดเริ่มปรุงอาหาร (ไม่ต้องกรอกชื่อ)
  const handleStartCooking = async (orderItemId) => {
    try {
      await fetch("/api/chef", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start_cooking", order_item_id: orderItemId }),
      });
      fetchKitchenData();
    } catch (err) {
      console.error(err);
    }
  };

  // เชฟตรวจคุณภาพผ่านแล้ว กดเสิร์ฟเรียกพนักงาน
  const handleQualityPassAndServe = async (orderItemId) => {
    try {
      await fetch("/api/chef", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "pass_quality_and_serve", order_item_id: orderItemId }),
      });
      fetchKitchenData();
    } catch (err) {
      console.error(err);
    }
  };

  // คนคุมออเดอร์ (Expo) เปลี่ยนสเตชั่น
  const handleChangeStation = async (orderItemId, newStationCode) => {
    try {
      await fetch("/api/chef", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "change_station",
          order_item_id: orderItemId,
          station_code: newStationCode,
        }),
      });
      fetchKitchenData();
    } catch (err) {
      console.error(err);
    }
  };

  // มอบหมายเชฟเข้าสเตชั่น (จำกัดไม่เกิน 2 คนต่อสเตชั่น)
  const handleAssignChef = async (staffId, stationCode) => {
    try {
      const res = await fetch("/api/kitchen/stations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "assign", staff_id: staffId, station_code: stationCode }),
      });
      const json = await res.json();
      if (!res.ok) {
        alert(json.error || "ไม่สามารถมอบหมายได้");
      }
      fetchKitchenData();
    } catch (err) {
      console.error(err);
    }
  };

  // สิ้นสุดกะของเชฟ
  const handleEndShift = async (shiftId) => {
    try {
      await fetch("/api/kitchen/stations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "end_shift", shift_id: shiftId }),
      });
      fetchKitchenData();
    } catch (err) {
      console.error(err);
    }
  };

  // กรองตามสเตชั่นที่เลือก
  const currentStationInfo = stations.find((s) => s.station_code === selectedStation);
  const activeChefsAtCurrentStation = currentStationInfo?.chefs || [];

  const counts = {
    pending: items.filter((i) => i.kitchen_status === "PENDING").length,
    cooking: items.filter((i) => i.kitchen_status === "COOKING").length,
    ready: items.filter((i) => i.kitchen_status === "READY").length,
  };

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className="spinner" />
        <p>กำลังเชื่อมต่อระบบครัว KDS...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => router.push("/")}>
            ← กลับ
          </button>
          <div>
            <h1 className={styles.headerTitle}>🍳 ระบบห้องครัว (Kitchen Display System)</h1>
            <p className={styles.headerSub}>
              อัปเดตล่าสุด: {formatTime(lastRefresh.toISOString())} · แสดงข้อมูลเรียลไทม์
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={() => setViewMode("station")}
            className={styles.tab}
            style={{
              background: viewMode === "station" ? "var(--accent-orange)" : "var(--bg-card)",
              color: viewMode === "station" ? "#0a0a0f" : "var(--text-secondary)",
              fontWeight: 600,
            }}
          >
            👨‍🍳 จอประจำสเตชั่นเชฟ
          </button>
          <button
            onClick={() => setViewMode("expo")}
            className={styles.tab}
            style={{
              background: viewMode === "expo" ? "var(--accent-blue)" : "var(--bg-card)",
              color: viewMode === "expo" ? "#fff" : "var(--text-secondary)",
              fontWeight: 600,
            }}
          >
            📋 คนคุมออเดอร์ & จัดการกะ (Expo)
          </button>
          <button className={styles.refreshBtn} onClick={fetchKitchenData}>
            🔄 รีเฟรช
          </button>
        </div>
      </header>

      {/* ── Stats Bar ── */}
      <div className={styles.statsBar}>
        <div className={`${styles.statItem} ${styles.statWait}`}>
          <span className={styles.statNum}>{counts.pending}</span>
          <span className={styles.statLbl}>รอคิวปรุง</span>
        </div>
        <div className={`${styles.statItem} ${styles.statCooking}`}>
          <span className={styles.statNum}>{counts.cooking}</span>
          <span className={styles.statLbl}>กำลังปรุง</span>
        </div>
        <div className={`${styles.statItem} ${styles.statDone}`}>
          <span className={styles.statNum}>{counts.ready}</span>
          <span className={styles.statLbl}>ตรวจคุณภาพผ่าน & รอเสิร์ฟ</span>
        </div>
      </div>

      {/* ── VIEW 1: จอประจำสเตชั่นเชฟ (STATION VIEW) ── */}
      {viewMode === "station" && (
        <>
          {/* Station Selector Tabs */}
          <div className={styles.tabs} style={{ flexWrap: "wrap" }}>
            <button
              className={`${styles.tab} ${selectedStation === "all" ? styles.tabActive : ""}`}
              onClick={() => setSelectedStation("all")}
            >
              📋 ทุกสเตชั่น
              {items.length > 0 && <span className={styles.tabBadge}>{items.length}</span>}
            </button>
            {stations.map((st) => (
              <button
                key={st.station_code}
                className={`${styles.tab} ${selectedStation === st.station_code ? styles.tabActive : ""}`}
                onClick={() => setSelectedStation(st.station_code)}
              >
                <span>{st.icon}</span>
                <span>{st.name.split(" ")[0]}</span>
                {st.pending_count + st.cooking_count > 0 && (
                  <span className={styles.tabBadge}>{st.pending_count + st.cooking_count}</span>
                )}
              </button>
            ))}
          </div>

          {/* Station Staff Info Bar */}
          {selectedStation !== "all" && currentStationInfo && (
            <div
              style={{
                padding: "0.6rem 1.5rem",
                background: "var(--bg-secondary)",
                borderBottom: "1px solid var(--border-subtle)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.85rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "1.2rem" }}>{currentStationInfo.icon}</span>
                <strong>{currentStationInfo.name}</strong>
                <span style={{ color: "var(--text-muted)" }}>— {currentStationInfo.description}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span>
                  👨‍🍳 <strong>เชฟประจำสเตชั่น ({activeChefsAtCurrentStation.length}/2 คน):</strong>{" "}
                  {activeChefsAtCurrentStation.length > 0
                    ? activeChefsAtCurrentStation
                        .map(
                          (c) =>
                            `${c.name} (เริ่ม ${formatTime(c.started_at)} · ประจำการ ${c.duration_minutes} นาที)`
                        )
                        .join(", ")
                    : "ยังไม่มีเชฟประจำการ"}
                </span>
              </div>
            </div>
          )}

          {/* Main Kitchen Display Grid */}
          <main className={styles.main}>
            {items.length === 0 ? (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>🎉</span>
                <p className={styles.emptyText}>
                  {selectedStation === "all"
                    ? "ไม่มีอาหารค้างในครัว — ยอดเยี่ยมมาก!"
                    : `สเตชั่นนี้ไม่มีออเดอร์ค้างอยู่`}
                </p>
              </div>
            ) : (
              <div className={styles.orderGrid}>
                {items.map((item) => {
                  const isCooking = item.kitchen_status === "COOKING";
                  const isReady = item.kitchen_status === "READY";
                  const isPending = item.kitchen_status === "PENDING";

                  return (
                    <div
                      key={item.order_item_id}
                      className={`${styles.card} ${
                        isPending
                          ? styles.cardPending
                          : isCooking
                          ? styles.cardCooking
                          : styles.cardDone
                      }`}
                    >
                      {/* Card Header */}
                      <div className={styles.cardHeader}>
                        <div className={styles.cardHeaderLeft}>
                          <div className={styles.orderIdRow}>
                            <span className={styles.orderId}>โต๊ะ {item.table_number}</span>
                            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                              #{item.short_id}
                            </span>
                            {isPending && (
                              <span className={`${styles.statusBadge} ${styles.badgePending}`}>
                                รอคิว
                              </span>
                            )}
                            {isCooking && (
                              <span className={`${styles.statusBadge} ${styles.badgeCooking}`}>
                                🔥 กำลังปรุง
                              </span>
                            )}
                            {isReady && (
                              <span className={`${styles.statusBadge} ${styles.badgeDone}`}>
                                ⭐ ตรวจคุณภาพแล้ว (พร้อมเสิร์ฟ)
                              </span>
                            )}
                          </div>
                        </div>

                        <div className={styles.cardHeaderRight}>
                          <div className={styles.timerBox}>
                            <span className={styles.timerLabel}>รอมาแล้ว</span>
                            <LiveTimer startIso={item.created_at} />
                          </div>
                        </div>
                      </div>

                      {/* Item Details */}
                      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ fontSize: "2rem" }}>{item.image_url}</span>
                            <div>
                              <div style={{ fontSize: "1.15rem", fontWeight: 700 }}>
                                {item.menu_name}
                              </div>
                              <span
                                style={{
                                  fontSize: "0.75rem",
                                  padding: "0.1rem 0.5rem",
                                  borderRadius: "9999px",
                                  background: "rgba(255, 107, 53, 0.15)",
                                  color: "var(--accent-orange)",
                                  fontWeight: 600,
                                }}
                              >
                                {item.station_code}
                              </span>
                            </div>
                          </div>
                          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent-orange)" }}>
                            x{item.quantity}
                          </div>
                        </div>

                        {item.order_note && (
                          <div className={styles.orderNote} style={{ marginTop: "0.25rem" }}>
                            <span className={styles.noteIcon}>📝</span>
                            <strong>หมายเหตุ:</strong> {item.order_note}
                          </div>
                        )}
                      </div>

                      {/* Card Actions */}
                      <div
                        style={{
                          padding: "0.75rem 1rem",
                          borderTop: "1px solid var(--border-subtle)",
                          display: "flex",
                          gap: "8px",
                          background: "var(--bg-secondary)",
                        }}
                      >
                        {/* ปุ่มดูวัตถุดิบ & สูตร */}
                        <button
                          type="button"
                          className={styles.refreshBtn}
                          style={{
                            flex: 1,
                            background: "var(--bg-glass)",
                            border: "1px solid var(--border-subtle)",
                            color: "var(--text-primary)",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                          }}
                          onClick={() => setSelectedItemForRecipe(item)}
                        >
                          🔍 ดูวัตถุดิบ & สูตร
                        </button>

                        {/* ปุ่มเริ่มปรุงอาหาร */}
                        {isPending && (
                          <button
                            type="button"
                            className={styles.btnAccept}
                            style={{ flex: 1.2 }}
                            onClick={() => handleStartCooking(item.order_item_id)}
                          >
                            🔥 เริ่มปรุง
                          </button>
                        )}

                        {/* ปุ่มตรวจคุณภาพผ่าน & เรียกเสิร์ฟ */}
                        {isCooking && (
                          <button
                            type="button"
                            className={styles.btnComplete}
                            style={{ flex: 1.4 }}
                            onClick={() => handleQualityPassAndServe(item.order_item_id)}
                          >
                            ⭐ ผ่านตรวจ & เรียกเสิร์ฟ
                          </button>
                        )}

                        {isReady && (
                          <div className={styles.doneMsg} style={{ flex: 1.2, textAlign: "center" }}>
                            🔔 เรียกพนักงานแล้ว
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </>
      )}

      {/* ── VIEW 2: คนคุมออเดอร์ & จัดการกะ (EXPO DISPATCHER) ── */}
      {viewMode === "expo" && (
        <main className={styles.main}>
          {/* Section 1: การจัดการกะเชฟประจำสเตชั่น (จำกัดไม่เกิน 2 คนต่อสเตชั่น) */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              👥 จัดการกะเชฟประจำสเตชั่น (จำกัดไม่เกิน 2 คนต่อสเตชั่น)
            </h2>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
              คนคุมครัว (Expo) สามารถจัดเชฟเข้าสเตชั่นตามกะเวลาทำงาน
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              {stations.map((st) => (
                <div
                  key={st.station_code}
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-md)",
                    padding: "1rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <strong>{st.icon} {st.name.split(" ")[0]}</strong>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "9999px",
                        background: st.chef_count >= 2 ? "rgba(255, 71, 87, 0.15)" : "rgba(45, 212, 168, 0.15)",
                        color: st.chef_count >= 2 ? "var(--accent-red)" : "var(--accent-green)",
                        fontWeight: 700,
                      }}
                    >
                      {st.chef_count}/2 คน
                    </span>
                  </div>

                  {/* เชฟที่ประจำการอยู่ */}
                  <div style={{ minHeight: "60px", marginBottom: "0.75rem" }}>
                    {st.chefs?.length > 0 ? (
                      st.chefs.map((c) => (
                        <div
                          key={c.staff_id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "0.8rem",
                            padding: "0.3rem 0",
                            borderBottom: "1px dashed var(--border-subtle)",
                          }}
                        >
                          <div>
                            <div><strong>{c.name}</strong></div>
                            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                              เริ่ม {formatTime(c.started_at)} ({c.duration_minutes} นาที)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleEndShift(c.staff_id)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--accent-red)",
                              fontSize: "0.75rem",
                              cursor: "pointer",
                            }}
                          >
                            ออกกะ
                          </button>
                        </div>
                      ))
                    ) : (
                      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "0.5rem 0" }}>
                        ว่าง — ยังไม่มีเชฟ
                      </p>
                    )}
                  </div>

                  {/* มอบหมายเชฟใหม่ (ถ้ายังไม่เต็ม 2 คน) */}
                  {!st.is_full && availableChefs.length > 0 ? (
                    <div style={{ display: "flex", gap: "6px" }}>
                      <select
                        id={`assign-select-${st.station_code}`}
                        style={{
                          flex: 1,
                          fontSize: "0.8rem",
                          background: "var(--bg-card)",
                          border: "1px solid var(--border-subtle)",
                          borderRadius: "4px",
                          color: "var(--text-primary)",
                          padding: "0.3rem",
                        }}
                      >
                        {availableChefs.map((ch) => (
                          <option key={ch.staff_id} value={ch.staff_id}>
                            {ch.name} ({ch.role})
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          const val = document.getElementById(`assign-select-${st.station_code}`)?.value;
                          if (val) handleAssignChef(val, st.station_code);
                        }}
                        style={{
                          background: "var(--accent-orange)",
                          border: "none",
                          color: "#0a0a0f",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          borderRadius: "4px",
                          padding: "0.3rem 0.6rem",
                          cursor: "pointer",
                        }}
                      >
                        + เข้ากะ
                      </button>
                    </div>
                  ) : (
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
                      {st.is_full ? "ครบ 2 คนแล้ว" : "ไม่มีเชฟที่ว่าง"}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: คุมการส่งออเดอร์ & เปลี่ยนสเตชั่น (Dispatch & Routing) */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "1.25rem",
            }}
          >
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              🚀 คุมการรันออเดอร์อาหาร & กำหนดสเตชั่น
            </h2>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
              คนคุมออเดอร์สามารถตรวจดูอาหารที่เข้ามา และเปลี่ยนสเตชั่นที่รับผิดชอบได้ทันที
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)", textAlign: "left" }}>
                    <th style={{ padding: "0.6rem" }}>โต๊ะ</th>
                    <th style={{ padding: "0.6rem" }}>ออเดอร์</th>
                    <th style={{ padding: "0.6rem" }}>รายการอาหาร</th>
                    <th style={{ padding: "0.6rem" }}>จำนวน</th>
                    <th style={{ padding: "0.6rem" }}>สถานะ</th>
                    <th style={{ padding: "0.6rem" }}>สเตชั่นที่รับผิดชอบ</th>
                    <th style={{ padding: "0.6rem" }}>ปรับเปลี่ยนสเตชั่น</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.order_item_id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                      <td style={{ padding: "0.6rem", fontWeight: 700 }}>โต๊ะ {it.table_number}</td>
                      <td style={{ padding: "0.6rem", color: "var(--text-muted)" }}>#{it.short_id}</td>
                      <td style={{ padding: "0.6rem" }}>
                        <span style={{ marginRight: "6px" }}>{it.image_url}</span>
                        <strong>{it.menu_name}</strong>
                        {it.order_note && (
                          <div style={{ fontSize: "0.75rem", color: "var(--accent-orange)" }}>
                            📝 {it.order_note}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "0.6rem", fontWeight: 700 }}>x{it.quantity}</td>
                      <td style={{ padding: "0.6rem" }}>
                        <span
                          className={`${styles.statusBadge} ${
                            it.kitchen_status === "PENDING"
                              ? styles.badgePending
                              : it.kitchen_status === "COOKING"
                              ? styles.badgeCooking
                              : styles.badgeDone
                          }`}
                        >
                          {it.kitchen_status}
                        </span>
                      </td>
                      <td style={{ padding: "0.6rem" }}>
                        <strong>{it.station_code}</strong>
                      </td>
                      <td style={{ padding: "0.6rem" }}>
                        <select
                          value={it.station_code}
                          onChange={(e) => handleChangeStation(it.order_item_id, e.target.value)}
                          style={{
                            background: "var(--bg-glass)",
                            border: "1px solid var(--border-subtle)",
                            borderRadius: "4px",
                            color: "var(--text-primary)",
                            padding: "0.3rem",
                            fontSize: "0.8rem",
                          }}
                        >
                          {stations.map((st) => (
                            <option key={st.station_code} value={st.station_code}>
                              {st.icon} {st.name.split(" ")[0]} ({st.station_code})
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* ── Modal ดูสูตร & รายละเอียดวัตถุดิบ ── */}
      {selectedItemForRecipe && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedItemForRecipe(null)}
        >
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()} style={{ maxWidth: "460px" }}>
            <div className={styles.modalHeader}>
              <span className={styles.modalIcon}>{selectedItemForRecipe.image_url}</span>
              <h2 className={styles.modalTitle}>
                {selectedItemForRecipe.menu_name} (x{selectedItemForRecipe.quantity} จาน)
              </h2>
              <button
                className={styles.modalClose}
                onClick={() => setSelectedItemForRecipe(null)}
                style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--text-muted)", fontSize: "1.2rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: "1.25rem" }}>
              <div style={{ marginBottom: "1rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                📍 โต๊ะ {selectedItemForRecipe.table_number} · สเตชั่น {selectedItemForRecipe.station_code}
                {selectedItemForRecipe.order_note && (
                  <div style={{ marginTop: "0.4rem", color: "var(--accent-orange)", fontWeight: 600 }}>
                    📝 หมายเหตุลูกค้า: {selectedItemForRecipe.order_note}
                  </div>
                )}
              </div>

              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.6rem" }}>
                🧂 รายการวัตถุดิบที่ต้องใช้ (คำนวณตาม {selectedItemForRecipe.quantity} จาน):
              </h4>

              {selectedItemForRecipe.ingredients?.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {selectedItemForRecipe.ingredients.map((ing, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.4rem 0.6rem",
                        background: "var(--bg-glass)",
                        borderRadius: "6px",
                        fontSize: "0.85rem",
                      }}
                    >
                      <span>{ing.name}</span>
                      <strong style={{ color: "var(--accent-orange)" }}>
                        {ing.amount} {ing.unit}
                      </strong>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  ไม่มีข้อมูลสูตรวัตถุดิบเจาะจงสำหรับเมนูนี้ ปรุงตามสูตรมาตรฐานของร้าน
                </p>
              )}
            </div>

            <div className={styles.modalActions} style={{ padding: "1rem 1.25rem" }}>
              <button
                type="button"
                className={styles.modalBtnPrimary}
                onClick={() => setSelectedItemForRecipe(null)}
              >
                รับทราบสูตรแล้ว
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
