module.exports = [
"[project]/frontend/src/app/staff/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StaffPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/frontend/src/app/staff/staff.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
const statusConfig = {
    pending: {
        label: "รอดำเนินการ",
        icon: "⏳",
        color: "orange",
        next: "preparing"
    },
    preparing: {
        label: "กำลังปรุง",
        icon: "🔥",
        color: "blue",
        next: "ready"
    },
    ready: {
        label: "🔔 พร้อมเสิร์ฟ (เชฟตรวจผ่าน QC แล้ว)",
        icon: "⭐",
        color: "green",
        next: "served"
    },
    served: {
        label: "เสิร์ฟแล้ว",
        icon: "✅",
        color: "purple",
        next: null
    },
    cancelled: {
        label: "ยกเลิก",
        icon: "❌",
        color: "red",
        next: null
    }
};
function StaffPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [filterStatus, setFilterStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const [expandedOrder, setExpandedOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastRefresh, setLastRefresh] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const fetchOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const response = await fetch("/api/orders");
            const data = await response.json();
            setOrders(data.orders || []);
            setLastRefresh(new Date());
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally{
            setLoading(false);
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchOrders();
        const interval = setInterval(fetchOrders, 5000); // Auto-refresh every 5 seconds
        return ()=>clearInterval(interval);
    }, [
        fetchOrders
    ]);
    const handleStatusChange = async (orderId, newStatus)=>{
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: newStatus
                })
            });
            if (response.ok) {
                fetchOrders();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    // เสิร์ฟเฉพาะ 1 จาน
    const handleServeItem = async (orderId, orderItemId, e)=>{
        if (e) e.stopPropagation();
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "serve_item",
                    order_item_id: orderItemId
                })
            });
            if (response.ok) {
                fetchOrders();
            }
        } catch (error) {
            console.error("Error serving item:", error);
        }
    };
    // เสิร์ฟเฉพาะรายการที่เชฟทำเสร็จแล้วในออเดอร์นี้
    const handleServeReady = async (orderId, e)=>{
        if (e) e.stopPropagation();
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "serve_ready"
                })
            });
            if (response.ok) {
                fetchOrders();
            }
        } catch (error) {
            console.error("Error serving ready items:", error);
        }
    };
    const filteredOrders = orders.filter((o)=>{
        if (filterStatus === "all") return true;
        if (filterStatus === "ready") return o.readyCount > 0 || o.status === "ready";
        if (filterStatus === "preparing") return o.cookingCount > 0 && o.readyCount === 0 || o.status === "preparing";
        if (filterStatus === "pending") return o.pendingCount > 0 && o.cookingCount === 0 && o.readyCount === 0 || o.status === "pending";
        if (filterStatus === "served") return o.status === "served" || o.items?.length > 0 && o.servedCount === o.items.length;
        return o.status === filterStatus;
    }).sort((a, b)=>new Date(b.createdAt) - new Date(a.createdAt));
    const orderCounts = {
        all: orders.length,
        pending: orders.filter((o)=>o.pendingCount > 0 && o.cookingCount === 0 && o.readyCount === 0).length,
        preparing: orders.filter((o)=>o.cookingCount > 0 && o.readyCount === 0).length,
        ready: orders.filter((o)=>o.readyCount > 0 || o.status === "ready").length,
        served: orders.filter((o)=>o.status === "served" || o.items?.length > 0 && o.servedCount === o.items.length).length
    };
    const formatTime = (dateStr)=>{
        const d = new Date(dateStr);
        return d.toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };
    const getTimeDiff = (dateStr)=>{
        const diff = Math.floor((new Date() - new Date(dateStr)) / 60000);
        if (diff < 1) return "เมื่อสักครู่";
        if (diff < 60) return `${diff} นาทีที่แล้ว`;
        return `${Math.floor(diff / 60)} ชม.ที่แล้ว`;
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loadingPage,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "spinner"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/staff/page.js",
                    lineNumber: 128,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "กำลังโหลดข้อมูล..."
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/staff/page.js",
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/app/staff/page.js",
            lineNumber: 127,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].headerLeft,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].backBtn,
                                onClick: ()=>router.push("/"),
                                children: "← กลับ"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].headerTitle,
                                        children: "ระบบจัดการออเดอร์"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].headerSub,
                                        children: [
                                            "อัพเดทล่าสุด: ",
                                            formatTime(lastRefresh)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].refreshBtn,
                        onClick: fetchOrders,
                        children: "🔄 รีเฟรช"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/staff/page.js",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stats,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statCard} ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statPending}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statIcon
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statValue,
                                        children: orderCounts.pending
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statLabel,
                                        children: "รอดำเนินการ"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statCard} ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statPreparing}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statIcon
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statValue,
                                        children: orderCounts.preparing
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statLabel,
                                        children: "กำลังเตรียม"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statCard} ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statReady}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statIcon
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statValue,
                                        children: orderCounts.ready
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statLabel,
                                        children: "พร้อมเสิร์ฟ"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 174,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statCard} ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statTotal}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statIcon
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statValue,
                                        children: orderCounts.all
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 180,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statLabel,
                                        children: "ออเดอร์ทั้งหมด"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/staff/page.js",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            orderCounts.ready > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    margin: "0 1.5rem 1rem",
                    padding: "0.85rem 1.25rem",
                    background: "rgba(45, 212, 168, 0.15)",
                    border: "1px solid var(--accent-green)",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    animation: "pulse 2s infinite"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: "1.4rem"
                                },
                                children: "⭐🔔"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        style: {
                                            color: "var(--accent-green)"
                                        },
                                        children: [
                                            "มี ",
                                            orderCounts.ready,
                                            " ออเดอร์พร้อมเสิร์ฟ! (เชฟปรุงเสร็จและผ่านการตรวจคุณภาพแล้ว)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 204,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: "0.8rem",
                                            color: "var(--text-secondary)"
                                        },
                                        children: "กรุณาตรวจสอบหมายเลขโต๊ะและนำอาหารไปส่งให้ลูกค้า"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 207,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 203,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filterBtn,
                        style: {
                            background: "var(--accent-green)",
                            color: "#0a0a0f",
                            fontWeight: 700
                        },
                        onClick: ()=>setFilterStatus("ready"),
                        children: "ดูออเดอร์ที่พร้อมเสิร์ฟ"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/staff/page.js",
                lineNumber: 188,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filters,
                children: [
                    {
                        key: "all",
                        label: "ทั้งหมด"
                    },
                    {
                        key: "pending",
                        label: "รอ"
                    },
                    {
                        key: "preparing",
                        label: "กำลังเตรียม"
                    },
                    {
                        key: "ready",
                        label: "พร้อมเสิร์ฟ"
                    },
                    {
                        key: "served",
                        label: "เสิร์ฟแล้ว"
                    }
                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filterBtn} ${filterStatus === f.key ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filterActive : ""}`,
                        onClick: ()=>setFilterStatus(f.key),
                        children: [
                            f.label,
                            orderCounts[f.key] > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filterCount,
                                children: orderCounts[f.key]
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 241,
                                columnNumber: 15
                            }, this)
                        ]
                    }, f.key, true, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/staff/page.js",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            filteredOrders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyState,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyIcon
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 250,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "ยังไม่มีออเดอร์"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 251,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "ออเดอร์ใหม่จะปรากฏที่นี่โดยอัตโนมัติ"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 252,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/staff/page.js",
                lineNumber: 249,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderGrid,
                children: filteredOrders.map((order)=>{
                    const config = statusConfig[order.status];
                    const isExpanded = expandedOrder === order.id;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderCard} ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"][`order${config.color.charAt(0).toUpperCase() + config.color.slice(1)}`]}`,
                        onClick: ()=>setExpandedOrder(isExpanded ? null : order.id),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderCardHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderCardId,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderId,
                                                children: [
                                                    "#",
                                                    order.id
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 269,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `badge badge-${config.color}`,
                                                children: [
                                                    config.icon,
                                                    " ",
                                                    config.label
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 270,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 268,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderMeta,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderTime,
                                                children: formatTime(order.createdAt)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 275,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderTimeDiff,
                                                children: getTimeDiff(order.createdAt)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 278,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 274,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 267,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderCustomer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].customerInfo,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].customerName,
                                                children: [
                                                    order.isMember ? "⭐ " : "",
                                                    order.customerName
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 287,
                                                columnNumber: 21
                                            }, this),
                                            order.tableNumber !== "-" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tableNum,
                                                children: [
                                                    "📍 โต๊ะ ",
                                                    order.tableNumber
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 291,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 286,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderTotal,
                                        children: [
                                            "฿",
                                            order.totalAmount?.toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 296,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 285,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderProgressSummary,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "เสิร์ฟแล้ว ",
                                            order.servedCount || 0,
                                            "/",
                                            order.items?.length || 0,
                                            " จาน"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 303,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: "8px",
                                            alignItems: "center"
                                        },
                                        children: [
                                            order.readyCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#2dd4a8",
                                                    fontWeight: 700
                                                },
                                                children: [
                                                    "⭐ พร้อมเสิร์ฟ ",
                                                    order.readyCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 308,
                                                columnNumber: 23
                                            }, this),
                                            order.cookingCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#60a5fa"
                                                },
                                                children: [
                                                    "🔥 กำลังปรุง ",
                                                    order.cookingCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 313,
                                                columnNumber: 23
                                            }, this),
                                            order.pendingCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#fbbf24"
                                                },
                                                children: [
                                                    "⏳ รอคิว ",
                                                    order.pendingCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 318,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 306,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 302,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderItems,
                                children: [
                                    order.items.slice(0, isExpanded ? order.items.length : 5).map((item, idx)=>{
                                        const isReady = item.kitchen_status === "READY";
                                        const isCooking = item.kitchen_status === "COOKING";
                                        const isServed = item.kitchen_status === "SERVED";
                                        const isPending = item.kitchen_status === "PENDING";
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderItem} ${isReady ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].itemReadyHighlight : ""} ${isServed ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].itemServed : ""}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderItemEmoji,
                                                    children: item.image
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                    lineNumber: 340,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderItemDetails,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderItemHeaderRow,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderItemName,
                                                                    style: {
                                                                        textDecoration: isServed ? "line-through" : "none"
                                                                    },
                                                                    children: item.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                                    lineNumber: 345,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderItemQty,
                                                                    children: [
                                                                        "x",
                                                                        item.quantity
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                                    lineNumber: 348,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/app/staff/page.js",
                                                            lineNumber: 344,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderItemSubRow,
                                                            children: [
                                                                item.station_code && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stationBadge,
                                                                    children: item.station_code
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                                    lineNumber: 354,
                                                                    columnNumber: 33
                                                                }, this),
                                                                isReady && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statusBadgeReady,
                                                                    children: "⭐ เชฟปรุงเสร็จ พร้อมเสิร์ฟ!"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                                    lineNumber: 359,
                                                                    columnNumber: 33
                                                                }, this),
                                                                isCooking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statusBadgeCooking,
                                                                    children: "🔥 กำลังปรุง"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                                    lineNumber: 364,
                                                                    columnNumber: 33
                                                                }, this),
                                                                isPending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statusBadgePending,
                                                                    children: "⏳ รอคิวปรุง"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                                    lineNumber: 369,
                                                                    columnNumber: 33
                                                                }, this),
                                                                isServed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].statusBadgeServed,
                                                                    children: "✅ เสิร์ฟแล้ว"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                                    lineNumber: 374,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/app/staff/page.js",
                                                            lineNumber: 352,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                    lineNumber: 343,
                                                    columnNumber: 27
                                                }, this),
                                                isReady && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].serveItemBtn,
                                                    onClick: (e)=>handleServeItem(order.order_id, item.order_item_id, e),
                                                    title: "เสิร์ฟจานนี้ให้ลูกค้าทันที",
                                                    children: "🍽️ เสิร์ฟจานนี้"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                    lineNumber: 383,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, item.order_item_id || idx, true, {
                                            fileName: "[project]/frontend/src/app/staff/page.js",
                                            lineNumber: 336,
                                            columnNumber: 25
                                        }, this);
                                    }),
                                    !isExpanded && order.items.length > 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].moreItems,
                                        children: [
                                            "+",
                                            order.items.length - 5,
                                            " รายการเพิ่มเติม (คลิกเพื่อดูทั้งหมด)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 402,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 326,
                                columnNumber: 17
                            }, this),
                            order.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderNote,
                                children: [
                                    "📝 ",
                                    order.note
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 410,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderActions,
                                onClick: (e)=>e.stopPropagation(),
                                children: [
                                    order.readyCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actionBtnPrimary,
                                        onClick: (e)=>handleServeReady(order.order_id, e),
                                        children: [
                                            "⭐ เสิร์ฟเฉพาะรายการที่พร้อม (",
                                            order.readyCount,
                                            " จาน)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 422,
                                        columnNumber: 21
                                    }, this),
                                    order.readyCount === 0 && (order.cookingCount > 0 || order.pendingCount > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].kitchenProgressNotice,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "⏳ ครัวกำลังดำเนินการ (",
                                                order.cookingCount,
                                                " ปรุง, ",
                                                order.pendingCount,
                                                " รอคิว)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/staff/page.js",
                                            lineNumber: 434,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 433,
                                        columnNumber: 21
                                    }, this),
                                    order.items.length > 0 && order.servedCount === order.items.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].allServedNotice,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "✅ เสิร์ฟครบทุกรายการแล้ว (",
                                                order.servedCount,
                                                "/",
                                                order.items.length,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/staff/page.js",
                                            lineNumber: 441,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 440,
                                        columnNumber: 21
                                    }, this),
                                    order.status === "pending" && order.servedCount === 0 && order.readyCount === 0 && order.cookingCount === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].actionBtnCancel,
                                        onClick: ()=>handleStatusChange(order.order_id, "cancelled"),
                                        children: "ยกเลิกออเดอร์"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 447,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 416,
                                columnNumber: 17
                            }, this)
                        ]
                    }, order.id, true, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 261,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/staff/page.js",
                lineNumber: 255,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/app/staff/page.js",
        lineNumber: 135,
        columnNumber: 5
    }, this);
}
}),
"[project]/frontend/src/app/staff/staff.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionBtnCancel": "staff-module__DWWnBG__actionBtnCancel",
  "actionBtnPrimary": "staff-module__DWWnBG__actionBtnPrimary",
  "allServedNotice": "staff-module__DWWnBG__allServedNotice",
  "backBtn": "staff-module__DWWnBG__backBtn",
  "container": "staff-module__DWWnBG__container",
  "customerInfo": "staff-module__DWWnBG__customerInfo",
  "customerName": "staff-module__DWWnBG__customerName",
  "emptyIcon": "staff-module__DWWnBG__emptyIcon",
  "emptyState": "staff-module__DWWnBG__emptyState",
  "fadeIn": "staff-module__DWWnBG__fadeIn",
  "fadeInUp": "staff-module__DWWnBG__fadeInUp",
  "filterActive": "staff-module__DWWnBG__filterActive",
  "filterBtn": "staff-module__DWWnBG__filterBtn",
  "filterCount": "staff-module__DWWnBG__filterCount",
  "filters": "staff-module__DWWnBG__filters",
  "header": "staff-module__DWWnBG__header",
  "headerLeft": "staff-module__DWWnBG__headerLeft",
  "headerSub": "staff-module__DWWnBG__headerSub",
  "headerTitle": "staff-module__DWWnBG__headerTitle",
  "itemReadyHighlight": "staff-module__DWWnBG__itemReadyHighlight",
  "itemServed": "staff-module__DWWnBG__itemServed",
  "kitchenProgressNotice": "staff-module__DWWnBG__kitchenProgressNotice",
  "loadingPage": "staff-module__DWWnBG__loadingPage",
  "moreItems": "staff-module__DWWnBG__moreItems",
  "orderActions": "staff-module__DWWnBG__orderActions",
  "orderBlue": "staff-module__DWWnBG__orderBlue",
  "orderCard": "staff-module__DWWnBG__orderCard",
  "orderCardHeader": "staff-module__DWWnBG__orderCardHeader",
  "orderCardId": "staff-module__DWWnBG__orderCardId",
  "orderCustomer": "staff-module__DWWnBG__orderCustomer",
  "orderGreen": "staff-module__DWWnBG__orderGreen",
  "orderGrid": "staff-module__DWWnBG__orderGrid",
  "orderId": "staff-module__DWWnBG__orderId",
  "orderItem": "staff-module__DWWnBG__orderItem",
  "orderItemDetails": "staff-module__DWWnBG__orderItemDetails",
  "orderItemEmoji": "staff-module__DWWnBG__orderItemEmoji",
  "orderItemHeaderRow": "staff-module__DWWnBG__orderItemHeaderRow",
  "orderItemName": "staff-module__DWWnBG__orderItemName",
  "orderItemQty": "staff-module__DWWnBG__orderItemQty",
  "orderItemSubRow": "staff-module__DWWnBG__orderItemSubRow",
  "orderItems": "staff-module__DWWnBG__orderItems",
  "orderMeta": "staff-module__DWWnBG__orderMeta",
  "orderNote": "staff-module__DWWnBG__orderNote",
  "orderOrange": "staff-module__DWWnBG__orderOrange",
  "orderProgressSummary": "staff-module__DWWnBG__orderProgressSummary",
  "orderPurple": "staff-module__DWWnBG__orderPurple",
  "orderRed": "staff-module__DWWnBG__orderRed",
  "orderTime": "staff-module__DWWnBG__orderTime",
  "orderTimeDiff": "staff-module__DWWnBG__orderTimeDiff",
  "orderTotal": "staff-module__DWWnBG__orderTotal",
  "pulse": "staff-module__DWWnBG__pulse",
  "refreshBtn": "staff-module__DWWnBG__refreshBtn",
  "serveItemBtn": "staff-module__DWWnBG__serveItemBtn",
  "slideDown": "staff-module__DWWnBG__slideDown",
  "statCard": "staff-module__DWWnBG__statCard",
  "statIcon": "staff-module__DWWnBG__statIcon",
  "statLabel": "staff-module__DWWnBG__statLabel",
  "statPending": "staff-module__DWWnBG__statPending",
  "statPreparing": "staff-module__DWWnBG__statPreparing",
  "statReady": "staff-module__DWWnBG__statReady",
  "statTotal": "staff-module__DWWnBG__statTotal",
  "statValue": "staff-module__DWWnBG__statValue",
  "stationBadge": "staff-module__DWWnBG__stationBadge",
  "stats": "staff-module__DWWnBG__stats",
  "statusBadgeCooking": "staff-module__DWWnBG__statusBadgeCooking",
  "statusBadgePending": "staff-module__DWWnBG__statusBadgePending",
  "statusBadgeReady": "staff-module__DWWnBG__statusBadgeReady",
  "statusBadgeServed": "staff-module__DWWnBG__statusBadgeServed",
  "tableNum": "staff-module__DWWnBG__tableNum",
});
}),
];

//# sourceMappingURL=frontend_src_app_staff_0ps8gd0._.js.map