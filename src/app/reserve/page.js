"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { isPromoEligible } from "@/lib/promoRules";

/* ── Luxury Visual Assets ── */
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85",
  interior: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  privateRoom: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80",
  grill: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
  wok: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
  soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
  fry: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
  cold: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
  dessert: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
};

/* ── Signature Dishes Data ── */
const SIGNATURE_DISHES = [
  {
    id: "m-1",
    name: "สเต็กเนื้อวากิวออสเตรเลียริบอาย A5",
    station: "Charcoal Grill Station",
    category: "grill",
    desc: "เนื้อวากิวลายหินอ่อน ย่างถ่านไม้หอม คุมความสุกระดับ Medium Rare เสิร์ฟพร้อมซอสไวน์แดงทรัฟเฟิล",
    price: "1,290.-",
    buffetIncluded: true,
    image: IMAGES.grill,
    tag: "Chef Recommends",
  },
  {
    id: "m-2",
    name: "กุ้งแม่น้ำซอสไข่เค็มโบราณกระทะเหล็ก",
    station: "Iron Wok Station",
    category: "wok",
    desc: "กุ้งแม่น้ำตัวโตเนื้อเด้ง ผัดซอสไข่เค็มไชยาเข้มข้น หอมกลิ่นกระทะไหม้สูตรลับเฉพาะ",
    price: "890.-",
    buffetIncluded: true,
    image: IMAGES.wok,
    tag: "Popular",
  },
  {
    id: "m-3",
    name: "ซุปเป๋าฮื้อจักรพรรดิ & เห็ดทรัฟเฟิลดำ",
    station: "Steamer & Broth Station",
    category: "soup",
    desc: "น้ำซุปกระดูกเคี่ยวยาวนานกว่า 18 ชั่วโมง ปลอดผงชูรส อุดมด้วยคอลลาเจนและกลิ่นหอมทรัฟเฟิลสด",
    price: "650.-",
    buffetIncluded: true,
    image: IMAGES.soup,
    tag: "Signature",
  },
  {
    id: "m-4",
    name: "กุ้งลายเสือเทมปุระสีทอง",
    station: "Tempura & Fry Station",
    category: "fry",
    desc: "ทอดด้วยน้ำมันรำข้าวควบคุมอุณหภูมิแม่นยำ แป้งบางเบากรุบกรอบ ไม่อมน้ำมัน เสิร์ฟกับน้ำจิ้มดาชิเข้มข้น",
    price: "420.-",
    buffetIncluded: true,
    image: IMAGES.fry,
    tag: "Crispy",
  },
  {
    id: "m-5",
    name: "นอร์วีเจียนแซลมอน & ทูน่าซาชิมิพรีเมียม",
    station: "Cold Larder Station",
    category: "cold",
    desc: "แซลมอนสดนำเข้าจากนอร์เวย์ หั่นชิ้นหนาฉ่ำ เสิร์ฟบนเกล็ดน้ำแข็งพร้อมวาซาบิสดแท้และโชยุญี่ปุ่น",
    price: "580.-",
    buffetIncluded: true,
    image: IMAGES.cold,
    tag: "Fresh Cut",
  },
  {
    id: "m-6",
    name: "ช็อกโกแลตฟองดองต์ลาวา & มัทฉะไอศกรีม",
    station: "Pastry Art Station",
    category: "dessert",
    desc: "เค้กช็อกโกแลตเบลเยียม 70% ไส้ลาวาเยิ้ม เสิร์ฟคู่กับไอศกรีมมัทฉะเกรดพิธีการจากอุจิ เกียวโต",
    price: "320.-",
    buffetIncluded: true,
    image: IMAGES.dessert,
    tag: "Dessert",
  },
];

/* ── 5 Kitchen Stations Info ── */
const KITCHEN_STATIONS = [
  {
    id: "wok",
    number: "01",
    name: "Iron Wok Flame Master",
    title: "สเตชั่นกระทะเหล็กไฟลุก",
    icon: "🍳",
    desc: "ศาสตร์แห่งไฟแรงและกระทะเหล็กโบราณ ปรุงอาหารผัดจานด่วนที่กักเก็บความฉ่ำของวัตถุดิบและส่งกลิ่นหอมไหม้ที่เป็นเอกลักษณ์",
    specialty: "ข้าวผัดมันเนื้อวากิว, ผัดกะเพราเนื้อดรายเอจ, ซีฟู้ดซอสไข่เค็ม",
  },
  {
    id: "grill",
    number: "02",
    name: "Charcoal Hearth & Grill",
    title: "สเตชั่นเตาย่างถ่านไม้หอม",
    icon: "🥩",
    desc: "ย่างบนเตาถ่านไม้โกงกางและไม้ฮิกคอรี่ คุมอุณหภูมิความร้อนด้วยเซนเซอร์อินฟราเรด ผิวสัมผัสเกรียมกรอบเนื้อในชุ่มฉ่ำ",
    specialty: "วากิวริบอาย A5, โทมาฮอว์กสเต็ก, พอร์คชอปซอสไวน์แดง",
  },
  {
    id: "soup",
    number: "03",
    name: "Slow Broth & Steamer",
    title: "สเตชั่นซุปเคี่ยว 18 ชม. & นึ่งสด",
    icon: "🍲",
    desc: "เคี่ยวน้ำสต๊อกด้วยโครงกระดูกและสมุนไพรยาวนานกว่า 18 ชม. เพื่อดึงรสอูมามิธรรมชาติ 100% ปลอดผงชูรส",
    specialty: "ซุปเห็ดทรัฟเฟิลดำ, ซุปเป๋าฮื้อตุ๋นยาจีน, ติ่มซำฮะเก๋าทองคำ",
  },
  {
    id: "fry",
    number: "04",
    name: "Crispy Golden Fryer",
    title: "สเตชั่นทอดกรอบสีทอง",
    icon: "🍤",
    desc: "น้ำมันรำข้าวบริสุทธิ์ผ่านการกรองสองชั้น คุมจุดเดือดแม่นยำ แป้งเทมปุระบางเบา กรอบนาน ไม่อมน้ำมัน",
    specialty: "กุ้งลายเสือเทมปุระ, คารามารีปลาหมึกทอด, หนังปลาแซลมอนทอดกรอบ",
  },
  {
    id: "cold",
    number: "05",
    name: "Cold Larder & Pastry Art",
    title: "สเตชั่นครัวเย็น & ขนมหวาน",
    icon: "🥗",
    desc: "ควบคุมอุณหภูมิ 0-2°C สำหรับซีฟู้ดสดจากทะเล และศิลปะของหวานจานปิดท้ายมื้อสุดประทับใจ",
    specialty: "แซลมอนซาชิมิสด, สลัดออร์แกนิกยูซุ, ช็อกโกแลตลาวาเค้ก",
  },
];

