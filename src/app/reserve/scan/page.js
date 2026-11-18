"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../ticket.module.css";

function tokenFromValue(raw) {
  const value = String(raw || "").trim();
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.searchParams.get("token") || value;
  } catch {
    const match = value.match(/token=([^&\s]+)/i);
    return match ? decodeURIComponent(match[1]) : value;
  }
}

export default function ScanPage() {
  const router = useRouter();
  const videoRef = useRef(null);
  const [manual, setManual] = useState("");
  const [cameraNote, setCameraNote] = useState("กำลังเปิดกล้อง...");
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    let stop = false;
    let stream;

    async function loadQueue() {
      try {
        const response = await fetch("/api/reservations");
        const data = await response.json();
        const now = Date.now();
        const upcoming = (data.reservations || [])
          .filter((item) => {
            const slot = new Date(item.timeSlot).getTime();
            return item.status !== "cancelled" && slot >= now - 30 * 60 * 1000;
          })
          .sort((a, b) => new Date(a.timeSlot) - new Date(b.timeSlot));
        if (!stop) setQueue(upcoming);
      } catch {
        if (!stop) setQueue([]);
      }
    }

    async function startCamera() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraNote("อุปกรณ์นี้เปิดกล้องไม่ได้ พิมพ์รหัสคิวด้านล่าง");
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        if (stop || !videoRef.current) return;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        if (!("BarcodeDetector" in window)) {
          setCameraNote("กล้องเปิดแล้ว แต่เบราว์เซอร์นี้สแกนคิวอาร์อัตโนมัติไม่ได้ ให้พิมพ์รหัส");
          return;
        }
        setCameraNote("หันคิวอาร์เข้าหากล้อง");
        const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
        const loop = async () => {
          if (stop || !videoRef.current) return;
          try {
            const codes = await detector.detect(videoRef.current);
            const token = tokenFromValue(codes[0]?.rawValue);
            if (token) {
              stop = true;
              router.push(`/reserve/confirm?token=${encodeURIComponent(token)}`);
              return;
            }
          } catch {
            /* keep scanning */
          }
          if (!stop) requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
      } catch {
        if (!stop) setCameraNote("เปิดกล้องไม่ได้ พิมพ์รหัสคิวด้านล่าง");
      }
    }

    loadQueue();
    startCamera();
    return () => {
      stop = true;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [router]);

  const openManual = (event) => {
    event.preventDefault();
    const token = tokenFromValue(manual);
    if (!token) return;
    router.push(`/reserve/confirm?token=${encodeURIComponent(token)}`);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.ghost} onClick={() => router.push("/")}>
          ← กลับ
        </button>
        <div>
          <h1>สแกนคิว</h1>
          <p className={styles.muted}>{cameraNote}</p>
        </div>
      </header>

      <div className={styles.cameraBox}>
        <video ref={videoRef} className={styles.video} muted playsInline />
      </div>

      <form className={styles.manual} onSubmit={openManual}>
        <label htmlFor="queue-code">หรือพิมพ์รหัสบนคิวอาร์</label>
        <div className={styles.manualRow}>
          <input
            id="queue-code"
            value={manual}
            onChange={(event) => setManual(event.target.value.toUpperCase())}
            placeholder="เช่น AB12CD34"
          />
          <button className={styles.primary} type="submit">
            เปิดคิว
          </button>
        </div>
      </form>

      <section className={styles.queue}>
        <h2>คิวที่จองไว้</h2>
        {queue.length === 0 && <p className={styles.muted}>ยังไม่มีคิวในช่วงนี้</p>}
        {queue.map((item) => (
          <button
            key={item.id}
            className={styles.queueItem}
            onClick={() =>
              router.push(`/reserve/confirm?token=${encodeURIComponent(item.qrToken)}`)
            }
          >
            <strong>
              {new Date(item.timeSlot).toLocaleTimeString("th-TH", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Asia/Bangkok",
              })}
            </strong>
            <span>{item.name}</span>
            <span>{item.orderType === "buffet" ? "บุฟเฟ่" : "อลาคาร์ต"}</span>
            <span>{item.partySize} คน</span>
          </button>
        ))}
      </section>
    </div>
  );
}
