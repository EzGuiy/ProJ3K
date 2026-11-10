
"use client";

import { useState, useMemo, useCallback, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

  // Menu data from MySQL Database
  const [menuItems, setMenuItems] = useState([]);
  const [menuCategories, setMenuCategories] = useState([
    { id: "all", name: "ทั้งหมด", icon: "🍽️" },
  ]);
  const [loadingMenu, setLoadingMenu] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [isTableBound, setIsTableBound] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(true);

  // สถานะการติดตามออเดอร์ของโต๊ะนี้
  const [tableOrders, setTableOrders] = useState([]);
  const [showTracker, setShowTracker] = useState(false);
  const [newOrderSuccessId, setNewOrderSuccessId] = useState(null);

  // ดึงรายการออเดอร์ทั้งหมดของโต๊ะนี้ (ทั้งที่กำลังทำและเสิร์ฟแล้ว)
  const fetchTableOrders = useCallback(async () => {
    if (!tableNumber) return;
    try {
      const res = await fetch(`/api/orders?table=${encodeURIComponent(tableNumber)}&session=true`);
      if (res.ok) {
        const data = await res.json();
        setTableOrders(data.orders || []);
      }
    } catch (err) {
      console.error("Error fetching table orders:", err);
    }
  }, [tableNumber]);

  // คอยอัปเดตสถานะของโต๊ะนี้อัตโนมัติทุก 5 วินาที
  useEffect(() => {
    if (!tableNumber) return;
    fetchTableOrders();
    const interval = setInterval(fetchTableOrders, 5000);
    return () => clearInterval(interval);
  }, [tableNumber, fetchTableOrders]);

  // รวมรายการอาหารทั้งหมดของโต๊ะนี้
  const allTableItems = useMemo(() => {
    const list = [];
    for (const ord of tableOrders) {
      for (const it of ord.items || []) {
        list.push({
          ...it,
          orderId: ord.id || ord.short_id,
          orderTime: ord.createdAt,
        });
      }
    }
    return list;
  }, [tableOrders]);

  // แยกรายการที่ "ยังไม่มาเสิร์ฟ" (PENDING, COOKING, READY)
  const unservedItems = useMemo(() => {
    return allTableItems.filter((it) => it.kitchen_status !== "SERVED");
  }, [allTableItems]);

  // แยกรายการที่ "เสิร์ฟแล้ว" (SERVED)
  const servedItems = useMemo(() => {
    return allTableItems.filter((it) => it.kitchen_status === "SERVED");
  }, [allTableItems]);

  const tableUnservedCount = unservedItems.reduce((sum, it) => sum + (it.quantity || 1), 0);
  const tableServedCount = servedItems.reduce((sum, it) => sum + (it.quantity || 1), 0);
  const tableTotalItemsCount = tableUnservedCount + tableServedCount;

  // ล็อกและจดจำหมายเลขโต๊ะสำหรับเครื่อง POS นี้โดยอัตโนมัติ
  useEffect(() => {
    const urlTable = searchParams.get("table");
    if (urlTable) {
      setTableNumber(urlTable);
      setIsTableBound(true);
      try {
        localStorage.setItem("pos_table_number", urlTable);
      } catch (e) {}
    } else {
      try {
        const savedTable = localStorage.getItem("pos_table_number");
        if (savedTable) {
          setTableNumber(savedTable);
          setIsTableBound(true);
        }
      } catch (e) {}
    }
  }, [searchParams]);

  const handleBindTable = (num) => {
    setTableNumber(num);
    setIsTableBound(true);
    try {
      localStorage.setItem("pos_table_number", num);
    } catch (e) {}
    setShowTableModal(false);
  };

  // ดึงรายการเมนูจาก MySQL Database ผ่าน API
  useEffect(() => {
    fetch("/api/menus")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) {
          const catIcons = {
            cat_appetizer: "🥗",
            cat_main: "🍛",
            cat_noodle: "🍜",
            cat_grill: "🍢",
            cat_seafood: "🦐",
            cat_dessert: "🥭",
            cat_drink: "🧋",
          };
          const mappedCats = [
            { id: "all", name: "ทั้งหมด", icon: "🍽️" },
            ...data.categories.map((c) => ({
              id: c.category_id,
              name: c.name,
              icon: catIcons[c.category_id] || "🍽️",
            })),
          ];
          setMenuCategories(mappedCats);
        }
        if (data.menus) {
          const mapped = data.menus.map((m) => ({
            id: m.menu_id,
            menu_id: m.menu_id,
            name: m.name,
            nameEn: m.name_en || "",
            description: m.description || "",
            price: Number(m.price),
            category: m.category_id,
            image: m.image_url || "🍽️",
            image_url: m.image_url || "🍽️",
            popular: Boolean(m.is_popular),
            spicyLevel: Number(m.spicy_level || 0),
          }));
          setMenuItems(mapped);
        }
      })
      .catch((err) => console.error("Fetch menus error:", err))
      .finally(() => setLoadingMenu(false));
  }, []);

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
  }, [menuItems, selectedCategory, searchQuery]);

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

  // ส่งออเดอร์ลง MySQL Database
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
            id: item.menu_id || item.id,
            menu_id: item.menu_id || item.id,
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
        const newId = data.order.short_id || data.order.id;
        setOrderId(newId);
        setNewOrderSuccessId(newId);
        setShowCart(false);
        setCart([]);
        setNote("");
        await fetchTableOrders();
        setShowTracker(true);
      } else {
        setSubmitError(data.error || "ส่งออเดอร์ไม่สำเร็จ กรุณาลองอีกครั้ง");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitError("เชื่อมต่อไม่ได้ ตรวจสอบการเชื่อมต่อแล้วลองอีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  };

  const discount = isMember ? Math.round(cartTotal * 0.1) : 0;
  const netTotal = isMember ? Math.round(cartTotal * 0.9) : cartTotal;

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
            {/* Table Badge / Binding */}
            {tableNumber ? (
              <div className="flex items-center gap-1.5 rounded-md border border-orange/40 bg-orange/10 px-3 py-1.5 text-sm font-bold text-orange">
                <span>📍 โต๊ะ {tableNumber}</span>
                <span className="hidden text-xs font-normal text-ink-3 sm:inline">(ประจำเครื่อง)</span>
                <button
                  type="button"
                  onClick={() => setShowTableModal(true)}
                  title="เปลี่ยนหมายเลขโต๊ะสำหรับเครื่องนี้"
                  className="ml-1 text-xs text-ink-3 hover:text-ink"
                >
                  ⚙️
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowTableModal(true)}
                className="flex items-center gap-1.5 rounded-md border border-orange bg-orange/10 px-3 py-1.5 text-sm font-semibold text-orange hover:bg-orange/20"
              >
                <span>📍 ตั้งค่าโต๊ะเครื่องนี้</span>
              </button>
            )}

            {/* Status / Tracker Button */}
            {tableNumber && (
              <button
                type="button"
                onClick={() => {
                  setShowTracker(true);
                  fetchTableOrders();
                }}
                className={`flex items-center gap-2 rounded-md border border-line bg-glass px-3 py-1.5 text-sm font-semibold transition hover:border-orange hover:bg-glass-strong ${FOCUS}`}
                title="ตรวจสอบรายการอาหารที่สั่งทั้งหมดของโต๊ะนี้"
              >
                <span>📋 สถานะอาหาร</span>
                {tableUnservedCount > 0 ? (
                  <span className="flex items-center gap-1 rounded-full bg-orange px-2 py-0.5 text-xs font-bold text-[#0a0a0f]">
                    <span className="size-1.5 rounded-full bg-[#0a0a0f] animate-ping" />
                    รอ {tableUnservedCount}
                  </span>
                ) : tableServedCount > 0 ? (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">
                    ✓ เสิร์ฟครบ
                  </span>
                ) : null}
              </button>
            )}

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

        {/* Loading Spinner for menus */}
        {loadingMenu ? (
          <div className="flex h-64 items-center justify-center">
            <div className="spinner"></div>
          </div>
        ) : filteredItems.length === 0 ? (
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

      {/* Floating Order Status Bar (when items are waiting to be served) */}
      {cartCount === 0 && tableUnservedCount > 0 && !showCart && !showTracker && (
        <button
          className={`fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-xl animate-pop items-center justify-between gap-4 rounded-md border border-orange/40 bg-panel px-5 py-3.5 shadow-xl transition hover:border-orange ${FOCUS}`}
          onClick={() => {
            setShowTracker(true);
            fetchTableOrders();
          }}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex size-2.5 rounded-full bg-orange animate-ping" />
            <span className="text-sm font-bold text-orange">
              มีอาหารรอเสิร์ฟ {tableUnservedCount} รายการ (โต๊ะ {tableNumber})
            </span>
          </div>
          <span className="text-xs font-semibold text-ink-2 underline">
            คลิกเพื่อดูสถานะ 📋
          </span>
        </button>
      )}

      {/* Modal ติดตามสถานะอาหารและสิ่งที่ยังไม่มาเสิร์ฟ */}
      {showTracker && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fade-quick"
          onClick={() => {
            setShowTracker(false);
            setNewOrderSuccessId(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-line px-6 py-4 bg-glass">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-ink">
                    📋 รายการอาหาร — โต๊ะ {tableNumber || "-"}
                  </h2>
                  <span className="rounded-full bg-orange/15 px-2.5 py-0.5 text-xs font-bold text-orange">
                    {tableOrders.length} ออเดอร์
                  </span>
                </div>
                <p className="text-xs text-ink-3">
                  ตรวจสอบรายการที่ยังไม่มาเสิร์ฟ และรายการที่เสิร์ฟถึงโต๊ะแล้วแบบเรียลไทม์
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-md border border-line bg-glass px-2.5 py-1.5 text-xs font-medium text-ink-2 hover:bg-glass-strong hover:text-ink"
                  onClick={fetchTableOrders}
                  title="รีเฟรชสถานะล่าสุด"
                >
                  🔄 รีเฟรช
                </button>
                <button
                  type="button"
                  className="flex size-9 items-center justify-center rounded-md text-ink-3 hover:bg-glass hover:text-ink"
                  onClick={() => {
                    setShowTracker(false);
                    setNewOrderSuccessId(null);
                  }}
                  aria-label="ปิดหน้าต่าง"
                >
                  <Icon name="close" className="size-5" />
                </button>
              </div>
            </div>

            {/* Alert banner if freshly submitted an order */}
            {newOrderSuccessId && (
              <div className="mx-6 mt-4 flex items-center justify-between rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🎉</span>
                  <div>
                    <strong className="text-emerald-400">
                      ส่งออเดอร์ #{newOrderSuccessId} เรียบร้อยแล้ว!
                    </strong>
                    <div className="text-xs text-emerald-300/80">
                      ครัวได้รับรายการอาหารแล้ว สามารถติดตามสถานะแต่ละจานด้านล่างนี้ได้เลย
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-xs text-emerald-400 underline hover:text-emerald-200"
                  onClick={() => setNewOrderSuccessId(null)}
                >
                  ปิดการแจ้งเตือน
                </button>
              </div>
            )}

            {/* Stats Summary Bar */}
            <div className="grid grid-cols-3 gap-3 p-6 pb-2">
              <div
                className={`rounded-xl border p-3 text-center transition ${
                  tableUnservedCount > 0
                    ? "border-orange/50 bg-orange/10"
                    : "border-line bg-glass"
                }`}
              >
                <span className="text-2xl font-extrabold text-orange">
                  {tableUnservedCount}
                </span>
                <div className="text-xs font-semibold text-ink-2 mt-0.5">
                  ⏳ ยังไม่มาเสิร์ฟ
                </div>
              </div>

              <div className="rounded-xl border border-line bg-glass p-3 text-center">
                <span className="text-2xl font-extrabold text-emerald-400">
                  {tableServedCount}
                </span>
                <div className="text-xs font-semibold text-ink-2 mt-0.5">
                  ✅ เสิร์ฟแล้ว
                </div>
              </div>

              <div className="rounded-xl border border-line bg-glass p-3 text-center">
                <span className="text-2xl font-extrabold text-ink">
                  {tableTotalItemsCount}
                </span>
                <div className="text-xs font-semibold text-ink-2 mt-0.5">
                  🍽️ รายการทั้งหมด
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {allTableItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span className="text-4xl mb-3">🍽️</span>
                  <p className="font-semibold text-ink">
                    ยังไม่มีรายการสั่งอาหารสำหรับโต๊ะนี้
                  </p>
                  <p className="text-xs text-ink-3 mt-1">
                    กรุณาเลือกเมนูที่คุณชื่นชอบแล้วกดยืนยันสั่งอาหาร
                  </p>
                  <button
                    type="button"
                    className="mt-4 rounded-md bg-orange px-5 py-2.5 text-sm font-bold text-[#0a0a0f] hover:brightness-110"
                    onClick={() => setShowTracker(false)}
                  >
                    ดูรายการเมนู
                  </button>
                </div>
              ) : (
                <>
                  {/* Section 1: รายการที่ยังไม่มาเสิร์ฟ */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                        <span className="text-orange">⚠️</span>
                        <span>รายการที่ยังไม่มาเสิร์ฟ</span>
                        <span className="rounded-full bg-orange/20 px-2 py-0.5 text-xs font-bold text-orange">
                          {unservedItems.length} รายการ ({tableUnservedCount} จาน)
                        </span>
                      </h3>
                    </div>

                    {unservedItems.length === 0 ? (
                      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
                        <p className="text-sm font-bold text-emerald-400">
                          🎉 อาหารทุกรายการเสิร์ฟถึงโต๊ะคุณครบแล้ว!
                        </p>
                        <p className="text-xs text-ink-3 mt-1">
                          หากต้องการสั่งอะไรเพิ่มเติม สามารถกดปุ่มสั่งอาหารเพิ่มด้านล่างได้เลย
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {unservedItems.map((item, idx) => {
                          const isReady = item.kitchen_status === "READY";
                          const isCooking = item.kitchen_status === "COOKING";
                          const isPending = item.kitchen_status === "PENDING";

                          return (
                            <div
                              key={item.order_item_id || idx}
                              className={`flex items-center justify-between gap-3 rounded-xl border p-3 transition ${
                                isReady
                                  ? "border-emerald-500/50 bg-emerald-500/10 shadow-sm"
                                  : isCooking
                                  ? "border-blue-500/30 bg-blue-500/5"
                                  : "border-line bg-glass"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <MenuImage
                                  src={item.image || item.image_url}
                                  className="size-12 rounded-lg"
                                  emojiClass="text-2xl"
                                />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-ink truncate">
                                      {item.name}
                                    </span>
                                    <span className="font-extrabold text-sm text-orange shrink-0">
                                      x{item.quantity}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    {item.station_code && (
                                      <span className="rounded bg-glass px-1.5 py-0.5 text-[0.65rem] font-bold text-ink-3 uppercase border border-line">
                                        {item.station_code}
                                      </span>
                                    )}
                                    <span className="text-xs text-ink-3">
                                      ฿{(item.price * item.quantity).toLocaleString()}
                                    </span>
                                    <span className="text-[0.7rem] text-ink-3">
                                      (ออเดอร์ #{item.orderId})
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Status Badge */}
                              <div className="shrink-0 text-right">
                                {isReady && (
                                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500 bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 animate-pulse">
                                    <span>⭐</span>
                                    <span>ปรุงเสร็จแล้ว กำลังนำมาเสิร์ฟ!</span>
                                  </span>
                                )}
                                {isCooking && (
                                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/40 bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-400">
                                    <span>🔥</span>
                                    <span>กำลังปรุงในครัว</span>
                                  </span>
                                )}
                                {isPending && (
                                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-400">
                                    <span>⏳</span>
                                    <span>รอคิวปรุง</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Section 2: รายการที่เสิร์ฟถึงโต๊ะแล้ว */}
                  {servedItems.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold text-ink flex items-center gap-2 mb-3">
                        <span className="text-emerald-400">✅</span>
                        <span>รายการที่เสิร์ฟถึงโต๊ะแล้ว</span>
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">
                          {servedItems.length} รายการ ({tableServedCount} จาน)
                        </span>
                      </h3>

                      <div className="space-y-2 opacity-80">
                        {servedItems.map((item, idx) => (
                          <div
                            key={item.order_item_id || idx}
                            className="flex items-center justify-between gap-3 rounded-xl border border-line bg-glass/60 p-3"
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <MenuImage
                                src={item.image || item.image_url}
                                className="size-10 rounded-lg grayscale-[20%]"
                                emojiClass="text-xl"
                              />
                              <div className="min-w-0 flex-1">
                                <span className="font-semibold text-sm text-ink truncate block line-through opacity-75">
                                  {item.name}
                                </span>
                                <span className="text-xs text-ink-3">
                                  x{item.quantity} • ฿{(item.price * item.quantity).toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                              ✓ เสิร์ฟแล้ว
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-line bg-glass px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-ink-3 block">
                  ยอดรวมทั้งสิ้น (โต๊ะ {tableNumber})
                </span>
                <span className="text-lg font-extrabold text-orange">
                  ฿{tableOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-md border border-line px-4 py-2.5 text-sm font-medium text-ink-2 hover:bg-glass hover:text-ink"
                  onClick={() => {
                    setShowTracker(false);
                    setNewOrderSuccessId(null);
                  }}
                >
                  ปิดหน้าต่าง
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-md bg-orange px-5 py-2.5 text-sm font-bold text-[#0a0a0f] hover:brightness-110"
                  onClick={() => {
                    setShowTracker(false);
                    setNewOrderSuccessId(null);
                  }}
                >
                  <span>+ สั่งอาหารเพิ่ม</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal ตั้งค่าโต๊ะสำหรับเครื่อง POS นี้ */}
      {showTableModal && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowTableModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl border border-line bg-panel p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">📍 ตั้งค่าโต๊ะประจำเครื่อง POS</h3>
              <button
                className="text-ink-3 hover:text-ink"
                onClick={() => setShowTableModal(false)}
              >
                ✕
              </button>
            </div>
            <p className="mb-4 text-xs text-ink-3">
              เลือกว่าเครื่อง Tablet นี้ประจำอยู่ที่โต๊ะไหน ระบบจะจำค่าไว้โดยไม่ต้องกรอกซ้ำ
            </p>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`flex h-11 items-center justify-center rounded-lg border font-bold text-sm transition ${
                    tableNumber === String(num)
                      ? "border-orange bg-orange text-[#0a0a0f]"
                      : "border-line bg-glass text-ink hover:border-orange/50"
                  }`}
                  onClick={() => handleBindTable(String(num))}
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ระบุเลขโต๊ะอื่นๆ"
                defaultValue={tableNumber}
                id="custom-table-input"
                className="flex-1 rounded-md border border-line bg-glass px-3 py-2 text-sm text-ink placeholder:text-ink-3 focus:border-orange focus:outline-none"
              />
              <button
                type="button"
                className="rounded-md bg-orange px-4 py-2 text-sm font-bold text-[#0a0a0f] hover:brightness-110"
                onClick={() => {
                  const val = document.getElementById("custom-table-input")?.value?.trim();
                  if (val) handleBindTable(val);
                }}
              >
                บันทึก
              </button>
            </div>
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
