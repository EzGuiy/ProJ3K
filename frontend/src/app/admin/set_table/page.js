"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MdTableRestaurant,
  MdAdd,
  MdDeleteOutline,
  MdRefresh,
  MdCheckCircle,
  MdEventSeat,
  MdBlock,
  MdSchedule,
} from "react-icons/md";
import {
  TABLE_STATUS_META,
  getStatusMeta,
  formatClockTime,
  formatElapsed,
} from "@/lib/tableStatus";

const STATUS_KEYS = Object.keys(TABLE_STATUS_META);

const SUMMARY_CARDS = [
  { key: "ALL", label: "โต๊ะทั้งหมด", Icon: MdTableRestaurant, color: "text-[#e8eaed]", badge: "bg-white/[0.08]" },
  { key: "AVAILABLE", label: "ว่าง", Icon: MdCheckCircle, color: "text-[#34a853]", badge: "bg-[#34a853]/15" },
  { key: "RESERVED", label: "จอง", Icon: MdEventSeat, color: "text-[#fbbc04]", badge: "bg-[#fbbc04]/15" },
  { key: "OCCUPIED", label: "เต็ม", Icon: MdBlock, color: "text-[#ea4335]", badge: "bg-[#ea4335]/15" },
];

export default function AdminTablesPage() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [tableNumber, setTableNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const loadTables = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/tables", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "โหลดข้อมูลโต๊ะไม่สำเร็จ");
      setTables(data.tables || []);
    } catch (err) {
      setError(err.message || "โหลดข้อมูลโต๊ะไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTables();
  }, [loadTables]);

  const counts = useMemo(() => {
    const result = { ALL: tables.length, AVAILABLE: 0, RESERVED: 0, OCCUPIED: 0 };
    tables.forEach((t) => {
      if (result[t.status] !== undefined) result[t.status] += 1;
    });
    return result;
  }, [tables]);

  const flash = (text) => {
    setMessage(text);
    setError("");
    window.setTimeout(() => setMessage(""), 2500);
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    const number = tableNumber.trim();
    if (!number) {
      setError("กรุณาระบุหมายเลขโต๊ะ");
      return;
    }

    setBusyId("add");
    setError("");
    try {
      const res = await fetch("/api/admin/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table_number: number }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "เพิ่มโต๊ะไม่สำเร็จ");
      setTableNumber("");
      flash(`เพิ่มโต๊ะ ${number} สำเร็จ`);
      await loadTables();
    } catch (err) {
      setError(err.message || "เพิ่มโต๊ะไม่สำเร็จ");
    } finally {
      setBusyId(null);
    }
  };

  const handleStatus = async (tableId, status) => {
    setBusyId(tableId);
    setError("");
    try {
      const res = await fetch(`/api/admin/tables/${tableId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "อัปเดตสถานะไม่สำเร็จ");
      const patch = {
        status: data.status || status,
        order_opened_at:
          data.order_opened_at !== undefined
            ? data.order_opened_at
            : status === "OCCUPIED"
              ? new Date().toISOString()
              : null,
      };
      setNow(Date.now());
      setTables((prev) =>
        prev.map((t) => (t.table_id === tableId ? { ...t, ...patch } : t))
      );
    } catch (err) {
      setError(err.message || "อัปเดตสถานะไม่สำเร็จ");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (tableId, number) => {
    if (!confirm(`ต้องการลบโต๊ะ ${number} หรือไม่?`)) return;

    setBusyId(tableId);
    setError("");
    try {
      const res = await fetch(`/api/admin/tables/${tableId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "ลบโต๊ะไม่สำเร็จ");
      setTables((prev) => prev.filter((t) => t.table_id !== tableId));
      flash(`ลบโต๊ะ ${number} สำเร็จ`);
    } catch (err) {
      setError(err.message || "ลบโต๊ะไม่สำเร็จ");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="flex flex-col gap-5">

      {/* Summary — new design: segmented status bar + cards */}
      <div className="bg-[#1c1c1e] border border-white/[0.08] rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.12em] text-[#5f6368] font-semibold">ภาพรวมโต๊ะ</p>
            <p className="text-[1.35rem] font-semibold text-[#e8eaed] leading-tight mt-0.5">
              {counts.ALL} <span className="text-[0.85rem] font-medium text-[#9aa0a6]">โต๊ะในระบบ</span>
            </p>
          </div>
          <div className="flex items-center gap-3 text-[0.72rem] flex-wrap">
            <span className="flex items-center gap-1.5 text-[#81c995]"><span className="w-2 h-2 rounded-full bg-[#34a853]" />ว่าง {counts.AVAILABLE}</span>
            <span className="flex items-center gap-1.5 text-[#fdd663]"><span className="w-2 h-2 rounded-full bg-[#fbbc04]" />จอง {counts.RESERVED}</span>
            <span className="flex items-center gap-1.5 text-[#f28b82]"><span className="w-2 h-2 rounded-full bg-[#ea4335]" />เต็ม {counts.OCCUPIED}</span>
          </div>
        </div>
        <div className="h-2.5 rounded-full bg-white/[0.06] overflow-hidden flex">
          {counts.ALL > 0 ? (
            <>
              <div className="bg-[#34a853] transition-all duration-500" style={{ width: `${(counts.AVAILABLE / counts.ALL) * 100}%` }} />
              <div className="bg-[#fbbc04] transition-all duration-500" style={{ width: `${(counts.RESERVED / counts.ALL) * 100}%` }} />
              <div className="bg-[#ea4335] transition-all duration-500" style={{ width: `${(counts.OCCUPIED / counts.ALL) * 100}%` }} />
            </>
          ) : null}
        </div>
        <p className="text-[0.68rem] text-[#5f6368] mt-2.5">* กดสถานะ <span className="text-[#f28b82]">เต็ม</span> เพื่อเริ่มจับเวลาโต๊ะอัตโนมัติ (แสดงเวลาทุกโต๊ะ)</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {SUMMARY_CARDS.map(({ key, label, Icon, color, badge }) => (
          <div
            key={key}
            className="bg-[#1c1c1e] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between hover:border-white/[0.14] transition-colors"
          >
            <div>
              <p className="text-[0.75rem] text-[#9aa0a6] font-medium">{label}</p>
              <p className={`text-[1.7rem] font-semibold leading-none mt-1 tabular-nums ${color}`}>
                {counts[key]}
              </p>
            </div>
            <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${badge}`}>
              <Icon className={`text-[1.2rem] ${color}`} />
            </span>
          </div>
        ))}
      </div>

      {/* Add table */}
      <form
        onSubmit={handleAdd}
        className="bg-[#1c1c1e] border border-white/[0.08] rounded-xl p-4 flex flex-wrap items-end gap-3"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="table-number" className="text-[0.75rem] text-[#9aa0a6] font-medium">
            เพิ่มโต๊ะใหม่
          </label>
          <input
            id="table-number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder="หมายเลขโต๊ะ เช่น 9"
            className="h-10 w-[220px] px-3 rounded-xl bg-[#111111] border border-white/[0.1] text-[0.85rem] text-[#e8eaed] placeholder:text-[#5f6368] focus:border-[#ff6b35] outline-none transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={busyId === "add"}
          className="h-10 flex items-center gap-1.5 px-4 rounded-xl bg-[#ff6b35] text-white text-[0.82rem] font-semibold hover:bg-[#ff7f50] transition-colors cursor-pointer disabled:opacity-50"
        >
          <MdAdd className="text-lg" /> เพิ่มโต๊ะ
        </button>

        <button
          type="button"
          onClick={loadTables}
          className="h-10 flex items-center gap-1.5 px-3 rounded-xl border border-white/[0.1] text-[0.82rem] text-[#9aa0a6] hover:bg-white/[0.05] hover:text-[#e8eaed] transition-colors cursor-pointer ml-auto"
        >
          <MdRefresh className="text-base" /> รีเฟรช
        </button>
      </form>

      {message && (
        <div className="text-[0.8rem] text-[#81c995] bg-[#1e3a2a] border border-[#34a853]/30 rounded-xl px-4 py-2.5">
          {message}
        </div>
      )}
      {error && (
        <div className="text-[0.8rem] text-[#f28b82] bg-[#2d1e1e] border border-[#ea4335]/30 rounded-xl px-4 py-2.5">
          {error}
        </div>
      )}

      {/* Table grid — redesigned cards */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-[#5f6368] text-[0.875rem] gap-3">
          <div className="w-5 h-5 border-2 border-[#5f6368] border-t-[#ff6b35] rounded-full animate-spin" />
          กำลังโหลดข้อมูล...
        </div>
      ) : tables.length === 0 ? (
        <div className="bg-[#1c1c1e] border border-white/[0.08] rounded-2xl py-16 flex flex-col items-center gap-2 text-[#5f6368]">
          <MdTableRestaurant className="text-4xl" />
          <p className="text-[0.875rem] font-medium text-[#9aa0a6]">ยังไม่มีโต๊ะในระบบ</p>
          <p className="text-[0.78rem]">เพิ่มโต๊ะหมายเลขแรกได้จากช่องด้านบน</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {tables.map((table) => {
            const meta = getStatusMeta(table.status);
            const isBusy = busyId === table.table_id;
            const isOccupied = table.status === "OCCUPIED";
            const clock = formatClockTime(table.order_opened_at);
            const elapsed = isOccupied ? formatElapsed(table.order_opened_at, now) : "";

            return (
              <div
                key={table.table_id}
                className={`relative bg-[#1c1c1e] border rounded-2xl p-4 flex flex-col gap-3 transition-all hover:-translate-y-[1px] ${
                  isOccupied ? "border-[#ea4335]/25 shadow-[0_0_0_1px_rgba(234,67,53,0.06)]" : "border-white/[0.08] hover:border-white/[0.14]"
                }`}
              >
                <div className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full ${meta.dot}`} />

                <div className="flex items-start justify-between gap-3 pl-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${meta.bg} ${meta.border}`}>
                      <span className={`text-[1.05rem] font-bold tabular-nums ${meta.text}`}>{table.table_number}</span>
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.68rem] uppercase tracking-[0.08em] text-[#5f6368]">Table</p>
                      <p className="text-[0.95rem] font-semibold text-[#e8eaed] leading-tight">โต๊ะ {table.table_number}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.72rem] font-semibold border shrink-0 ${meta.bg} ${meta.border} ${meta.text}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${meta.dot} ${isOccupied ? "animate-pulse" : ""}`} />
                    {meta.label}
                  </span>
                </div>

                <div
                  className={`ml-2 rounded-xl px-3 py-2.5 border ${
                    isOccupied && elapsed
                      ? "bg-gradient-to-r from-[#ea4335]/[0.1] to-transparent border-[#ea4335]/20"
                      : "bg-[#111111]/60 border-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <MdSchedule className={`text-base shrink-0 ${isOccupied && elapsed ? "text-[#f28b82]" : "text-[#5f6368]"}`} />
                      <div className="min-w-0">
                        <p className="text-[0.65rem] uppercase tracking-[0.06em] text-[#5f6368]">
                          {isOccupied ? "ใช้งานมาแล้ว (จับเวลาอัตโนมัติ)" : "เวลาใช้งาน"}
                        </p>
                        {isOccupied && elapsed ? (
                          <p className="text-[1rem] font-semibold text-[#f28b82] tabular-nums leading-tight">{elapsed}</p>
                        ) : (
                          <p className="text-[0.85rem] font-medium text-[#5f6368] leading-tight">—</p>
                        )}
                      </div>
                    </div>
                    {isOccupied && clock ? (
                      <div className="text-right shrink-0">
                        <p className="text-[0.62rem] text-[#5f6368]">เริ่มเมื่อ</p>
                        <p className="text-[0.82rem] font-semibold text-[#e8eaed] tabular-nums">{clock} น.</p>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-1.5 pl-2">
                  {STATUS_KEYS.map((key) => {
                    const option = TABLE_STATUS_META[key];
                    const isCurrent = table.status === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        disabled={isCurrent || isBusy}
                        onClick={() => handleStatus(table.table_id, key)}
                        className={`flex-1 px-2 py-2 rounded-lg text-[0.74rem] font-semibold border transition-all ${
                          isCurrent
                            ? option.active
                            : "border-white/[0.08] text-[#9aa0a6] hover:bg-white/[0.06] hover:text-[#e8eaed] cursor-pointer"
                        } disabled:cursor-default`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => handleDelete(table.table_id, table.table_number)}
                  className="self-end flex items-center gap-1 text-[0.72rem] text-[#5f6368] hover:text-[#ea4335] transition-colors cursor-pointer disabled:opacity-50 pr-1"
                >
                  <MdDeleteOutline className="text-sm" /> ลบโต๊ะ
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
