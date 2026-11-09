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
