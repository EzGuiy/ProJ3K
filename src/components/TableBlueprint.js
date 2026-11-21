"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Default Landmarks configuration for the restaurant blueprint.
 * Entrance (หน้าร้าน) is fixed. Kitchen, Restroom, Cashier are draggable in Admin Edit Mode.
 */
const DEFAULT_LANDMARKS = [
  {
    id: "lm-entrance",
    type: "ENTRANCE",
    label: "ทางเข้าร้าน (ฝั่งหน้าร้าน)",
    subLabel: "▲ MAIN ENTRANCE / FRONT OF RESTAURANT ▲",
    x: 260,
    y: 540,
    width: 420,
    height: 70,
  },
  {
    id: "lm-kitchen",
    type: "KITCHEN",
    label: "🍳 ครัวหลัก & จุดรับอาหาร",
    subLabel: "KITCHEN & PICKUP",
    x: 300,
    y: 18,
    width: 340,
    height: 48,
  },
  {
    id: "lm-restroom",
    type: "RESTROOM",
    label: "🚻 ห้องน้ำ",
    subLabel: "RESTROOM",
    x: 25,
    y: 18,
    width: 120,
    height: 48,
  },
  {
    id: "lm-cashier",
    type: "CASHIER",
    label: "💵 แคชเชียร์ & บาร์น้ำ",
    subLabel: "CASHIER & BAR",
    x: 710,
    y: 490,
    width: 190,
    height: 65,
  },
];

/**
 * TableBlueprint Component
 *
 * Interactive 2D floor plan / blueprint builder for restaurant dining tables.
 * - Admin Mode: Drag & Drop table positioning AND landmark positioning (Kitchen, Restroom, Cashier),
 *   while the Main Entrance remains fixed at the front. Grid snapping, save to MySQL database.
 * - Staff Mode (Floor Plan View): Read-only visual floor plan with live table status and real-time dining timer.
 * - Staff Selection Mode (Table Assignment): Clicking allows selecting AVAILABLE tables only.
 *   Occupied tables cannot be selected/clicked.
 */
