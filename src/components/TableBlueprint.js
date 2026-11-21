"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * TableBlueprint Component
 * 
 * Interactive 2D floor plan / blueprint builder for restaurant dining tables.
 * - Admin Mode: Drag & Drop table positioning, grid snapping, save to MySQL database.
 * - Staff Mode: Read-only visual floor plan with live table status (Available / Occupied).
 * - Clearly indicates where the "หน้าร้าน / ทางเข้าร้าน" (Main Entrance) is located.
 * - Clicking a table displays current order and table status.
 */
export default function TableBlueprint({
  tables = [],
  layout = null,
  isAdmin = false,
  onSaveLayout = null,
  onAddTable = null,
  onRefresh = null,
  onTableClick = null,
  selectedTableId = null,
}) {
  // Local working copy of tables for dragging
  const [localTables, setLocalTables] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Dragging state
  const [dragState, setDragState] = useState(null); // { tableId, startMouseX, startMouseY, startTableX, startTableY }
  const canvasRef = useRef(null);

  // Detail Modal state when clicking a table
  const [activeTableDetail, setActiveTableDetail] = useState(null);

  // Canvas dimensions
  const canvasWidth = layout?.width || 940;
  const canvasHeight = layout?.height || 640;

  // Sync tables from props
  useEffect(() => {
    setLocalTables(tables.map((t) => ({ ...t })));
    setHasChanges(false);
  }, [tables]);

  // Keep activeTableDetail in sync if tables reload
  useEffect(() => {
    if (activeTableDetail) {
      const updated = localTables.find((t) => t.table_id === activeTableDetail.table_id);
      if (updated) setActiveTableDetail(updated);
    }
  }, [localTables]);

  // ── Drag & Drop Handlers (Admin Only) ──
  const handlePointerDown = (e, table) => {
    if (!isAdmin || !isEditMode) return;
    e.preventDefault();
    e.stopPropagation();

    setDragState({
      tableId: table.table_id,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startTableX: Number(table.pos_x) || 0,
      startTableY: Number(table.pos_y) || 0,
    });
  };

  const handlePointerMove = useCallback(
    (e) => {
      if (!dragState) return;

      const deltaX = e.clientX - dragState.startMouseX;
      const deltaY = e.clientY - dragState.startMouseY;

      // Snap to 10px grid
      let newX = Math.round((dragState.startTableX + deltaX) / 10) * 10;
      let newY = Math.round((dragState.startTableY + deltaY) / 10) * 10;

      // Clamp within canvas boundaries (margin of 20px)
      newX = Math.max(20, Math.min(canvasWidth - 140, newX));
      newY = Math.max(80, Math.min(canvasHeight - 160, newY));

      setLocalTables((prev) =>
        prev.map((t) =>
          t.table_id === dragState.tableId ? { ...t, pos_x: newX, pos_y: newY } : t
        )
      );
      setHasChanges(true);
    },
    [dragState, canvasWidth, canvasHeight]
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
      await onSaveLayout(localTables, layout);
      setHasChanges(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save error:", err);
      alert("บันทึกตำแหน่งโต๊ะไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  };

  // ── Reset to original ──
  const handleReset = () => {
    setLocalTables(tables.map((t) => ({ ...t })));
    setHasChanges(false);
  };

  // ── Table Click ──
  const handleTableClick = (table) => {
    if (isEditMode) return; // In edit mode, clicking is for dragging
    if (onTableClick) {
      onTableClick(table);
    } else {
      setActiveTableDetail(table);
    }
  };

  const availableCount = localTables.filter((t) => t.status === "AVAILABLE").length;
  const occupiedCount = localTables.filter((t) => t.status === "OCCUPIED").length;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* ── Toolbar & Control Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
        {/* Status Indicators & Counts */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#2dd4a8] shadow-[0_0_8px_#2dd4a8]" />
            <span className="text-white/80">โต๊ะว่าง ({availableCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#ff4757] shadow-[0_0_8px_#ff4757]" />
            <span className="text-white/80">มีลูกค้า ({occupiedCount})</span>
          </div>
          <div className="text-white/40 border-l border-white/10 pl-3">
            ทั้งหมด {localTables.length} โต๊ะ
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {isAdmin ? (
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
                <span>{isEditMode ? "✏️ กำลังจัดผัง (เปิดใช้งาน)" : "✏️ จัดตำแหน่งโต๊ะ (Drag & Drop)"}</span>
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
                🔒 โหมดดูผังร้าน (เฉพาะ Admin เท่านั้นที่แก้ไขตำแหน่งได้)
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
          <span>✅ บันทึกตำแหน่งผังโต๊ะอาหารลงฐานข้อมูล MySQL เรียบร้อยแล้ว!</span>
          <button onClick={() => setSaveSuccess(false)} className="text-white/40 hover:text-white text-xs">✕</button>
        </div>
      )}

      {/* Edit Mode Helper Notification */}
      {isAdmin && isEditMode && (
        <div className="px-4 py-2 rounded-xl bg-[#ffb347]/10 border border-[#ffb347]/30 text-[#ffb347] text-xs flex items-center gap-2">
          <span>💡</span>
          <span>
            <strong>โหมดจัดผังร้าน:</strong> คลิกแล้วลากโต๊ะอาหารไปยังตำแหน่งที่ต้องการในแปลนร้าน
            เมื่อจัดเสร็จแล้วอย่าลืมกดปุ่ม <strong>&quot;บันทึกผังโต๊ะ&quot;</strong> สีเขียวด้านบน
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

          {/* Blueprint Compass / Coordinate Markers */}
          <div className="absolute top-3 left-4 text-[10px] font-mono tracking-widest text-white/30 uppercase">
            REST_FLOOR_PLAN • 940x640px
          </div>

          {/* ── 2. LANDMARKS ── */}

          {/* Kitchen / Food Pickup (Top Center) */}
          <div
            style={{ left: "300px", top: "18px", width: "340px", height: "46px" }}
            className="absolute rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center gap-2 text-xs font-bold text-white/60 shadow-inner"
          >
            <span>🍳</span>
            <span>ครัวหลัก & เคาน์เตอร์รับอาหาร (KITCHEN & PICKUP)</span>
          </div>

          {/* Restrooms (Top Left) */}
          <div
            style={{ left: "25px", top: "18px", width: "120px", height: "46px" }}
            className="absolute rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center gap-1.5 text-[11px] font-semibold text-white/50"
          >
            <span>🚻</span>
            <span>ห้องน้ำ</span>
          </div>

          {/* Cashier & Beverage Bar (Bottom Right) */}
          <div
            style={{ left: "710px", top: "500px", width: "190px", height: "65px" }}
            className="absolute rounded-xl border border-[#ffb347]/30 bg-[#ffb347]/10 flex flex-col items-center justify-center gap-0.5 text-xs font-bold text-[#ffb347]"
          >
            <div className="flex items-center gap-1.5">
              <span>💵</span>
              <span>แคชเชียร์ & บาร์น้ำ</span>
            </div>
            <span className="text-[10px] text-[#ffb347]/70 font-normal">CASHIER & BAR</span>
          </div>

          {/* ── ⭐ PRIMARY LANDMARK: หน้าร้าน / ทางเข้าร้าน (BOTTOM) ⭐ ── */}
          <div
            style={{ left: "260px", top: "545px", width: "420px", height: "70px" }}
            className="absolute rounded-2xl border-2 border-dashed border-[#2dd4a8]/50 bg-[#2dd4a8]/10 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-lg shadow-[#2dd4a8]/10"
          >
            <div className="flex items-center gap-2 text-sm font-black text-[#2dd4a8] tracking-wide uppercase">
              <span className="text-lg">🚪</span>
              <span>ทางเข้าร้าน (ฝั่งหน้าร้าน)</span>
              <span className="text-lg">🚪</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#2dd4a8]/80 mt-0.5">
              <span>▲ MAIN ENTRANCE / FRONT OF RESTAURANT ▲</span>
            </div>
          </div>

          {/* ── 3. DINING TABLES ── */}
          {localTables.map((table) => {
            const isOccupied = table.status === "OCCUPIED";
            const isDragging = dragState?.tableId === table.table_id;
            const isSelected = selectedTableId === table.table_id;
            const isLarge = Number(table.capacity) >= 6;
            const isRound = table.shape === "round";

            const width = isLarge ? 140 : 100;
            const height = 85;

            return (
              <div
                key={table.table_id}
                onPointerDown={(e) => handlePointerDown(e, table)}
                onClick={() => handleTableClick(table)}
                style={{
                  left: `${table.pos_x}px`,
                  top: `${table.pos_y}px`,
                  width: `${width}px`,
                  height: `${height}px`,
                  zIndex: isDragging ? 50 : isSelected ? 40 : 20,
                  transform: isDragging ? "scale(1.05)" : "scale(1)",
                  cursor: isEditMode ? "grab" : "pointer",
                }}
                className={`absolute transition-transform duration-75 select-none rounded-2xl border-2 p-2 flex flex-col justify-between backdrop-blur-md shadow-xl ${
                  isOccupied
                    ? "border-[#ff4757]/80 bg-[#ff4757]/15 shadow-[#ff4757]/20 text-white"
                    : "border-[#2dd4a8]/70 bg-[#12121e]/90 shadow-black/40 text-white hover:border-[#2dd4a8]"
                } ${isDragging ? "ring-4 ring-[#ffb347] shadow-2xl cursor-grabbing" : ""} ${
                  isSelected ? "ring-2 ring-white" : ""
                } ${isRound ? "rounded-full" : ""}`}
                title={`โต๊ะ ${table.table_number} (${table.status === "AVAILABLE" ? "ว่าง" : "มีลูกค้า"})`}
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
                      isOccupied
                        ? "bg-[#ff4757]/30 text-[#ff8b94]"
                        : "bg-[#2dd4a8]/20 text-[#2dd4a8]"
                    }`}
                  >
                    {isOccupied ? "มีลูกค้า" : "ว่าง"}
                  </span>

                  {isOccupied && table.current_order_total && (
                    <span className="text-[10px] font-mono font-bold text-[#ffb347]">
                      ฿{Number(table.current_order_total).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Order Item Count if Occupied */}
                {isOccupied && table.item_count > 0 && (
                  <div className="pointer-events-none text-[9px] text-white/50 text-right">
                    {table.item_count} จาน
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Table Details Modal (When clicked in View Mode) ── */}
      {activeTableDetail && (
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
                    ความจุ {activeTableDetail.capacity || 4} ที่นั่ง • โซน {activeTableDetail.zone || "MAIN"}
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
                  {activeTableDetail.status === "OCCUPIED" ? "🍽️ มีลูกค้านั่งรับประทาน" : "✅ โต๊ะว่าง พร้อมให้บริการ"}
                </span>
              </div>

              {/* Order Info (if occupied) */}
              {activeTableDetail.status === "OCCUPIED" ? (
                <div className="space-y-3 p-4 rounded-xl bg-black/40 border border-white/10 text-xs">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50">Order ID:</span>
                    <span className="font-mono font-bold text-white">
                      #{activeTableDetail.current_order_id?.slice(0, 8)}...
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50">จำนวนรายการอาหาร:</span>
                    <span className="font-bold text-white">{activeTableDetail.item_count || 0} รายการ</span>
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
                <span>X: {activeTableDetail.pos_x}px, Y: {activeTableDetail.pos_y}px</span>
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
