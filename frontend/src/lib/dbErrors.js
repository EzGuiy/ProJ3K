// ตรวจว่า error เกิดจากการเชื่อมต่อ/โครงสร้างฐานข้อมูลหรือไม่
// (ใช้ตัดสินใจว่าจะ fallback ไปใช้ข้อมูลชั่วคราวหรือไม่)
export function isDbUnavailable(error) {
  const code = error?.code || '';
  return [
    'ECONNREFUSED',
    'ENOTFOUND',
    'ETIMEDOUT',
    'EHOSTUNREACH',
    'PROTOCOL_CONNECTION_LOST',
    'ER_NO_SUCH_TABLE',
    'ER_BAD_FIELD_ERROR',
    'ER_ACCESS_DENIED_ERROR',
    'ER_BAD_DB_ERROR',
    'ER_NOT_SUPPORTED_AUTH_MODE',
    'AUTH_SWITCH_PLUGIN_ERROR',
  ].includes(code);
}
