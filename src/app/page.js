"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [memberPhone, setMemberPhone] = useState("");
  const [memberName, setMemberName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGuestOrder = () => {
    router.push("/order");
  };

  const handleMemberLogin = () => {
    setShowMemberModal(true);
  };

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push(
        `/order?member=true&name=${encodeURIComponent(memberName)}&phone=${encodeURIComponent(memberPhone)}`
      );
    }, 600);
  };

  const handleStaffAccess = () => {
    router.push("/staff");
  };

  return (
    <div className={styles.container}>
      {/* Background effects */}
      <div className={styles.bgGlow1}></div>
      <div className={styles.bgGlow2}></div>
      <div className={styles.bgGrid}></div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <span className={styles.navLogo}></span>
          <span className={styles.navTitle}>ครัวสุดโหด</span>
        </div>
        <button className={styles.staffBtn} onClick={handleStaffAccess}>
          <span>พนักงาน</span>
        </button>
      </nav>

      {/* Hero Section */}
      <main className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot}></span>
            เปิดให้บริการ
          </div>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLine1}>ยินดีต้อนรับสู่</span>
            <span className={styles.heroTitleLine2}>ครัวสุดโหด</span>
          </h1>
          <p className={styles.heroDesc}>
            สัมผัสประสบการณ์อาหารรสเลิศจากเชฟมืออาชีพ
            <br />
            กว่า 26 เมนูคัดสรรจากวัตถุดิบชั้นดี
          </p>

          {/* CTA Buttons */}
          <div className={styles.ctaGroup}>
            <button className={styles.ctaPrimary} onClick={handleGuestOrder}>
              <span className={styles.ctaIcon}></span>
              <div className={styles.ctaText}>
                <span className={styles.ctaLabel}>สั่งอาหารเลย</span>
                <span className={styles.ctaSub}>ไม่ต้องสมัครสมาชิก</span>
              </div>
              <span className={styles.ctaArrow}>→</span>
            </button>

            <button className={styles.ctaSecondary} onClick={handleMemberLogin}>
              <span className={styles.ctaIcon}></span>
              <div className={styles.ctaText}>
                <span className={styles.ctaLabel}>สมาชิก</span>
                <span className={styles.ctaSub}>เข้าสู่ระบบเพื่อรับสิทธิพิเศษ</span>
              </div>
              <span className={styles.ctaArrow}>→</span>
            </button>
          </div>

          {/* Features */}
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}></span>
              <span>สั่งง่าย</span>
            </div>
            <div className={styles.featureDivider}></div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}></span>
              <span>อาหารสด</span>
            </div>
            <div className={styles.featureDivider}></div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}></span>
              <span>คุณภาพ</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className={styles.heroImage}>
          <div className={styles.heroImageWrapper}>
            <img src="/hero.jpg" alt="Savory Kitchen Food" />
            <div className={styles.heroImageOverlay}></div>
          </div>
          <div className={styles.floatingCard1}>
            <span></span>
            <div>
              <strong>เมนูยอดนิยม</strong>
              <small>ต้มยำกุ้ง</small>
            </div>
          </div>
          <div className={styles.floatingCard2}>
            <span> </span>
            <div>
              <strong>4.9/5</strong>
              <small>คะแนนรีวิว</small>
            </div>
          </div>
        </div>
      </main>

      {/* Member Modal */}
      {showMemberModal && (
        <div className="modal-overlay" onClick={() => setShowMemberModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalIcon}></span>
              <h2>เข้าสู่ระบบสมาชิก</h2>
              <p>กรอกข้อมูลเพื่อรับสิทธิพิเศษ</p>
            </div>
            <form onSubmit={handleMemberSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>ชื่อ - นามสกุล</label>
                <input
                  type="text"
                  placeholder="เช่น สมชาย ใจดี"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  placeholder="0xx-xxx-xxxx"
                  value={memberPhone}
                  onChange={(e) => setMemberPhone(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className={styles.modalSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }}></span>
                ) : (
                  "เข้าสู่ระบบ"
                )}
              </button>
            </form>
            <button
              className={styles.modalClose}
              onClick={() => setShowMemberModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
