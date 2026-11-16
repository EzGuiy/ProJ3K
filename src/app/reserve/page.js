"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { menuItems } from "@/lib/menu";
import { isPromoEligible } from "@/lib/promoRules";
import styles from "./reserve.module.css";

// ─── Generate time slots (every 30 min, within next 3 hours) ────────────────
function getTimeSlots() {
  const slots = [];
  const now = new Date();
  const limit = new Date(now.getTime() + 3 * 60 * 60 * 1000);

  // Start from next 30-min boundary
  const start = new Date(now);
  start.setSeconds(0, 0);
  start.setMinutes(start.getMinutes() < 30 ? 30 : 60, 0, 0);
  if (start.getMinutes() === 60) {
    start.setHours(start.getHours() + 1);
    start.setMinutes(0);
  }

  let cur = new Date(start);
  while (cur <= limit) {
    slots.push(new Date(cur));
    cur = new Date(cur.getTime() + 30 * 60 * 1000);
  }
  return slots;
}

function formatSlotLabel(date) {
  return date.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Bangkok",
  });
}

function formatDate(date) {
  return date.toLocaleDateString("th-TH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Popular menu preview ────────────────────────────────────────────────────
const popularItems = menuItems.filter((m) => m.popular).slice(0, 6);

// ─── QR Code image via qrserver.com ─────────────────────────────────────────
function QRCode({ value, size = 200 }) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&bgcolor=12121a&color=f0f0f5&qzone=1`;
  return (
    <img
      src={url}
      alt="QR Code"
      width={size}
      height={size}
      className={styles.qrImage}
    />
  );
}

// ─── Step indicator ──────────────────────────────────────────────────────────
function StepBar({ step }) {
  return (
    <div className={styles.stepBar}>
      {["กรอกข้อมูล", "เลือกโปรโมชั่น", "ยืนยัน"].map((label, i) => (
        <div key={i} className={styles.stepItem}>
          <div
            className={`${styles.stepCircle} ${
              step > i + 1
                ? styles.stepDone
                : step === i + 1
                ? styles.stepActive
                : ""
            }`}
          >
            {step > i + 1 ? "✓" : i + 1}
          </div>
          <span
            className={`${styles.stepLabel} ${
              step === i + 1 ? styles.stepLabelActive : ""
            }`}
          >
            {label}
          </span>
          {i < 2 && <div className={`${styles.stepLine} ${step > i + 1 ? styles.stepLineDone : ""}`} />}
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ReservePage() {
  const router = useRouter();
  const slots = useMemo(() => getTimeSlots(), []);
  const today = new Date();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [reservation, setReservation] = useState(null);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [orderType, setOrderType] = useState(null); // 'buffet' | 'alacarte'
  const [promoId, setPromoId] = useState(null);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetch("/api/promotions")
      .then((res) => res.json())
      .then((data) => setPromotions(data.promotions || []))
      .catch(() => setPromotions([]));
  }, []);

  const currentHour = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      hourCycle: "h23",
      timeZone: "Asia/Bangkok",
    }).format(today)
  );
  const eligiblePromos = useMemo(
    () =>
      promotions.filter((promo) =>
        isPromoEligible(promo, { partySize, orderType, hour: currentHour })
      ),
    [promotions, partySize, orderType, currentHour]
  );

  // ── Validation step 1 ──
  const step1Valid =
    name.trim() && phone.trim() && partySize >= 1 && selectedSlot && orderType;

  const handleStep1Next = () => {
    if (!step1Valid) return;
    // Reset promo if no longer eligible
    if (promoId && !eligiblePromos.find((p) => p.id === promoId)) {
      setPromoId(null);
    }
    setStep(2);
  };

  // ── Submit ──
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          partySize,
          timeSlot: selectedSlot.toISOString(),
          orderType,
          promotionId: promoId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setReservation(data.reservation);
        setStep(3);
      } else {
        alert(data.error || "เกิดข้อผิดพลาด");
      }
    } catch {
      alert("ไม่สามารถเชื่อมต่อได้");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPromo = promotions.find((p) => p.id === promoId);
  const qrValue = reservation
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/reserve/confirm?token=${reservation.qrToken}`
    : "";

  // ── STEP 3: Confirmation + QR ──────────────────────────────────────────────
  if (step === 3 && reservation) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerBrand}>
            <span>🍳</span>
            <span>ครัวสุดโหด</span>
          </div>
        </header>

        <main className={styles.confirmPage}>
          <div className={styles.confirmCard}>
            <div className={styles.confirmSuccess}>
              <span className={styles.confirmSuccessIcon}>✅</span>
              <h1 className={styles.confirmTitle}>จองสำเร็จแล้ว!</h1>
              <p className={styles.confirmSub}>
                โปรดแสดง QR Code นี้เมื่อถึงร้าน
              </p>
            </div>

            <div className={styles.qrWrapper}>
              <QRCode value={qrValue} size={200} />
              <div className={styles.qrToken}>#{reservation.qrToken}</div>
            </div>

            <div className={styles.confirmDetails}>
              <div className={styles.confirmRow}>
                <span className={styles.confirmKey}>ชื่อ</span>
                <span className={styles.confirmVal}>{reservation.name}</span>
              </div>
              <div className={styles.confirmRow}>
                <span className={styles.confirmKey}>เบอร์โทร</span>
                <span className={styles.confirmVal}>{reservation.phone}</span>
              </div>
              <div className={styles.confirmRow}>
                <span className={styles.confirmKey}>วันที่</span>
                <span className={styles.confirmVal}>{formatDate(today)}</span>
              </div>
              <div className={styles.confirmRow}>
                <span className={styles.confirmKey}>เวลา</span>
                <span className={styles.confirmVal}>
                  {formatSlotLabel(new Date(reservation.timeSlot))} น.
                </span>
              </div>
              <div className={styles.confirmRow}>
                <span className={styles.confirmKey}>จำนวน</span>
                <span className={styles.confirmVal}>
                  {reservation.partySize} คน
                </span>
              </div>
              <div className={styles.confirmRow}>
                <span className={styles.confirmKey}>ประเภท</span>
                <span className={styles.confirmVal}>
                  {reservation.orderType === "buffet"
                    ? "🍽️ บุฟเฟ่"
                    : "📋 อลาคาร์ต"}
                </span>
              </div>
              {selectedPromo && (
                <div className={`${styles.confirmRow} ${styles.confirmPromoRow}`}>
                  <span className={styles.confirmKey}>โปรโมชั่น</span>
                  <span className={styles.confirmVal}>
                    {selectedPromo.icon} {selectedPromo.title}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.confirmActions}>
              <button
                className={styles.btnOrderNow}
                onClick={() =>
                  router.push(
                    `/order?name=${encodeURIComponent(reservation.name)}&phone=${encodeURIComponent(reservation.phone)}&member=true`
                  )
                }
              >
                🛒 สั่งอาหารล่วงหน้า
              </button>
              <button
                className={styles.btnHome}
                onClick={() => router.push("/")}
              >
                🏠 กลับหน้าหลัก
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── STEP 1 + 2: Form ───────────────────────────────────────────────────────
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => router.push("/")}>
            ← กลับ
          </button>
          <div className={styles.headerBrand}>
            <span>🍳</span>
            <span>ครัวสุดโหด</span>
          </div>
        </div>
        <div className={styles.headerDate}>
          <button className={styles.backBtn} onClick={() => router.push("/promotions")}>
            โปรโมชั่น
          </button>
          <button className={styles.backBtn} onClick={() => router.push("/reserve/scan")}>
            สแกนคิว
          </button>
          <span>{formatDate(today)}</span>
        </div>
      </header>

      <div className={styles.layout}>
        {/* ── LEFT: form ── */}
        <main className={styles.formSection}>
          <StepBar step={step} />

          {/* ─── STEP 1: Info + Time + Type ─── */}
          {step === 1 && (
            <div className={styles.formCard}>
              <h2 className={styles.sectionTitle}>📋 ข้อมูลการจอง</h2>

              {/* Name + Phone */}
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>ชื่อ-นามสกุล</label>
                  <input
                    className={styles.fieldInput}
                    placeholder="เช่น สมชาย ใจดี"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel}>เบอร์โทรศัพท์</label>
                  <input
                    className={styles.fieldInput}
                    type="tel"
                    placeholder="0xx-xxx-xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Party size */}
              <div className={styles.field}>
                <label className={styles.fieldLabel}>จำนวนคน</label>
                <div className={styles.partySizeRow}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <button
                      key={n}
                      className={`${styles.partySizeBtn} ${
                        partySize === n ? styles.partySizeActive : ""
                      }`}
                      onClick={() => setPartySize(n)}
                    >
                      {n}
                    </button>
                  ))}
                  <input
                    type="number"
                    min="1"
                    max="50"
                    className={styles.partySizeInput}
                    placeholder="อื่นๆ"
                    value={partySize > 8 ? partySize : ""}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Time slot */}
              <div className={styles.field}>
                <label className={styles.fieldLabel}>
                  เลือกเวลา{" "}
                  <span className={styles.fieldNote}>
                    (จองได้ภายใน 3 ชั่วโมง)
                  </span>
                </label>
                {slots.length === 0 ? (
                  <div className={styles.noSlots}>
                    ⚠️ ไม่มีช่วงเวลาให้จองในขณะนี้
                  </div>
                ) : (
                  <div className={styles.slotGrid}>
                    {slots.map((slot, i) => (
                      <button
                        key={i}
                        className={`${styles.slotBtn} ${
                          selectedSlot?.getTime() === slot.getTime()
                            ? styles.slotActive
                            : ""
                        }`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {formatSlotLabel(slot)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Order type */}
              <div className={styles.field}>
                <label className={styles.fieldLabel}>ประเภทการรับประทาน</label>
                <div className={styles.orderTypeRow}>
                  <button
                    className={`${styles.orderTypeCard} ${
                      orderType === "buffet" ? styles.orderTypeActive : ""
                    }`}
                    onClick={() => setOrderType("buffet")}
                  >
                    <span className={styles.orderTypeIcon}>🍽️</span>
                    <span className={styles.orderTypeName}>บุฟเฟ่</span>
                    <span className={styles.orderTypeDesc}>
                      ทานได้ไม่อั้นตามเมนูบุฟเฟ่
                    </span>
                  </button>
                  <button
                    className={`${styles.orderTypeCard} ${
                      orderType === "alacarte" ? styles.orderTypeActive : ""
                    }`}
                    onClick={() => setOrderType("alacarte")}
                  >
                    <span className={styles.orderTypeIcon}>📋</span>
                    <span className={styles.orderTypeName}>อลาคาร์ต</span>
                    <span className={styles.orderTypeDesc}>
                      สั่งเป็นรายการตามต้องการ
                    </span>
                  </button>
                </div>
              </div>

              <button
                className={styles.btnNext}
                disabled={!step1Valid}
                onClick={handleStep1Next}
              >
                ถัดไป →
              </button>
            </div>
          )}

          {/* ─── STEP 2: Promotions ─── */}
          {step === 2 && (
            <div className={styles.formCard}>
              <h2 className={styles.sectionTitle}>🏷️ เลือกโปรโมชั่น</h2>
              <p className={styles.promoSubtitle}>
                {eligiblePromos.length === 0
                  ? "ไม่มีโปรโมชั่นที่ตรงกับเงื่อนไขของคุณในขณะนี้"
                  : "เลือก 1 โปรโมชั่นได้ (หรือข้ามได้)"}
              </p>

              <div className={styles.promoList}>
                {promotions.map((promo) => {
                  const eligible = eligiblePromos.find(
                    (p) => p.id === promo.id
                  );
                  const selected = promoId === promo.id;
                  return (
                    <button
                      key={promo.id}
                      className={`${styles.promoCard} ${
                        selected ? styles.promoSelected : ""
                      } ${!eligible ? styles.promoDisabled : ""}`}
                      onClick={() => {
                        if (!eligible) return;
                        setPromoId(selected ? null : promo.id);
                      }}
                      disabled={!eligible}
                    >
                      <div className={styles.promoCardTop}>
                        <span className={styles.promoIcon}>{promo.icon}</span>
                        <div className={styles.promoInfo}>
                          <span className={styles.promoTitle}>{promo.title}</span>
                          <span className={styles.promoDesc}>{promo.desc}</span>
                        </div>
                        {selected && (
                          <span className={styles.promoCheck}>✓</span>
                        )}
                        {!eligible && (
                          <span className={styles.promoLock}>🔒</span>
                        )}
                      </div>
                      <div className={styles.promoBenefit}>{promo.benefit}</div>
                    </button>
                  );
                })}
              </div>

              {/* Summary before submit */}
              <div className={styles.summaryBox}>
                <div className={styles.summaryRow}>
                  <span>👤 ชื่อ</span>
                  <span>{name}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>👥 จำนวน</span>
                  <span>{partySize} คน</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>🕐 เวลา</span>
                  <span>
                    {selectedSlot ? formatSlotLabel(selectedSlot) : "—"} น.
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span>🍴 ประเภท</span>
                  <span>
                    {orderType === "buffet" ? "🍽️ บุฟเฟ่" : "📋 อลาคาร์ต"}
                  </span>
                </div>
              </div>

              <div className={styles.stepActions}>
                <button
                  className={styles.btnBack}
                  onClick={() => setStep(1)}
                >
                  ← ย้อนกลับ
                </button>
                <button
                  className={styles.btnConfirm}
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} />
                  ) : (
                    "✅ ยืนยันการจอง"
                  )}
                </button>
              </div>
            </div>
          )}
        </main>

        {/* ── RIGHT: Popular menu + promo teaser ── */}
        <aside className={styles.sidebar}>
          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>🔥 เมนูยอดนิยม</h3>
            <div className={styles.menuPreviewList}>
              {popularItems.map((item) => (
                <div key={item.id} className={styles.menuPreviewItem}>
                  <span className={styles.menuPreviewEmoji}>
                    {item.image || "🍽️"}
                  </span>
                  <div className={styles.menuPreviewInfo}>
                    <span className={styles.menuPreviewName}>{item.name}</span>
                    <span className={styles.menuPreviewNameEn}>
                      {item.nameEn}
                    </span>
                  </div>
                  {item.spicyLevel > 0 && (
                    <span className={styles.menuPreviewSpicy}>
                      {"🌶️".repeat(item.spicyLevel)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>🏷️ โปรโมชั่นวันนี้</h3>
            {promotions.map((p) => (
              <div key={p.id} className={styles.promoTeaser}>
                <span className={styles.promoTeaserIcon}>{p.icon}</span>
                <div>
                  <div className={styles.promoTeaserTitle}>{p.title}</div>
                  <div className={styles.promoTeaserBenefit}>{p.benefit}</div>
                  <div className={styles.promoTeaserCond}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
