// Fallback store สำหรับโต๊ะอาหาร — ใช้เมื่อยังเชื่อมต่อ MySQL ไม่ได้
// (ข้อมูลจะหายเมื่อรีสตาร์ทเซิร์ฟเวอร์ แต่ช่วยให้ทดลองใช้งานได้ทันที)

const g = globalThis;

const SEED = [
  ["1", "AVAILABLE"],
  ["2", "OCCUPIED"],
  ["3", "RESERVED"],
  ["4", "AVAILABLE"],
  ["5", "OCCUPIED"],
  ["6", "RESERVED"],
  ["7", "AVAILABLE"],
  ["8", "OCCUPIED"],
];

function seedOpenedAt(status, index) {
  if (status !== "OCCUPIED") return null;
  // เวลาตัวอย่างเพื่อให้เห็นการจับเวลา (จะคงที่ตราบเท่าที่เซิร์ฟเวอร์ไม่รีสตาร์ท)
  const minutesAgo = [18, 47, 95][index % 3];
  return new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();
}

if (!g.__posTableStore) {
  let occ = 0;
  g.__posTableStore = SEED.map(([number, status], index) => {
    const openedAt = seedOpenedAt(status, occ);
    if (status === "OCCUPIED") occ += 1;
    return {
      table_id: `tbl_mem_${index + 1}`,
      table_number: number,
      status,
      current_order_id: null,
      current_order_total: null,
      order_opened_at: openedAt,
      item_count: 0,
    };
  });
} else {
  // เติมเวลาให้โต๊ะที่กำลัง "เต็ม" แต่ยังไม่มีเวลาเริ่ม (กรณี hot-reload/โค้ดเวอร์ชันเก่า)
  g.__posTableStore.forEach((table) => {
    if (table?.status === "OCCUPIED" && !table.order_opened_at) {
      table.order_opened_at = new Date().toISOString();
    }
  });
}

function store() {
  return g.__posTableStore;
}

function sortTables(list) {
  return [...list].sort(
    (a, b) =>
      (Number(a.table_number) || 0) - (Number(b.table_number) || 0) ||
      a.table_number.localeCompare(b.table_number)
  );
}

export function listTables() {
  return sortTables(store());
}

export function addTable(tableNumber) {
  const number = String(tableNumber ?? "").trim();
  if (!number) return { error: "กรุณาระบุหมายเลขโต๊ะ" };
  if (store().some((t) => t.table_number === number)) {
    return { error: `มีโต๊ะหมายเลข ${number} อยู่แล้ว` };
  }

  const table = {
    table_id: `tbl_mem_${Date.now().toString(36)}`,
    table_number: number,
    status: "AVAILABLE",
    current_order_id: null,
    current_order_total: null,
    order_opened_at: null,
    item_count: 0,
  };
  store().push(table);
  return { table_id: table.table_id, table };
}

export function updateTable(tableId, patch = {}) {
  const table = store().find((t) => t.table_id === tableId);
  if (!table) return { error: "ไม่พบโต๊ะ" };

  if (patch.status) {
    table.status = patch.status;
    // จับเวลาอัตโนมัติเมื่อกดปุ่ม "เต็ม" (OCCUPIED) และล้างเวลาเมื่อเปลี่ยนสถานะอื่น
    if (patch.status === "OCCUPIED") {
      table.order_opened_at = new Date().toISOString();
    } else {
      table.order_opened_at = null;
    }
  }

  if (patch.table_number) {
    const number = String(patch.table_number).trim();
    if (store().some((t) => t.table_id !== tableId && t.table_number === number)) {
      return { error: `มีโต๊ะหมายเลข ${number} อยู่แล้ว` };
    }
    table.table_number = number;
  }

  return { table };
}

export function deleteTable(tableId) {
  const index = store().findIndex((t) => t.table_id === tableId);
  if (index === -1) return { error: "ไม่พบโต๊ะ" };
  store().splice(index, 1);
  return { ok: true };
}
