"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../ticket.module.css";

function formatSlot(iso) {
  return new Date(iso).toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Bangkok",
  });
}

function ConfirmContent() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || "";
  const [reservation, setReservation] = useState(null);
  const [promoTitle, setPromoTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("ไม่พบรหัสคิว");
      setLoading(false);
      return;
    }

    let ignore = false;
    async function load() {
      try {
        const [reserveRes, promoRes] = await Promise.all([
          fetch(`/api/reservations/${token}`),
          fetch("/api/promotions"),
        ]);
        const reserveData = await reserveRes.json();
        const promoData = await promoRes.json();
        if (!reserveRes.ok) {
          if (!ignore) setError(reserveData.error || "ไม่พบคิวนี้");
          return;
        }
        if (ignore) return;
        setReservation(reserveData.reservation);
        const promo = (promoData.promotions || []).find(
          (item) => item.id === reserveData.reservation.promotionId
        );
        setPromoTitle(promo ? `${promo.icon} ${promo.title}` : "");
      } catch {
        if (!ignore) setError("โหลดข้อมูลคิวไม่สำเร็จ");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [token]);

  const checkIn = async () => {
    if (!reservation) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/reservations/${reservation.qrToken}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "checked-in" }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "เช็คอินไม่สำเร็จ");
        return;
      }
      setReservation(data.reservation);
    } catch {
      setError("เช็คอินไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.ghost} onClick={() => router.push("/reserve/scan")}>
          ← สแกนใหม่
        </button>
        <h1>คิวที่สแกน</h1>
      </header>

      {loading && <p className={styles.muted}>กำลังเปิดคิว...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {reservation && (
        <article className={styles.card}>
          <p className={styles.token}>#{reservation.qrToken}</p>
          <h2>{reservation.name}</h2>
          <dl>
            <div>
              <dt>เวลา</dt>
              <dd>{formatSlot(reservation.timeSlot)} น.</dd>
            </div>
            <div>
              <dt>จำนวน</dt>
              <dd>{reservation.partySize} คน</dd>
            </div>
            <div>
              <dt>ประเภท</dt>
              <dd>{reservation.orderType === "buffet" ? "บุฟเฟ่" : "อลาคาร์ต"}</dd>
            </div>
            <div>
              <dt>เบอร์โทร</dt>
              <dd>{reservation.phone}</dd>
            </div>
            {promoTitle && (
              <div>
                <dt>โปรโมชั่น</dt>
                <dd>{promoTitle}</dd>
              </div>
            )}
            <div>
              <dt>สถานะ</dt>
              <dd>{reservation.status === "checked-in" ? "เช็คอินแล้ว" : "รอเข้าคิว"}</dd>
            </div>
          </dl>

          {reservation.status !== "checked-in" && (
            <button className={styles.primary} onClick={checkIn} disabled={saving}>
              {saving ? "กำลังบันทึก..." : "เช็คอินคิวนี้"}
            </button>
          )}
        </article>
      )}
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className={styles.page}>กำลังเปิดคิว...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}
