module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
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
"[project]/frontend/src/app/api/orders/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/server.js [app-route] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/lib/db'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const all = searchParams.get('all') === 'true';
        const statusFilter = searchParams.get('status');
        const tableParam = searchParams.get('table') || searchParams.get('tableNumber');
        const sessionParam = searchParams.get('session') === 'true';
        // 1. ดึงออเดอร์หลัก
        let query = `
      SELECT 
        o.order_id,
        o.table_id,
        o.member_id,
        o.staff_id_opened,
        o.status AS db_status,
        o.subtotal,
        o.discount_amount,
        o.net_total,
        o.note,
        o.created_at,
        o.updated_at,
        dt.table_name_or_number AS table_number,
        m.name AS member_name,
        m.phone_number AS member_phone,
        s.name AS staff_name
      FROM orders o
      LEFT JOIN dining_table dt ON o.table_id = dt.table_id
      LEFT JOIN member m ON o.member_id = m.member_id
      LEFT JOIN staff s ON o.staff_id_opened = s.staff_id
      WHERE 1=1
    `;
        const params = [];
        if (tableParam) {
            query += ` AND dt.table_name_or_number = ?`;
            params.push(String(tableParam).trim());
            if (sessionParam || all) {
                // ดึงออเดอร์ของโต๊ะนี้ในรอบ 12 ชั่วโมงล่าสุด (รวมทั้งที่กำลังทำและเสิร์ฟแล้ว)
                query += ` AND o.created_at >= DATE_SUB(NOW(), INTERVAL 12 HOUR)`;
            } else if (!statusFilter) {
                query += ` AND o.status = 'OPEN'`;
            }
        } else {
            // โดยปกติแสดงเฉพาะ OPEN (หรือตาม filter)
            if (!all && !statusFilter) {
                query += ` AND o.status = 'OPEN'`;
            }
        }
        query += ` ORDER BY o.created_at DESC`;
        const [ordersRows] = await pool.query(query, params);
        if (ordersRows.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                orders: []
            });
        }
        // 2. ดึงรายการอาหารของทุกออเดอร์
        const orderIds = ordersRows.map((o)=>o.order_id);
        const placeholders = orderIds.map(()=>'?').join(',');
        const [itemRows] = await pool.query(`SELECT 
        oi.order_item_id,
        oi.order_id,
        oi.menu_id,
        oi.quantity,
        oi.unit_price,
        oi.kitchen_status,
        oi.station_code,
        oi.quality_checked,
        oi.is_takeaway,
        mi.name AS menu_name,
        mi.image_url
      FROM order_item oi
      LEFT JOIN menu_item mi ON oi.menu_id = mi.menu_id
      WHERE oi.order_id IN (${placeholders})
      ORDER BY oi.created_at ASC`, orderIds);
        // Group items by order_id
        const itemsByOrder = {};
        for (const item of itemRows){
            if (!itemsByOrder[item.order_id]) {
                itemsByOrder[item.order_id] = [];
            }
            itemsByOrder[item.order_id].push({
                id: item.menu_id,
                order_item_id: item.order_item_id,
                menu_id: item.menu_id,
                name: item.menu_name || 'รายการอาหาร',
                price: Number(item.unit_price),
                quantity: item.quantity,
                image: item.image_url || '🍽️',
                image_url: item.image_url || '🍽️',
                kitchen_status: item.kitchen_status,
                station_code: item.station_code,
                quality_checked: item.quality_checked === 1,
                is_takeaway: item.is_takeaway === 1
            });
        }
        // Map response ให้รองรับทั้ง Staff page, Order page และ Admin
        const orders = ordersRows.map((o)=>{
            const items = itemsByOrder[o.order_id] || [];
            const short_id = o.order_id.slice(0, 8);
            // คำนวณ kitchen_status รวม
            let kitchenStatus = 'PENDING';
            if (items.length > 0) {
                const statuses = items.map((i)=>i.kitchen_status);
                if (statuses.every((s)=>s === 'SERVED')) {
                    kitchenStatus = 'SERVED';
                } else if (statuses.some((s)=>s === 'READY')) {
                    kitchenStatus = 'READY';
                } else if (statuses.some((s)=>s === 'COOKING')) {
                    kitchenStatus = 'COOKING';
                } else {
                    kitchenStatus = 'PENDING';
                }
            }
            // Map status ให้ Staff page (pending / preparing / ready / served / cancelled)
            let staffStatus = 'pending';
            if (o.db_status === 'CLOSED') {
                staffStatus = 'served';
            } else if (kitchenStatus === 'SERVED') {
                staffStatus = 'served';
            } else if (kitchenStatus === 'READY') {
                staffStatus = 'ready';
            } else if (kitchenStatus === 'COOKING') {
                staffStatus = 'preparing';
            } else {
                staffStatus = 'pending';
            }
            const readyCount = items.filter((i)=>i.kitchen_status === 'READY').length;
            const cookingCount = items.filter((i)=>i.kitchen_status === 'COOKING').length;
            const pendingCount = items.filter((i)=>i.kitchen_status === 'PENDING').length;
            const servedCount = items.filter((i)=>i.kitchen_status === 'SERVED').length;
            return {
                id: short_id,
                order_id: o.order_id,
                short_id,
                customerName: o.member_name || 'ลูกค้าทั่วไป',
                customerPhone: o.member_phone || '',
                isMember: !!o.member_id,
                tableNumber: o.table_number || '-',
                table_number: o.table_number || '-',
                totalAmount: Number(o.net_total),
                net_total: Number(o.net_total),
                subtotal: Number(o.subtotal),
                discount_amount: Number(o.discount_amount),
                status: staffStatus,
                kitchen_status: kitchenStatus,
                db_status: o.db_status,
                readyCount,
                cookingCount,
                pendingCount,
                servedCount,
                note: o.note || '',
                createdAt: o.created_at,
                created_at: o.created_at,
                updatedAt: o.updated_at,
                updated_at: o.updated_at,
                staffName: o.staff_name || '',
                itemCount: items.reduce((sum, it)=>sum + it.quantity, 0),
                items
            };
        });
        // กรองตาม statusFilter ถ้ามีส่งมา
        const filteredOrders = statusFilter && statusFilter !== 'all' ? orders.filter((o)=>o.status === statusFilter || o.kitchen_status === statusFilter) : orders;
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            orders: filteredOrders
        });
    } catch (error) {
        console.error('Fetch orders error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์',
            details: error.message
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const { customerName, customerPhone, isMember, tableNumber, items, note } = body;
        if (!items || items.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'กรุณาเลือกรายการอาหารอย่างน้อย 1 รายการ'
            }, {
                status: 400
            });
        }
        // 1. หา table_id จากหมายเลขโต๊ะ
        let table_id = null;
        if (tableNumber && tableNumber !== '-') {
            const [tableRows] = await pool.query('SELECT table_id FROM dining_table WHERE table_name_or_number = ? LIMIT 1', [
                String(tableNumber).trim()
            ]);
            if (tableRows.length > 0) {
                table_id = tableRows[0].table_id;
            }
        }
        // 2. จัดการข้อมูลสมาชิก (ถ้ามีเบอร์โทร)
        let member_id = null;
        if (customerPhone && customerPhone.trim()) {
            const cleanPhone = customerPhone.trim().replace(/[-\s]/g, '');
            const [memberRows] = await pool.query('SELECT member_id, name, total_points FROM member WHERE phone_number = ? LIMIT 1', [
                cleanPhone
            ]);
            if (memberRows.length > 0) {
                member_id = memberRows[0].member_id;
            } else {
                // ถ้าเป็นสมาชิกใหม่ สมัครลง DB ทันที
                member_id = 'mem_' + __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomUUID().slice(0, 8);
                await pool.query('INSERT INTO member (member_id, phone_number, name, total_points) VALUES (?, ?, ?, 0)', [
                    member_id,
                    cleanPhone,
                    customerName || 'สมาชิกใหม่'
                ]);
            }
        }
        // 3. ดึงข้อมูลราคาเมนูและหมวดหมู่จริงจาก DB เพื่อความถูกต้อง
        const itemMenuIds = items.map((it)=>it.menu_id || it.id);
        const placeholders = itemMenuIds.map(()=>'?').join(',');
        const [dbMenuItems] = await pool.query(`SELECT menu_id, name, price, category_id FROM menu_item WHERE menu_id IN (${placeholders})`, itemMenuIds);
        const priceMap = {};
        const stationMap = {};
        const categoryToStation = {
            cat_main: 'MAIN',
            cat_grill: 'GRILL',
            cat_seafood: 'GRILL',
            cat_noodle: 'NOODLE',
            cat_appetizer: 'APPETIZER',
            cat_dessert: 'DESSERT',
            cat_drink: 'DESSERT'
        };
        for (const m of dbMenuItems){
            priceMap[m.menu_id] = Number(m.price);
            stationMap[m.menu_id] = categoryToStation[m.category_id] || 'MAIN';
        }
        // 4. คำนวณยอดเงิน
        let subtotal = 0;
        const validatedItems = items.map((item)=>{
            const menu_id = item.menu_id || item.id;
            const unit_price = priceMap[menu_id] !== undefined ? priceMap[menu_id] : Number(item.price || 0);
            const quantity = Math.max(1, parseInt(item.quantity) || 1);
            const station_code = stationMap[menu_id] || 'MAIN';
            subtotal += unit_price * quantity;
            return {
                menu_id,
                unit_price,
                quantity,
                station_code,
                is_takeaway: item.is_takeaway ? 1 : 0
            };
        });
        const isMemberDiscount = Boolean(isMember || member_id);
        const discount_amount = isMemberDiscount ? Math.round(subtotal * 0.1) : 0;
        const net_total = Math.max(0, subtotal - discount_amount);
        // 5. บันทึกลงตาราง orders
        const order_id = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomUUID();
        await pool.query(`INSERT INTO orders 
        (order_id, table_id, member_id, status, subtotal, discount_amount, net_total, note) 
       VALUES (?, ?, ?, 'OPEN', ?, ?, ?, ?)`, [
            order_id,
            table_id,
            member_id,
            subtotal,
            discount_amount,
            net_total,
            note || ''
        ]);
        // 6. บันทึกรายการอาหารลงตาราง order_item พร้อมกำหนดสเตชั่น
        for (const item of validatedItems){
            const order_item_id = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomUUID();
            await pool.query(`INSERT INTO order_item 
          (order_item_id, order_id, menu_id, quantity, unit_price, kitchen_status, is_takeaway, station_code, dispatched) 
         VALUES (?, ?, ?, ?, ?, 'PENDING', ?, ?, 1)`, [
                order_item_id,
                order_id,
                item.menu_id,
                item.quantity,
                item.unit_price,
                item.is_takeaway,
                item.station_code
            ]);
        }
        // 7. อัปเดตสถานะโต๊ะเป็น OCCUPIED
        if (table_id) {
            await pool.query(`UPDATE dining_table SET status = 'OCCUPIED', current_order_id = ? WHERE table_id = ?`, [
                order_id,
                table_id
            ]);
        }
        // 8. ถ้าเป็นสมาชิก ให้แต้มสะสม (ทุก 20 บาท = 1 แต้ม)
        if (member_id) {
            const earnedPoints = Math.floor(net_total / 20);
            if (earnedPoints > 0) {
                const ledger_id = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomUUID();
                await pool.query(`INSERT INTO point_ledger (ledger_id, member_id, order_id, points_changed, transaction_type) VALUES (?, ?, ?, ?, 'EARN')`, [
                    ledger_id,
                    member_id,
                    order_id,
                    earnedPoints
                ]);
                await pool.query(`UPDATE member SET total_points = total_points + ? WHERE member_id = ?`, [
                    earnedPoints,
                    member_id
                ]);
            }
        }
        const short_id = order_id.slice(0, 8);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'สร้างออเดอร์สำเร็จ',
            order: {
                id: short_id,
                order_id,
                short_id,
                tableNumber: tableNumber || '-',
                totalAmount: net_total,
                net_total,
                status: 'pending',
                created_at: new Date().toISOString()
            }
        }, {
            status: 201
        });
    } catch (error) {
        console.error('Create order error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'เกิดข้อผิดพลาดในการสร้างออเดอร์',
            details: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0de4ms8._.js.map