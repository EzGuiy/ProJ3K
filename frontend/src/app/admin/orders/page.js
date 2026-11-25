"use client";

import { MdReceiptLong } from "react-icons/md";

export default function AdminOrdersPage() {
  return (
    <div className="bg-[#1c1c1e] border border-white/[0.08] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.08]">
        <h2 className="text-[0.9rem] font-semibold text-[#e8eaed]">ประวัติคำสั่งซื้อทั้งหมด</h2>
        <p className="text-[0.72rem] text-[#5f6368] mt-0.5">รายการออเดอร์ทั้งหมดในระบบ</p>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-16 text-[#5f6368] gap-2">
        <MdReceiptLong className="text-4xl" />
        <p className="text-[0.875rem] font-medium text-[#9aa0a6]">หน้ารายการคำสั่งซื้อ</p>
        <p className="text-[0.78rem]">พร้อมใช้งานร่วมกับ Admin Sidebar</p>
      </div>
    </div>
  );
}
