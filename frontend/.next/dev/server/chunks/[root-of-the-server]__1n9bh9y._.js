module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/frontend/src/app/api/chef/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$store$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/store.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$chefStore$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/chefStore.js [app-route] (ecmascript)");
;
;
;
async function GET() {
    const orders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$store$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOrders"])();
    const sessions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$chefStore$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllChefSessions"])();
    // Only show orders that are relevant to the kitchen
    const kitchenOrders = orders.filter((o)=>[
            'pending',
            'preparing',
            'ready'
        ].includes(o.status)).map((o)=>({
            ...o,
            chefSession: sessions[o.id] || null
        })).sort((a, b)=>new Date(a.createdAt) - new Date(b.createdAt));
    return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        orders: kitchenOrders
    });
}
}),
"[project]/frontend/src/lib/chefStore.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "acceptOrder",
    ()=>acceptOrder,
    "completeOrder",
    ()=>completeOrder,
    "getAllChefSessions",
    ()=>getAllChefSessions,
    "getChefSession",
    ()=>getChefSession
]);
// Chef-specific store — mirrors a JSON file structure
// In production this would read/write to data/chef_sessions.json
/**
 * chefSessions shape:
 * {
 *   [orderId]: {
 *     orderId: number,
 *     chefName: string,
 *     acceptedAt: ISO string,
 *     completedAt: ISO string | null,
 *     status: 'cooking' | 'done',
 *   }
 * }
 */ let chefSessions = {};
function getChefSession(orderId) {
    return chefSessions[orderId] || null;
}
function getAllChefSessions() {
    return {
        ...chefSessions
    };
}
function acceptOrder(orderId, chefName) {
    chefSessions[orderId] = {
        orderId,
        chefName,
        acceptedAt: new Date().toISOString(),
        completedAt: null,
        status: 'cooking'
    };
    return chefSessions[orderId];
}
function completeOrder(orderId) {
    if (!chefSessions[orderId]) return null;
    chefSessions[orderId].completedAt = new Date().toISOString();
    chefSessions[orderId].status = 'done';
    return chefSessions[orderId];
}
}),
"[project]/frontend/src/lib/store.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addOrder",
    ()=>addOrder,
    "getOrderById",
    ()=>getOrderById,
    "getOrders",
    ()=>getOrders,
    "updateOrderFields",
    ()=>updateOrderFields,
    "updateOrderStatus",
    ()=>updateOrderStatus
]);
// In-memory store for orders (shared across API routes within the same server process)
// In production, this would be a database
let orders = [];
let nextOrderId = 1;
function getOrders() {
    return orders;
}
function addOrder(order) {
    const newOrder = {
        id: nextOrderId++,
        ...order,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    return newOrder;
}
function updateOrderStatus(orderId, status) {
    const order = orders.find((o)=>o.id === orderId);
    if (order) {
        order.status = status;
        order.updatedAt = new Date().toISOString();
        return order;
    }
    return null;
}
function getOrderById(orderId) {
    return orders.find((o)=>o.id === orderId) || null;
}
function updateOrderFields(orderId, fields) {
    const order = orders.find((o)=>o.id === orderId);
    if (order) {
        Object.assign(order, fields, {
            updatedAt: new Date().toISOString()
        });
        return order;
    }
    return null;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1n9bh9y._.js.map