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

if (!g.__posTableStore) {
  g.__posTableStore = SEED.map(([number, status], index) => ({
    table_id: `tbl_mem_${index + 1}`,
    table_number: number,
    status,
    current_order_id: null,
    current_order_total: null,
    order_opened_at: null,
    item_count: 0,
  }));
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

  if (patch.status) table.status = patch.status;

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
