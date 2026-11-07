"use client";

import { useState, useMemo, useCallback, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { menuCategories, menuItems } from "@/lib/menu";

/* ---------- Shared bits ---------- */

// Orange stays the brand color. Dark text on it gives readable contrast (white on orange is too low for small text).
const ON_ORANGE = "text-[#0a0a0f]";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";

const ICONS = {
  cart: "M3 4h2l2.4 11h10.2l2-8H6.2M9 20h.01M17 20h.01",
  search: "M21 21l-4.3-4.3M17 11a6 6 0 11-12 0 6 6 0 0112 0z",
  close: "M6 6l12 12M18 6L6 18",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  trash: "M4 7h16M10 11v6M14 11v6M6 7l1 12h10l1-12M9 7V4h6v3",
  check: "M5 12.5l4.5 4.5L19 7",
  back: "M15 5l-7 7 7 7",
  sun: "M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M3 12h1M20 12h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7M12 7a5 5 0 100 10A5 5 0 0012 7z",
  moon: "M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z",
};

function Icon({ name, className = "size-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

// item.image can be an emoji or an image path/URL
const isImageSrc = (v) =>
  typeof v === "string" &&
  (/^(https?:)?\/\//.test(v) || v.startsWith("/") || /\.(png|jpe?g|webp|avif|gif|svg)$/i.test(v));

function MenuImage({ src, className = "", emojiClass = "text-5xl" }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-glass leading-none ${className}`}
      aria-hidden="true"
    >
      {isImageSrc(src) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" loading="lazy" className="size-full object-cover" />
      ) : (
        <span className={emojiClass}>{src}</span>
      )}
    </span>
  );
}

function Stepper({ qty, name, onMinus, onPlus }) {
  const btn = `flex size-9 items-center justify-center text-ink transition-colors duration-150 hover:bg-orange hover:text-[#0a0a0f] ${FOCUS}`;
  return (
    <div className="flex items-center overflow-hidden rounded-md border border-line">
      <button
        className={btn}
        onClick={onMinus}
        aria-label={`ลดจำนวน ${name}`}
      >
        <Icon name="minus" className="size-4" />
      </button>
      <span className="min-w-8 text-center text-sm font-bold text-orange">
        {qty}
      </span>
      <button className={btn} onClick={onPlus} aria-label={`เพิ่มจำนวน ${name}`}>
        <Icon name="plus" className="size-4" />
      </button>
    </div>
  );
}

function OrderPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isMember = searchParams.get("member") === "true";
  const memberName = searchParams.get("name") || "";
  const memberPhone = searchParams.get("phone") || "";

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(true);

  // Initialise theme from localStorage, then sync html class on every change
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const dark = saved ? saved === "dark" : true; // default: dark
    setIsDark(dark);
    document.documentElement.classList.toggle("light", !dark);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("light", !next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  const filteredItems = useMemo(() => {
    let items = menuItems;
    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.nameEn.toLowerCase().includes(query),
      );
    }
    return items;
  }, [selectedCategory, searchQuery]);

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const addToCart = useCallback((menuItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === menuItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...menuItem, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        );
      }
      return prev.filter((item) => item.id !== itemId);
    });
  }, []);

  const deleteFromCart = useCallback((itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const getItemQuantity = useCallback(
    (itemId) => {
      const item = cart.find((i) => i.id === itemId);
      return item ? item.quantity : 0;
    },
    [cart],
  );

  // Close the cart with Escape
  useEffect(() => {
    if (!showCart) return;
    const onKey = (e) => {
      if (e.key === "Escape") setShowCart(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showCart]);

  const handleSubmitOrder = async () => {
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: isMember ? memberName : "ลูกค้าทั่วไป",
          customerPhone: isMember ? memberPhone : "",
          isMember,
          tableNumber: tableNumber || "-",
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            nameEn: item.nameEn,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          note,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setOrderId(data.order.id);
        setShowSuccess(true);
        setShowCart(false);
        setCart([]);
      } else {
        setSubmitError("ส่งออเดอร์ไม่สำเร็จ กรุณาลองอีกครั้ง");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitError("เชื่อมต่อไม่ได้ ตรวจสอบอินเทอร์เน็ตแล้วลองอีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  const discount = isMember ? Math.round(cartTotal * 0.1) : 0;
  const netTotal = isMember ? Math.round(cartTotal * 0.9) : cartTotal;

  /* ---------- Success page ---------- */
  if (showSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-app px-5 py-10">
        <div className="w-full max-w-[400px] text-center">
          <div
            className={`mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-green ${ON_ORANGE}`}
          >
            <Icon name="check" className="size-8" />
          </div>
          <h1 className="mb-2 text-[1.75rem] font-extrabold text-ink">
            ส่งออเดอร์เรียบร้อย
          </h1>
          <p className="mb-6 text-ink-2">
            หมายเลขออเดอร์{" "}
            <strong className="text-xl text-orange">#{orderId}</strong>
          </p>
          <p className="mb-8 text-[0.95rem] leading-[1.7] text-ink-3">
            ครัวได้รับออเดอร์แล้ว พนักงานจะนำอาหารไปเสิร์ฟที่โต๊ะ
          </p>
          <div className="flex flex-col gap-3">
            <button
              className={`rounded-md bg-orange px-7 py-3.5 text-base font-bold transition hover:brightness-110 ${ON_ORANGE} ${FOCUS}`}
              onClick={() => {
                setShowSuccess(false);
                setOrderId(null);
              }}
            >
              สั่งอาหารเพิ่ม
            </button>
            <button
              className={`rounded-md border border-line px-7 py-3.5 text-base font-medium text-ink-2 transition-colors hover:bg-glass hover:text-ink ${FOCUS}`}
              onClick={() => router.push("/")}
            >
              กลับหน้าหลัก
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Main page ---------- */
  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <header className="sticky top-0 z-[100] border-b border-line bg-app">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6 max-md:flex-wrap">
          <div className="flex min-w-0 items-center gap-3">
            <button
              className={`flex items-center gap-1.5 rounded-md border border-line px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-glass hover:text-ink ${FOCUS}`}
              onClick={() => router.push("/")}
            >
              <Icon name="back" className="size-4" />
              กลับ
            </button>
            <div className="min-w-0">
              <h1 className="text-lg font-bold leading-tight">เมนูอาหาร</h1>
              {isMember && (
                <p className="truncate text-xs font-medium text-amber">
                  สวัสดี {memberName} สมาชิกลด 10%
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-ink-2">
              <label htmlFor="table-number" className="whitespace-nowrap font-medium">
                โต๊ะ
              </label>
              <input
                id="table-number"
                type="text"
                placeholder="เลขโต๊ะ"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-[76px] rounded-md border border-line bg-glass px-3 py-2 text-center text-sm text-ink placeholder:text-ink-3 focus:border-orange focus:outline-none"
              />
            </div>
            {/* Theme toggle */}
            <button
              className={`flex size-11 items-center justify-center rounded-md border border-line text-ink transition-colors hover:bg-glass ${FOCUS}`}
              onClick={toggleTheme}
              aria-label={isDark ? "เปลี่ยนเป็นธีมสว่าง" : "เปลี่ยนเป็นธีมมืด"}
              title={isDark ? "ธีมสว่าง" : "ธีมมืด"}
            >
              <Icon name={isDark ? "sun" : "moon"} />
            </button>

            <button
              className={`relative flex size-11 items-center justify-center rounded-md border border-line text-ink transition-colors hover:bg-glass ${FOCUS}`}
              onClick={() => setShowCart(true)}
              aria-label={`เปิดตะกร้า มี ${cartCount} รายการ`}
            >
              <Icon name="cart" />
              {cartCount > 0 && (
                <span
                  className={`absolute -right-1.5 -top-1.5 flex h-5 min-w-5 animate-pop items-center justify-center rounded-full bg-orange px-1 text-xs font-bold ${ON_ORANGE}`}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl">
        {/* Search */}
        <div className="px-4 pt-5 md:px-6">
          <div className="relative max-w-[480px]">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-ink-3"
            />
            <input
              type="text"
              placeholder="ค้นหาเมนู"
              aria-label="ค้นหาเมนู"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-line bg-glass py-3 pl-11 pr-11 text-[0.95rem] text-ink placeholder:text-ink-3 focus:border-orange focus:outline-none focus:ring-[3px] focus:ring-orange/10"
            />
            {searchQuery && (
              <button
                className={`absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-md text-ink-3 hover:text-ink ${FOCUS}`}
                onClick={() => setSearchQuery("")}
                aria-label="ล้างคำค้นหา"
              >
                <Icon name="close" className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div
          className="no-scrollbar mt-4 flex gap-1 overflow-x-auto border-b border-line px-4 md:px-6"
          role="tablist"
          aria-label="หมวดหมู่เมนู"
        >
          {menuCategories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={active}
                className={`-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors duration-150 ${FOCUS} ${
                  active
                    ? "border-orange text-ink"
                    : "border-transparent text-ink-3 hover:text-ink"
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="text-base" aria-hidden="true">
                  {cat.icon}
                </span>
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Menu list */}
        {filteredItems.length === 0 ? (
          <div className="px-4 py-16 text-center md:px-6">
            <p className="mb-1 text-base font-semibold text-ink">
              ไม่พบเมนูที่ตรงกับ “{searchQuery}”
            </p>
            <p className="mb-5 text-sm text-ink-3">
              ลองค้นหาด้วยคำอื่น หรือเลือกหมวดหมู่ใหม่
            </p>
            <button
              className={`rounded-md border border-line px-4 py-2 text-sm font-medium text-ink-2 hover:bg-glass hover:text-ink ${FOCUS}`}
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              ดูเมนูทั้งหมด
            </button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-x-12 px-1 py-2 md:px-3 xl:grid-cols-2">
            {filteredItems.map((item) => {
              const qty = getItemQuantity(item.id);
              return (
                <li
                  key={item.id}
                  className={`flex gap-5 border-b border-line px-4 py-6 transition-colors duration-150 ${
                    qty > 0 ? "bg-orange/[0.05]" : ""
                  }`}
                >
                  <MenuImage
                    src={item.image}
                    className="size-24 sm:size-32"
                    emojiClass="text-5xl sm:text-6xl"
                  />

                  <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold leading-snug">
                        {item.name}
                        {item.popular && (
                          <span className="ml-2 align-middle text-xs font-semibold text-orange">
                            ยอดนิยม
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-ink-3">{item.nameEn}</p>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-[1.6] text-ink-2">
                        {item.description}
                      </p>
                      {item.spicyLevel > 0 && (
                        <span
                          className="mt-1 inline-block text-xs"
                          role="img"
                          aria-label={`เผ็ดระดับ ${item.spicyLevel}`}
                        >
                          {"🌶️".repeat(item.spicyLevel)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-2">
                      <span className="text-lg font-extrabold text-orange">
                        ฿{item.price.toLocaleString()}
                      </span>
                      {qty > 0 ? (
                        <Stepper
                          qty={qty}
                          name={item.name}
                          onMinus={() => removeFromCart(item.id)}
                          onPlus={() => addToCart(item)}
                        />
                      ) : (
                        <button
                          className={`flex h-9 items-center gap-1.5 rounded-md bg-orange px-4 text-sm font-semibold transition hover:brightness-110 ${ON_ORANGE} ${FOCUS}`}
                          onClick={() => addToCart(item)}
                          aria-label={`เพิ่ม ${item.name} ลงตะกร้า`}
                        >
                          <Icon name="plus" className="size-4" />
                          เพิ่ม
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>

      {/* Cart summary bar */}
      {cartCount > 0 && !showCart && (
        <button
          className={`fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-xl animate-pop items-center justify-between gap-4 rounded-md bg-orange px-5 py-3.5 shadow-lg transition hover:brightness-110 ${ON_ORANGE} ${FOCUS}`}
          onClick={() => setShowCart(true)}
        >
          <span className="flex items-center gap-2.5 text-sm font-semibold">
            <Icon name="cart" />
            {cartCount} รายการ
          </span>
          <span className="text-lg font-extrabold">
            ฿{cartTotal.toLocaleString()}
          </span>
          <span className="text-sm font-bold">ดูตะกร้า</span>
        </button>
      )}

      {/* Cart drawer */}
      {showCart && (
        <div
          className="fixed inset-0 z-[1000] flex animate-fade-quick justify-end bg-black/60"
          onClick={() => setShowCart(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="flex h-full w-[420px] max-w-full animate-drawer flex-col overflow-hidden border-l border-line bg-panel max-md:w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <h2 id="cart-title" className="text-lg font-bold">
                ตะกร้าสั่งอาหาร
              </h2>
              <button
                className={`flex size-10 items-center justify-center rounded-md text-ink-3 transition-colors hover:bg-glass hover:text-ink ${FOCUS}`}
                onClick={() => setShowCart(false)}
                aria-label="ปิดตะกร้า"
              >
                <Icon name="close" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-base text-ink-2">ยังไม่มีรายการในตะกร้า</p>
                <button
                  className={`rounded-md border border-line px-4 py-2 text-sm font-medium text-ink-2 hover:bg-glass hover:text-ink ${FOCUS}`}
                  onClick={() => setShowCart(false)}
                >
                  เลือกเมนู
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex animate-fade-quick items-start gap-3 border-b border-line py-4"
                    >
                      <MenuImage
                        src={item.image}
                        className="size-14"
                        emojiClass="text-3xl"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-[0.95rem] font-semibold">
                          {item.name}
                        </h3>
                        <p className="mb-2 text-xs text-ink-3">
                          ฿{item.price.toLocaleString()} ต่อชิ้น
                        </p>
                        <Stepper
                          qty={item.quantity}
                          name={item.name}
                          onMinus={() => removeFromCart(item.id)}
                          onPlus={() => addToCart(item)}
                        />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[0.95rem] font-bold text-orange">
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          className={`flex size-9 items-center justify-center rounded-md text-ink-3 transition-colors hover:text-ink ${FOCUS}`}
                          onClick={() => deleteFromCart(item.id)}
                          aria-label={`นำ ${item.name} ออกจากตะกร้า`}
                        >
                          <Icon name="trash" className="size-[18px]" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-line px-6 pt-4">
                  <label
                    htmlFor="order-note"
                    className="mb-1.5 block text-sm font-semibold text-ink-2"
                  >
                    หมายเหตุถึงครัว
                  </label>
                  <textarea
                    id="order-note"
                    placeholder="เช่น ไม่ใส่ผักชี, เผ็ดน้อย"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    className="w-full resize-none rounded-md border border-line bg-glass px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-3 focus:border-orange focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2 px-6 py-4">
                  <div className="flex justify-between text-sm text-ink-2">
                    <span>รวม ({cartCount} รายการ)</span>
                    <span>฿{cartTotal.toLocaleString()}</span>
                  </div>
                  {isMember && (
                    <div className="flex justify-between text-sm text-amber">
                      <span>ส่วนลดสมาชิก 10%</span>
                      <span>-฿{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-line pt-3 text-[1.2rem] font-extrabold text-ink">
                    <span>ยอดสุทธิ</span>
                    <span>฿{netTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  {submitError && (
                    <p
                      role="alert"
                      className="mb-3 rounded-md border border-orange/30 bg-orange/[0.08] px-3.5 py-2.5 text-sm text-ink"
                    >
                      {submitError}
                    </p>
                  )}
                  <button
                    className={`flex w-full items-center justify-center gap-2.5 rounded-md bg-orange p-4 text-base font-bold transition hover:enabled:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 ${ON_ORANGE} ${FOCUS}`}
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner"
                          style={{ width: 20, height: 20, borderWidth: 2 }}
                        ></span>
                        กำลังส่งออเดอร์
                      </>
                    ) : (
                      "ยืนยันสั่งอาหาร"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-app">
          <div className="spinner"></div>
        </div>
      }
    >
      <OrderPageContent />
    </Suspense>
  );
}