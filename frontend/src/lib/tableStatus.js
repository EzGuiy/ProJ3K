// สถานะของโต๊ะอาหาร (ใช้ร่วมกันทั้ง API และหน้า UI)
export const TABLE_STATUSES = ['AVAILABLE', 'RESERVED', 'OCCUPIED'];

export const TABLE_STATUS_META = {
  AVAILABLE: {
    label: 'ว่าง',
    text: 'text-[#34a853]',
    bg: 'bg-[#34a853]/12',
    border: 'border-[#34a853]/30',
    dot: 'bg-[#34a853]',
    active: 'bg-[#34a853]/20 border-[#34a853]/50 text-[#81c995]',
  },
  RESERVED: {
    label: 'จอง',
    text: 'text-[#fbbc04]',
    bg: 'bg-[#fbbc04]/12',
    border: 'border-[#fbbc04]/30',
    dot: 'bg-[#fbbc04]',
    active: 'bg-[#fbbc04]/20 border-[#fbbc04]/50 text-[#fdd663]',
  },
  OCCUPIED: {
    label: 'เต็ม',
    text: 'text-[#ea4335]',
    bg: 'bg-[#ea4335]/12',
    border: 'border-[#ea4335]/30',
    dot: 'bg-[#ea4335]',
    active: 'bg-[#ea4335]/20 border-[#ea4335]/50 text-[#f28b82]',
  },
};

export function getStatusMeta(status) {
  return TABLE_STATUS_META[status] || TABLE_STATUS_META.AVAILABLE;
}

export function formatClockTime(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
}

export function formatElapsed(isoString, nowMs = Date.now()) {
  if (!isoString) return "";
  const start = new Date(isoString).getTime();
  if (Number.isNaN(start)) return "";
  const diff = Math.max(0, nowMs - start);
  const totalMinutes = Math.floor(diff / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) return `${hours} ชม. ${minutes} นาที`;
  return `${minutes} นาที`;
}
