import Link from "next/link";
import { getPromotions } from "@/lib/promotionStore";
import styles from "./promotions.module.css";

export const dynamic = "force-dynamic";

export default function PromotionsPage() {
  const promotions = getPromotions();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.back} href="/">
          ← กลับ
        </Link>
        <div>
          <p className={styles.kicker}>ครัวสุดโหด</p>
          <h1>โปรโมชั่นวันนี้</h1>
        </div>
      </header>

      <p className={styles.lead}>มี 3 รายการ ใช้ได้ตอนจองคิวตามเงื่อนไขของแต่ละโปร</p>

      <div className={styles.list}>
        {promotions.map((promo) => (
          <article key={promo.id} className={styles.card}>
            <div className={styles.titleRow}>
              <span>{promo.icon}</span>
              <h2>{promo.title}</h2>
            </div>
            <p>{promo.desc}</p>
            <strong>{promo.benefit}</strong>
          </article>
        ))}
      </div>

      <Link className={styles.reserve} href="/reserve">
        ไปจองคิว
      </Link>
    </div>
  );
}
