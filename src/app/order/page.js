"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { menuCategories, menuItems } from "@/lib/menu";
import styles from "./order.module.css";

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
  const [showCart, setShowCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
          item.nameEn.toLowerCase().includes(query)
      );
    }
    return items;
  }, [selectedCategory, searchQuery]);

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const addToCart = useCallback((menuItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === menuItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
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
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
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
    [cart]
  );

  const handleSubmitOrder = async () => {
    if (cart.length === 0) return;

    setIsSubmitting(true);
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
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const spicyDots = (level) => {
    if (level === 0) return null;
    return (
      <span className={styles.spicyDots}>
        {Array.from({ length: level }, (_, i) => (
          <span key={i} className={styles.spicyDot}>
            🌶️
          </span>
        ))}
      </span>
    );
  };

  if (showSuccess) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successContent}>
          <div className={styles.successIcon}>✅</div>
          <h1>สั่งอาหารสำเร็จ!</h1>
          <p className={styles.successOrderId}>
            หมายเลขออเดอร์: <strong>#{orderId}</strong>
          </p>
          <p className={styles.successMsg}>
            ออเดอร์ของคุณถูกส่งไปยังครัวเรียบร้อยแล้ว
            <br />
            กรุณารอสักครู่ พนักงานจะนำอาหารมาเสิร์ฟให้
          </p>
          <div className={styles.successActions}>
            <button
              className={styles.successBtnPrimary}
              onClick={() => {
                setShowSuccess(false);
                setOrderId(null);
              }}
            >
              🍽️ สั่งเพิ่มอีก
            </button>
            <button className={styles.successBtnSecondary} onClick={() => router.push("/")}>
              🏠 กลับหน้าหลัก
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => router.push("/")}>
            ← กลับ
          </button>
          <div className={styles.headerInfo}>
            <h1 className={styles.headerTitle}>เมนูอาหาร</h1>
            {isMember && (
              <span className={styles.memberBadge}>
                ⭐ สวัสดี {memberName}
              </span>
            )}
          </div>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.tableInput}>
            <label>🪑 โต๊ะ:</label>
            <input
              type="text"
              placeholder="เลขโต๊ะ"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />
          </div>
          <button
            className={styles.cartBtn}
            onClick={() => setShowCart(true)}
          >
            <span>🛒</span>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="ค้นหาเมนู..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        {searchQuery && (
          <button
            className={styles.searchClear}
            onClick={() => setSearchQuery("")}
          >
            ✕
          </button>
        )}
      </div>

      {/* Categories */}
      <div className={styles.categories}>
        {menuCategories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.categoryBtn} ${
              selectedCategory === cat.id ? styles.categoryActive : ""
            }`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span className={styles.categoryIcon}>{cat.icon}</span>
            <span className={styles.categoryName}>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className={styles.menuGrid}>
        {filteredItems.map((item, index) => {
          const qty = getItemQuantity(item.id);
          return (
            <div
              key={item.id}
              className={`${styles.menuCard} ${qty > 0 ? styles.menuCardActive : ""}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {item.popular && (
                <span className={styles.popularBadge}>🔥 ยอดนิยม</span>
              )}
              <div className={styles.menuCardTop}>
                <span className={styles.menuEmoji}>{item.image}</span>
                {spicyDots(item.spicyLevel)}
              </div>
              <div className={styles.menuCardBody}>
                <h3 className={styles.menuName}>{item.name}</h3>
                <p className={styles.menuNameEn}>{item.nameEn}</p>
                <p className={styles.menuDesc}>{item.description}</p>
              </div>
              <div className={styles.menuCardFooter}>
                <span className={styles.menuPrice}>
                  ฿{item.price.toLocaleString()}
                </span>
                {qty > 0 ? (
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => removeFromCart(item.id)}
                    >
                      −
                    </button>
                    <span className={styles.qtyValue}>{qty}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className={styles.addBtn}
                    onClick={() => addToCart(item)}
                  >
                    + เพิ่ม
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Cart Summary */}
      {cartCount > 0 && !showCart && (
        <div className={styles.floatingCart} onClick={() => setShowCart(true)}>
          <div className={styles.floatingCartLeft}>
            <span className={styles.floatingCartIcon}>🛒</span>
            <span className={styles.floatingCartCount}>{cartCount} รายการ</span>
          </div>
          <span className={styles.floatingCartTotal}>
            ฿{cartTotal.toLocaleString()}
          </span>
          <span className={styles.floatingCartArrow}>ดูตะกร้า →</span>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div
          className={styles.cartOverlay}
          onClick={() => setShowCart(false)}
        >
          <div
            className={styles.cartSidebar}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.cartHeader}>
              <h2>🛒 ตะกร้าสั่งอาหาร</h2>
              <button
                className={styles.cartCloseBtn}
                onClick={() => setShowCart(false)}
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className={styles.cartEmpty}>
                <span>🍽️</span>
                <p>ยังไม่มีรายการในตะกร้า</p>
              </div>
            ) : (
              <>
                <div className={styles.cartItems}>
                  {cart.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                      <span className={styles.cartItemEmoji}>{item.image}</span>
                      <div className={styles.cartItemInfo}>
                        <h4>{item.name}</h4>
                        <span className={styles.cartItemPrice}>
                          ฿{item.price.toLocaleString()} x {item.quantity}
                        </span>
                      </div>
                      <div className={styles.cartItemActions}>
                        <span className={styles.cartItemTotal}>
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <div className={styles.cartItemQty}>
                          <button onClick={() => removeFromCart(item.id)}>
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => addToCart(item)}>+</button>
                        </div>
                        <button
                          className={styles.cartItemDelete}
                          onClick={() => deleteFromCart(item.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.cartNote}>
                  <label>📝 หมายเหตุ:</label>
                  <textarea
                    placeholder="เช่น ไม่ใส่ผักชี, เผ็ดน้อย..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                  />
                </div>

                {isMember && (
                  <div className={styles.cartDiscount}>
                    <span>⭐ ส่วนลดสมาชิก 10%</span>
                    <span>
                      -฿{Math.round(cartTotal * 0.1).toLocaleString()}
                    </span>
                  </div>
                )}

                <div className={styles.cartSummary}>
                  <div className={styles.cartSummaryRow}>
                    <span>รวม ({cartCount} รายการ)</span>
                    <span>฿{cartTotal.toLocaleString()}</span>
                  </div>
                  {isMember && (
                    <div className={styles.cartSummaryRow}>
                      <span>ส่วนลดสมาชิก</span>
                      <span className={styles.discountText}>
                        -฿{Math.round(cartTotal * 0.1).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className={styles.cartTotalRow}>
                    <span>ยอดสุทธิ</span>
                    <span>
                      ฿
                      {(isMember
                        ? Math.round(cartTotal * 0.9)
                        : cartTotal
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  className={styles.submitBtn}
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner"
                        style={{
                          width: 20,
                          height: 20,
                          borderWidth: 2,
                        }}
                      ></span>
                      กำลังส่งออเดอร์...
                    </>
                  ) : (
                    "✅ ยืนยันสั่งอาหาร"
                  )}
                </button>
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            background: "var(--bg-primary)",
          }}
        >
          <div className="spinner"></div>
        </div>
      }
    >
      <OrderPageContent />
    </Suspense>
  );
}
