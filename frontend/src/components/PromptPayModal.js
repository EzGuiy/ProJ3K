"use client";

import React, { useState, useEffect } from "react";
import {
  PROMPTPAY_PHONE,
  formatPhoneDisplay,
  formatCurrency,
  generatePromptPayQrDataUrl,
} from "@/lib/promptpay";

export default function PromptPayModal({
  isOpen,
  onClose,
  orderId,
  tableNumber,
  amount = 0,
  customerName = "ลูกค้าทั่วไป",
  isStaff = false,
  onPaymentSuccess = null,
}) {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [loadingQr, setLoadingQr] = useState(true);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [error, setError] = useState("");
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  // เมื่อชำระเงินสำเร็จ (ฝั่งลูกค้า) ให้นับถอยหลังและเด้งกลับหน้าแรกอัตโนมัติ ถือว่าจ่ายจบแล้ว
  useEffect(() => {
    let interval;
    if (paidSuccess && !isStaff) {
      setRedirectCountdown(3);
      interval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            try {
              localStorage.removeItem("pos_table_number");
            } catch (e) { }
            window.location.href = "/";
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [paidSuccess, isStaff]);

  const numAmount = Math.max(0, Number(amount) || 0);

  // สร้าง QR Code อัตโนมัติเมื่อ Modal เปิดขึ้นมา
  useEffect(() => {
    let isMounted = true;
    if (isOpen && numAmount > 0) {
      setLoadingQr(true);
      setError("");
      setPaidSuccess(false);
      setPaymentInfo(null);

      generatePromptPayQrDataUrl(PROMPTPAY_PHONE, numAmount, {
        scale: 8,
        margin: 2,
        color: {
          dark: "#002040",
          light: "#ffffff",
        },
      })
        .then((url) => {
          if (isMounted) {
            setQrDataUrl(url);
            setLoadingQr(false);
          }
        })
        .catch((err) => {
          if (isMounted) {
            console.error("Failed to generate PromptPay QR:", err);
            setError("ไม่สามารถสร้าง QR Code ได้ กรุณาลองใหม่อีกครั้ง");
            setLoadingQr(false);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen, numAmount]);

  if (!isOpen) return null;

  // คัดลอกเบอร์พร้อมเพย์
  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(PROMPTPAY_PHONE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ดาวน์โหลดรูป QR Code เก็บไว้ในเครื่อง
  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `PromptPay_Table${tableNumber || "All"}_${numAmount}THB.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // บันทึกการชำระเงินลง Database
  const handleConfirmPayment = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderId || null,
          tableNumber: tableNumber ? String(tableNumber).trim() : null,
          amount: numAmount,
          paymentMethod: "PROMPTPAY",
          clearTable: true,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPaidSuccess(true);
        setPaymentInfo(data.payment);
        if (onPaymentSuccess) {
          onPaymentSuccess(data.payment);
        }
      } else {
        setError(data.error || "เกิดข้อผิดพลาดในการบันทึกการชำระเงิน");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-quick"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-[420px] overflow-hidden rounded-3xl border border-white/20 bg-[#0f1118] shadow-[0_20px_60px_rgba(0,0,0,0.8)] animate-scale-in text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── PromptPay Official Header Banner ── */}
        <div className="relative bg-gradient-to-r from-[#002e5b] via-[#004080] to-[#002244] px-6 py-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* PromptPay Stylized Emblem */}
              <div className="flex size-9 items-center justify-center rounded-lg bg-white p-1 shadow-md">
                <span className="text-xs font-black tracking-tighter text-[#003b71]">
                  PP
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-black tracking-wide text-white">
                    พร้อมเพย์
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-amber-300 uppercase bg-amber-400/20 px-1.5 py-0.5 rounded">
                    PromptPay
                  </span>
                </div>
                <div className="text-[11px] text-blue-200">
                  ระบบสแกนชำระเงินแบบล็อคยอด
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition"
              aria-label="ปิด"
            >
              ✕
            </button>
          </div>

          {/* Table & Order Mini Badges */}
          <div className="mt-3 flex items-center gap-2 text-xs">
            {tableNumber && (
              <span className="rounded-md bg-white/15 px-2.5 py-0.5 font-bold text-white border border-white/10">
                📍 โต๊ะ {tableNumber}
              </span>
            )}
            {orderId && (
              <span className="rounded-md bg-black/25 px-2.5 py-0.5 font-mono text-[11px] text-blue-200">
                บิล #{String(orderId).slice(0, 8)}
              </span>
            )}
            {customerName && customerName !== "ลูกค้าทั่วไป" && (
              <span className="truncate rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/80">
                👤 {customerName}
              </span>
            )}
          </div>
        </div>

        {/* ── Main Modal Content ── */}
        <div className="p-6">
          {paidSuccess ? (
            /* ── หน้าจอสำเร็จเมื่อบันทึกการชำระเงินเรียบร้อย ── */
            <div className="flex flex-col items-center py-4 text-center animate-card-in">
              <div className="flex size-20 items-center justify-center rounded-full bg-green-500/20 border-2 border-green-500 text-4xl mb-4 text-green-400">
                ✓
              </div>
              <h3 className="text-xl font-black text-white">
                ชำระเงินสำเร็จแล้ว!
              </h3>
              <p className="mt-1 text-xs text-emerald-400 font-semibold">
                {isStaff
                  ? "ระบบได้บันทึกการรับชำระเงิน ปิดบิล และเคลียร์สถานะโต๊ะเรียบร้อยแล้ว"
                  : `ระบบหยุดเวลาโต๊ะเรียบร้อยแล้ว กำลังพาท่านกลับสู่หน้าแรกใน ${redirectCountdown} วินาที...`}
              </p>

              {/* Payment Summary Box */}
              <div className="mt-5 w-full rounded-2xl bg-white/[0.04] border border-white/10 p-4 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">ยอดชำระ:</span>
                  <span className="font-bold text-amber-400 text-sm">
                    {formatCurrency(paymentInfo?.amount || numAmount)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/50">ช่องทางชำระ:</span>
                  <span className="font-semibold text-white">
                    พร้อมเพย์ (093-363-2239)
                  </span>
                </div>
                {tableNumber && (
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50">โต๊ะ:</span>
                    <span className="font-semibold text-white">
                      โต๊ะ {tableNumber} (สถานะ: คืนโต๊ะว่างแล้ว)
                    </span>
                  </div>
                )}
                {paymentInfo?.referenceNo && (
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/50">รหัสอ้างอิง:</span>
                    <span className="font-mono text-white/80 text-[11px]">
                      {paymentInfo.referenceNo}
                    </span>
                  </div>
                )}
                {paymentInfo?.pointsEarned > 0 && (
                  <div className="flex justify-between pt-1 text-green-400 font-bold">
                    <span>⭐ แต้มสมาชิกที่ได้รับ:</span>
                    <span>+{paymentInfo.pointsEarned} แต้ม</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (!isStaff) {
                    try {
                      localStorage.removeItem("pos_table_number");
                    } catch (e) { }
                    window.location.href = "/";
                  }
                }}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 py-3 text-sm font-bold text-black shadow-lg hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isStaff ? "เสร็จสิ้น" : "🏠 เสร็จสิ้น (กลับหน้าแรกทันที)"}</span>
              </button>
            </div>
          ) : (
            /* ── หน้าจอแสดง QR Code และยอดเงินสำหรับสแกน ── */
            <div className="flex flex-col items-center">
              {/* Amount Display */}
              <div className="text-center mb-4">
                <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider block">
                  ยอดเงินที่ต้องชำระ (ล็อคยอดอัตโนมัติ)
                </span>
                <div className="mt-1 text-3xl font-black text-amber-400 tracking-tight">
                  {formatCurrency(numAmount)}
                </div>
                <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-blue-500/15 border border-blue-400/30 px-3 py-0.5 text-[11px] font-semibold text-blue-300">
                  <span>🔒 ล็อคยอดแล้ว</span>
                  <span>•</span>
                  <span>ไม่ต้องกรอกยอดเงินเอง</span>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="relative flex flex-col items-center justify-center rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.5)] border-2 border-slate-200">
                {loadingQr ? (
                  <div className="flex h-[230px] w-[230px] flex-col items-center justify-center gap-2 text-slate-500">
                    <div className="size-8 animate-spin rounded-full border-3 border-blue-600 border-t-transparent" />
                    <span className="text-xs font-semibold">
                      กำลังสร้าง QR พร้อมเพย์...
                    </span>
                  </div>
                ) : qrDataUrl ? (
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrDataUrl}
                      alt={`PromptPay QR ฿${numAmount}`}
                      className="size-[230px] rounded-lg"
                    />
                    {/* Center PromptPay Tiny Badge Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="flex size-9 items-center justify-center rounded-md bg-[#003b71] text-white text-[10px] font-black border-2 border-white shadow-md">
                        TH
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-[230px] w-[230px] items-center justify-center text-xs text-red-500">
                    {error || "ไม่สามารถแสดง QR Code ได้"}
                  </div>
                )}

                {/* Subtitle inside white card */}
                <div className="mt-2 text-center text-[10px] font-bold tracking-widest text-[#003b71] uppercase">
                  Thai QR Payment • PromptPay
                </div>
              </div>

              {/* Receiver Info & Copy Button */}


              {/* Instructions */}
              <div className="mt-3 w-full rounded-xl bg-blue-950/30 border border-blue-500/20 px-3.5 py-2.5 text-[11px] text-blue-200/90 leading-relaxed">
                <div className="font-bold text-blue-300 mb-1 flex items-center gap-1.5">
                  <span>📱 วิธีการชำระเงิน:</span>
                </div>
                <ol className="list-decimal pl-4 space-y-0.5 text-white/70">
                  <li>เปิดแอปธนาคารใดก็ได้ (K PLUS, SCB, NEXT, etc.)</li>
                  <li>เลือกเมนู &quot;สแกน QR / จ่ายเงิน&quot;</li>
                  <li>
                    ระบบจะแสดงยอดเงิน{" "}
                    <strong className="text-amber-300">
                      {formatCurrency(numAmount)}
                    </strong>{" "}
                    ให้อัตโนมัติ ตรวจสอบและกดยืนยัน
                  </li>
                </ol>
              </div>

              {/* Error message */}
              {error && (
                <div className="mt-3 w-full rounded-xl bg-red-500/15 border border-red-500/30 p-2.5 text-center text-xs text-red-300">
                  ⚠️ {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 flex w-full flex-col gap-2">
                <button
                  type="button"
                  disabled={submitting || numAmount <= 0}
                  onClick={handleConfirmPayment}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 py-3 text-sm font-black text-black shadow-lg hover:brightness-110 active:scale-[0.99] disabled:opacity-50 transition cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="size-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      <span>กำลังบันทึกการชำระเงิน...</span>
                    </>
                  ) : isStaff ? (
                    <>
                      <span>✅ ยืนยันรับเงินแล้ว (ปิดบิล & เคลียร์โต๊ะ)</span>
                    </>
                  ) : (
                    <>
                      <span>✅ สแกนชำระเงินแล้ว (แจ้งชำระเงิน)</span>
                    </>
                  )}
                </button>

                <div className="flex gap-2 w-full">
                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    className="flex-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 text-xs font-semibold text-white/80 transition"
                  >
                    📥 ดาวน์โหลด QR
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 text-xs font-semibold text-white/60 hover:text-white transition"
                  >
                    ปิดหน้าต่าง
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
