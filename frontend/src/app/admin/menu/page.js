"use client";

import { MdRestaurantMenu, MdAdd } from "react-icons/md";

export default function AdminMenuPage() {
  return (
    <div className="bg-[#1c1c1e] border border-white/[0.08] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
        <div>
          <h2 className="text-[0.9rem] font-semibold text-[#e8eaed]">จัดการเมนูอาหาร</h2>
          <p className="text-[0.72rem] text-[#5f6368] mt-0.5">เพิ่ม แก้ไข หรือซ่อนรายการอาหารในระบบ POS</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ff6b35]/10 text-[#ff6b35] text-[0.8rem] font-medium hover:bg-[#ff6b35]/20 transition-colors cursor-pointer">
          <MdAdd className="text-base" /> เพิ่มเมนูใหม่
        </button>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-16 text-[#5f6368] gap-2">
        <MdRestaurantMenu className="text-4xl" />
        <p className="text-[0.875rem] font-medium text-[#9aa0a6]">ระบบจัดการเมนูอาหาร</p>
        <p className="text-[0.78rem]">พร้อมรองรับการเชื่อมต่อ Backend API</p>
      </div>
    </div>
  );
}
