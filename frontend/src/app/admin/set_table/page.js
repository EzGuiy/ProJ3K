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
} from "react-icons/md";
import { TABLE_STATUS_META, getStatusMeta } from "@/lib/tableStatus";

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
      setTables((prev) =>
        prev.map((t) => (t.table_id === tableId ? { ...t, status } : t))
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

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {SUMMARY_CARDS.map(({ key, label, Icon, color, badge }) => (
          <div
            key={key}
            className="bg-[#1c1c1e] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-[0.75rem] text-[#9aa0a6] font-medium">{label}</p>
              <p className={`text-[1.6rem] font-semibold leading-none mt-1 ${color}`}>
                {counts[key]}
              </p>
            </div>
            <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${badge}`}>
              <Icon className={`text-[1.15rem] ${color}`} />
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
            className="h-9 w-[200px] px-3 rounded-lg bg-[#111111] border border-white/[0.1] text-[0.85rem] text-[#e8eaed] placeholder:text-[#5f6368] focus:border-[#ff6b35] outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={busyId === "add"}
          className="h-9 flex items-center gap-1.5 px-4 rounded-lg bg-[#ff6b35]/10 text-[#ff6b35] text-[0.82rem] font-medium hover:bg-[#ff6b35]/20 transition-colors cursor-pointer disabled:opacity-50"
        >
          <MdAdd className="text-base" /> เพิ่มโต๊ะ
        </button>

        <button
          type="button"
          onClick={loadTables}
          className="h-9 flex items-center gap-1.5 px-3 rounded-lg border border-white/[0.1] text-[0.82rem] text-[#9aa0a6] hover:bg-white/[0.05] transition-colors cursor-pointer ml-auto"
        >
          <MdRefresh className="text-base" /> รีเฟรช
        </button>
      </form>

      {message && (
        <div className="text-[0.8rem] text-[#81c995] bg-[#1e3a2a] border border-[#34a853]/30 rounded-lg px-4 py-2.5">
          {message}
        </div>
      )}
      {error && (
        <div className="text-[0.8rem] text-[#f28b82] bg-[#2d1e1e] border border-[#ea4335]/30 rounded-lg px-4 py-2.5">
          {error}
        </div>
      )}

      {/* Table grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-[#5f6368] text-[0.875rem] gap-3">
          <div className="w-5 h-5 border-2 border-[#5f6368] border-t-[#ff6b35] rounded-full animate-spin" />
          กำลังโหลดข้อมูล...
        </div>
      ) : tables.length === 0 ? (
        <div className="bg-[#1c1c1e] border border-white/[0.08] rounded-xl py-16 flex flex-col items-center gap-2 text-[#5f6368]">
          <MdTableRestaurant className="text-4xl" />
          <p className="text-[0.875rem] font-medium text-[#9aa0a6]">ยังไม่มีโต๊ะในระบบ</p>
          <p className="text-[0.78rem]">เพิ่มโต๊ะหมายเลขแรกได้จากช่องด้านบน</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {tables.map((table) => {
            const meta = getStatusMeta(table.status);
            const isBusy = busyId === table.table_id;

            return (
              <div
                key={table.table_id}
                className="bg-[#1c1c1e] border border-white/[0.08] rounded-xl p-4 flex flex-col gap-3 hover:border-white/[0.14] transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                      <MdTableRestaurant className="text-[1.15rem] text-[#9aa0a6]" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.7rem] text-[#5f6368] leading-tight">โต๊ะ</p>
                      <p className="text-[1.05rem] font-semibold text-[#e8eaed] leading-tight truncate">
                        {table.table_number}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[0.7rem] font-semibold border shrink-0 ${meta.bg} ${meta.border} ${meta.text}`}
                  >
                    {meta.label}
                  </span>
                </div>

                <div className="flex gap-1.5">
                  {STATUS_KEYS.map((key) => {
                    const option = TABLE_STATUS_META[key];
                    const isCurrent = table.status === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        disabled={isCurrent || isBusy}
                        onClick={() => handleStatus(table.table_id, key)}
                        className={`flex-1 px-2 py-1.5 rounded-md text-[0.72rem] font-medium border transition-colors ${
                          isCurrent
                            ? option.active
                            : "border-white/[0.08] text-[#9aa0a6] hover:bg-white/[0.05] hover:text-[#e8eaed] cursor-pointer"
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
                  className="self-end flex items-center gap-1 text-[0.72rem] text-[#5f6368] hover:text-[#ea4335] transition-colors cursor-pointer disabled:opacity-50"
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
