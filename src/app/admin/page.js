'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';

// ===== Tab definitions =====
const TABS = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'orders', label: 'ประวัติออเดอร์', icon: '📜' },
  { key: 'menus', label: 'จัดการเมนู', icon: '🍜' },
  { key: 'members', label: 'สมาชิก', icon: '👥' },
  { key: 'staff', label: 'พนักงาน', icon: '👨‍💼' },
  { key: 'tables', label: 'โต๊ะอาหาร', icon: '🪑' },
];

// ===== Main Admin Page =====
export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dbStatus, setDbStatus] = useState(null); // null = loading, true = ok, false = error
  const [dbError, setDbError] = useState('');

  // ตรวจสอบการเชื่อมต่อ DB ตอนเปิดหน้า
  useEffect(() => {
    fetch('/api/db-test')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setDbStatus(true);
        } else {
          setDbStatus(false);
          setDbError(data.hint || data.error_message || 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้');
        }
      })
      .catch(() => {
        setDbStatus(false);
        setDbError('ไม่สามารถเชื่อมต่อ API ได้');
      });
  }, []);

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <button className={styles.backBtn} onClick={() => router.push('/')}>
            ← กลับ
          </button>
          <h2 className={styles.sidebarTitle}>🛠️ Admin Panel</h2>
          <p className={styles.sidebarSub}>ระบบจัดการร้านอาหาร</p>
        </div>

        <nav className={styles.sidebarNav}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.navItem} ${activeTab === tab.key ? styles.navItemActive : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className={styles.navIcon}>{tab.icon}</span>
              <span className={styles.navLabel}>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* DB Status Indicator */}
        <div className={styles.sidebarFooter}>
          <div
            className={`${styles.dbStatus} ${
              dbStatus === null
                ? styles.dbStatusLoading
                : dbStatus
                ? styles.dbStatusOk
                : styles.dbStatusError
            }`}
          >
            <span className={styles.dbDot}></span>
            <span>
              {dbStatus === null
                ? 'กำลังตรวจสอบ DB...'
                : dbStatus
                ? 'MySQL เชื่อมต่อสำเร็จ'
                : 'DB ไม่ได้เชื่อมต่อ'}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        {/* DB Error Banner */}
        {dbStatus === false && (
          <div className={styles.errorBanner}>
            <span>⚠️</span>
            <div>
              <strong>ไม่สามารถเชื่อมต่อฐานข้อมูล MySQL ได้</strong>
              <p>{dbError}</p>
              <p className={styles.errorHint}>
                กรุณาตรวจสอบไฟล์ <code>.env.local</code> และตรวจสอบว่า MySQL กำลังทำงานอยู่
              </p>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && <DashboardTab dbReady={dbStatus === true} />}
        {activeTab === 'orders' && <OrdersTab dbReady={dbStatus === true} />}
        {activeTab === 'menus' && <MenusTab dbReady={dbStatus === true} />}
        {activeTab === 'members' && <MembersTab dbReady={dbStatus === true} />}
        {activeTab === 'staff' && <StaffTab dbReady={dbStatus === true} />}
        {activeTab === 'tables' && <TablesTab dbReady={dbStatus === true} />}
      </main>
    </div>
  );
}

