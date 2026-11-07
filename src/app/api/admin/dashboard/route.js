import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/admin/dashboard — สรุปข้อมูล Dashboard แอดมินจาก MySQL
export async function GET() {
  try {
    // 1. สรุปยอดออเดอร์วันนี้
    const [todayOrders] = await pool.query(`
      SELECT 
        COUNT(*) AS total_orders,
        COALESCE(SUM(net_total), 0) AS total_revenue,
        COUNT(CASE WHEN status = 'OPEN' THEN 1 END) AS open_orders,
        COUNT(CASE WHEN status = 'CLOSED' THEN 1 END) AS closed_orders
      FROM orders
      WHERE DATE(created_at) = CURDATE()
    `);

    // 2. สถานะโต๊ะ
    const [tableStats] = await pool.query(`
      SELECT 
        COUNT(*) AS total_tables,
        COUNT(CASE WHEN status = 'AVAILABLE' THEN 1 END) AS available,
        COUNT(CASE WHEN status = 'OCCUPIED' THEN 1 END) AS occupied
      FROM dining_table
    `);

    // 3. จำนวนเมนู
    const [menuStats] = await pool.query(`
      SELECT 
        COUNT(*) AS total_menus,
        COUNT(CASE WHEN is_available = 1 THEN 1 END) AS available_menus,
        COUNT(CASE WHEN is_available = 0 THEN 1 END) AS unavailable_menus
      FROM menu_item
    `);

    // 4. จำนวนสมาชิก
    const [memberStats] = await pool.query(`
      SELECT COUNT(*) AS total_members
      FROM member
    `);

    // 5. สถานะรายการอาหารในครัววันนี้
    const [kitchenStats] = await pool.query(`
      SELECT 
        COUNT(CASE WHEN oi.kitchen_status = 'PENDING' THEN 1 END) AS pending_items,
        COUNT(CASE WHEN oi.kitchen_status = 'COOKING' THEN 1 END) AS cooking_items,
        COUNT(CASE WHEN oi.kitchen_status = 'READY' THEN 1 END) AS ready_items,
        COUNT(CASE WHEN oi.kitchen_status = 'SERVED' THEN 1 END) AS served_items
      FROM order_item oi
      JOIN orders o ON oi.order_id = o.order_id
      WHERE DATE(o.created_at) = CURDATE()
    `);

    // 6. เมนูยอดนิยม (Top 5 วันนี้ ถ้าวันนี้ยังไม่มีออเดอร์ ให้ดึงทั้งหมด)
    let [popularItems] = await pool.query(`
      SELECT 
        mi.name,
        mi.price,
        mc.name AS category_name,
        SUM(oi.quantity) AS total_ordered
      FROM order_item oi
      JOIN menu_item mi ON oi.menu_id = mi.menu_id
      LEFT JOIN menu_category mc ON mi.category_id = mc.category_id
      JOIN orders o ON oi.order_id = o.order_id
      WHERE DATE(o.created_at) = CURDATE()
      GROUP BY mi.menu_id, mi.name, mi.price, mc.name
      ORDER BY total_ordered DESC
      LIMIT 5
    `);

    // หากวันนี้ยังไม่มี ให้ดึงยอดนิยมตลอดกาล
    if (popularItems.length === 0) {
      const [allTimePopular] = await pool.query(`
        SELECT 
          mi.name,
          mi.price,
          mc.name AS category_name,
          COALESCE(SUM(oi.quantity), 0) AS total_ordered
        FROM menu_item mi
        LEFT JOIN menu_category mc ON mi.category_id = mc.category_id
        LEFT JOIN order_item oi ON oi.menu_id = mi.menu_id
        WHERE mi.is_available = 1
        GROUP BY mi.menu_id, mi.name, mi.price, mc.name
        ORDER BY total_ordered DESC, mi.is_popular DESC
        LIMIT 5
      `);
      popularItems = allTimePopular;
    }

    // 7. รายได้ 7 วันย้อนหลัง
    const [revenueWeek] = await pool.query(`
      SELECT 
        DATE(created_at) AS date,
        COUNT(*) AS orders,
        COALESCE(SUM(net_total), 0) AS revenue
      FROM orders
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