export default function TableBlueprint({
  tables = [],
  layout = null,
  isAdmin = false,
  selectionMode = false,
  selectedTableNumber = null,
  selectedTableId = null,
  onSelectTable = null,
  onSaveLayout = null,
  onAddTable = null,
  onRefresh = null,
  onTableClick = null,
  onReleaseTable = null,
}) {
  // Local working copy of tables and landmarks
  const [localTables, setLocalTables] = useState([]);
  const [localLandmarks, setLocalLandmarks] = useState(DEFAULT_LANDMARKS);
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Live timer tick for calculating dining duration in real time
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Dragging state: { targetType: 'table' | 'landmark', id: string, startMouseX, startMouseY, startX, startY }
  const [dragState, setDragState] = useState(null);
  const canvasRef = useRef(null);

  // Detail Modal state when clicking a table (View mode only)
  const [activeTableDetail, setActiveTableDetail] = useState(null);

  // Canvas dimensions
  const canvasWidth = layout?.width || 940;
  const canvasHeight = layout?.height || 640;

  // ── Sync tables from props without wiping out unsaved drags ──
  useEffect(() => {
    setLocalTables((prevLocal) => {
      if (!prevLocal || prevLocal.length === 0) {
        return tables.map((t) => ({ ...t }));
      }
      // Preserve positions already dragged in this session
      return tables.map((incoming) => {
        const match = prevLocal.find((lt) => lt.table_id === incoming.table_id);
        if (match) {
          return {
            ...incoming,
            pos_x: match.pos_x,
            pos_y: match.pos_y,
          };
        }
        // Newly added table
        return { ...incoming };
      });
    });
  }, [tables]);

  // ── Sync landmarks from props without wiping out unsaved drags ──
  useEffect(() => {
    const incoming =
      layout?.landmarks && Array.isArray(layout.landmarks) && layout.landmarks.length > 0
        ? layout.landmarks
        : DEFAULT_LANDMARKS;

    setLocalLandmarks((prev) => {
      if (!prev || prev.length === 0) return incoming;
      return incoming.map((lm) => {
        const match = prev.find((p) => p.id === lm.id);
        if (match) {
          return { ...lm, x: match.x, y: match.y };
        }
        return lm;
      });
    });
  }, [layout]);

  // Keep activeTableDetail in sync if tables reload
  useEffect(() => {
    if (activeTableDetail) {
      const updated = localTables.find((t) => t.table_id === activeTableDetail.table_id);
      if (updated) setActiveTableDetail(updated);
    }
  }, [localTables, activeTableDetail]);

  // ── Helper: Format Elapsed Dining Time ──
  const formatElapsed = (startTimeStr) => {
    if (!startTimeStr) return null;
    const start = new Date(startTimeStr).getTime();
    if (isNaN(start)) return null;
    const diffSec = Math.max(0, Math.floor((now - start) / 1000));
    const hours = Math.floor(diffSec / 3600);
    const mins = Math.floor((diffSec % 3600) / 60);
    const secs = diffSec % 60;
    if (hours > 0) {
      return `${hours}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // ── Drag & Drop Handlers (Admin Only) ──
  const handleTablePointerDown = (e, table) => {
    if (!isAdmin || !isEditMode || selectionMode) return;
    e.preventDefault();
    e.stopPropagation();

    setDragState({
      targetType: "table",
      id: table.table_id,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startX: Number(table.pos_x) || 0,
      startY: Number(table.pos_y) || 0,
    });
  };

  const handleLandmarkPointerDown = (e, lm) => {
    if (!isAdmin || !isEditMode || selectionMode) return;
    // Front entrance is FIXED and cannot be moved!
    if (lm.type === "ENTRANCE" || lm.id === "lm-entrance") return;

    e.preventDefault();
    e.stopPropagation();

    setDragState({
      targetType: "landmark",
      id: lm.id,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startX: Number(lm.x) || 0,
      startY: Number(lm.y) || 0,
    });
  };

  const handlePointerMove = useCallback(
    (e) => {
      if (!dragState) return;

      const deltaX = e.clientX - dragState.startMouseX;
      const deltaY = e.clientY - dragState.startMouseY;

      if (dragState.targetType === "table") {
        // Snap to 10px grid
        let newX = Math.round((dragState.startX + deltaX) / 10) * 10;
        let newY = Math.round((dragState.startY + deltaY) / 10) * 10;

        // Clamp within canvas boundaries
        newX = Math.max(10, Math.min(canvasWidth - 140, newX));
        newY = Math.max(10, Math.min(canvasHeight - 110, newY));

        setLocalTables((prev) =>
          prev.map((t) =>
            t.table_id === dragState.id ? { ...t, pos_x: newX, pos_y: newY } : t
          )
        );
        setHasChanges(true);
      } else if (dragState.targetType === "landmark") {
        const lm = localLandmarks.find((l) => l.id === dragState.id);
        const w = lm?.width || 160;
        const h = lm?.height || 50;

        let newX = Math.round((dragState.startX + deltaX) / 10) * 10;
        let newY = Math.round((dragState.startY + deltaY) / 10) * 10;

        // Clamp landmark within canvas
        newX = Math.max(10, Math.min(canvasWidth - w - 10, newX));
        newY = Math.max(10, Math.min(canvasHeight - h - 10, newY));

        setLocalLandmarks((prev) =>
          prev.map((l) => (l.id === dragState.id ? { ...l, x: newX, y: newY } : l))
        );
        setHasChanges(true);
      }
    },
    [dragState, canvasWidth, canvasHeight, localLandmarks]
  );

  const handlePointerUp = useCallback(() => {
    if (dragState) {
      setDragState(null);
    }
  }, [dragState]);

  useEffect(() => {
    if (dragState) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [dragState, handlePointerMove, handlePointerUp]);

  // ── Save Layout to Database ──
  const handleSave = async () => {
    if (!onSaveLayout) return;
    setSaving(true);
    try {
      const updatedLayout = {
        ...(layout || {}),
        landmarks: localLandmarks,
      };
      await onSaveLayout(localTables, updatedLayout);
      setHasChanges(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      console.error("Save error:", err);
      alert("บันทึกตำแหน่งโต๊ะและผังร้านไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  };

  // ── Reset to original DB values ──
  const handleReset = () => {
    setLocalTables(tables.map((t) => ({ ...t })));
    setLocalLandmarks(
      layout?.landmarks && Array.isArray(layout.landmarks) && layout.landmarks.length > 0
        ? layout.landmarks
        : DEFAULT_LANDMARKS
    );
    setHasChanges(false);
  };

  // ── Table Click Handler ──
  const handleTableClick = (table, isOccupied) => {
    if (isEditMode) return; // In edit mode, clicking is for dragging

    // ── Staff Selection Mode ──
    if (selectionMode) {
      // If table is occupied, it cannot be clicked at all!
      if (isOccupied) return;
      if (onSelectTable) {
        onSelectTable(table);
      }
      return;
    }

    // ── Normal View Mode ──
    if (onTableClick) {
      onTableClick(table);
    } else {
      setActiveTableDetail(table);
    }
  };

  const availableCount = localTables.filter((t) => t.status === "AVAILABLE").length;
  const occupiedCount = localTables.filter((t) => t.status === "OCCUPIED").length;

  return (
    <div className="w-full flex flex-col gap-3">
      {/* ── Toolbar & Control Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 md:p-4 backdrop-blur-md">
        {/* Status Indicators & Counts */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#2dd4a8] shadow-[0_0_8px_#2dd4a8]" />
            <span className="text-white/80">
              {selectionMode ? "โต๊ะว่าง (กดเลือกได้)" : "โต๊ะว่าง"} ({availableCount})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#ff4757] shadow-[0_0_8px_#ff4757]" />
            <span className="text-white/80">
              {selectionMode ? "มีลูกค้าแล้ว (กดไม่ได้)" : "มีลูกค้า (จับเวลาอยู่)"} ({occupiedCount})
            </span>
          </div>
          <div className="text-white/40 border-l border-white/10 pl-3">
            ทั้งหมด {localTables.length} โต๊ะ
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {selectionMode ? (
            /* Selection Mode Help Tag */
            <div className="flex items-center gap-2 text-xs text-white/70 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <span>👉 คลิกที่โต๊ะว่างเพื่อเลือกโต๊ะ</span>
              {selectedTableNumber && (
                <span className="font-bold text-[#ffb347] bg-[#ffb347]/15 px-2 py-0.5 rounded">
                  โต๊ะที่เลือก: #{selectedTableNumber}
                </span>
              )}
            </div>
          ) : isAdmin ? (
            <>
              {/* Admin Mode Toggle */}
              <button
                type="button"
                onClick={() => setIsEditMode(!isEditMode)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  isEditMode
                    ? "bg-[#ffb347] text-black shadow-lg shadow-[#ffb347]/20"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                <span>
                  {isEditMode ? "✏️ กำลังจัดผัง (เปิดใช้งาน)" : "✏️ จัดตำแหน่งโต๊ะ & โซน (Drag & Drop)"}
                </span>
              </button>

              {/* Add Table Button */}
              {onAddTable && (
                <button
                  type="button"
                  onClick={onAddTable}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/15 text-white transition"
                >
                  <span>➕ เพิ่มโต๊ะ</span>
                </button>
              )}

              {/* Save & Reset Buttons */}
              {isEditMode && hasChanges && (
                <>
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={saving}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 transition"
                  >
                    ยกเลิกการเลื่อน
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-extrabold bg-[#2dd4a8] text-black hover:brightness-110 shadow-lg shadow-[#2dd4a8]/25 transition animate-pulse"
                  >
                    <span>💾</span>
                    <span>{saving ? "กำลังบันทึก..." : "บันทึกผังโต๊ะ"}</span>
                  </button>
                </>
              )}
            </>
          ) : (
            /* Staff Mode Note */
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/50 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                🔒 โหมดดูผังร้าน (คลิกที่โต๊ะเพื่อดูเวลา/ออเดอร์)
              </span>
              {onRefresh && (
                <button
                  type="button"
                  onClick={onRefresh}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition"
                >
                  <span>🔄 รีเฟรช</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Save Success Banner */}
      {saveSuccess && (
        <div className="px-4 py-2.5 rounded-xl bg-[#2dd4a8]/15 border border-[#2dd4a8]/30 text-[#2dd4a8] text-xs font-bold flex items-center justify-between animate-fade-quick">
          <span>✅ บันทึกตำแหน่งผังโต๊ะและจุดสำคัญลงฐานข้อมูล MySQL เรียบร้อยแล้ว!</span>
          <button
            onClick={() => setSaveSuccess(false)}
            className="text-white/40 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Edit Mode Helper Notification */}
      {isAdmin && isEditMode && (
        <div className="px-4 py-2.5 rounded-xl bg-[#ffb347]/10 border border-[#ffb347]/30 text-[#ffb347] text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>💡</span>
            <span>
              <strong>โหมดจัดผังร้าน:</strong> สามารถคลิกลากโต๊ะอาหาร, ครัว, ห้องน้ำ, แคชเชียร์
              ไปยังตำแหน่งที่ต้องการได้อิสระ <em>(ตำแหน่งหน้าร้านถูกล็อคไว้คงที่)</em>
            </span>
          </div>
          {hasChanges && (
            <span className="text-[11px] font-bold text-white/80 bg-[#ffb347]/20 px-2.5 py-1 rounded-md">
              มีตำแหน่งที่ยังไม่บันทึก อย่าลืมกด &quot;บันทึกผังโต๊ะ&quot; สีเขียว
            </span>
          )}
        </div>
      )}

      {/* Selection Mode Helper Notice */}
      {selectionMode && (
        <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white/80 flex items-center justify-between">
          <span>
            📍 <strong>เลือกโต๊ะ:</strong> โต๊ะสีเขียวพร้อมจัดที่นั่ง (คลิกเพื่อเลือก) | โต๊ะสีแดงไม่ว่าง (ไม่สามารถกดได้)
          </span>
          <span className="text-white/50 text-[11px]">
            {availableCount > 0 ? `มีโต๊ะว่าง ${availableCount} โต๊ะ` : "⚠️ ขณะนี้ไม่มีโต๊ะว่าง"}
          </span>
        </div>
      )}

      {/* ── Blueprint Canvas Viewport ── */}
      <div className="relative overflow-x-auto rounded-2xl border border-white/10 bg-[#08080e] shadow-2xl">
        <div
          ref={canvasRef}
          style={{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }}
          className="relative select-none overflow-hidden"
        >
          {/* 1. Blueprint Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Blueprint Info Label */}
          <div className="absolute top-3 left-4 text-[10px] font-mono tracking-widest text-white/30 uppercase pointer-events-none">
            REST_FLOOR_PLAN • {canvasWidth}x{canvasHeight}px
          </div>

          {/* ── 2. LANDMARKS (Kitchen, Restroom, Cashier, Entrance) ── */}
          {localLandmarks.map((lm) => {
            const isEntrance = lm.type === "ENTRANCE" || lm.id === "lm-entrance";
            const isDraggingLm =
              dragState?.targetType === "landmark" && dragState?.id === lm.id;
            const isCashier = lm.type === "CASHIER";
            const isRestroom = lm.type === "RESTROOM";

            // 🚪 FIXED ENTRANCE (หน้าร้าน)
            if (isEntrance) {
              return (
                <div
                  key={lm.id}
                  style={{
                    left: `${lm.x}px`,
                    top: `${lm.y}px`,
                    width: `${lm.width || 420}px`,
                    height: `${lm.height || 70}px`,
                  }}
                  className="absolute rounded-2xl border-2 border-dashed border-[#2dd4a8]/50 bg-[#2dd4a8]/10 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-lg shadow-[#2dd4a8]/10 select-none z-10 pointer-events-none"
                >
                  <div className="flex items-center gap-2 text-sm font-black text-[#2dd4a8] tracking-wide uppercase">
                    <span className="text-lg">🚪</span>
                    <span>{lm.label || "ทางเข้าร้าน (ฝั่งหน้าร้าน)"}</span>
                    <span className="text-lg">🚪</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#2dd4a8]/80 mt-0.5">
                    <span>▲ MAIN ENTRANCE / FRONT OF RESTAURANT ▲</span>
                    {isEditMode && (
                      <span className="bg-[#2dd4a8]/25 text-[#2dd4a8] px-1.5 py-0.5 rounded text-[9px] border border-[#2dd4a8]/40">
                        🔒 ล็อคตำแหน่งหน้าร้าน
                      </span>
                    )}
                  </div>
                </div>
              );
            }

            // 🍳 🚻 💵 MOVABLE LANDMARKS
            let containerStyle = "border-white/10 bg-white/[0.04] text-white/70";
            if (isCashier) {
              containerStyle = "border-[#ffb347]/30 bg-[#ffb347]/10 text-[#ffb347]";
            } else if (isRestroom) {
              containerStyle = "border-white/10 bg-white/[0.03] text-white/60";
            }

            return (
              <div
                key={lm.id}
                onPointerDown={(e) => handleLandmarkPointerDown(e, lm)}
                style={{
                  left: `${lm.x}px`,
                  top: `${lm.y}px`,
                  width: `${lm.width || 180}px`,
                  height: `${lm.height || 50}px`,
                  zIndex: isDraggingLm ? 50 : 15,
                  cursor: isEditMode ? "grab" : "default",
                  transform: isDraggingLm ? "scale(1.03)" : "scale(1)",
                }}
                className={`absolute rounded-xl border p-2 flex flex-col items-center justify-center text-center select-none shadow-md backdrop-blur-sm transition-transform duration-75 ${containerStyle} ${
                  isDraggingLm ? "ring-2 ring-[#ffb347] shadow-xl cursor-grabbing" : ""
                }`}
                title={isEditMode ? `ลากเพื่อย้าย ${lm.label}` : lm.label}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold pointer-events-none">
                  {isEditMode && <span className="text-[#ffb347] text-[10px]">⠿</span>}
                  <span>{lm.label}</span>
                </div>
                {lm.subLabel && (
                  <span className="text-[9px] opacity-60 font-mono pointer-events-none mt-0.5">
                    {lm.subLabel}
                  </span>
                )}
              </div>
            );
          })}

          {/* ── 3. DINING TABLES ── */}
          {localTables.map((table) => {
            const isOccupied = table.status === "OCCUPIED";
            const isDragging =
              dragState?.targetType === "table" && dragState?.id === table.table_id;

            // Selection Mode active status check
            const isSelected =
              (selectedTableNumber != null &&
                String(table.table_number) === String(selectedTableNumber)) ||
              (selectedTableId != null && table.table_id === selectedTableId);

            const isLarge = Number(table.capacity) >= 6;
            const isRound = table.shape === "round";

            const width = isLarge ? 140 : 100;
            const height = 85;

            // Elapsed dining duration
            const elapsedTimer = isOccupied
              ? formatElapsed(
                  table.session_start_at ||
                    table.occupied_at ||
                    table.order_opened_at
                )
              : null;

            // Interaction styles depending on mode
            let cursorStyle = "pointer";
            if (isEditMode) {
              cursorStyle = "grab";
            } else if (selectionMode) {
              cursorStyle = isOccupied ? "not-allowed" : "pointer";
            }

            return (
              <div
                key={table.table_id}
                onPointerDown={(e) => handleTablePointerDown(e, table)}
                onClick={() => handleTableClick(table, isOccupied)}
                style={{
                  left: `${table.pos_x}px`,
                  top: `${table.pos_y}px`,
                  width: `${width}px`,
                  height: `${height}px`,
                  zIndex: isDragging ? 50 : isSelected ? 40 : 20,
                  transform: isDragging
                    ? "scale(1.05)"
                    : isSelected
                    ? "scale(1.04)"
                    : "scale(1)",
                  cursor: cursorStyle,
                  opacity: selectionMode && isOccupied ? 0.45 : 1,
                  filter: selectionMode && isOccupied ? "grayscale(40%)" : "none",
                }}
                className={`absolute transition-all duration-75 select-none rounded-2xl border-2 p-2 flex flex-col justify-between backdrop-blur-md shadow-xl ${
                  isOccupied
                    ? "border-[#ff4757]/80 bg-[#ff4757]/15 shadow-[#ff4757]/20 text-white"
                    : "border-[#2dd4a8]/70 bg-[#12121e]/90 shadow-black/40 text-white hover:border-[#2dd4a8]"
                } ${
                  isDragging ? "ring-4 ring-[#ffb347] shadow-2xl cursor-grabbing" : ""
                } ${
                  isSelected
                    ? "ring-4 ring-[#ffb347] border-[#ffb347] bg-[#ffb347]/20 shadow-[0_0_20px_rgba(255,179,71,0.6)]"
                    : ""
                } ${isRound ? "rounded-full" : ""}`}
                title={
                  selectionMode && isOccupied
                    ? `โต๊ะ ${table.table_number} ไม่ว่าง (มีลูกค้าอยู่ - ไม่สามารถเลือกได้)`
                    : `โต๊ะ ${table.table_number} (${isOccupied ? "มีลูกค้า - กำลังจับเวลา" : "ว่าง"})`
                }
              >
                {/* Chairs Visual Representation (Dots around table) */}
                <div className="absolute -top-1.5 left-1/4 size-2 rounded-full bg-white/40" />
                <div className="absolute -top-1.5 right-1/4 size-2 rounded-full bg-white/40" />
                <div className="absolute -bottom-1.5 left-1/4 size-2 rounded-full bg-white/40" />
                <div className="absolute -bottom-1.5 right-1/4 size-2 rounded-full bg-white/40" />
                {isLarge && (
                  <>
                    <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 size-2 rounded-full bg-white/40" />
                    <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 size-2 rounded-full bg-white/40" />
                  </>
                )}

                {/* Table Header: Table Number & Capacity */}
                <div className="flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-1 font-black text-xs font-mono tracking-tight">
                    {isEditMode && <span className="text-[#ffb347] text-[10px]">⠿</span>}
                    <span>โต๊ะ {table.table_number}</span>
                  </div>
                  <span className="text-[10px] text-white/50 font-medium">
                    {table.capacity || 4} ที่
                  </span>
                </div>

                {/* Table Status Body */}
                <div className="pointer-events-none flex items-center justify-between mt-0.5">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? "bg-[#ffb347] text-black font-extrabold"
                        : isOccupied
                        ? "bg-[#ff4757]/30 text-[#ff8b94]"
                        : "bg-[#2dd4a8]/20 text-[#2dd4a8]"
                    }`}
                  >
                    {isSelected
                      ? "✓ โต๊ะที่เลือก"
                      : isOccupied
                      ? selectionMode
                        ? "❌ ไม่ว่าง"
                        : "มีลูกค้า"
                      : "ว่าง"}
                  </span>

                  {/* Realtime Timer if Occupied, or Selection prompt if in selection mode */}
                  {selectionMode ? (
                    !isOccupied && !isSelected && (
                      <span className="text-[9px] text-[#2dd4a8] font-bold">
                        กดเลือก
                      </span>
                    )
                  ) : isOccupied ? (
                    <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#ffb347]" title="เวลารับประทานอาหารที่กำลังจับเวลา">
                      <span>⏱️</span>
                      <span>{elapsedTimer || "00:00"}</span>
                    </div>
                  ) : null}
                </div>

                {/* Order Item Count or Total Amount if Occupied (View mode only) */}
                {!selectionMode && isOccupied && (
                  <div className="pointer-events-none flex items-center justify-between text-[9px] text-white/60">
                    <span>{table.item_count > 0 ? `${table.item_count} จาน` : "เพิ่งเปิดโต๊ะ"}</span>
                    {table.current_order_total ? (
                      <span className="font-mono font-bold text-[#ffb347]">
                        ฿{Number(table.current_order_total).toLocaleString()}
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Table Details Modal (When clicked in Normal View Mode only) ── */}
      {!selectionMode && activeTableDetail && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-quick"
          onClick={() => setActiveTableDetail(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-white/15 bg-[#12121a] p-6 shadow-2xl animate-scale-in text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`size-12 rounded-xl flex items-center justify-center text-xl font-black ${
                    activeTableDetail.status === "OCCUPIED"
                      ? "bg-[#ff4757]/20 text-[#ff4757] border border-[#ff4757]/40"
                      : "bg-[#2dd4a8]/20 text-[#2dd4a8] border border-[#2dd4a8]/40"
                  }`}
                >
                  🪑
                </div>
                <div>
                  <h3 className="text-lg font-bold">โต๊ะ {activeTableDetail.table_number}</h3>
                  <span className="text-xs text-white/50">
                    ความจุ {activeTableDetail.capacity || 4} ที่นั่ง • โซน{" "}
                    {activeTableDetail.zone || "MAIN"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTableDetail(null)}
                className="size-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {/* Status Details */}
            <div className="py-5 space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-xs text-white/60">สถานะปัจจุบัน:</span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    activeTableDetail.status === "OCCUPIED"
                      ? "bg-[#ff4757]/20 text-[#ff4757] border border-[#ff4757]/30"
                      : "bg-[#2dd4a8]/20 text-[#2dd4a8] border border-[#2dd4a8]/30"
                  }`}
                >
                  {activeTableDetail.status === "OCCUPIED"
                    ? "🍽️ มีลูกค้านั่งรับประทาน (กำลังจับเวลา)"
                    : "✅ โต๊ะว่าง พร้อมให้บริการ"}
                </span>
              </div>

              {/* Realtime Timer & Session duration (if occupied) */}
              {activeTableDetail.status === "OCCUPIED" && (
                <div className="p-3.5 rounded-xl bg-[#ffb347]/10 border border-[#ffb347]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">⏱️</span>
                    <div>
                      <div className="text-xs font-bold text-[#ffb347] flex items-center gap-1.5">
                        <span>เวลารับประทานอาหาร:</span>
                        <span className="font-mono text-sm font-black">
                          {formatElapsed(
                            activeTableDetail.session_start_at ||
                              activeTableDetail.occupied_at ||
                              activeTableDetail.order_opened_at
                          ) || "00:00"}
                        </span>
                      </div>
                      <div className="text-[10px] text-white/50 mt-0.5">
                        เริ่มเมื่อ:{" "}
                        {activeTableDetail.session_start_at ||
                        activeTableDetail.occupied_at ||
                        activeTableDetail.order_opened_at
                          ? new Date(
                              activeTableDetail.session_start_at ||
                                activeTableDetail.occupied_at ||
                                activeTableDetail.order_opened_at
                            ).toLocaleTimeString("th-TH")
                          : "เพิ่งเริ่ม"}{" "}
                        น.
                      </div>
                    </div>
                  </div>
                  {onReleaseTable && (
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          window.confirm(
                            `ต้องการเคลียร์โต๊ะ ${activeTableDetail.table_number} ให้เป็นโต๊ะว่าง (สิ้นสุดเวลาทาน) ใช่หรือไม่?`
                          )
                        ) {
                          onReleaseTable(activeTableDetail.table_number);
                          setActiveTableDetail(null);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold transition"
                    >
                      เคลียร์โต๊ะให้ว่าง
                    </button>
                  )}
                </div>
              )}

              {/* Order Info (if occupied) */}
              {activeTableDetail.status === "OCCUPIED" ? (
                <div className="space-y-3 p-4 rounded-xl bg-black/40 border border-white/10 text-xs">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50">Order ID:</span>
                    <span className="font-mono font-bold text-white">
                      {activeTableDetail.current_order_id
                        ? `#${activeTableDetail.current_order_id.slice(0, 8)}...`
                        : "ยังไม่ได้ส่งออเดอร์ (กำลังเลือกเมนู)"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50">จำนวนรายการอาหาร:</span>
                    <span className="font-bold text-white">
                      {activeTableDetail.item_count || 0} รายการ
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-white/50 text-sm">ยอดรวมปัจจุบัน:</span>
                    <span className="text-base font-extrabold text-[#ffb347] font-mono">
                      ฿{Number(activeTableDetail.current_order_total || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#2dd4a8]/5 border border-[#2dd4a8]/20 text-xs text-[#2dd4a8] text-center">
                  โต๊ะนี้พร้อมสำหรับเปิดออเดอร์ใหม่ หรือจัดคิว/จองโต๊ะของลูกค้า
                </div>
              )}

              {/* Position Coordinate Info (For reference) */}
              <div className="flex items-center justify-between text-[11px] text-white/40 px-1 font-mono">
                <span>พิกัดผังร้าน:</span>
                <span>
                  X: {activeTableDetail.pos_x}px, Y: {activeTableDetail.pos_y}px
                </span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-white/10 flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTableDetail(null)}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