// ===== DASHBOARD TAB =====
function DashboardTab({ dbReady }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = useCallback(async () => {
    if (!dbReady) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/admin/dashboard');
      const json = await res.json();
      if (res.ok) {
        setData(json);
      } else {
        setError(json.error || 'เกิดข้อผิดพลาด');
      }
    } catch {
      setError('ไม่สามารถโหลดข้อมูลได้');
    } finally {
      setLoading(false);
    }
  }, [dbReady]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (!dbReady) return <EmptyDB section="Dashboard" />;
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchDashboard} />;
  if (!data) return null;

  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <h1 className={styles.tabTitle}>📊 Dashboard — ภาพรวมร้านอาหาร</h1>
        <button className={styles.refreshBtn} onClick={fetchDashboard}>🔄 รีเฟรช</button>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <StatCard icon="🧾" label="ออเดอร์วันนี้" value={data.today?.total_orders ?? 0} color="orange" />
        <StatCard
          icon="💰"
          label="รายได้วันนี้"
          value={`฿${Number(data.today?.total_revenue ?? 0).toLocaleString()}`}
          color="green"
        />
        <StatCard icon="🪑" label="โต๊ะว่าง" value={`${data.tables?.available ?? 0}/${data.tables?.total_tables ?? 0}`} color="blue" />
        <StatCard icon="🍜" label="เมนูเปิดขาย" value={`${data.menus?.available_menus ?? 0}/${data.menus?.total_menus ?? 0}`} color="purple" />
        <StatCard icon="👥" label="สมาชิกทั้งหมด" value={data.members?.total_members ?? 0} color="amber" />
        <StatCard icon="📦" label="ออเดอร์เปิดอยู่" value={data.today?.open_orders ?? 0} color="red" />
      </div>

      {/* Kitchen Status */}
      <div className={styles.sectionCard}>
        <h3 className={styles.sectionTitle}>👨‍🍳 สถานะครัววันนี้</h3>
        <div className={styles.kitchenGrid}>
          <div className={`${styles.kitchenItem} ${styles.kitchenPending}`}>
            <span className={styles.kitchenValue}>{data.kitchen?.pending_items ?? 0}</span>
            <span className={styles.kitchenLabel}>รอคิว</span>
          </div>
          <div className={`${styles.kitchenItem} ${styles.kitchenCooking}`}>
            <span className={styles.kitchenValue}>{data.kitchen?.cooking_items ?? 0}</span>
            <span className={styles.kitchenLabel}>กำลังปรุง</span>
          </div>
          <div className={`${styles.kitchenItem} ${styles.kitchenReady}`}>
            <span className={styles.kitchenValue}>{data.kitchen?.ready_items ?? 0}</span>
            <span className={styles.kitchenLabel}>พร้อมเสิร์ฟ</span>
          </div>
          <div className={`${styles.kitchenItem} ${styles.kitchenServed}`}>
            <span className={styles.kitchenValue}>{data.kitchen?.served_items ?? 0}</span>
            <span className={styles.kitchenLabel}>เสิร์ฟแล้ว</span>
          </div>
        </div>
      </div>

      {/* Two columns: Popular Items + Revenue Week */}
      <div className={styles.twoCol}>
        {/* Popular Items */}
        <div className={styles.sectionCard}>
          <h3 className={styles.sectionTitle}>🔥 เมนูยอดนิยมวันนี้</h3>
          {data.popularItems?.length > 0 ? (
            <div className={styles.popularList}>
              {data.popularItems.map((item, idx) => (
                <div key={idx} className={styles.popularItem}>
                  <span className={styles.popularRank}>#{idx + 1}</span>
                  <div className={styles.popularInfo}>
                    <span className={styles.popularName}>{item.name}</span>
                    <span className={styles.popularCategory}>{item.category_name}</span>
                  </div>
                  <div className={styles.popularStats}>
                    <span className={styles.popularOrdered}>{item.total_ordered} จาน</span>
                    <span className={styles.popularPrice}>฿{Number(item.price).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyText}>ยังไม่มีข้อมูลออเดอร์วันนี้</p>
          )}
        </div>

        {/* Revenue Week */}
        <div className={styles.sectionCard}>
          <h3 className={styles.sectionTitle}>📈 รายได้ 7 วันย้อนหลัง</h3>
          {data.revenueWeek?.length > 0 ? (
            <div className={styles.revenueList}>
              {data.revenueWeek.map((day, idx) => (
                <div key={idx} className={styles.revenueRow}>
                  <span className={styles.revenueDate}>
                    {new Date(day.date).toLocaleDateString('th-TH', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </span>
                  <div className={styles.revenueBar}>
                    <div
                      className={styles.revenueBarFill}
                      style={{
                        width: `${Math.min(
                          100,
                          (Number(day.revenue) / Math.max(...data.revenueWeek.map((d) => Number(d.revenue)), 1)) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className={styles.revenueAmount}>฿{Number(day.revenue).toLocaleString()}</span>
                  <span className={styles.revenueOrders}>{day.orders} ออเดอร์</span>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyText}>ยังไม่มีข้อมูลรายได้</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== ORDERS TAB =====
function OrdersTab({ dbReady }) {
  const [data, setData] = useState({ orders: [], tables: [], pagination: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ status: 'all', date: '', table: '', page: 1 });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    if (!dbReady) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status !== 'all') params.set('status', filters.status);
      if (filters.date) params.set('date', filters.date);
      if (filters.table) params.set('table', filters.table);
      params.set('page', filters.page.toString());

      const res = await fetch(`/api/admin/orders?${params}`);
      const json = await res.json();
      if (res.ok) {
        setData(json);
      } else {
        setError(json.error || 'เกิดข้อผิดพลาด');
      }
    } catch {
      setError('ไม่สามารถโหลดข้อมูลได้');
    } finally {
      setLoading(false);
    }
  }, [dbReady, filters]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const fetchOrderDetail = async (orderId) => {
    setDetailLoading(true);
    setSelectedOrder(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`);
      const json = await res.json();
      if (res.ok) {
        setOrderDetail(json);
      }
    } catch {
      // ignore
    } finally {
      setDetailLoading(false);
    }
  };

  if (!dbReady) return <EmptyDB section="ประวัติออเดอร์" />;
  if (error) return <ErrorMessage message={error} onRetry={fetchOrders} />;

  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <h1 className={styles.tabTitle}>📜 ประวัติออเดอร์ทั้งหมด</h1>
        <button className={styles.refreshBtn} onClick={fetchOrders}>🔄 รีเฟรช</button>
      </div>

      {/* Filters */}
      <div className={styles.filterBar}>
        <select
          className={styles.filterSelect}
          value={filters.status}
          onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value, page: 1 }))}
        >
          <option value="all">สถานะทั้งหมด</option>
          <option value="OPEN">OPEN (เปิดอยู่)</option>
          <option value="CLOSED">CLOSED (ปิดแล้ว)</option>
        </select>

        <input
          type="date"
          className={styles.filterInput}
          value={filters.date}
          onChange={(e) => setFilters((p) => ({ ...p, date: e.target.value, page: 1 }))}
        />

        <select
          className={styles.filterSelect}
          value={filters.table}
          onChange={(e) => setFilters((p) => ({ ...p, table: e.target.value, page: 1 }))}
        >
          <option value="">โต๊ะทั้งหมด</option>
          {data.tables?.map((t) => (
            <option key={t.table_id} value={t.table_number}>
              โต๊ะ {t.table_number}
            </option>
          ))}
        </select>

        {(filters.status !== 'all' || filters.date || filters.table) && (
          <button
            className={styles.filterClear}
            onClick={() => setFilters({ status: 'all', date: '', table: '', page: 1 })}
          >
            ✕ ล้างตัวกรอง
          </button>
        )}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Order Table */}
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>โต๊ะ</th>
                  <th>สมาชิก</th>
                  <th>พนักงาน</th>
                  <th>รายการ</th>
                  <th>ยอดรวม</th>
                  <th>สถานะ</th>
                  <th>เวลา</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.orders?.length > 0 ? (
                  data.orders.map((order) => (
                    <tr key={order.order_id} className={selectedOrder === order.order_id ? styles.rowActive : ''}>
                      <td className={styles.cellId}>{order.order_id?.substring(0, 8)}...</td>
                      <td>{order.table_number || '-'}</td>
                      <td>{order.member_name || <span className={styles.textMuted}>Guest</span>}</td>
                      <td>{order.staff_name || <span className={styles.textMuted}>-</span>}</td>
                      <td>{order.item_count} รายการ</td>
                      <td className={styles.cellPrice}>฿{Number(order.net_total || 0).toLocaleString()}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${order.status === 'OPEN' ? styles.statusOpen : styles.statusClosed}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className={styles.cellTime}>
                        {order.created_at
                          ? new Date(order.created_at).toLocaleString('th-TH', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
                          : '-'}
                      </td>
                      <td>
                        <button className={styles.detailBtn} onClick={() => fetchOrderDetail(order.order_id)}>
                          ดูรายละเอียด
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className={styles.emptyRow}>ไม่พบข้อมูลออเดอร์</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data.pagination?.totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                disabled={filters.page <= 1}
                onClick={() => setFilters((p) => ({ ...p, page: p.page - 1 }))}
              >
                ← ก่อนหน้า
              </button>
              <span className={styles.pageInfo}>
                หน้า {data.pagination.page} / {data.pagination.totalPages} (ทั้งหมด {data.pagination.total} รายการ)
              </span>
              <button
                className={styles.pageBtn}
                disabled={filters.page >= data.pagination.totalPages}
                onClick={() => setFilters((p) => ({ ...p, page: p.page + 1 }))}
              >
                ถัดไป →
              </button>
            </div>
          )}
        </>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className={styles.modalOverlay} onClick={() => { setSelectedOrder(null); setOrderDetail(null); }}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>📋 รายละเอียดออเดอร์</h3>
              <button className={styles.modalClose} onClick={() => { setSelectedOrder(null); setOrderDetail(null); }}>✕</button>
            </div>
            {detailLoading ? (
              <LoadingSpinner />
            ) : orderDetail ? (
              <div className={styles.modalBody}>
                {/* Order Info */}
                <div className={styles.detailSection}>
                  <h4>ข้อมูลออเดอร์</h4>
                  <div className={styles.detailGrid}>
                    <div><span className={styles.detailLabel}>โต๊ะ:</span> {orderDetail.order?.table_number || '-'}</div>
                    <div><span className={styles.detailLabel}>สถานะ:</span> {orderDetail.order?.status}</div>
                    <div><span className={styles.detailLabel}>ยอดรวม:</span> ฿{Number(orderDetail.order?.net_total || 0).toLocaleString()}</div>
                    <div><span className={styles.detailLabel}>สมาชิก:</span> {orderDetail.order?.member_name || 'Guest'}</div>
                    {orderDetail.order?.member_phone && (
                      <div><span className={styles.detailLabel}>เบอร์โทร:</span> {orderDetail.order.member_phone}</div>
                    )}
                    <div><span className={styles.detailLabel}>พนักงาน:</span> {orderDetail.order?.staff_name || '-'}</div>
                  </div>
                </div>

                {/* Items */}
                <div className={styles.detailSection}>
                  <h4>รายการอาหาร ({orderDetail.items?.length || 0} รายการ)</h4>
                  {orderDetail.items?.map((item, idx) => (
                    <div key={idx} className={styles.detailItem}>
                      <div className={styles.detailItemHeader}>
                        <span className={styles.detailItemName}>{item.menu_name}</span>
                        <span className={styles.detailItemQty}>x{item.quantity}</span>
                        <span className={styles.detailItemPrice}>฿{Number(item.menu_price || 0).toLocaleString()}</span>
                        <span className={`${styles.kitchenBadge} ${styles[`kitchen${item.kitchen_status}`]}`}>
                          {item.kitchen_status}
                        </span>
                      </div>
                      {item.is_takeaway ? <span className={styles.takeawayBadge}>🥡 กลับบ้าน</span> : null}
                      {item.modifiers?.length > 0 && (
                        <div className={styles.modifierList}>
                          {item.modifiers.map((mod, mIdx) => (
                            <span key={mIdx} className={styles.modifierTag}>
                              {mod.group_name}: {mod.modifier_name}
                              {Number(mod.extra_price) > 0 && ` (+฿${Number(mod.extra_price).toLocaleString()})`}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Payments */}
                {orderDetail.payments?.length > 0 && (
                  <div className={styles.detailSection}>
                    <h4>💳 การชำระเงิน</h4>
                    {orderDetail.payments.map((pay, idx) => (
                      <div key={idx} className={styles.paymentRow}>
                        <span>{pay.payment_method}</span>
                        <span>฿{Number(pay.amount || 0).toLocaleString()}</span>
                        <span className={`${styles.statusBadge} ${pay.status === 'SUCCESS' ? styles.statusClosed : styles.statusOpen}`}>
                          {pay.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Points */}
                {orderDetail.points?.length > 0 && (
                  <div className={styles.detailSection}>
                    <h4>⭐ แต้มสะสม</h4>
                    {orderDetail.points.map((pt, idx) => (
                      <div key={idx} className={styles.pointRow}>
                        <span>{pt.transaction_type === 'EARN' ? '➕ ได้รับ' : '➖ ใช้แต้ม'}</span>
                        <span>{pt.points_changed} แต้ม</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className={styles.emptyText}>ไม่พบข้อมูล</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ===== MENUS TAB =====
function MenusTab({ dbReady }) {
  const [data, setData] = useState({ menus: [], categories: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');

  const fetchMenus = useCallback(async () => {
    if (!dbReady) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter !== 'all') params.set('category', categoryFilter);
      if (search) params.set('search', search);

      const res = await fetch(`/api/admin/menus?${params}`);
      const json = await res.json();
      if (res.ok) {
        setData(json);
      } else {
        setError(json.error || 'เกิดข้อผิดพลาด');
      }
    } catch {
      setError('ไม่สามารถโหลดข้อมูลได้');
    } finally {
      setLoading(false);
    }
  }, [dbReady, categoryFilter, search]);

  useEffect(() => {
    const timeout = setTimeout(fetchMenus, 300); // debounce search
    return () => clearTimeout(timeout);
  }, [fetchMenus]);

  if (!dbReady) return <EmptyDB section="จัดการเมนู" />;
  if (error) return <ErrorMessage message={error} onRetry={fetchMenus} />;

  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <h1 className={styles.tabTitle}>🍜 จัดการเมนูอาหาร</h1>
        <button className={styles.refreshBtn} onClick={fetchMenus}>🔄 รีเฟรช</button>
      </div>

      {/* Filters */}
      <div className={styles.filterBar}>
        <select
          className={styles.filterSelect}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">หมวดหมู่ทั้งหมด</option>
          {data.categories?.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          className={styles.filterInput}
          type="text"
          placeholder="🔍 ค้นหาชื่อเมนู..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>ชื่อเมนู</th>
                <th>หมวดหมู่</th>
                <th>ราคา</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {data.menus?.length > 0 ? (
                data.menus.map((menu) => (
                  <tr key={menu.menu_id}>
                    <td className={styles.cellName}>{menu.name}</td>
                    <td>
                      <span className={styles.categoryBadge}>{menu.category_name || '-'}</span>
                    </td>
                    <td className={styles.cellPrice}>฿{Number(menu.price || 0).toLocaleString()}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${menu.is_available ? styles.statusClosed : styles.statusOpen}`}>
                        {menu.is_available ? '✅ เปิดขาย' : '❌ ปิดขาย'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className={styles.emptyRow}>ไม่พบรายการเมนู</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <p className={styles.menuCount}>
        แสดง {data.menus?.length || 0} เมนู
      </p>
    </div>
  );
}

// ===== MEMBERS TAB =====
function MembersTab({ dbReady }) {
  const [data, setData] = useState({ members: [], pagination: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const fetchMembers = useCallback(async () => {
    if (!dbReady) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      params.set('page', page.toString());

      const res = await fetch(`/api/admin/members?${params}`);
      const json = await res.json();
      if (res.ok) {
        setData(json);
      } else {
        setError(json.error || 'เกิดข้อผิดพลาด');
      }
    } catch {
      setError('ไม่สามารถโหลดข้อมูลได้');
    } finally {
      setLoading(false);
    }
  }, [dbReady, search, page]);

  useEffect(() => {
    const timeout = setTimeout(fetchMembers, 300);
    return () => clearTimeout(timeout);
  }, [fetchMembers]);

  if (!dbReady) return <EmptyDB section="สมาชิก" />;
  if (error) return <ErrorMessage message={error} onRetry={fetchMembers} />;

  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <h1 className={styles.tabTitle}>👥 ข้อมูลสมาชิก</h1>
        <button className={styles.refreshBtn} onClick={fetchMembers}>🔄 รีเฟรช</button>
      </div>

      <div className={styles.filterBar}>
        <input
          className={styles.filterInput}
          type="text"
          placeholder="🔍 ค้นหาชื่อ / เบอร์โทร..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>ชื่อ</th>
                  <th>เบอร์โทร</th>
                  <th>แต้มสะสม</th>
                  <th>จำนวนออเดอร์</th>
                  <th>ยอดใช้จ่ายรวม</th>
                  <th>สมัครเมื่อ</th>
                </tr>
              </thead>
              <tbody>
                {data.members?.length > 0 ? (
                  data.members.map((member) => (
                    <tr key={member.member_id}>
                      <td className={styles.cellName}>{member.name}</td>
                      <td>{member.phone_number}</td>
                      <td>
                        <span className={styles.pointsBadge}>⭐ {member.total_points}</span>
                      </td>
                      <td>{member.total_orders} ครั้ง</td>
                      <td className={styles.cellPrice}>฿{Number(member.total_spent || 0).toLocaleString()}</td>
                      <td className={styles.cellTime}>
                        {member.created_at
                          ? new Date(member.created_at).toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric' })
                          : '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className={styles.emptyRow}>ไม่พบข้อมูลสมาชิก</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {data.pagination?.totalPages > 1 && (
            <div className={styles.pagination}>
              <button className={styles.pageBtn} disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                ← ก่อนหน้า
              </button>
              <span className={styles.pageInfo}>
                หน้า {data.pagination.page} / {data.pagination.totalPages} (ทั้งหมด {data.pagination.total} คน)
              </span>
              <button className={styles.pageBtn} disabled={page >= data.pagination.totalPages} onClick={() => setPage((p) => p + 1)}>
                ถัดไป →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ===== STAFF TAB =====
function StaffTab({ dbReady }) {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const fetchStaff = useCallback(async () => {
    if (!dbReady) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (roleFilter !== 'all') params.set('role', roleFilter);

      const res = await fetch(`/api/admin/staff?${params}`);
      const json = await res.json();
      if (res.ok) {
        setStaff(json.staff || []);
      } else {
        setError(json.error || 'เกิดข้อผิดพลาด');
      }
    } catch {
      setError('ไม่สามารถโหลดข้อมูลได้');
    } finally {
      setLoading(false);
    }
  }, [dbReady, search, roleFilter]);

  useEffect(() => {
    const timeout = setTimeout(fetchStaff, 300);
    return () => clearTimeout(timeout);
  }, [fetchStaff]);

  if (!dbReady) return <EmptyDB section="พนักงาน" />;
  if (error) return <ErrorMessage message={error} onRetry={fetchStaff} />;

  const roleLabels = {
    ADMIN: { label: 'ผู้ดูแลระบบ', color: 'statusOpen' },
    SERVER: { label: 'พนักงานเสิร์ฟ', color: 'statusClosed' },
    CHEF: { label: 'พ่อครัว', color: 'statusOpen' },
    EXPO: { label: 'จัดจาน', color: 'statusClosed' },
  };

  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <h1 className={styles.tabTitle}>👨‍💼 ข้อมูลพนักงาน</h1>
        <button className={styles.refreshBtn} onClick={fetchStaff}>🔄 รีเฟรช</button>
      </div>

      <div className={styles.filterBar}>
        <select
          className={styles.filterSelect}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">ตำแหน่งทั้งหมด</option>
          <option value="ADMIN">ผู้ดูแลระบบ</option>
          <option value="SERVER">พนักงานเสิร์ฟ</option>
          <option value="CHEF">พ่อครัว</option>
          <option value="EXPO">จัดจาน</option>
        </select>

        <input
          className={styles.filterInput}
          type="text"
          placeholder="🔍 ค้นหาชื่อพนักงาน..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>ชื่อ</th>
                <th>ตำแหน่ง</th>
                <th>PIN Code</th>
                <th>ออเดอร์ที่เปิด</th>
                <th>เพิ่มเมื่อ</th>
              </tr>
            </thead>
            <tbody>
              {staff.length > 0 ? (
                staff.map((s) => {
                  const roleInfo = roleLabels[s.role] || { label: s.role, color: 'statusClosed' };
                  return (
                    <tr key={s.staff_id}>
                      <td className={styles.cellName}>{s.name}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[roleInfo.color]}`}>
                          {roleInfo.label}
                        </span>
                      </td>
                      <td>{s.pin_code || <span className={styles.textMuted}>ไม่มี</span>}</td>
                      <td>{s.total_orders_opened} ครั้ง</td>
                      <td className={styles.cellTime}>
                        {s.created_at
                          ? new Date(s.created_at).toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric' })
                          : '-'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className={styles.emptyRow}>ไม่พบข้อมูลพนักงาน</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <p className={styles.menuCount}>
        แสดง {staff.length} คน
      </p>
    </div>
  );
}

// ===== TABLES TAB =====
function TablesTab({ dbReady }) {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTables = useCallback(async () => {
    if (!dbReady) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/admin/tables');
      const json = await res.json();
      if (res.ok) {
        setTables(json.tables || []);
      } else {
        setError(json.error || 'เกิดข้อผิดพลาด');
      }
    } catch {
      setError('ไม่สามารถโหลดข้อมูลได้');
    } finally {
      setLoading(false);
    }
  }, [dbReady]);

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  if (!dbReady) return <EmptyDB section="โต๊ะอาหาร" />;
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchTables} />;

  const available = tables.filter((t) => t.status === 'AVAILABLE').length;
  const occupied = tables.filter((t) => t.status === 'OCCUPIED').length;

  return (
    <div className={styles.tabContent}>
      <div className={styles.tabHeader}>
        <h1 className={styles.tabTitle}>🪑 สถานะโต๊ะอาหาร</h1>
        <button className={styles.refreshBtn} onClick={fetchTables}>🔄 รีเฟรช</button>
      </div>

      <div className={styles.tableStatsBar}>
        <span className={styles.tableStatAvailable}>🟢 ว่าง {available}</span>
        <span className={styles.tableStatOccupied}>🔴 ไม่ว่าง {occupied}</span>
        <span className={styles.tableStatTotal}>📍 ทั้งหมด {tables.length}</span>
      </div>

      <div className={styles.tableGrid}>
        {tables.length > 0 ? (
          tables.map((table) => (
            <div
              key={table.table_id}
              className={`${styles.tableCard} ${table.status === 'OCCUPIED' ? styles.tableOccupied : styles.tableAvailable}`}
            >
              <div className={styles.tableCardHeader}>
                <span className={styles.tableNumber}>โต๊ะ {table.table_number}</span>
                <span className={`${styles.statusDot} ${table.status === 'AVAILABLE' ? styles.dotGreen : styles.dotRed}`}></span>
              </div>
              <div className={styles.tableCardBody}>
                <span className={styles.tableStatus}>
                  {table.status === 'AVAILABLE' ? '✅ ว่าง' : '🍽️ มีลูกค้า'}
                </span>
                {table.current_order_id && (
                  <div className={styles.tableOrderInfo}>
                    <span>{table.item_count || 0} รายการ</span>
                    <span>฿{Number(table.current_order_total || 0).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.emptyText}>ยังไม่มีข้อมูลโต๊ะในฐานข้อมูล</p>
        )}
      </div>
    </div>
  );
}

// ===== Shared Components =====
function StatCard({ icon, label, value, color }) {
  return (
    <div className={`${styles.statCard} ${styles[`stat${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}>
      <span className={styles.statIcon}>{icon}</span>
      <div className={styles.statInfo}>
        <span className={styles.statValue}>{value}</span>
        <span className={styles.statLabel}>{label}</span>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className={styles.loadingContainer}>
      <div className="spinner"></div>
      <p>กำลังโหลดข้อมูล...</p>
    </div>
  );
}

function ErrorMessage({ message, onRetry }) {
  const isTableMissing = message?.includes("doesn't exist") || message?.includes('ER_NO_SUCH_TABLE');

  return (
    <div className={styles.errorContainer}>
      <span className={styles.errorIcon}>{isTableMissing ? '🗄️' : '❌'}</span>
      {isTableMissing ? (
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>ยังไม่ได้สร้างตารางในฐานข้อมูล</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            เชื่อมต่อกับฐานข้อมูล MySQL สำเร็จแล้ว แต่ยังไม่มีตาราง (Tables) ใน Schema นี้
          </p>
          <div className={styles.emptyDBSteps} style={{ margin: '1rem auto', maxWidth: 500, textAlign: 'left' }}>
            <p>1. ไปที่ <strong>MySQL Workbench</strong></p>
            <p>2. เปิดไฟล์ <code>database/schema.sql</code> ที่เตรียมไว้ในโปรเจกต์</p>
            <p>3. กดปุ่ม ⚡ <strong>Execute (รูปสายฟ้า)</strong> เพื่อสร้างตารางและข้อมูลเริ่มต้น</p>
            <p>4. กลับมากดปุ่มลองใหม่ด้านล่างนี้</p>
          </div>
        </div>
      ) : (
        <p>{message}</p>
      )}
      {onRetry && (
        <button className={styles.refreshBtn} onClick={onRetry} style={{ marginTop: '0.75rem' }}>
          🔄 ลองใหม่
        </button>
      )}
    </div>
  );
}

function EmptyDB({ section }) {
  return (
    <div className={styles.emptyDB}>
      <span className={styles.emptyDBIcon}>🗄️</span>
      <h3>ยังไม่ได้เชื่อมต่อฐานข้อมูล</h3>
      <p>
        ส่วน <strong>{section}</strong> ต้องเชื่อมต่อ MySQL ก่อนจึงจะแสดงข้อมูลได้
      </p>
      <div className={styles.emptyDBSteps}>
        <p>1. ตรวจสอบไฟล์ <code>.env.local</code> ว่ามีข้อมูลเชื่อมต่อ MySQL ครบถ้วน</p>
        <p>2. ตรวจสอบว่า MySQL Service กำลังทำงาน (เช่น XAMPP, Docker)</p>
        <p>3. ทดสอบที่ <a href="/api/db-test" target="_blank" rel="noopener noreferrer">/api/db-test</a></p>
      </div>
    </div>
  );
}

