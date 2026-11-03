import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/admin/dashboard — รวมข้อมูลสถิติสำหรับ Dashboard แอดมิน
export async function GET() {
  try {
    // 1. สรุปยอดออเดอร์วันนี้
    const [todayOrders] = await pool.query(`
      SELECT 
        COUNT(*) AS total_orders,
        COALESCE(SUM(net_total), 0) AS total_revenue,
        COUNT(CASE WHEN status = 'OPEN' THEN 1 END) AS open_orders,
        COUNT(CASE WHEN status = 'CLOSED' THEN 1 END) AS closed_orders
      FROM \`ORDER\`
      WHERE DATE(created_at) = CURDATE()
    `);

    // 2. สถานะโต๊ะ
    const [tableStats] = await pool.query(`
      SELECT 
        COUNT(*) AS total_tables,
        COUNT(CASE WHEN status = 'AVAILABLE' THEN 1 END) AS available,
        COUNT(CASE WHEN status = 'OCCUPIED' THEN 1 END) AS occupied
      FROM DINING_TABLE
    `);

    // 3. จำนวนเมนู
    const [menuStats] = await pool.query(`
      SELECT 
        COUNT(*) AS total_menus,
        COUNT(CASE WHEN is_available = 1 THEN 1 END) AS available_menus,
        COUNT(CASE WHEN is_available = 0 THEN 1 END) AS unavailable_menus
      FROM MENU_ITEM
    `);

    // 4. จำนวนสมาชิก
    const [memberStats] = await pool.query(`
      SELECT COUNT(*) AS total_members
      FROM MEMBER
    `);

    // 5. สถานะรายการอาหารในครัวตอนนี้
    const [kitchenStats] = await pool.query(`
      SELECT 
        COUNT(CASE WHEN kitchen_status = 'PENDING' THEN 1 END) AS pending_items,
        COUNT(CASE WHEN kitchen_status = 'COOKING' THEN 1 END) AS cooking_items,
        COUNT(CASE WHEN kitchen_status = 'READY' THEN 1 END) AS ready_items,
        COUNT(CASE WHEN kitchen_status = 'SERVED' THEN 1 END) AS served_items
      FROM ORDER_ITEM
      JOIN \`ORDER\` ON ORDER_ITEM.order_id = \`ORDER\`.order_id
      WHERE DATE(\`ORDER\`.created_at) = CURDATE()
    `);

    // 6. เมนูยอดนิยม (Top 5 วันนี้)
    const [popularItems] = await pool.query(`
      SELECT 
        mi.name,
        mi.price,
        mc.name AS category_name,
        SUM(oi.quantity) AS total_ordered
      FROM ORDER_ITEM oi
      JOIN MENU_ITEM mi ON oi.menu_id = mi.menu_id
      JOIN MENU_CATEGORY mc ON mi.category_id = mc.category_id
      JOIN \`ORDER\` o ON oi.order_id = o.order_id
      WHERE DATE(o.created_at) = CURDATE()
      GROUP BY mi.menu_id, mi.name, mi.price, mc.name
      ORDER BY total_ordered DESC
      LIMIT 5
    `);

    // 7. รายได้ 7 วันย้อนหลัง
    const [revenueWeek] = await pool.query(`
      SELECT 
        DATE(created_at) AS date,
        COUNT(*) AS orders,
        COALESCE(SUM(net_total), 0) AS revenue
      FROM \`ORDER\`
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        AND status = 'CLOSED'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `);

    return NextResponse.json({
      today: todayOrders[0] || {},
      tables: tableStats[0] || {},
      menus: menuStats[0] || {},
      members: memberStats[0] || {},
      kitchen: kitchenStats[0] || {},
      popularItems: popularItems || [],
      revenueWeek: revenueWeek || [],
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: 500 }
    );
  }
}

