(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/app/order/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrderPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/menu.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
/* ---------- Shared bits ---------- */ // Orange stays the brand color. Dark text on it gives readable contrast (white on orange is too low for small text).
const ON_ORANGE = "text-[#0a0a0f]";
const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange";
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
    moon: "M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
};
function Icon({ name, className = "size-5" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: className,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: ICONS[name]
        }, void 0, false, {
            fileName: "[project]/frontend/src/app/order/page.js",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/order/page.js",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = Icon;
// item.image can be an emoji or an image path/URL
const isImageSrc = (v)=>typeof v === "string" && (/^(https?:)?\/\//.test(v) || v.startsWith("/") || /\.(png|jpe?g|webp|avif|gif|svg)$/i.test(v));
function MenuImage({ src, className = "", emojiClass = "text-5xl" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-glass leading-none ${className}`,
        "aria-hidden": "true",
        children: isImageSrc(src) ? // eslint-disable-next-line @next/next/no-img-element
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: src,
            alt: "",
            loading: "lazy",
            className: "size-full object-cover"
        }, void 0, false, {
            fileName: "[project]/frontend/src/app/order/page.js",
            lineNumber: 57,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: emojiClass,
            children: src
        }, void 0, false, {
            fileName: "[project]/frontend/src/app/order/page.js",
            lineNumber: 59,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/order/page.js",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_c1 = MenuImage;
function Stepper({ qty, name, onMinus, onPlus }) {
    const btn = `flex size-9 items-center justify-center text-ink transition-colors duration-150 hover:bg-orange hover:text-[#0a0a0f] ${FOCUS}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center overflow-hidden rounded-md border border-line",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: btn,
                onClick: onMinus,
                "aria-label": `ลดจำนวน ${name}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    name: "minus",
                    className: "size-4"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/order/page.js",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/order/page.js",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "min-w-8 text-center text-sm font-bold text-orange",
                children: qty
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/order/page.js",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: btn,
                onClick: onPlus,
                "aria-label": `เพิ่มจำนวน ${name}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    name: "plus",
                    className: "size-4"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/order/page.js",
                    lineNumber: 80,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/order/page.js",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/app/order/page.js",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_c2 = Stepper;
function OrderPageContent() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const isMember = searchParams.get("member") === "true";
    const memberName = searchParams.get("name") || "";
    const memberPhone = searchParams.get("phone") || "";
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tableNumber, setTableNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [note, setNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitError, setSubmitError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showCart, setShowCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSuccess, setShowSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [orderId, setOrderId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isDark, setIsDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Initialise theme from localStorage, then sync html class on every change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrderPageContent.useEffect": ()=>{
            const saved = localStorage.getItem("theme");
            const dark = saved ? saved === "dark" : true; // default: dark
            setIsDark(dark);
            document.documentElement.classList.toggle("light", !dark);
        }
    }["OrderPageContent.useEffect"], []);
    const toggleTheme = ()=>{
        setIsDark((prev)=>{
            const next = !prev;
            document.documentElement.classList.toggle("light", !next);
            localStorage.setItem("theme", next ? "dark" : "light");
            return next;
        });
    };
    const filteredItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OrderPageContent.useMemo[filteredItems]": ()=>{
            let items = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["menuItems"];
            if (selectedCategory !== "all") {
                items = items.filter({
                    "OrderPageContent.useMemo[filteredItems]": (item)=>item.category === selectedCategory
                }["OrderPageContent.useMemo[filteredItems]"]);
            }
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                items = items.filter({
                    "OrderPageContent.useMemo[filteredItems]": (item)=>item.name.toLowerCase().includes(query) || item.nameEn.toLowerCase().includes(query)
                }["OrderPageContent.useMemo[filteredItems]"]);
            }
            return items;
        }
    }["OrderPageContent.useMemo[filteredItems]"], [
        selectedCategory,
        searchQuery
    ]);
    const cartTotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OrderPageContent.useMemo[cartTotal]": ()=>cart.reduce({
                "OrderPageContent.useMemo[cartTotal]": (sum, item)=>sum + item.price * item.quantity
            }["OrderPageContent.useMemo[cartTotal]"], 0)
    }["OrderPageContent.useMemo[cartTotal]"], [
        cart
    ]);
    const cartCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OrderPageContent.useMemo[cartCount]": ()=>cart.reduce({
                "OrderPageContent.useMemo[cartCount]": (sum, item)=>sum + item.quantity
            }["OrderPageContent.useMemo[cartCount]"], 0)
    }["OrderPageContent.useMemo[cartCount]"], [
        cart
    ]);
    const addToCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OrderPageContent.useCallback[addToCart]": (menuItem)=>{
            setCart({
                "OrderPageContent.useCallback[addToCart]": (prev)=>{
                    const existing = prev.find({
                        "OrderPageContent.useCallback[addToCart].existing": (item)=>item.id === menuItem.id
                    }["OrderPageContent.useCallback[addToCart].existing"]);
                    if (existing) {
                        return prev.map({
                            "OrderPageContent.useCallback[addToCart]": (item)=>item.id === menuItem.id ? {
                                    ...item,
                                    quantity: item.quantity + 1
                                } : item
                        }["OrderPageContent.useCallback[addToCart]"]);
                    }
                    return [
                        ...prev,
                        {
                            ...menuItem,
                            quantity: 1
                        }
                    ];
                }
            }["OrderPageContent.useCallback[addToCart]"]);
        }
    }["OrderPageContent.useCallback[addToCart]"], []);
    const removeFromCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OrderPageContent.useCallback[removeFromCart]": (itemId)=>{
            setCart({
                "OrderPageContent.useCallback[removeFromCart]": (prev)=>{
                    const existing = prev.find({
                        "OrderPageContent.useCallback[removeFromCart].existing": (item)=>item.id === itemId
                    }["OrderPageContent.useCallback[removeFromCart].existing"]);
                    if (existing && existing.quantity > 1) {
                        return prev.map({
                            "OrderPageContent.useCallback[removeFromCart]": (item)=>item.id === itemId ? {
                                    ...item,
                                    quantity: item.quantity - 1
                                } : item
                        }["OrderPageContent.useCallback[removeFromCart]"]);
                    }
                    return prev.filter({
                        "OrderPageContent.useCallback[removeFromCart]": (item)=>item.id !== itemId
                    }["OrderPageContent.useCallback[removeFromCart]"]);
                }
            }["OrderPageContent.useCallback[removeFromCart]"]);
        }
    }["OrderPageContent.useCallback[removeFromCart]"], []);
    const deleteFromCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OrderPageContent.useCallback[deleteFromCart]": (itemId)=>{
            setCart({
                "OrderPageContent.useCallback[deleteFromCart]": (prev)=>prev.filter({
                        "OrderPageContent.useCallback[deleteFromCart]": (item)=>item.id !== itemId
                    }["OrderPageContent.useCallback[deleteFromCart]"])
            }["OrderPageContent.useCallback[deleteFromCart]"]);
        }
    }["OrderPageContent.useCallback[deleteFromCart]"], []);
    const getItemQuantity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OrderPageContent.useCallback[getItemQuantity]": (itemId)=>{
            const item = cart.find({
                "OrderPageContent.useCallback[getItemQuantity].item": (i)=>i.id === itemId
            }["OrderPageContent.useCallback[getItemQuantity].item"]);
            return item ? item.quantity : 0;
        }
    }["OrderPageContent.useCallback[getItemQuantity]"], [
        cart
    ]);
    // Close the cart with Escape
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrderPageContent.useEffect": ()=>{
            if (!showCart) return;
            const onKey = {
                "OrderPageContent.useEffect.onKey": (e)=>{
                    if (e.key === "Escape") setShowCart(false);
                }
            }["OrderPageContent.useEffect.onKey"];
            window.addEventListener("keydown", onKey);
            return ({
                "OrderPageContent.useEffect": ()=>window.removeEventListener("keydown", onKey)
            })["OrderPageContent.useEffect"];
        }
    }["OrderPageContent.useEffect"], [
        showCart
    ]);
    const handleSubmitOrder = async ()=>{
        if (cart.length === 0) return;
        setIsSubmitting(true);
        setSubmitError("");
        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    customerName: isMember ? memberName : "ลูกค้าทั่วไป",
                    customerPhone: isMember ? memberPhone : "",
                    isMember,
                    tableNumber: tableNumber || "-",
                    items: cart.map((item)=>({
                            id: item.id,
                            name: item.name,
                            nameEn: item.nameEn,
                            price: item.price,
                            quantity: item.quantity,
                            image: item.image
                        })),
                    note
                })
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
        } finally{
            setIsSubmitting(false);
        }
    };
    const discount = isMember ? Math.round(cartTotal * 0.1) : 0;
    const netTotal = isMember ? Math.round(cartTotal * 0.9) : cartTotal;
    /* ---------- Success page ---------- */ if (showSuccess) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-screen items-center justify-center bg-app px-5 py-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-[400px] text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-green ${ON_ORANGE}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            name: "check",
                            className: "size-8"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/order/page.js",
                            lineNumber: 251,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/order/page.js",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mb-2 text-[1.75rem] font-extrabold text-ink",
                        children: "ส่งออเดอร์เรียบร้อย"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/order/page.js",
                        lineNumber: 253,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-6 text-ink-2",
                        children: [
                            "หมายเลขออเดอร์",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "text-xl text-orange",
                                children: [
                                    "#",
                                    orderId
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/order/page.js",
                                lineNumber: 258,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/order/page.js",
                        lineNumber: 256,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-8 text-[0.95rem] leading-[1.7] text-ink-3",
                        children: "ครัวได้รับออเดอร์แล้ว พนักงานจะนำอาหารไปเสิร์ฟที่โต๊ะ"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/order/page.js",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `rounded-md bg-orange px-7 py-3.5 text-base font-bold transition hover:brightness-110 ${ON_ORANGE} ${FOCUS}`,
                                onClick: ()=>{
                                    setShowSuccess(false);
                                    setOrderId(null);
                                },
                                children: "สั่งอาหารเพิ่ม"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/order/page.js",
                                lineNumber: 264,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `rounded-md border border-line px-7 py-3.5 text-base font-medium text-ink-2 transition-colors hover:bg-glass hover:text-ink ${FOCUS}`,
                                onClick: ()=>router.push("/"),
                                children: "กลับหน้าหลัก"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/order/page.js",
                                lineNumber: 273,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/order/page.js",
                        lineNumber: 263,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/order/page.js",
                lineNumber: 247,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/app/order/page.js",
            lineNumber: 246,
            columnNumber: 7
        }, this);
    }
    /* ---------- Main page ---------- */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen pb-28",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-[100] border-b border-line bg-app",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6 max-md:flex-wrap",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-w-0 items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `flex items-center gap-1.5 rounded-md border border-line px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-glass hover:text-ink ${FOCUS}`,
                                    onClick: ()=>router.push("/"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            name: "back",
                                            className: "size-4"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/order/page.js",
                                            lineNumber: 296,
                                            columnNumber: 15
                                        }, this),
                                        "กลับ"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/order/page.js",
                                    lineNumber: 292,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-lg font-bold leading-tight",
                                            children: "เมนูอาหาร"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/order/page.js",
                                            lineNumber: 300,
                                            columnNumber: 15
                                        }, this),
                                        isMember && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "truncate text-xs font-medium text-amber",
                                            children: [
                                                "สวัสดี ",
                                                memberName,
                                                " สมาชิกลด 10%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/order/page.js",
                                            lineNumber: 302,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/order/page.js",
                                    lineNumber: 299,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/order/page.js",
                            lineNumber: 291,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-sm text-ink-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "table-number",
                                            className: "whitespace-nowrap font-medium",
                                            children: "โต๊ะ"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/order/page.js",
                                            lineNumber: 311,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "table-number",
                                            type: "text",
                                            placeholder: "เลขโต๊ะ",
                                            value: tableNumber,
                                            onChange: (e)=>setTableNumber(e.target.value),
                                            className: "w-[76px] rounded-md border border-line bg-glass px-3 py-2 text-center text-sm text-ink placeholder:text-ink-3 focus:border-orange focus:outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/order/page.js",
                                            lineNumber: 314,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/order/page.js",
                                    lineNumber: 310,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `flex size-11 items-center justify-center rounded-md border border-line text-ink transition-colors hover:bg-glass ${FOCUS}`,
                                    onClick: toggleTheme,
                                    "aria-label": isDark ? "เปลี่ยนเป็นธีมสว่าง" : "เปลี่ยนเป็นธีมมืด",
                                    title: isDark ? "ธีมสว่าง" : "ธีมมืด",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        name: isDark ? "sun" : "moon"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/order/page.js",
                                        lineNumber: 330,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/order/page.js",
                                    lineNumber: 324,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `relative flex size-11 items-center justify-center rounded-md border border-line text-ink transition-colors hover:bg-glass ${FOCUS}`,
                                    onClick: ()=>setShowCart(true),
                                    "aria-label": `เปิดตะกร้า มี ${cartCount} รายการ`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            name: "cart"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/order/page.js",
                                            lineNumber: 338,
                                            columnNumber: 15
                                        }, this),
                                        cartCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `absolute -right-1.5 -top-1.5 flex h-5 min-w-5 animate-pop items-center justify-center rounded-full bg-orange px-1 text-xs font-bold ${ON_ORANGE}`,
                                            children: cartCount
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/order/page.js",
                                            lineNumber: 340,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/order/page.js",
                                    lineNumber: 333,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/order/page.js",
                            lineNumber: 309,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/order/page.js",
                    lineNumber: 290,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/order/page.js",
                lineNumber: 289,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "mx-auto max-w-7xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 pt-5 md:px-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative max-w-[480px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    name: "search",
                                    className: "pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-ink-3"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/order/page.js",
                                    lineNumber: 355,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "ค้นหาเมนู",
                                    "aria-label": "ค้นหาเมนู",
                                    value: searchQuery,
                                    onChange: (e)=>setSearchQuery(e.target.value),
                                    className: "w-full rounded-md border border-line bg-glass py-3 pl-11 pr-11 text-[0.95rem] text-ink placeholder:text-ink-3 focus:border-orange focus:outline-none focus:ring-[3px] focus:ring-orange/10"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/order/page.js",
                                    lineNumber: 359,
                                    columnNumber: 13
                                }, this),
                                searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-md text-ink-3 hover:text-ink ${FOCUS}`,
                                    onClick: ()=>setSearchQuery(""),
                                    "aria-label": "ล้างคำค้นหา",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        name: "close",
                                        className: "size-4"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/order/page.js",
                                        lineNumber: 373,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/order/page.js",
                                    lineNumber: 368,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/order/page.js",
                            lineNumber: 354,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/order/page.js",
                        lineNumber: 353,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "no-scrollbar mt-4 flex gap-1 overflow-x-auto border-b border-line px-4 md:px-6",
                        role: "tablist",
                        "aria-label": "หมวดหมู่เมนู",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["menuCategories"].map((cat)=>{
                            const active = selectedCategory === cat.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                role: "tab",
                                "aria-selected": active,
                                className: `-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors duration-150 ${FOCUS} ${active ? "border-orange text-ink" : "border-transparent text-ink-3 hover:text-ink"}`,
                                onClick: ()=>setSelectedCategory(cat.id),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base",
                                        "aria-hidden": "true",
                                        children: cat.icon
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/order/page.js",
                                        lineNumber: 399,
                                        columnNumber: 17
                                    }, this),
                                    cat.name
                                ]
                            }, cat.id, true, {
                                fileName: "[project]/frontend/src/app/order/page.js",
                                lineNumber: 388,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/order/page.js",
                        lineNumber: 380,
                        columnNumber: 9
                    }, this),
                    filteredItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-16 text-center md:px-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-1 text-base font-semibold text-ink",
                                children: [
                                    "ไม่พบเมนูที่ตรงกับ “",
                                    searchQuery,
                                    "”"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/order/page.js",
                                lineNumber: 411,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-5 text-sm text-ink-3",
                                children: "ลองค้นหาด้วยคำอื่น หรือเลือกหมวดหมู่ใหม่"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/order/page.js",
                                lineNumber: 414,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `rounded-md border border-line px-4 py-2 text-sm font-medium text-ink-2 hover:bg-glass hover:text-ink ${FOCUS}`,
                                onClick: ()=>{
                                    setSearchQuery("");
                                    setSelectedCategory("all");
                                },
                                children: "ดูเมนูทั้งหมด"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/order/page.js",
                                lineNumber: 417,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/order/page.js",
                        lineNumber: 410,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "grid grid-cols-1 gap-x-12 px-1 py-2 md:px-3 xl:grid-cols-2",
                        children: filteredItems.map((item)=>{
                            const qty = getItemQuantity(item.id);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: `flex gap-5 border-b border-line px-4 py-6 transition-colors duration-150 ${qty > 0 ? "bg-orange/[0.05]" : ""}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuImage, {
                                        src: item.image,
                                        className: "size-24 sm:size-32",
                                        emojiClass: "text-5xl sm:text-6xl"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/order/page.js",
                                        lineNumber: 438,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-base font-bold leading-snug",
                                                        children: [
                                                            item.name,
                                                            item.popular && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-2 align-middle text-xs font-semibold text-orange",
                                                                children: "ยอดนิยม"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/app/order/page.js",
                                                                lineNumber: 449,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/src/app/order/page.js",
                                                        lineNumber: 446,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-ink-3",
                                                        children: item.nameEn
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/order/page.js",
                                                        lineNumber: 454,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1.5 line-clamp-2 text-sm leading-[1.6] text-ink-2",
                                                        children: item.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/order/page.js",
                                                        lineNumber: 455,
                                                        columnNumber: 23
                                                    }, this),
                                                    item.spicyLevel > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-1 inline-block text-xs",
                                                        role: "img",
                                                        "aria-label": `เผ็ดระดับ ${item.spicyLevel}`,
                                                        children: "🌶️".repeat(item.spicyLevel)
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/order/page.js",
                                                        lineNumber: 459,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/order/page.js",
                                                lineNumber: 445,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-lg font-extrabold text-orange",
                                                        children: [
                                                            "฿",
                                                            item.price.toLocaleString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/src/app/order/page.js",
                                                        lineNumber: 470,
                                                        columnNumber: 23
                                                    }, this),
                                                    qty > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stepper, {
                                                        qty: qty,
                                                        name: item.name,
                                                        onMinus: ()=>removeFromCart(item.id),
                                                        onPlus: ()=>addToCart(item)
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/order/page.js",
                                                        lineNumber: 474,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: `flex h-9 items-center gap-1.5 rounded-md bg-orange px-4 text-sm font-semibold transition hover:brightness-110 ${ON_ORANGE} ${FOCUS}`,
                                                        onClick: ()=>addToCart(item),
                                                        "aria-label": `เพิ่ม ${item.name} ลงตะกร้า`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                name: "plus",
                                                                className: "size-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/app/order/page.js",
                                                                lineNumber: 486,
                                                                columnNumber: 27
                                                            }, this),
                                                            "เพิ่ม"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/src/app/order/page.js",
                                                        lineNumber: 481,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/order/page.js",
                                                lineNumber: 469,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/order/page.js",
                                        lineNumber: 444,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/frontend/src/app/order/page.js",
                                lineNumber: 432,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/order/page.js",
                        lineNumber: 428,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/order/page.js",
                lineNumber: 351,
                columnNumber: 7
            }, this),
            cartCount > 0 && !showCart && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: `fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-xl animate-pop items-center justify-between gap-4 rounded-md bg-orange px-5 py-3.5 shadow-lg transition hover:brightness-110 ${ON_ORANGE} ${FOCUS}`,
                onClick: ()=>setShowCart(true),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-2.5 text-sm font-semibold",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                name: "cart"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/order/page.js",
                                lineNumber: 506,
                                columnNumber: 13
                            }, this),
                            cartCount,
                            " รายการ"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/order/page.js",
                        lineNumber: 505,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-lg font-extrabold",
                        children: [
                            "฿",
                            cartTotal.toLocaleString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/order/page.js",
                        lineNumber: 509,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-bold",
                        children: "ดูตะกร้า"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/order/page.js",
                        lineNumber: 512,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/order/page.js",
                lineNumber: 501,
                columnNumber: 9
            }, this),
            showCart && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[1000] flex animate-fade-quick justify-end bg-black/60",
                onClick: ()=>setShowCart(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": "cart-title",
                    className: "flex h-full w-[420px] max-w-full animate-drawer flex-col overflow-hidden border-l border-line bg-panel max-md:w-full",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between border-b border-line px-6 py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    id: "cart-title",
                                    className: "text-lg font-bold",
                                    children: "ตะกร้าสั่งอาหาร"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/order/page.js",
                                    lineNumber: 530,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `flex size-10 items-center justify-center rounded-md text-ink-3 transition-colors hover:bg-glass hover:text-ink ${FOCUS}`,
                                    onClick: ()=>setShowCart(false),
                                    "aria-label": "ปิดตะกร้า",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        name: "close"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/order/page.js",
                                        lineNumber: 538,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/order/page.js",
                                    lineNumber: 533,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/order/page.js",
                            lineNumber: 529,
                            columnNumber: 13
                        }, this),
                        cart.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-base text-ink-2",
                                    children: "ยังไม่มีรายการในตะกร้า"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/order/page.js",
                                    lineNumber: 544,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `rounded-md border border-line px-4 py-2 text-sm font-medium text-ink-2 hover:bg-glass hover:text-ink ${FOCUS}`,
                                    onClick: ()=>setShowCart(false),
                                    children: "เลือกเมนู"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/order/page.js",
                                    lineNumber: 545,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/order/page.js",
                            lineNumber: 543,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "flex-1 overflow-y-auto px-6",
                                    children: cart.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex animate-fade-quick items-start gap-3 border-b border-line py-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuImage, {
                                                    src: item.image,
                                                    className: "size-14",
                                                    emojiClass: "text-3xl"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/order/page.js",
                                                    lineNumber: 560,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0 flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "truncate text-[0.95rem] font-semibold",
                                                            children: item.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/order/page.js",
                                                            lineNumber: 566,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mb-2 text-xs text-ink-3",
                                                            children: [
                                                                "฿",
                                                                item.price.toLocaleString(),
                                                                " ต่อชิ้น"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/app/order/page.js",
                                                            lineNumber: 569,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Stepper, {
                                                            qty: item.quantity,
                                                            name: item.name,
                                                            onMinus: ()=>removeFromCart(item.id),
                                                            onPlus: ()=>addToCart(item)
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/order/page.js",
                                                            lineNumber: 572,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/order/page.js",
                                                    lineNumber: 565,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col items-end gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[0.95rem] font-bold text-orange",
                                                            children: [
                                                                "฿",
                                                                (item.price * item.quantity).toLocaleString()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/app/order/page.js",
                                                            lineNumber: 580,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: `flex size-9 items-center justify-center rounded-md text-ink-3 transition-colors hover:text-ink ${FOCUS}`,
                                                            onClick: ()=>deleteFromCart(item.id),
                                                            "aria-label": `นำ ${item.name} ออกจากตะกร้า`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                name: "trash",
                                                                className: "size-[18px]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/app/order/page.js",
                                                                lineNumber: 588,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/order/page.js",
                                                            lineNumber: 583,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/order/page.js",
                                                    lineNumber: 579,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, item.id, true, {
                                            fileName: "[project]/frontend/src/app/order/page.js",
                                            lineNumber: 556,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/order/page.js",
                                    lineNumber: 554,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-t border-line px-6 pt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "order-note",
                                            className: "mb-1.5 block text-sm font-semibold text-ink-2",
                                            children: "หมายเหตุถึงครัว"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/order/page.js",
                                            lineNumber: 596,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            id: "order-note",
                                            placeholder: "เช่น ไม่ใส่ผักชี, เผ็ดน้อย",
                                            value: note,
                                            onChange: (e)=>setNote(e.target.value),
                                            rows: 2,
                                            className: "w-full resize-none rounded-md border border-line bg-glass px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-3 focus:border-orange focus:outline-none"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/order/page.js",
                                            lineNumber: 602,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/order/page.js",
                                    lineNumber: 595,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2 px-6 py-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm text-ink-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "รวม (",
                                                        cartCount,
                                                        " รายการ)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/order/page.js",
                                                    lineNumber: 614,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "฿",
                                                        cartTotal.toLocaleString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/order/page.js",
                                                    lineNumber: 615,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/order/page.js",
                                            lineNumber: 613,
                                            columnNumber: 19
                                        }, this),
                                        isMember && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm text-amber",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "ส่วนลดสมาชิก 10%"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/order/page.js",
                                                    lineNumber: 619,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "-฿",
                                                        discount.toLocaleString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/order/page.js",
                                                    lineNumber: 620,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/order/page.js",
                                            lineNumber: 618,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between border-t border-line pt-3 text-[1.2rem] font-extrabold text-ink",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "ยอดสุทธิ"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/order/page.js",
                                                    lineNumber: 624,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "฿",
                                                        netTotal.toLocaleString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/order/page.js",
                                                    lineNumber: 625,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/order/page.js",
                                            lineNumber: 623,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/order/page.js",
                                    lineNumber: 612,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-6 pb-6",
                                    children: [
                                        submitError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            role: "alert",
                                            className: "mb-3 rounded-md border border-orange/30 bg-orange/[0.08] px-3.5 py-2.5 text-sm text-ink",
                                            children: submitError
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/order/page.js",
                                            lineNumber: 631,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: `flex w-full items-center justify-center gap-2.5 rounded-md bg-orange p-4 text-base font-bold transition hover:enabled:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 ${ON_ORANGE} ${FOCUS}`,
                                            onClick: handleSubmitOrder,
                                            disabled: isSubmitting,
                                            children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "spinner",
                                                        style: {
                                                            width: 20,
                                                            height: 20,
                                                            borderWidth: 2
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/app/order/page.js",
                                                        lineNumber: 645,
                                                        columnNumber: 25
                                                    }, this),
                                                    "กำลังส่งออเดอร์"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/order/page.js",
                                                lineNumber: 644,
                                                columnNumber: 23
                                            }, this) : "ยืนยันสั่งอาหาร"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/order/page.js",
                                            lineNumber: 638,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/order/page.js",
                                    lineNumber: 629,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/order/page.js",
                            lineNumber: 553,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/order/page.js",
                    lineNumber: 522,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/order/page.js",
                lineNumber: 518,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/app/order/page.js",
        lineNumber: 287,
        columnNumber: 5
    }, this);
}
_s(OrderPageContent, "VjejkA/FUU1roKQGj++ljJS3nCI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c3 = OrderPageContent;
function OrderPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen items-center justify-center bg-app",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "spinner"
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/order/page.js",
                lineNumber: 670,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/app/order/page.js",
            lineNumber: 669,
            columnNumber: 9
        }, this),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrderPageContent, {}, void 0, false, {
            fileName: "[project]/frontend/src/app/order/page.js",
            lineNumber: 674,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/order/page.js",
        lineNumber: 667,
        columnNumber: 5
    }, this);
}
_c4 = OrderPage;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "Icon");
__turbopack_context__.k.register(_c1, "MenuImage");
__turbopack_context__.k.register(_c2, "Stepper");
__turbopack_context__.k.register(_c3, "OrderPageContent");
__turbopack_context__.k.register(_c4, "OrderPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/lib/menu.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Menu data for the restaurant
__turbopack_context__.s([
    "menuCategories",
    ()=>menuCategories,
    "menuItems",
    ()=>menuItems
]);
const menuCategories = [
    {
        id: 'all',
        name: 'ทั้งหมด',
        icon: ''
    },
    {
        id: 'appetizer',
        name: 'อาหารเรียกน้ำย่อย',
        icon: ''
    },
    {
        id: 'main',
        name: 'จานหลัก',
        icon: ''
    },
    {
        id: 'noodle',
        name: 'ก๋วยเตี๋ยว & เส้น',
        icon: ''
    },
    {
        id: 'grill',
        name: 'ปิ้งย่าง',
        icon: ''
    },
    {
        id: 'seafood',
        name: 'อาหารทะเล',
        icon: ''
    },
    {
        id: 'dessert',
        name: 'ของหวาน',
        icon: ''
    },
    {
        id: 'drink',
        name: 'เครื่องดื่ม',
        icon: ''
    }
];
const menuItems = [
    // Appetizers
    {
        id: 1,
        name: 'สลัดแซลมอนรมควัน',
        nameEn: 'Smoked Salmon Salad',
        description: 'สลัดผักสดกับแซลมอนรมควัน ราดซอสมะนาวน้ำผึ้ง',
        price: 189,
        category: 'appetizer',
        image: '',
        popular: true,
        spicyLevel: 0
    },
    {
        id: 2,
        name: 'เกี๊ยวซ่าหมู',
        nameEn: 'Pork Gyoza',
        description: 'เกี๊ยวซ่าไส้หมูสับเนื้อแน่น ทอดกรอบ เสิร์ฟพร้อมซอสพอนซึ',
        price: 129,
        category: 'appetizer',
        image: '',
        popular: false,
        spicyLevel: 0
    },
    {
        id: 3,
        name: 'ปอเปี๊ยะทอดไส้ผัก',
        nameEn: 'Vegetable Spring Rolls',
        description: 'ปอเปี๊ยะทอดกรอบไส้ผักรวม เสิร์ฟพร้อมซอสบ๊วย',
        price: 99,
        category: 'appetizer',
        image: '',
        popular: false,
        spicyLevel: 0
    },
    {
        id: 4,
        name: 'ต้มยำกุ้ง',
        nameEn: 'Tom Yum Goong',
        description: 'ต้มยำกุ้งน้ำข้น รสเข้มข้น เต็มไปด้วยกุ้งสดและเห็ด',
        price: 199,
        category: 'appetizer',
        image: '',
        popular: true,
        spicyLevel: 3
    },
    // Main courses
    {
        id: 5,
        name: 'แกงเขียวหวานไก่',
        nameEn: 'Green Curry Chicken',
        description: 'แกงเขียวหวานไก่หอมมะพร้าวกะทิ เสิร์ฟพร้อมข้าวหอมมะลิ',
        price: 169,
        category: 'main',
        image: '',
        popular: true,
        spicyLevel: 2
    },
    {
        id: 6,
        name: 'ข้าวผัดปู',
        nameEn: 'Crab Fried Rice',
        description: 'ข้าวผัดเนื้อปูก้อนใหญ่ ผัดกับไข่และผักสด',
        price: 219,
        category: 'main',
        image: '',
        popular: true,
        spicyLevel: 0
    },
    {
        id: 7,
        name: 'กะเพราหมูสับ',
        nameEn: 'Basil Minced Pork',
        description: 'กะเพราหมูสับผัดกรอบ ไข่ดาว เสิร์ฟพร้อมข้าวสวย',
        price: 119,
        category: 'main',
        image: '',
        popular: true,
        spicyLevel: 2
    },
    {
        id: 8,
        name: 'สเต็กเนื้อวากิว',
        nameEn: 'Wagyu Beef Steak',
        description: 'สเต็กเนื้อวากิว A5 ย่างระดับ Medium Rare พร้อมซอสพริกไทยดำ',
        price: 899,
        category: 'main',
        image: '',
        popular: false,
        spicyLevel: 0
    },
    {
        id: 9,
        name: 'แซลมอนเทอริยากิ',
        nameEn: 'Teriyaki Salmon',
        description: 'แซลมอนย่างซอสเทอริยากิ เสิร์ฟพร้อมข้าวญี่ปุ่นและผักต้ม',
        price: 329,
        category: 'main',
        image: '',
        popular: false,
        spicyLevel: 0
    },
    {
        id: 10,
        name: 'ผัดกระเพราทะเล',
        nameEn: 'Spicy Seafood Basil',
        description: 'ผัดกระเพราทะเลรวม กุ้ง หมึก หอย พริกสด',
        price: 249,
        category: 'main',
        image: '',
        popular: false,
        spicyLevel: 3
    },
    // Noodles
    {
        id: 11,
        name: 'ผัดไทยกุ้งสด',
        nameEn: 'Pad Thai with Shrimp',
        description: 'ผัดไทยเส้นจันท์กุ้งสดตัวใหญ่ โรยถั่วป่นและมะนาว',
        price: 179,
        category: 'noodle',
        image: '',
        popular: true,
        spicyLevel: 1
    },
    {
        id: 12,
        name: 'ราเมนหมูชาชู',
        nameEn: 'Chashu Pork Ramen',
        description: 'ราเมนน้ำซุปกระดูกเข้มข้น หมูชาชูนุ่ม ไข่ยางมะตูม',
        price: 229,
        category: 'noodle',
        image: '',
        popular: true,
        spicyLevel: 0
    },
    {
        id: 13,
        name: 'บะหมี่เกี๊ยวหมูแดง',
        nameEn: 'Red Pork Wonton Noodle',
        description: 'บะหมี่เหนียวนุ่มกับหมูแดงหอมเครื่องเทศ เกี๊ยวกุ้งสด',
        price: 119,
        category: 'noodle',
        image: '',
        popular: false,
        spicyLevel: 0
    },
    // Grill
    {
        id: 14,
        name: 'หมูสะเต๊ะ',
        nameEn: 'Pork Satay',
        description: 'หมูสะเต๊ะย่างหอม 8 ไม้ พร้อมซอสถั่วและอาจาด',
        price: 149,
        category: 'grill',
        image: '',
        popular: true,
        spicyLevel: 0
    },
    {
        id: 15,
        name: 'ซี่โครงหมูบาร์บีคิว',
        nameEn: 'BBQ Pork Ribs',
        description: 'ซี่โครงหมูย่างซอส BBQ สูตรเด็ด เนื้อนุ่มหลุดกระดูก',
        price: 349,
        category: 'grill',
        image: '',
        popular: false,
        spicyLevel: 0
    },
    {
        id: 16,
        name: 'ไก่ย่างจิ้มแจ่ว',
        nameEn: 'Grilled Chicken Jim Jaew',
        description: 'ไก่ย่างหอมถ่าน เสิร์ฟพร้อมน้ำจิ้มแจ่วรสเด็ด ข้าวเหนียว',
        price: 189,
        category: 'grill',
        image: '',
        popular: true,
        spicyLevel: 1
    },
    // Seafood
    {
        id: 17,
        name: 'กุ้งเผาเกลือ',
        nameEn: 'Salt-Grilled Prawns',
        description: 'กุ้งแม่น้ำตัวใหญ่เผาเกลือ เสิร์ฟพร้อมซอสซีฟู้ด',
        price: 459,
        category: 'seafood',
        image: '',
        popular: false,
        spicyLevel: 0
    },
    {
        id: 18,
        name: 'ปูนิ่มผัดผงกะหรี่',
        nameEn: 'Curry Soft Shell Crab',
        description: 'ปูนิ่มทอดกรอบผัดผงกะหรี่ หอมเครื่องเทศ',
        price: 379,
        category: 'seafood',
        image: '',
        popular: true,
        spicyLevel: 1
    },
    {
        id: 19,
        name: 'ปลากะพงนึ่งมะนาว',
        nameEn: 'Steamed Sea Bass with Lime',
        description: 'ปลากะพงนึ่งมะนาวสด รสจัดจ้าน เนื้อปลาแน่นหวาน',
        price: 349,
        category: 'seafood',
        image: '',
        popular: false,
        spicyLevel: 3
    },
    // Desserts
    {
        id: 20,
        name: 'ข้าวเหนียวมะม่วง',
        nameEn: 'Mango Sticky Rice',
        description: 'ข้าวเหนียวมูลนุ่มราดกะทิ พร้อมมะม่วงน้ำดอกไม้สุก',
        price: 139,
        category: 'dessert',
        image: '',
        popular: true,
        spicyLevel: 0
    },
    {
        id: 21,
        name: 'ลาวาช็อกโกแลตเค้ก',
        nameEn: 'Chocolate Lava Cake',
        description: 'ช็อกโกแลตลาวาเค้กร้อนๆ ไหลทะลัก เสิร์ฟพร้อมไอศกรีมวานิลลา',
        price: 169,
        category: 'dessert',
        image: '',
        popular: false,
        spicyLevel: 0
    },
    {
        id: 22,
        name: 'เครปเค้กชาเขียว',
        nameEn: 'Matcha Crepe Cake',
        description: 'เครปเค้กชาเขียวมัทฉะ ชั้นนุ่มละมุน หวานน้อย',
        price: 159,
        category: 'dessert',
        image: '',
        popular: false,
        spicyLevel: 0
    },
    // Drinks
    {
        id: 23,
        name: 'ชาไทยเย็น',
        nameEn: 'Thai Iced Tea',
        description: 'ชาไทยเย็นหอมหวานมัน สูตรต้นตำรับ',
        price: 69,
        category: 'drink',
        image: '',
        popular: true,
        spicyLevel: 0
    },
    {
        id: 24,
        name: 'น้ำมะพร้าวปั่น',
        nameEn: 'Coconut Smoothie',
        description: 'น้ำมะพร้าวปั่นเย็นๆ สดชื่น ใส่เนื้อมะพร้าวอ่อน',
        price: 89,
        category: 'drink',
        image: '',
        popular: false,
        spicyLevel: 0
    },
    {
        id: 25,
        name: 'กาแฟลาเต้เย็น',
        nameEn: 'Iced Café Latte',
        description: 'กาแฟลาเต้เย็น ใช้เมล็ดอาราบิก้าคั่วกลาง',
        price: 99,
        category: 'drink',
        image: '',
        popular: false,
        spicyLevel: 0
    },
    {
        id: 26,
        name: 'สมูทตี้เบอร์รี่',
        nameEn: 'Mixed Berry Smoothie',
        description: 'สมูทตี้เบอร์รี่รวม สตรอว์เบอร์รี่ บลูเบอร์รี่ ราสเบอร์รี่',
        price: 119,
        category: 'drink',
        image: '',
        popular: false,
        spicyLevel: 0
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_src_0sr060f._.js.map