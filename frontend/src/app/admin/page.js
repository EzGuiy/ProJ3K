"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MdAttachMoney,
  MdReceiptLong,
  MdTrendingUp,
  MdPeople,
  MdArrowForward,
  MdRestaurantMenu,
  MdInventory2,
  MdTableRestaurant,
} from "react-icons/md";
import { getAdminStats, getAdminOrders } from "@/lib/api";
import { getStatusMeta } from "@/lib/tableStatus";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/tables", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : { tables: [] }))
      .then((data) => {
        if (active) setTables(data.tables || []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    async function loadAdminData() {
      setLoading(true);
      try {
        const [statsData, ordersData] = await Promise.allSettled([
          getAdminStats(),
          getAdminOrders({ limit: 5 }),
        ]);
        if (statsData.status === "fulfilled") setStats(statsData.value);
        if (ordersData.status === "fulfilled") setRecentOrders(ordersData.value?.orders || ordersData.value || []);
      } catch {
        // ไม่มีข้อมูลให้แสดงก็ปล่อยว่างไว้
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();
  }, []);

  const statCards = [
    {
      label: "ยอดขายวันนี้",
      value: stats?.todaySales ? `฿${stats.todaySales.toLocaleString()}` : "฿0",
      sub: stats ? "อัปเดตจาก Backend" : "",
      Icon: MdAttachMoney,
    },
    {
      label: "ออเดอร์ทั้งหมด",
      value: stats?.totalOrders ?? 0,
      unit: "รายการ",
      sub: stats ? "อัปเดตจาก Backend" : "",
      Icon: MdReceiptLong,
    },
    {
      label: "เมนูขายดีสุด",
      value: stats?.topMenuItem || "—",
      sub: stats ? "อัปเดตจาก Backend" : "",
      Icon: MdTrendingUp,
    },
    {
      label: "พนักงานประจำการ",
      value: stats?.activeStaffCount ?? 0,
      unit: "คน",
      sub: stats ? "อัปเดตจาก Backend" : "",
      Icon: MdPeople,
    },
  ];

  const tableCounts = {
    ALL: tables.length,
    AVAILABLE: tables.filter((t) => t.status === "AVAILABLE").length,
    RESERVED: tables.filter((t) => t.status === "RESERVED").length,
    OCCUPIED: tables.filter((t) => t.status === "OCCUPIED").length,
  };

  return (
    <div className="flex flex-col gap-5">

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-[#5f6368] text-[0.875rem] gap-3">
          <div className="w-5 h-5 border-2 border-[#5f6368] border-t-[#ff6b35] rounded-full animate-spin" />
          กำลังโหลดข้อมูล...
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {statCards.map(({ label, value, unit, sub, Icon }) => (
              <div key={label} className="bg-[#1c1c1e] border border-white/[0.08] rounded-xl p-4 hover:border-white/[0.14] transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[0.75rem] text-[#9aa0a6] font-medium">{label}</span>
                  <Icon className="text-[#5f6368] text-[1.1rem]" />
                </div>
                <div className="text-[1.5rem] font-semibold text-[#e8eaed] leading-none">
                  {value}
                  {unit && <span className="text-[0.875rem] font-normal text-[#9aa0a6] ml-1">{unit}</span>}
                </div>
                <p className="text-[0.7rem] text-[#5f6368] mt-2">{sub}</p>
              </div>
            ))}
          </div>

          {/* Table status */}
          <div className="bg-[#1c1c1e] border border-white/[0.08] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] gap-3 flex-wrap">
              <div>
                <h2 className="text-[0.9rem] font-semibold text-[#e8eaed]">สถานะโต๊ะอาหาร</h2>
                <p className="text-[0.72rem] text-[#5f6368] mt-0.5">
                  ทั้งหมด {tableCounts.ALL} โต๊ะ · ว่าง {tableCounts.AVAILABLE} · จอง {tableCounts.RESERVED} · เต็ม {tableCounts.OCCUPIED}
                </p>
              </div>
              <Link
                href="/admin/set_table"
                className="flex items-center gap-1 text-[0.78rem] text-[#ff6b35] hover:underline no-underline"
              >
                จัดการโต๊ะ <MdArrowForward className="text-sm" />
              </Link>
            </div>

            <div className="p-5">
              {tables.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-[#5f6368] gap-2">
                  <MdTableRestaurant className="text-3xl" />
                  <p className="text-[0.85rem]">ยังไม่มีข้อมูลโต๊ะ</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2.5">
                  {tables.map((table) => {
                    const meta = getStatusMeta(table.status);
                    return (
                      <div
                        key={table.table_id}
                        className={`rounded-lg border px-3 py-2.5 ${meta.bg} ${meta.border}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[0.92rem] font-semibold text-[#e8eaed] truncate">
                            โต๊ะ {table.table_number}
                          </span>
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${meta.dot}`} />
                        </div>
                        <p className={`text-[0.72rem] font-medium mt-0.5 ${meta.text}`}>{meta.label}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-[#1c1c1e] border border-white/[0.08] rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-[0.9rem] font-semibold text-[#e8eaed]">Admin Control Center</h2>
              <p className="text-[0.78rem] text-[#9aa0a6] mt-0.5">จัดการเมนู ออเดอร์ และพนักงานผ่าน Sidebar ด้านซ้าย</p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/admin/menu"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ff6b35]/10 text-[#ff6b35] text-[0.8rem] font-medium hover:bg-[#ff6b35]/20 transition-colors no-underline"
              >
                <MdRestaurantMenu className="text-base" />
                จัดการเมนู
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.05] text-[#e8eaed] text-[0.8rem] font-medium hover:bg-white/[0.09] transition-colors no-underline"
              >
                <MdReceiptLong className="text-base" />
                ออเดอร์
              </Link>
            </div>
          </div>

          {/* Recent orders */}
          <div className="bg-[#1c1c1e] border border-white/[0.08] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
              <div>
                <h2 className="text-[0.9rem] font-semibold text-[#e8eaed]">คำสั่งซื้อล่าสุด</h2>
                <p className="text-[0.72rem] text-[#5f6368] mt-0.5">GET /api/admin/orders</p>
              </div>
              <Link
                href="/admin/orders"
                className="flex items-center gap-1 text-[0.78rem] text-[#ff6b35] hover:underline no-underline"
              >
                ดูทั้งหมด <MdArrowForward className="text-sm" />
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-[#5f6368] gap-2">
                <MdInventory2 className="text-3xl" />
                <p className="text-[0.85rem]">ยังไม่มีข้อมูลออเดอร์จาก Backend</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-[0.82rem]">
                  <thead>
                    <tr className="text-[#5f6368] border-b border-white/[0.06]">
                      {["รหัส", "โต๊ะ", "รายการ", "ยอดรวม", "สถานะ", "เวลา"].map((h) => (
                        <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((ord) => (
                      <tr key={ord.id || ord._id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3 font-medium text-[#ff6b35]">{ord.orderNumber || ord.id}</td>
                        <td className="px-5 py-3 text-[#e8eaed]">{ord.tableName || ord.table || "กลับบ้าน"}</td>
                        <td className="px-5 py-3 text-[#9aa0a6]">
                          {Array.isArray(ord.items) ? ord.items.map((i) => `${i.name} x${i.quantity || 1}`).join(", ") : ord.items}
                        </td>
                        <td className="px-5 py-3 font-medium text-[#e8eaed]">฿{ord.totalPrice || ord.price || 0}</td>
                        <td className="px-5 py-3">
                          <span className="px-2 py-0.5 rounded text-[0.72rem] font-medium bg-[#ff6b35]/15 text-[#ff6b35]">
                            {ord.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-[#5f6368]">
                          {ord.createdAt ? new Date(ord.createdAt).toLocaleTimeString("th-TH") : ord.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}