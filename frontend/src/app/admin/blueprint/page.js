"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TableBlueprint from "@/components/TableBlueprint";

export default function AdminBlueprintPage() {
  const router = useRouter();
  const [tables, setTables] = useState([]);
  const [layout, setLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTables = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/tables", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "โหลดผังโต๊ะไม่สำเร็จ");
      setTables(data.tables || []);
      setLayout(data.layout || null);
    } catch (err) {
      setError(err.message || "โหลดผังโต๊ะไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTables();
  }, [loadTables]);

  const saveLayout = async (updatedTables, updatedLayout) => {
    const response = await fetch("/api/admin/tables", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tables: updatedTables, layout: updatedLayout }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "บันทึกผังโต๊ะไม่สำเร็จ");
    setTables(updatedTables);
    setLayout(updatedLayout);
  };

  const releaseTable = async (tableNumber) => {
    try {
      const response = await fetch("/api/tables", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tableNumber: String(tableNumber), action: "release" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "เคลียร์โต๊ะไม่สำเร็จ");
      await loadTables();
    } catch (err) {
      setError(err.message || "เคลียร์โต๊ะไม่สำเร็จ");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold text-[#e8eaed]">ผังร้านอาหาร</h2>
        <p className="text-sm text-[#9aa0a6]">
          ลากโต๊ะและจุดสำคัญเพื่อจัดตำแหน่ง แล้วกดบันทึกผัง
        </p>
      </div>
      {error && (
        <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}
      {loading ? (
        <p className="py-12 text-center text-sm text-[#9aa0a6]">กำลังโหลดผังโต๊ะ...</p>
      ) : (
        <TableBlueprint
          tables={tables}
          layout={layout}
          isAdmin
          onSaveLayout={saveLayout}
          onAddTable={() => router.push("/admin/set_table")}
          onRefresh={loadTables}
          onReleaseTable={releaseTable}
        />
      )}
    </div>
  );
}
