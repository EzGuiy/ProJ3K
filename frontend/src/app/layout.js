import "./globals.css";

export const metadata = {
  title: "ครัวสุดโหด — POS ระบบสั่งอาหาร",
  description: "ระบบ POS สั่งอาหารออนไลน์สำหรับร้านอาหาร ครัวสุดโหด พร้อมเมนูหลากหลาย",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
