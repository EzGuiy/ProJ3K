"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MdDashboard,
  MdRestaurantMenu,
  MdReceiptLong,
  MdPeople,
  MdBarChart,
  MdSettings,
  MdLogout,
  MdMenu,
  MdChevronLeft,
  MdChevronRight,
  MdCircle,
  MdLocalFireDepartment,
  MdStorefront,
  MdTableRestaurant,
} from "react-icons/md";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { href: "/admin", label: "ภาพรวมระบบ", Icon: MdDashboard },
    { href: "/admin/menu", label: "จัดการเมนูอาหาร", Icon: MdRestaurantMenu },
    { href: "/admin/orders", label: "คำสั่งซื้อล่าสุด", Icon: MdReceiptLong, },
    { href: "/admin/userEdit", label: "จัดการพนักงาน", Icon: MdPeople },
    { href: "/admin/set_table", label: "จัดการโต๊ะ", Icon: MdTableRestaurant },
    { href: "/admin/blueprint", label: "ผังร้าน", Icon: MdTableRestaurant },
    { href: "/admin/settings", label: "ตั้งค่าระบบ", Icon: MdSettings },
  ];

  const handleLogout = () => {
    if (confirm("ต้องการออกจากระบบผู้ดูแลระบบหรือไม่?")) {
      router.push("/");
    }
  };

  const getPageTitle = () => {
    switch (pathname) {
      case "/admin": return { title: "ภาพรวมระบบ", subtitle: "Dashboard" };
      case "/admin/menu": return { title: "จัดการเมนูอาหาร", subtitle: "Menu Management" };
      case "/admin/orders": return { title: "คำสั่งซื้อ", subtitle: "Orders" };
      case "/admin/userEdit": return { title: "จัดการพนักงาน", subtitle: "Staff Management" };
      case "/admin/set_table": return { title: "จัดการโต๊ะ", subtitle: "Table Management" };
      case "/admin/blueprint": return { title: "ผังร้าน", subtitle: "Restaurant Blueprint" };
      case "/admin/reports": return { title: "รายงานยอดขาย", subtitle: "Reports" };
      case "/admin/settings": return { title: "ตั้งค่าระบบ", subtitle: "Settings" };
      default: return { title: "Admin", subtitle: "ครัวสุดโหด" };
    }
  };

  const currentMeta = getPageTitle();

  return (
    <div className="flex min-h-screen bg-[#111111] text-[#e8eaed]">

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[998] md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={[
          "flex flex-col h-screen sticky top-0 z-[100] bg-[#1c1c1e] border-r border-white/[0.08] transition-[width] duration-200 overflow-hidden",
          isCollapsed ? "w-[64px]" : "w-[240px]",
          "max-[900px]:fixed max-[900px]:top-0 max-[900px]:h-screen max-[900px]:z-[999]",
          isMobileOpen ? "max-[900px]:translate-x-0" : "max-[900px]:-translate-x-full",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-white/[0.08] shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#ff6b35] flex items-center justify-center shrink-0">
            <MdLocalFireDepartment className="text-white text-[1.1rem]" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-[0.92rem] font-semibold text-white leading-tight truncate">ครัวสุดโหด</p>
              <p className="text-[0.7rem] text-[#9aa0a6] leading-tight">Admin Portal</p>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-0.5">
          {menuItems.map(({ href, label, Icon, badge }) => {
            const isActive =
              pathname === href ||
              (href !== "/admin" && pathname.startsWith(href));

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMobileOpen(false)}
                title={isCollapsed ? label : undefined}
                className={[
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[0.875rem] font-medium transition-colors duration-150 no-underline relative",
                  isActive
                    ? "bg-[#ff6b35]/10 text-[#ff6b35]"
                    : "text-[#9aa0a6] hover:bg-white/[0.05] hover:text-[#e8eaed]",
                  isCollapsed && "justify-center",
                ].filter(Boolean).join(" ")}
              >
                {/* Active left bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#ff6b35] rounded-r-full" />
                )}

                <Icon className="text-[1.15rem] shrink-0" />

                {!isCollapsed && (
                  <>
                    <span className="flex-1 truncate">{label}</span>
                    {badge && (
                      <span className="text-[0.68rem] font-semibold bg-[#ff6b35]/20 text-[#ff6b35] px-1.5 py-0.5 rounded-md">
                        {badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: user + actions */}
        <div className="border-t border-white/[0.08] shrink-0">
          {/* User row */}
          {!isCollapsed && (
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
              <div className="w-7 h-7 rounded-full bg-[#5f6368] flex items-center justify-center shrink-0">
                <MdPeople className="text-white text-sm" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[0.8rem] font-medium text-[#e8eaed] truncate">ผู้ดูแลระบบ</p>
                <p className="text-[0.7rem] text-[#34a853] flex items-center gap-1">
                  <MdCircle className="text-[0.45rem]" />
                  Online
                </p>
              </div>
            </div>
          )}

          <div className="p-2 flex flex-col gap-0.5">
            {/* Go to staff page */}
            <button
              onClick={() => router.push("/staff")}
              title="หน้าพนักงาน"
              className={[
                "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[0.875rem] text-[#9aa0a6] hover:bg-white/[0.05] hover:text-[#e8eaed] transition-colors cursor-pointer",
                isCollapsed && "justify-center",
              ].filter(Boolean).join(" ")}
            >
              <MdStorefront className="text-[1.15rem] shrink-0" />
              {!isCollapsed && <span>หน้าพนักงาน</span>}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              title="ออกจากระบบ"
              className={[
                "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[0.875rem] text-[#9aa0a6] hover:bg-[#ea4335]/10 hover:text-[#ea4335] transition-colors cursor-pointer",
                isCollapsed && "justify-center",
              ].filter(Boolean).join(" ")}
            >
              <MdLogout className="text-[1.15rem] shrink-0" />
              {!isCollapsed && <span>ออกจากระบบ</span>}
            </button>
          </div>

          {/* Collapse toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center py-2 border-t border-white/[0.06] text-[#5f6368] hover:text-[#9aa0a6] hover:bg-white/[0.04] transition-colors cursor-pointer"
            title={isCollapsed ? "ขยาย Sidebar" : "ย่อ Sidebar"}
          >
            {isCollapsed
              ? <MdChevronRight className="text-lg" />
              : <MdChevronLeft className="text-lg" />
            }
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 px-6 flex items-center justify-between border-b border-white/[0.08] bg-[#111111] sticky top-0 z-[90]">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="hidden max-[900px]:flex items-center justify-center w-8 h-8 rounded text-[#9aa0a6] hover:bg-white/[0.06] cursor-pointer"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              <MdMenu className="text-xl" />
            </button>
            <div>
              <h1 className="text-[1rem] font-semibold text-[#e8eaed] leading-tight">{currentMeta.title}</h1>
              <p className="text-[0.72rem] text-[#5f6368] leading-tight">{currentMeta.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[0.78rem] text-[#9aa0a6]">
            <MdCircle className="text-[#34a853] text-[0.5rem]" />
            ระบบออนไลน์
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 max-[900px]:p-4">{children}</main>
      </div>
    </div>
  );
}
