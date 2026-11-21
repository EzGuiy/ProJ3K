"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

/* ── Shared Design Constants (mirrors staff/page.js & order/page.js) ── */
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";

const ICONS = {
  back: "M15 5l-7 7 7 7",
  refresh:
    "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  close: "M6 6l12 12M18 6L6 18",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  search: "M21 21l-4.3-4.3M17 11a6 6 0 11-12 0 6 6 0 0112 0z",
  fire: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
  check: "M5 12.5l4.5 4.5L19 7",
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

/* ── Helpers ── */
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

/* ── Status Badge Component ── */
function KitchenStatusBadge({ status }) {
  if (status === "PENDING") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber/15 px-2.5 py-0.5 text-[0.72rem] font-semibold text-amber">
        ⏳ รอคิวปรุง
      </span>
    );
  }
  if (status === "COOKING") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-orange/15 px-2.5 py-0.5 text-[0.72rem] font-semibold text-orange">
        🔥 กำลังปรุง
      </span>
    );
  }
  if (status === "READY") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green/15 px-2.5 py-0.5 text-[0.72rem] font-semibold text-green">
        ⭐ ตรวจคุณภาพแล้ว (พร้อมเสิร์ฟ)
      </span>
    );
  }
  return null;
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

  const statCards = [
    { key: "pending", label: "รอคิวปรุง", dotClass: "bg-amber" },
    { key: "cooking", label: "กำลังปรุง", dotClass: "bg-orange" },
    { key: "ready", label: "ตรวจคุณภาพผ่าน (พร้อมเสิร์ฟ)", dotClass: "bg-green" },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-app text-ink-3">
        <div className="spinner"></div>
        <p className="text-sm text-ink-2">กำลังเชื่อมต่อระบบครัว KDS...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10">
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
              <h1 className="text-lg font-bold leading-tight">🍳 ระบบห้องครัว (KDS)</h1>
              <p className="mt-0.5 text-xs text-ink-3">
                อัปเดตล่าสุด: {formatTime(lastRefresh.toISOString())} · แสดงข้อมูลเรียลไทม์
              </p>
            </div>
          </div>

          {/* Right: View Mode Toggle & Refresh Button */}
          <div className="flex items-center gap-2 max-sm:w-full max-sm:justify-between">
            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-line bg-glass p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("station")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${FOCUS} ${
                  viewMode === "station"
                    ? "bg-orange text-[#0a0a0f] shadow-sm"
                    : "text-ink-2 hover:text-ink"
                }`}
              >
                <span>👨‍🍳 จอประจำสเตชั่นเชฟ</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("expo")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${FOCUS} ${
                  viewMode === "expo"
                    ? "bg-blue text-white shadow-sm"
                    : "text-ink-2 hover:text-ink"
                }`}
              >
                <span>📋 คนคุมออเดอร์ & กะ (Expo)</span>
              </button>
            </div>

            <button
              className={`flex items-center gap-1.5 rounded-md border border-line px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-glass hover:text-ink ${FOCUS}`}
              onClick={fetchKitchenData}
            >
              <Icon name="refresh" className="size-4" />
              <span className="hidden sm:inline">รีเฟรช</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl">
        {/* ── Stats Cards (Consistent minimal connected grid as in staff/page.js) ── */}
        <div className="p-4 animate-rise md:p-6">
          <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-line">
            {statCards.map((s, i) => (
              <div
                key={s.key}
                className={`flex flex-col gap-1.5 px-4 py-4 transition-colors hover:bg-glass sm:px-5 ${
                  i !== statCards.length - 1 ? "border-r border-line" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`size-2 shrink-0 rounded-full ${s.dotClass}`} />
                  <span className="truncate text-xs font-medium text-ink-3">{s.label}</span>
                </div>
                <span className="text-[1.8rem] font-bold leading-none tracking-tight text-ink sm:text-[2rem]">
                  {counts[s.key]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── VIEW 1: จอประจำสเตชั่นเชฟ (STATION VIEW) ── */}
        {viewMode === "station" && (
          <>
            {/* Station Selector Tabs (Matches underline tab strip style) */}
            <div
              className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line px-4 md:px-6"
              role="tablist"
              aria-label="เลือกสเตชั่นในครัว"
            >
              <button
                role="tab"
                aria-selected={selectedStation === "all"}
                className={`-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors duration-150 ${FOCUS} ${
                  selectedStation === "all"
                    ? "border-orange font-semibold text-ink"
                    : "border-transparent text-ink-3 hover:text-ink"
                }`}
                onClick={() => setSelectedStation("all")}
              >
                <span>📋 ทุกสเตชั่น</span>
                {items.length > 0 && (
                  <span
                    className={`rounded-full px-2 py-px text-[0.72rem] font-bold ${
                      selectedStation === "all"
                        ? "bg-orange/20 text-orange"
                        : "bg-glass text-ink-3"
                    }`}
                  >
                    {items.length}
                  </span>
                )}
              </button>

              {stations.map((st) => {
                const active = selectedStation === st.station_code;
                const activeCount = st.pending_count + st.cooking_count;
                return (
                  <button
                    key={st.station_code}
                    role="tab"
                    aria-selected={active}
                    className={`-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors duration-150 ${FOCUS} ${
                      active
                        ? "border-orange font-semibold text-ink"
                        : "border-transparent text-ink-3 hover:text-ink"
                    }`}
                    onClick={() => setSelectedStation(st.station_code)}
                  >
                    <span>{st.icon}</span>
                    <span>{st.name.split(" ")[0]}</span>
                    {activeCount > 0 && (
                      <span
                        className={`rounded-full px-2 py-px text-[0.72rem] font-bold ${
                          active ? "bg-orange/20 text-orange" : "bg-glass text-ink-3"
                        }`}
                      >
                        {activeCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Station Staff Info Bar */}
            {selectedStation !== "all" && currentStationInfo && (
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-glass/40 px-4 py-2.5 text-xs text-ink-2 md:px-6">
                <div className="flex items-center gap-2">
                  <span className="text-base">{currentStationInfo.icon}</span>
                  <strong className="text-ink">{currentStationInfo.name}</strong>
                  <span className="text-ink-3">— {currentStationInfo.description}</span>
                </div>
                <div className="flex items-center gap-2">
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
            <div className="p-4 md:p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-5 py-20 text-center animate-card-in">
                  <span className="mb-4 text-[3.5rem] opacity-50">🎉</span>
                  <h3 className="mb-2 text-lg font-semibold text-ink-2">
                    {selectedStation === "all"
                      ? "ไม่มีอาหารค้างในครัว — ยอดเยี่ยมมาก!"
                      : "สเตชั่นนี้ไม่มีออเดอร์ค้างอยู่"}
                  </h3>
                  <p className="text-sm text-ink-3">
                    ออเดอร์ใหม่จากลูกค้าจะปรากฏที่นี่แบบเรียลไทม์
                  </p>
                </div>
              ) : (
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((item) => {
                    const isCooking = item.kitchen_status === "COOKING";
                    const isReady = item.kitchen_status === "READY";
                    const isPending = item.kitchen_status === "PENDING";

                    const topBorderClass = isPending
                      ? "border-t-amber"
                      : isCooking
                      ? "border-t-orange"
                      : "border-t-green";

                    return (
                      <li
                        key={item.order_item_id}
                        className={`flex animate-card-in flex-col gap-3.5 rounded-lg border border-t-[3px] border-line bg-gradient-card p-5 transition-all duration-200 hover:border-line-light hover:shadow-md ${topBorderClass}`}
                      >
                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-base font-extrabold text-ink">
                              โต๊ะ {item.table_number}
                            </span>
                            <span className="text-xs text-ink-3">
                              #{item.short_id}
                            </span>
                            <KitchenStatusBadge status={item.kitchen_status} />
                          </div>

                          <div className="flex items-center gap-1 rounded bg-glass px-2 py-1 text-xs font-mono text-ink-2 border border-line shrink-0">
                            <Icon name="clock" className="size-3.5 text-ink-3" />
                            <LiveTimer startIso={item.created_at} />
                          </div>
                        </div>

                        {/* Item Details */}
                        <div className="flex flex-col gap-2 rounded-md bg-glass px-3.5 py-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="text-3xl shrink-0">{item.image_url}</span>
                              <div className="min-w-0">
                                <h4 className="truncate text-base font-bold text-ink">
                                  {item.menu_name}
                                </h4>
                                <span className="inline-block mt-0.5 rounded border border-line bg-glass px-1.5 py-px text-[0.68rem] font-bold uppercase text-ink-3">
                                  {item.station_code}
                                </span>
                              </div>
                            </div>
                            <span className="text-2xl font-extrabold text-orange shrink-0">
                              x{item.quantity}
                            </span>
                          </div>

                          {item.order_note && (
                            <div className="mt-1 flex items-start gap-1.5 rounded-md border border-amber/15 bg-amber/[0.08] px-3 py-2 text-xs text-amber">
                              <span className="shrink-0">📝</span>
                              <span>
                                <strong>หมายเหตุ:</strong> {item.order_note}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Card Actions */}
                        <div className="flex items-center gap-2 border-t border-line pt-3">
                          {/* ปุ่มดูวัตถุดิบ & สูตร */}
                          <button
                            type="button"
                            className={`flex items-center justify-center gap-1.5 rounded-md border border-line bg-glass px-3 py-2 text-xs font-semibold text-ink-2 transition hover:bg-glass-strong hover:text-ink ${FOCUS}`}
                            onClick={() => setSelectedItemForRecipe(item)}
                          >
                            <Icon name="search" className="size-3.5" />
                            ดูสูตร
                          </button>

                          {/* ปุ่มเริ่มปรุงอาหาร */}
                          {isPending && (
                            <button
                              type="button"
                              className={`flex-1 rounded-md bg-amber px-4 py-2 text-xs font-bold text-[#1a1a0a] transition hover:brightness-110 ${FOCUS}`}
                              onClick={() => handleStartCooking(item.order_item_id)}
                            >
                              🔥 เริ่มปรุง
                            </button>
                          )}

                          {/* ปุ่มตรวจคุณภาพผ่าน & เรียกเสิร์ฟ */}
                          {isCooking && (
                            <button
                              type="button"
                              className={`flex-1 rounded-md bg-green px-4 py-2 text-xs font-bold text-[#0a0a0f] shadow-[0_2px_8px_rgba(45,212,168,0.3)] transition hover:brightness-110 ${FOCUS}`}
                              onClick={() => handleQualityPassAndServe(item.order_item_id)}
                            >
                              ⭐ ผ่านตรวจ & เรียกเสิร์ฟ
                            </button>
                          )}

                          {isReady && (
                            <div className="flex-1 py-1.5 text-center text-xs font-bold text-green">
                              🔔 เรียกพนักงานเสิร์ฟแล้ว
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </>
        )}

        {/* ── VIEW 2: คนคุมออเดอร์ & จัดการกะ (EXPO DISPATCHER) ── */}
        {viewMode === "expo" && (
          <div className="p-4 md:p-6 animate-fade-quick">
            {/* Section 1: การจัดการกะเชฟประจำสเตชั่น */}
            <div className="mb-6 rounded-lg border border-line bg-gradient-card p-5 shadow-sm md:p-6">
              <div className="mb-4">
                <h2 className="text-base font-bold text-ink">
                  👥 จัดการกะเชฟประจำสเตชั่น (จำกัดไม่เกิน 2 คนต่อสเตชั่น)
                </h2>
                <p className="mt-0.5 text-xs text-ink-3">
                  คนคุมครัว (Expo) สามารถจัดเชฟเข้าสเตชั่นตามกะเวลาทำงาน
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {stations.map((st) => (
                  <div
                    key={st.station_code}
                    className="flex flex-col justify-between rounded-lg border border-line bg-glass/60 p-4 transition hover:border-line-light"
                  >
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-bold text-ink">
                          {st.icon} {st.name.split(" ")[0]}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                            st.chef_count >= 2
                              ? "bg-red/15 text-red"
                              : "bg-green/15 text-green"
                          }`}
                        >
                          {st.chef_count}/2 คน
                        </span>
                      </div>

                      {/* เชฟที่ประจำการอยู่ */}
                      <div className="mb-3 min-h-[60px] space-y-2">
                        {st.chefs?.length > 0 ? (
                          st.chefs.map((c) => (
                            <div
                              key={c.staff_id}
                              className="flex items-center justify-between border-b border-dashed border-line pb-2 text-xs"
                            >
                              <div>
                                <span className="font-semibold text-ink">{c.name}</span>
                                <div className="text-[0.7rem] text-ink-3">
                                  เริ่ม {formatTime(c.started_at)} ({c.duration_minutes} นาที)
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleEndShift(c.staff_id)}
                                className={`rounded px-1.5 py-0.5 text-[0.7rem] font-medium text-red hover:bg-red/10 ${FOCUS}`}
                              >
                                ออกกะ
                              </button>
                            </div>
                          ))
                        ) : (
                          <p className="my-3 text-center text-xs text-ink-3">
                            ว่าง — ยังไม่มีเชฟประจำการ
                          </p>
                        )}
                      </div>
                    </div>

                    {/* มอบหมายเชฟใหม่ (ถ้ายังไม่เต็ม 2 คน) */}
                    <div>
                      {!st.is_full && availableChefs.length > 0 ? (
                        <div className="flex gap-1.5">
                          <select
                            id={`assign-select-${st.station_code}`}
                            className="flex-1 rounded-md border border-line bg-panel px-2.5 py-1.5 text-xs text-ink focus:border-orange focus:outline-none"
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
                              const val = document.getElementById(
                                `assign-select-${st.station_code}`
                              )?.value;
                              if (val) handleAssignChef(val, st.station_code);
                            }}
                            className={`rounded-md bg-orange px-3 py-1.5 text-xs font-bold text-[#0a0a0f] transition hover:brightness-110 ${FOCUS}`}
                          >
                            + เข้ากะ
                          </button>
                        </div>
                      ) : (
                        <div className="rounded bg-glass/60 py-1.5 text-center text-xs text-ink-3">
                          {st.is_full ? "ครบ 2 คนแล้ว" : "ไม่มีเชฟที่ว่าง"}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: คุมการส่งออเดอร์ & เปลี่ยนสเตชั่น */}
            <div className="rounded-lg border border-line bg-gradient-card p-5 shadow-sm md:p-6">
              <div className="mb-4">
                <h2 className="text-base font-bold text-ink">
                  🚀 คุมการรันออเดอร์อาหาร & กำหนดสเตชั่น
                </h2>
                <p className="mt-0.5 text-xs text-ink-3">
                  คนคุมออเดอร์สามารถตรวจดูอาหารที่เข้ามา และเปลี่ยนสเตชั่นที่รับผิดชอบได้ทันที
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-line text-xs font-semibold text-ink-3 uppercase">
                      <th className="p-3">โต๊ะ</th>
                      <th className="p-3">ออเดอร์</th>
                      <th className="p-3">รายการอาหาร</th>
                      <th className="p-3">จำนวน</th>
                      <th className="p-3">สถานะ</th>
                      <th className="p-3">สเตชั่นปัจจุบัน</th>
                      <th className="p-3">ปรับเปลี่ยนสเตชั่น</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it) => (
                      <tr
                        key={it.order_item_id}
                        className="border-b border-line transition-colors hover:bg-glass/40"
                      >
                        <td className="p-3 font-bold text-ink">โต๊ะ {it.table_number}</td>
                        <td className="p-3 font-mono text-xs text-ink-3">#{it.short_id}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span>{it.image_url}</span>
                            <span className="font-medium text-ink">{it.menu_name}</span>
                          </div>
                          {it.order_note && (
                            <div className="mt-0.5 text-xs text-amber">
                              📝 {it.order_note}
                            </div>
                          )}
                        </td>
                        <td className="p-3 font-bold text-orange">x{it.quantity}</td>
                        <td className="p-3">
                          <KitchenStatusBadge status={it.kitchen_status} />
                        </td>
                        <td className="p-3">
                          <span className="rounded border border-line bg-glass px-2 py-0.5 text-xs font-bold uppercase text-ink-2">
                            {it.station_code}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={it.station_code}
                            onChange={(e) => handleChangeStation(it.order_item_id, e.target.value)}
                            className="rounded-md border border-line bg-panel px-2.5 py-1.5 text-xs text-ink focus:border-orange focus:outline-none"
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
          </div>
        )}
      </main>

      {/* ── Modal ดูสูตร & รายละเอียดวัตถุดิบ ── */}
      {selectedItemForRecipe && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fade-quick"
          onClick={() => setSelectedItemForRecipe(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl border border-line bg-panel p-6 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedItemForRecipe.image_url}</span>
                <div>
                  <h3 className="text-lg font-bold text-ink">
                    {selectedItemForRecipe.menu_name}
                  </h3>
                  <span className="text-xs text-ink-3">
                    จำนวน {selectedItemForRecipe.quantity} จาน · โต๊ะ {selectedItemForRecipe.table_number} · สเตชั่น {selectedItemForRecipe.station_code}
                  </span>
                </div>
              </div>
              <button
                className={`flex size-8 items-center justify-center rounded-md text-ink-3 hover:bg-glass hover:text-ink ${FOCUS}`}
                onClick={() => setSelectedItemForRecipe(null)}
                aria-label="ปิดหน้าต่าง"
              >
                <Icon name="close" className="size-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-4 space-y-4">
              {selectedItemForRecipe.order_note && (
                <div className="rounded-md border border-amber/20 bg-amber/[0.08] px-3.5 py-2 text-xs text-amber">
                  📝 <strong>หมายเหตุลูกค้า:</strong> {selectedItemForRecipe.order_note}
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-3 mb-2">
                  🧂 วัตถุดิบที่ต้องใช้ (สำหรับ {selectedItemForRecipe.quantity} จาน):
                </h4>

                {selectedItemForRecipe.ingredients?.length > 0 ? (
                  <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                    {selectedItemForRecipe.ingredients.map((ing, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-md border border-line bg-glass px-3 py-2 text-xs"
                      >
                        <span className="text-ink-2">{ing.name}</span>
                        <strong className="text-orange">
                          {ing.amount} {ing.unit}
                        </strong>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-md border border-line bg-glass p-3 text-xs text-ink-3 text-center">
                    ไม่มีข้อมูลสูตรวัตถุดิบเจาะจงสำหรับเมนูนี้ ปรุงตามสูตรมาตรฐานของร้าน
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-line pt-4">
              <button
                type="button"
                className={`w-full rounded-md bg-orange py-2.5 text-sm font-bold text-[#0a0a0f] transition hover:brightness-110 ${FOCUS}`}
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