/* ── Exact Time Slots Definition ── */
const LUNCH_SLOTS = ["11:30", "12:00", "12:30", "13:00", "13:30", "14:00"];
const DINNER_SLOTS = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

/* ── QR Code Renderer Component ── */
function QRCodeImage({ value, size = 180 }) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    value
  )}&bgcolor=12121a&color=f0f0f5&qzone=1`;
  return (
    <img
      src={url}
      alt="Reservation QR Code"
      width={size}
      height={size}
      className="mx-auto rounded-xl border border-white/10 shadow-2xl transition hover:scale-105"
    />
  );
}

export default function ReserveLandingPage() {
  // Navigation active tab / scroll helper
  const [activeMenuCategory, setActiveMenuCategory] = useState("all");

  // Promos from API
  const [promotions, setPromotions] = useState([]);

  // Member Registration State
  const [memberForm, setMemberForm] = useState({ name: "", phone: "" });
  const [memberStatus, setMemberStatus] = useState(null); // { isMember, member, message }
  const [memberLoading, setMemberLoading] = useState(false);

  // Reservation Booking Form State
  const todayIso = new Date().toISOString().slice(0, 10);
  const tomorrowIso = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const dayAfterIso = new Date(Date.now() + 172800000).toISOString().slice(0, 10);

  const [bookingDate, setBookingDate] = useState(todayIso);
  const [bookingTime, setBookingTime] = useState("18:30");
  const [customTime, setCustomTime] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [orderType, setOrderType] = useState("buffet"); // 'buffet' | 'alacarte'
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState([]);
  const [customNote, setCustomNote] = useState("");
  const [selectedPromoId, setSelectedPromoId] = useState(null);

  // Submission State
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);
  const [bookingError, setBookingError] = useState("");

  // Load promotions from API
  useEffect(() => {
    fetch("/api/promotions")
      .then((res) => res.json())
      .then((data) => setPromotions(data.promotions || []))
      .catch(() => setPromotions([]));
  }, []);

  // Eligible Promos
  const eligiblePromos = useMemo(() => {
    const hour = parseInt(bookingTime.split(":")[0]) || 18;
    return promotions.filter((promo) =>
      isPromoEligible(promo, { partySize, orderType, hour })
    );
  }, [promotions, partySize, orderType, bookingTime]);

  // Handle Member Registration or Check
  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    if (!memberForm.name.trim() || !memberForm.phone.trim()) {
      alert("กรุณากรอกชื่อและเบอร์โทรศัพท์");
      return;
    }
    setMemberLoading(true);
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: memberForm.name.trim(),
          phone: memberForm.phone.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMemberStatus(data);
        // Auto-fill into reservation form
        setCustomerName(data.member?.name || memberForm.name);
        setCustomerPhone(data.member?.phone_number || memberForm.phone);
      } else {
        alert(data.error || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
      }
    } catch {
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setMemberLoading(false);
    }
  };

  // Quick Member Phone Check
  const handleCheckMemberPhone = async () => {
    if (!memberForm.phone.trim()) return;
    setMemberLoading(true);
    try {
      const res = await fetch(`/api/members?phone=${encodeURIComponent(memberForm.phone.trim())}`);
      const data = await res.json();
      if (data.member) {
        setMemberStatus({
          isExisting: true,
          member: data.member,
          message: `พบข้อมูลสมาชิก: คุณ ${data.member.name} (แต้มสะสม: ${data.member.total_points} คะแนน)`,
        });
        setMemberForm((prev) => ({ ...prev, name: data.member.name }));
        setCustomerName(data.member.name);
        setCustomerPhone(data.member.phone_number);
      } else {
        alert("ยังไม่มีเบอร์นี้ในระบบสมาชิก สามารถกดสมัครด้านล่างเพื่อรับ 100 คะแนนฟรีทันที!");
      }
    } catch {
      alert("ตรวจสอบข้อมูลไม่สำเร็จ");
    } finally {
      setMemberLoading(false);
    }
  };

  // Handle Special Request Toggle
  const toggleSpecialRequest = (item) => {
    if (specialRequests.includes(item)) {
      setSpecialRequests(specialRequests.filter((i) => i !== item));
    } else {
      setSpecialRequests([...specialRequests, item]);
    }
  };

  // Handle Reservation Submission
  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    setBookingError("");

    if (!customerName.trim() || !customerPhone.trim()) {
      setBookingError("กรุณากรอกชื่อผู้จองและเบอร์โทรศัพท์สำหรับติดต่อ");
      return;
    }

    const finalTime = customTime.trim() || bookingTime;
    const combinedNotes = [
      ...specialRequests,
      customNote.trim() ? `หมายเหตุเพิ่มเติม: ${customNote.trim()}` : "",
    ]
      .filter(Boolean)
      .join(", ");

    setBookingSubmitting(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerName.trim(),
          phone: customerPhone.trim(),
          partySize: Number(partySize),
          date: bookingDate,
          time: finalTime,
          orderType,
          specialRequests: combinedNotes,
          promotionId: selectedPromoId,
        }),
      });

      const data = await res.json();
      if (res.ok && data.reservation) {
        setConfirmedReservation(data.reservation);
        // Scroll to confirmation ticket
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setBookingError(data.error || "เกิดข้อผิดพลาดในการบันทึกการจอง กรุณาลองใหม่อีกครั้ง");
      }
    } catch {
      setBookingError("ไม่สามารถเชื่อมต่อระบบจองได้ กรุณาตรวจสอบอินเทอร์เน็ต");
    } finally {
      setBookingSubmitting(false);
    }
  };

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    if (activeMenuCategory === "all") return SIGNATURE_DISHES;
    return SIGNATURE_DISHES.filter((d) => d.category === activeMenuCategory);
  }, [activeMenuCategory]);

  return (
    <div className="min-h-screen bg-[#07070b] text-[#f0f0f5] selection:bg-[#ff6b35]/30 selection:text-white font-sans antialiased">
      {/* ============================================================== */}
      {/* 1. STANDALONE LUXURY BRAND HEADER & NAVIGATION                 */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#07070b]/80 border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link href="/reserve" className="flex items-center gap-3 group">
            <div className="size-11 rounded-xl bg-gradient-to-br from-[#ff6b35] via-[#ff9a56] to-[#ffb347] flex items-center justify-center text-xl shadow-lg shadow-[#ff6b35]/20 group-hover:scale-105 transition">
              🍳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                  ครัวสุดโหด
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ff6b35]/20 text-[#ff6b35] border border-[#ff6b35]/30 uppercase tracking-widest">
                  Grand Feast
                </span>
              </div>
              <p className="text-[11px] text-white/50 tracking-wide font-medium">
                THE CHEF&apos;S TABLE • FINE DINING & BUFFET
              </p>
            </div>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#story" className="hover:text-white transition">เรื่องราวของเรา</a>
            <a href="#stations" className="hover:text-white transition">5 สเตชั่นกระทะเหล็ก</a>
            <a href="#menu" className="hover:text-white transition">เมนูไฮไลท์</a>
            <a href="#membership" className="hover:text-[#ffb347] transition flex items-center gap-1.5">
              <span>💎</span> สิทธิพิเศษสมาชิก
            </a>
            <a href="#booking" className="hover:text-[#ff6b35] transition flex items-center gap-1.5">
              <span>📅</span> จองโต๊ะล่วงหน้า
            </a>
            <a href="#location" className="hover:text-white transition">ติดต่อ & ที่ตั้ง</a>
          </nav>

          {/* Quick CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="#membership"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 text-[#ffb347] border border-[#ffb347]/30 transition"
            >
              <span>🎁</span> สมัครสมาชิก (รับ 100 พอยท์)
            </a>
            <a
              href="#booking"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-black shadow-lg shadow-[#ff6b35]/25 hover:opacity-95 hover:scale-[1.02] active:scale-95 transition"
            >
              <span>📅</span> จองโต๊ะทันที
            </a>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* MODAL / CONFIRMATION TICKET (IF RESERVATION JUST COMPLETED)     */}
      {/* ============================================================== */}
      {confirmedReservation && (
        <section className="relative z-40 max-w-4xl mx-auto px-4 py-10 animate-fade-quick">
          <div className="rounded-3xl border border-[#2dd4a8]/40 bg-gradient-to-b from-[#12121a] to-[#0c0c12] p-6 sm:p-10 shadow-2xl shadow-[#2dd4a8]/10 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#2dd4a8]/15 blur-3xl pointer-events-none rounded-full" />

            <div className="inline-flex items-center justify-center size-16 rounded-full bg-[#2dd4a8]/20 border border-[#2dd4a8]/50 text-3xl mb-4 text-[#2dd4a8]">
              ✓
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#2dd4a8]/15 text-[#2dd4a8] text-xs font-bold uppercase tracking-wider mb-2">
              จองโต๊ะสำเร็จ • Booking Confirmed
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              ยินดีต้อนรับสู่ ครัวสุดโหด!
            </h2>
            <p className="mt-2 text-sm text-white/60 max-w-lg mx-auto">
              ระบบได้บันทึกการจองและส่งข้อมูลไปยังเคาน์เตอร์พนักงานเรียบร้อยแล้ว
              โปรดแสดง QR Code หรือแจ้งรหัสจองเมื่อเดินทางมาถึงร้าน
            </p>

            {/* Ticket Card */}
            <div className="mt-8 rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 text-left max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
                <QRCodeImage
                  value={`${typeof window !== "undefined" ? window.location.origin : ""}/reserve/confirm?token=${confirmedReservation.qrToken}`}
                  size={160}
                />
                <div className="text-center sm:text-left flex-1">
                  <div className="text-[11px] font-bold text-[#ff6b35] tracking-widest uppercase">
                    Booking Reference
                  </div>
                  <div className="text-3xl font-black text-white font-mono mt-0.5">
                    {confirmedReservation.reservationId || confirmedReservation.id}
                  </div>
                  <div className="mt-2 inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-white/10 text-white/80">
                    รหัส QR: {confirmedReservation.qrToken}
                  </div>
                  <div className="mt-3 text-xs text-white/50">
                    บันทึกเมื่อ: {new Date(confirmedReservation.createdAt).toLocaleDateString("th-TH")}
                  </div>
                </div>
              </div>

              {/* Booking Details Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6 text-sm">
                <div>
                  <span className="text-white/40 text-xs block">ชื่อผู้จอง</span>
                  <span className="font-bold text-white text-base">{confirmedReservation.name}</span>
                </div>
                <div>
                  <span className="text-white/40 text-xs block">เบอร์โทรศัพท์</span>
                  <span className="font-bold text-white text-base font-mono">{confirmedReservation.phone}</span>
                </div>
                <div>
                  <span className="text-white/40 text-xs block">วันที่จอง</span>
                  <span className="font-bold text-white">
                    {confirmedReservation.bookingDate || confirmedReservation.timeSlot?.slice(0, 10)}
                  </span>
                </div>
                <div>
                  <span className="text-white/40 text-xs block">เวลาจอง (เป๊ะๆ)</span>
                  <span className="font-bold text-[#ffb347] text-lg font-mono">
                    ⏰ {confirmedReservation.bookingTime || "18:30"} น.
                  </span>
                </div>
                <div>
                  <span className="text-white/40 text-xs block">จำนวนแขก</span>
                  <span className="font-bold text-white">{confirmedReservation.partySize} ท่าน</span>
                </div>
                <div>
                  <span className="text-white/40 text-xs block">รูปแบบมื้ออาหาร</span>
                  <span className="font-bold text-white">
                    {confirmedReservation.orderType === "buffet" ? "🍽️ บุฟเฟ่ต์ไม่อั้น" : "🥩 อลาคาร์ต"}
                  </span>
                </div>
                {confirmedReservation.specialRequests && (
                  <div className="col-span-2 pt-2 border-t border-white/5">
                    <span className="text-white/40 text-xs block">ความต้องการพิเศษ</span>
                    <span className="text-white/90 text-xs mt-0.5 block italic">
                      &quot;{confirmedReservation.specialRequests}&quot;
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition"
              >
                🖨️ พิมพ์ / บันทึกตั๋วนี้
              </button>
              <button
                type="button"
                onClick={() => setConfirmedReservation(null)}
                className="px-6 py-3 rounded-xl bg-[#ff6b35] hover:bg-[#ff8c42] text-black font-bold text-sm transition shadow-lg shadow-[#ff6b35]/25"
              >
                + ทำการจองรายการใหม่
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* 2. HERO MARKETING & ADVERTISING SECTION                        */}
      {/* ============================================================== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.hero}
            alt="Fine Dining Steak and Grill"
            className="w-full h-full object-cover object-center filter brightness-[0.38] scale-105 animate-fade-quick"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-[#07070b]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07070b] via-transparent to-[#07070b]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/90 shadow-xl mb-6">
            <span className="flex text-[#ffb347]">★★★★★</span>
            <span className="font-semibold">อันดับ 1 ร้านอาหารพรีเมียม & บุฟเฟ่ต์ยอดนิยม 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] text-white">
            ศิลปะแห่งรสชาติเหนือระดับ <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#ff6b35] via-[#ff9a56] to-[#ffb347] bg-clip-text text-transparent">
              ครัวสุดโหด พรีเมียมไดน์นิ่ง
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-white/75 max-w-3xl mx-auto leading-relaxed font-light">
            สัมผัสประสบการณ์ความอร่อยจากวัตถุดิบนำเข้าเกรดสูงสุด ทั้งเนื้อวากิวออสเตรเลีย A5, ซีฟู้ดสดจากทะเลลึก
            และ 5 สเตชั่นครัวกระทะเหล็กปรุงสดร้อนๆ จานต่อจาน พร้อมเสิร์ฟทั้งแบบ
            <strong className="text-white font-semibold"> อลาคาร์ตสุดประณีต </strong> และ
            <strong className="text-[#ffb347] font-semibold"> บุฟเฟ่ต์พรีเมียมไม่อั้น</strong>
          </p>

          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-10">
            <div className="rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#ff6b35]">4.9 / 5</div>
              <div className="text-xs text-white/60 mt-1">จาก 2,500+ รีวิว</div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#ffb347]">5 Stations</div>
              <div className="text-xs text-white/60 mt-1">ครัวมาตรฐานเวิลด์คลาส</div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#2dd4a8]">100% Fresh</div>
              <div className="text-xs text-white/60 mt-1">วัตถุดิบส่งตรงทุกวัน</div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white">0% MSG</div>
              <div className="text-xs text-white/60 mt-1">ซุปเคี่ยวนาน 18 ชม.</div>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#booking"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#ff8c42] text-black font-extrabold text-base shadow-xl shadow-[#ff6b35]/30 hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2"
            >
              <span>📅</span> จองโต๊ะล่วงหน้า
            </a>
            <a
              href="#membership"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md text-white font-bold text-base border border-white/15 transition flex items-center justify-center gap-2"
            >
              <span>💎</span> สมัครสมาชิก Privilege Club (รับ 100 แต้มฟรี)
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. ABOUT OUR RESTAURANT & PHILOSOPHY (STORY)                   */}
      {/* ============================================================== */}
      <section id="story" className="py-24 border-t border-white/5 bg-[#0a0a10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Story Text */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#ff6b35]">
                Our Culinary Philosophy • เรื่องราวของเรา
              </span>
              <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                ทำไมต้องชื่อว่า <br />
                <span className="text-[#ff6b35]">&quot;ครัวสุดโหด&quot;?</span>
              </h2>
              <p className="mt-6 text-white/70 leading-relaxed text-base">
                คำว่า <strong className="text-white">&quot;ครัวสุดโหด&quot;</strong> ไม่ได้หมายถึงความดุร้ายหรือราคาที่แพง
                แต่คือ <strong className="text-[#ffb347]">ความโหดในความประณีต ความโหดในการคัดสรรวัตถุดิบเกรดสูงสุด
                  และความโหดในมาตรฐานรสชาติ</strong> ที่ไม่ยอมประนีประนอมแม้แต่มิลลิกรัมเดียว
              </p>
              <p className="mt-4 text-white/70 leading-relaxed text-base">
                ร้านของเรานำเสนอประสบการณ์ 2 รูปแบบในพื้นที่เดียวกัน ไม่ว่าคุณจะเลือกสัมผัสความหรูหราของ
                <strong className="text-white"> อาหารจานเดี่ยวระดับ Fine Dining </strong>
                หรือความคุ้มค่าไม่อั้นของ <strong className="text-[#ffb347]">Grand Buffet 5 สเตชั่น </strong>
                ทุกจานจะถูกปรุงสดใหม่และผ่านการตรวจสอบคุณภาพ (QC) จากหัวหน้าเชฟประจำสเตชั่นก่อนเสิร์ฟถึงโต๊ะของคุณเสมอ
              </p>

              {/* Pillars */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="size-10 rounded-xl bg-[#ff6b35]/15 text-[#ff6b35] flex items-center justify-center text-lg font-bold shrink-0">
                    🥩
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">วัตถุดิบคัดสรรระดับพรีเมียม</h4>
                    <p className="text-xs text-white/60 mt-0.5">
                      เนื้อวากิวออสเตรเลียเกรด A5 ลายหินอ่อน, แซลมอนสดนอร์เวย์ และกุ้งแม่น้ำธรรมชาติส่งตรงทุกวัน
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="size-10 rounded-xl bg-[#ffb347]/15 text-[#ffb347] flex items-center justify-center text-lg font-bold shrink-0">
                    ⏱️
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">การันตีเวลาเป๊ะ เสิร์ฟร้อนถึงโต๊ะ</h4>
                    <p className="text-xs text-white/60 mt-0.5">
                      ระบบจัดการครัว Kitchen Display System (KDS) ควบคุมเวลาปรุงให้พร้อมเสิร์ฟในอุณหภูมิที่สมบูรณ์แบบที่สุด
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Atmosphere Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={IMAGES.interior}
                  alt="Restaurant Interior"
                  className="rounded-3xl object-cover h-64 w-full border border-white/10 shadow-2xl hover:scale-[1.02] transition"
                />
                <div className="rounded-3xl bg-gradient-to-br from-[#ff6b35]/20 to-transparent border border-[#ff6b35]/30 p-6">
                  <span className="text-3xl font-black text-white">120</span>
                  <span className="text-xs text-[#ffb347] block font-bold mt-1">นาทีบุฟเฟ่ต์เต็มอิ่ม</span>
                  <p className="text-xs text-white/60 mt-2">สั่งได้มากกว่า 80 เมนู เสิร์ฟร้อนถึงโต๊ะไม่ต้องเดินตักเอง</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6">
                  <span className="text-3xl font-black text-[#2dd4a8]">10+</span>
                  <span className="text-xs text-white/70 block font-bold mt-1">โต๊ะส่วนตัว & VIP Zone</span>
                  <p className="text-xs text-white/60 mt-2">เหมาะสำหรับมื้อพิเศษ งานเลี้ยงครอบครัว และฉลองวันเกิด</p>
                </div>
                <img
                  src={IMAGES.privateRoom}
                  alt="Private Dining Table"
                  className="rounded-3xl object-cover h-64 w-full border border-white/10 shadow-2xl hover:scale-[1.02] transition"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. THE 5 KITCHEN STATIONS (จุดเด่น 5 สเตชั่นครัวของร้าน)        */}
      {/* ============================================================== */}
      <section id="stations" className="py-24 border-t border-white/5 bg-[#07070b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff6b35]">
              Mastery Behind The Scenes
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-white">
              5 สเตชั่นกระทะเหล็ก <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ffb347]">
                มาตรฐานครัวระดับโลก
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/60">
              ทุกสถานีครัวมีหัวหน้าเชฟผู้เชี่ยวชาญเฉพาะทาง คอยควบคุมอุณหภูมิ เทคนิคการปรุง และการจัดแต่งจานอย่างพิถีพิถัน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {KITCHEN_STATIONS.map((station) => (
              <div
                key={station.id}
                className="group rounded-3xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#ff6b35]/40 p-8 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{station.icon}</span>
                  <span className="text-xs font-black text-white/30 font-mono tracking-widest uppercase">
                    STATION {station.number}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-white group-hover:text-[#ff6b35] transition">
                  {station.title}
                </h3>
                <div className="text-xs text-white/40 font-mono mt-0.5">{station.name}</div>
                <p className="mt-4 text-xs sm:text-sm text-white/60 leading-relaxed">
                  {station.desc}
                </p>
                <div className="mt-6 pt-4 border-t border-white/5">
                  <span className="text-[11px] font-bold text-[#ffb347] uppercase tracking-wider block">
                    เมนูซิกเนเจอร์:
                  </span>
                  <p className="text-xs text-white/80 mt-1 font-medium">{station.specialty}</p>
                </div>
              </div>
            ))}

            {/* Custom CTA Card within Grid */}
            <div className="rounded-3xl bg-gradient-to-br from-[#ff6b35]/20 via-[#ff9a56]/10 to-transparent border border-[#ff6b35]/40 p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#ff6b35] uppercase tracking-wider">
                  Real-time KDS System
                </span>
                <h3 className="mt-2 text-2xl font-black text-white">
                  สั่งปุ๊บ ปรุงปั๊บ <br />
                  เสิร์ฟร้อนทุกออเดอร์
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                  เชื่อมโยงกับระบบพนักงานและเคาน์เตอร์อัตโนมัติ ทุกการจองและการสั่งอาหารจะถูกส่งตรงไปยังสเตชั่นครัวตามเวลาเป๊ะๆ
                </p>
              </div>
              <a
                href="#booking"
                className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-extrabold text-xs shadow-lg hover:bg-white/90 transition"
              >
                <span>📅</span> จองโต๊ะเพื่อสัมผัสประสบการณ์
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. SIGNATURE DISHES SHOWCASE (GALLERY & MENU)                  */}
      {/* ============================================================== */}
      <section id="menu" className="py-24 border-t border-white/5 bg-[#0a0a10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#ff6b35]">
                Culinary Highlights
              </span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight text-white">
                เมนูไฮไลท์ยอดนิยม
              </h2>
              <p className="mt-2 text-sm text-white/60">
                เลือกทานได้ทั้งแบบจานเดี่ยว (A La Carte) หรือสั่งได้ไม่อั้นในแพ็กเกจ Grand Buffet
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "ทั้งหมด" },
                { key: "grill", label: "เตาย่าง & สเต็ก" },
                { key: "wok", label: "กระทะเหล็ก" },
                { key: "soup", label: "ซุป & ของนึ่ง" },
                { key: "fry", label: "ของทอดสีทอง" },
                { key: "cold", label: "ซาชิมิ & ครัวเย็น" },
                { key: "dessert", label: "ของหวาน" },
              ].map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveMenuCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${activeMenuCategory === cat.key
                      ? "bg-[#ff6b35] text-black shadow-md shadow-[#ff6b35]/25"
                      : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="group rounded-3xl bg-white/[0.03] border border-white/10 overflow-hidden hover:border-[#ff6b35]/40 transition duration-300 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a10] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#ffb347] border border-[#ffb347]/30">
                    {dish.tag}
                  </span>
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#2dd4a8]/20 backdrop-blur-md text-[#2dd4a8] border border-[#2dd4a8]/30">
                    บุฟเฟ่ต์สั่งได้ไม่อั้น
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-[#ff6b35] uppercase tracking-wider">
                      {dish.station}
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-[#ffb347] transition">
                      {dish.name}
                    </h3>
                    <p className="mt-2 text-xs text-white/60 leading-relaxed">
                      {dish.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-white/40 block">ราคาจานเดี่ยว</span>
                      <span className="text-lg font-black text-white">{dish.price}</span>
                    </div>
                    <a
                      href="#booking"
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#ff6b35] hover:text-black text-xs font-bold text-white transition"
                    >
                      จองโต๊ะทานเมนูนี้
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. MEMBER REGISTRATION SECTION (สมัครสมาชิกได้ในหน้านี้)          */}
      {/* ============================================================== */}
      <section id="membership" className="py-24 border-t border-white/5 bg-[#07070b] relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#ffb347]/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff6b35]/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-white/[0.04] border border-[#ffb347]/30 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Member Perks (Left) */}
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffb347]/15 text-[#ffb347] text-xs font-bold border border-[#ffb347]/30 mb-4">
                  <span>💎</span> THE CHEF&apos;S PRIVILEGE CLUB
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  สมัครสมาชิกวันนี้ <br />
                  <span className="bg-gradient-to-r from-[#ffb347] to-[#ff6b35] bg-clip-text text-transparent">
                    รับฟรีทันที 100 คะแนนสะสม!
                  </span>
                </h2>
                <p className="mt-4 text-sm text-white/70 leading-relaxed">
                  ร่วมเป็นครอบครัวเดียวกับ ครัวสุดโหด เพื่อรับสิทธิพิเศษเหนือระดับ ส่วนลดอาหารทุกบิล
                  ของขวัญพิเศษในเดือนเกิด และสิทธิ์จองโต๊ะโซน VIP ก่อนใคร
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center gap-3">
                    <span className="size-8 rounded-lg bg-[#ffb347]/20 text-[#ffb347] flex items-center justify-center font-bold text-sm shrink-0">
                      🎁
                    </span>
                    <span className="text-xs font-medium text-white/80">
                      ต้อนรับ 100 พอยท์ทันทีที่สมัคร
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="size-8 rounded-lg bg-[#ff6b35]/20 text-[#ff6b35] flex items-center justify-center font-bold text-sm shrink-0">
                      🏷️
                    </span>
                    <span className="text-xs font-medium text-white/80">
                      ส่วนลด 10% ทุกครั้งที่มาทาน
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="size-8 rounded-lg bg-[#2dd4a8]/20 text-[#2dd4a8] flex items-center justify-center font-bold text-sm shrink-0">
                      🎂
                    </span>
                    <span className="text-xs font-medium text-white/80">
                      เค้กซิกเนเจอร์ฟรีในเดือนเกิด
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="size-8 rounded-lg bg-[#a855f7]/20 text-[#a855f7] flex items-center justify-center font-bold text-sm shrink-0">
                      ⚡
                    </span>
                    <span className="text-xs font-medium text-white/80">
                      สิทธิ์เลือกโต๊ะ VIP โซนวิวสวย
                    </span>
                  </div>
                </div>
              </div>

              {/* Member Registration Form (Right) */}
              <div className="lg:col-span-5 rounded-2xl bg-black/40 border border-white/10 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>✨</span> สมัครหรือตรวจสอบสมาชิก
                </h3>
                <p className="text-xs text-white/50 mt-1">
                  กรอกชื่อและเบอร์โทรศัพท์เพื่อสมัครใหม่ หรือกดตรวจสอบคะแนน
                </p>

                {memberStatus ? (
                  <div className="mt-6 rounded-xl bg-[#2dd4a8]/10 border border-[#2dd4a8]/30 p-5 text-center animate-fade-quick">
                    <span className="text-2xl">🎉</span>
                    <h4 className="text-sm font-bold text-[#2dd4a8] mt-1">
                      {memberStatus.message}
                    </h4>
                    <div className="mt-3 text-xs text-white/70">
                      ชื่อสมาชิก: <strong className="text-white">{memberStatus.member?.name}</strong> <br />
                      เบอร์โทร: <strong className="text-white font-mono">{memberStatus.member?.phone_number}</strong> <br />
                      คะแนนสะสม: <strong className="text-[#ffb347] font-bold">{memberStatus.member?.total_points} คะแนน</strong>
                    </div>
                    <a
                      href="#booking"
                      className="mt-4 block w-full py-2.5 rounded-lg bg-[#ff6b35] text-black font-bold text-xs hover:bg-[#ff8c42] transition"
                    >
                      ดำเนินการจองโต๊ะด้วยสิทธิ์สมาชิกนี้ ↓
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleMemberSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="text-xs font-medium text-white/70 block mb-1">
                        ชื่อ-นามสกุล ของท่าน
                      </label>
                      <input
                        type="text"
                        required
                        value={memberForm.name}
                        onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                        placeholder="เช่น คุณกวินท์ สุขสวัสดิ์"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#ffb347] transition"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-white/70 block mb-1">
                        เบอร์โทรศัพท์มือถือ
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="tel"
                          required
                          value={memberForm.phone}
                          onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                          placeholder="0812345678"
                          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#ffb347] font-mono transition"
                        />
                        <button
                          type="button"
                          onClick={handleCheckMemberPhone}
                          disabled={memberLoading}
                          className="px-3.5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white/80 transition"
                        >
                          ตรวจเบอร์
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={memberLoading}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ffb347] to-[#ff6b35] text-black font-black text-sm shadow-lg shadow-[#ffb347]/20 hover:opacity-95 active:scale-98 transition disabled:opacity-50"
                    >
                      {memberLoading ? "กำลังดำเนินการ..." : "สมัครสมาชิกใหม่ (รับฟรี 100 แต้ม)"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. TABLE RESERVATION FORM (จองโต๊ะตามเวลาเป๊ะๆ)                 */}
      {/* ============================================================== */}
      <section id="booking" className="py-24 border-t border-white/5 bg-[#0a0a10] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff6b35]">
              Online Table Reservation
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight text-white">
              จองโต๊ะล่วงหน้า
            </h2>
            <p className="mt-2 text-sm text-white/60">
              เลือกรอบเวลาที่ต้องการรับประทานตามเวลาเป๊ะๆ ระบบจะส่งข้อมูลตรงถึงพนักงานหน้าร้านทันที
            </p>
          </div>

          {/* Booking Card */}
          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            {bookingError && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-medium flex items-center gap-2">
                <span>⚠️</span> {bookingError}
              </div>
            )}

            <form onSubmit={handleReservationSubmit} className="space-y-8">
              {/* STEP 1: DATE & EXACT TIME SELECTION */}
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
                  <span className="size-6 rounded-full bg-[#ff6b35] text-black text-xs font-black flex items-center justify-center">
                    1
                  </span>
                  เลือกวันที่และเวลาจอง (ระบุเวลาเป๊ะๆ)
                </h3>

                {/* Date Quick Chips & Picker */}
                <div className="space-y-3">
                  <span className="text-xs text-white/50 block">เลือกวันที่:</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setBookingDate(todayIso)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${bookingDate === todayIso
                          ? "bg-[#ff6b35] text-black shadow-md shadow-[#ff6b35]/25"
                          : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                    >
                      วันนี้ ({new Date().toLocaleDateString("th-TH", { day: "numeric", month: "short" })})
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingDate(tomorrowIso)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${bookingDate === tomorrowIso
                          ? "bg-[#ff6b35] text-black shadow-md shadow-[#ff6b35]/25"
                          : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                    >
                      พรุ่งนี้ ({new Date(Date.now() + 86400000).toLocaleDateString("th-TH", { day: "numeric", month: "short" })})
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingDate(dayAfterIso)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition ${bookingDate === dayAfterIso
                          ? "bg-[#ff6b35] text-black shadow-md shadow-[#ff6b35]/25"
                          : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                    >
                      มะรืนนี้ ({new Date(Date.now() + 172800000).toLocaleDateString("th-TH", { day: "numeric", month: "short" })})
                    </button>

                    {/* Custom Date Input */}
                    <input
                      type="date"
                      min={todayIso}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-[#ff6b35]"
                    />
                  </div>
                </div>

                {/* Time Slots */}
                <div className="mt-6 space-y-4">
                  <div>
                    <span className="text-xs text-white/50 block mb-2 font-medium">
                      ☀️ รอบมื้อกลางวัน (Lunch Slots):
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {LUNCH_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setBookingTime(slot);
                            setCustomTime("");
                          }}
                          className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold transition ${bookingTime === slot && !customTime
                              ? "bg-[#ffb347] text-black shadow-md shadow-[#ffb347]/20"
                              : "bg-white/5 text-white/80 hover:bg-white/10"
                            }`}
                        >
                          {slot} น.
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-white/50 block mb-2 font-medium">
                      🌙 รอบมื้อค่ำ (Dinner Slots - ยอดนิยม):
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                      {DINNER_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setBookingTime(slot);
                            setCustomTime("");
                          }}
                          className={`py-2.5 px-2 rounded-xl text-xs font-mono font-bold transition ${bookingTime === slot && !customTime
                              ? "bg-[#ff6b35] text-black shadow-md shadow-[#ff6b35]/25"
                              : "bg-white/5 text-white/80 hover:bg-white/10"
                            }`}
                        >
                          {slot} น.
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Or Custom Exact Minute */}
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs text-white/50">หรือระบุเวลาเจาะจงเอง:</span>
                    <input
                      type="time"
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      placeholder="เช่น 19:15"
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#ff6b35]"
                    />
                    {customTime && (
                      <span className="text-xs text-[#ff6b35] font-bold">
                        (เลือกเวลา: {customTime} น.)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10" />

              {/* STEP 2: GUEST COUNT & DINING STYLE */}
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
                  <span className="size-6 rounded-full bg-[#ff6b35] text-black text-xs font-black flex items-center justify-center">
                    2
                  </span>
                  จำนวนแขก และ รูปแบบมื้ออาหาร
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Party Size */}
                  <div>
                    <label className="text-xs text-white/60 block mb-2">
                      จำนวนแขก (Party Size):
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {[1, 2, 4, 6, 8, 10].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setPartySize(size)}
                          className={`py-2.5 rounded-xl text-xs font-bold transition ${partySize === size
                              ? "bg-white text-black font-extrabold"
                              : "bg-white/5 text-white/70 hover:bg-white/10"
                            }`}
                        >
                          {size} ท่าน
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dining Style */}
                  <div>
                    <label className="text-xs text-white/60 block mb-2">
                      รูปแบบการรับประทาน:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setOrderType("buffet")}
                        className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 ${orderType === "buffet"
                            ? "bg-[#ff6b35]/15 border-[#ff6b35] text-white"
                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                          }`}
                      >
                        <span className="text-2xl">🍽️</span>
                        <div>
                          <div className="font-bold text-sm">Grand Buffet</div>
                          <div className="text-[10px] text-white/50">บุฟเฟ่ต์ 5 สเตชั่นไม่อั้น</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setOrderType("alacarte")}
                        className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 ${orderType === "alacarte"
                            ? "bg-[#ffb347]/15 border-[#ffb347] text-white"
                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                          }`}
                      >
                        <span className="text-2xl">🥩</span>
                        <div>
                          <div className="font-bold text-sm">A La Carte</div>
                          <div className="text-[10px] text-white/50">สั่งจานเดี่ยวพรีเมียม</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10" />

              {/* STEP 3: CUSTOMER CONTACT & SPECIAL REQUESTS */}
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
                  <span className="size-6 rounded-full bg-[#ff6b35] text-black text-xs font-black flex items-center justify-center">
                    3
                  </span>
                  ข้อมูลผู้จอง และ ความต้องการพิเศษ
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/60 block mb-1.5 font-medium">
                      ชื่อ-นามสกุล ผู้จอง *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="เช่น คุณกวินท์"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#ff6b35]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/60 block mb-1.5 font-medium">
                      เบอร์โทรศัพท์สำหรับติดต่อยืนยัน *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0812345678"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm font-mono focus:outline-none focus:border-[#ff6b35]"
                    />
                  </div>
                </div>

                {/* Special Requests Checkboxes */}
                <div className="mt-5">
                  <span className="text-xs text-white/60 block mb-2 font-medium">
                    ความต้องการพิเศษ (Special Requests):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "ขอโต๊ะริมหน้าต่าง (Window View)",
                      "งานฉลองวันเกิด (Birthday)",
                      "งานครบรอบแต่งงาน (Anniversary)",
                      "ต้องการเก้าอี้เด็ก (Baby High-chair)",
                      "ขอโต๊ะเงียบ / เจรจาธุรกิจ (Quiet Corner)",
                      "มีผู้สูงอายุ / นั่งสะดวก (Wheelchair friendly)",
                    ].map((req) => (
                      <button
                        key={req}
                        type="button"
                        onClick={() => toggleSpecialRequest(req)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition border ${specialRequests.includes(req)
                            ? "bg-[#2dd4a8]/20 border-[#2dd4a8] text-[#2dd4a8] font-bold"
                            : "bg-white/5 border-white/5 text-white/60 hover:text-white"
                          }`}
                      >
                        {specialRequests.includes(req) ? "✓ " : "+ "}
                        {req}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Note */}
                <div className="mt-4">
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="ข้อจำกัดอาหาร (เช่น แพ้อาหารทะเล, ไม่ทานเนื้อวัว) หรือรายละเอียดเพิ่มเติม..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#ff6b35]"
                  />
                </div>

                {/* Available Promotions Select */}
                {eligiblePromos.length > 0 && (
                  <div className="mt-6 p-4 rounded-2xl bg-[#ffb347]/10 border border-[#ffb347]/30">
                    <span className="text-xs font-bold text-[#ffb347] block mb-2">
                      🎁 โปรโมชั่นที่ได้รับสิทธิ์สำหรับรอบเวลานี้:
                    </span>
                    <div className="space-y-2">
                      {eligiblePromos.map((promo) => (
                        <label
                          key={promo.id}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-black/30 cursor-pointer hover:bg-black/50 transition"
                        >
                          <input
                            type="radio"
                            name="promo"
                            checked={selectedPromoId === promo.id}
                            onChange={() => setSelectedPromoId(promo.id)}
                            className="accent-[#ff6b35]"
                          />
                          <span className="text-base">{promo.icon || "🏷️"}</span>
                          <div className="text-xs">
                            <span className="font-bold text-white">{promo.title}</span>
                            <span className="text-white/60 ml-2">{promo.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={bookingSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#ff6b35] via-[#ff8c42] to-[#ffb347] text-black font-black text-base shadow-xl shadow-[#ff6b35]/25 hover:opacity-95 hover:scale-[1.01] active:scale-98 transition disabled:opacity-50"
                >
                  {bookingSubmitting ? (
                    "กำลังบันทึกข้อมูลการจอง..."
                  ) : (
                    <>
                      ✓ ยืนยันการจองโต๊ะ (รอบเวลา {customTime || bookingTime} น. • วันที่ {bookingDate})
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-white/40 mt-2.5">
                  ไม่มีค่ามัดจำ • สามารถยกเลิกหรือแก้ไขได้ล่วงหน้าก่อนเวลา 1 ชั่วโมง • ข้อมูลจะถูกจัดเก็บในระบบพนักงานทันที
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. LOCATION, CONTACT & FAQ                                     */}
      {/* ============================================================== */}
      <section id="location" className="py-20 border-t border-white/5 bg-[#07070b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6">
              <span className="text-2xl">📍</span>
              <h4 className="text-base font-bold text-white mt-3">ที่ตั้งร้าน & การเดินทาง</h4>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                ชั้น G อาคาร The Culinary Pavilion, ถนนสุขุมวิท (ใกล้สถานี BTS พร้อมพงษ์ ทางออก 2)
              </p>
              <div className="mt-4 text-xs text-[#2dd4a8] font-medium">
                🅿️ ที่จอดรถ VIP ในร่มรองรับกว่า 80 คัน (ประทับตราจอดฟรี 4 ชม.)
              </div>
            </div>

            <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6">
              <span className="text-2xl">⏰</span>
              <h4 className="text-base font-bold text-white mt-3">เวลาเปิดให้บริการ</h4>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                เปิดบริการทุกวัน (ไม่มีวันหยุด) <br />
                รอบกลางวัน: 11:30 - 14:30 น. <br />
                รอบเย็น: 17:00 - 22:30 น. (Last Order 21:30 น.)
              </p>
              <div className="mt-4 text-xs text-[#ffb347] font-medium">
                ⚡ สามารถจองโต๊ะล่วงหน้าได้ตลอด 24 ชั่วโมง
              </div>
            </div>

            <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6">
              <span className="text-2xl">📞</span>
              <h4 className="text-base font-bold text-white mt-3">ติดต่อสอบถาม</h4>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                สอบถามข้อมูลการจัดเลี้ยง โต๊ะส่วนตัว หรือติดต่อพนักงานต้อนรับ
              </p>
              <div className="mt-4 space-y-1">
                <div className="text-sm font-bold text-white font-mono">โทร: 02-999-8888</div>
                <div className="text-xs text-white/50">LINE Official: @kruasudhod</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. LUXURY FOOTER                                               */}
      {/* ============================================================== */}
      <footer className="py-12 border-t border-white/5 bg-[#050508] text-white/40 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/80 font-bold">
            <span>🍳</span> ครัวสุดโหด • THE CHEF&apos;S TABLE
          </div>
          <div>
            © 2026 ครัวสุดโหด พรีเมียมสเต็กเฮ้าส์แอนด์บุฟเฟ่ต์. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-white/60">
            <a href="#story" className="hover:text-white transition">เกี่ยวกับเรา</a>
            <a href="#membership" className="hover:text-white transition">สมาชิก</a>
            <a href="#booking" className="hover:text-white transition">จองโต๊ะ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
