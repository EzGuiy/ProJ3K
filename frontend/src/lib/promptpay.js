import QRCode from 'qrcode';

/**
 * หมายเลขพร้อมเพย์เริ่มต้นสำหรับรับชำระเงินของร้านอาหาร
 * เบอร์โทรศัพท์: 0933632239
 */
export const PROMPTPAY_PHONE = '0933632239';

/**
 * คำนวณค่า CRC-16/CCITT-FALSE ตามมาตรฐาน EMVCo / PromptPay
 * @param {string} data ข้อมูลสตริงที่ต้องการคำนวณ Checksum
 * @returns {string} ค่า Checksum 4 หลักในรูปแบบ Hexadecimal ตัวพิมพ์ใหญ่ (เช่น E7FE)
 */
export function crc16(data) {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * แปลงหมายเลขโทรศัพท์ให้เป็นรูปแบบมาตรฐานพร้อมเพย์ 13 หลัก
 * เช่น 0933632239 -> 0066933632239
 * @param {string} phone เบอร์โทรศัพท์
 * @returns {string} หมายเลขพร้อมเพย์ 13 หลัก
 */
export function formatPromptPayPhone(phone = PROMPTPAY_PHONE) {
  const clean = String(phone).replace(/[^0-9]/g, '');
  if (clean.length === 13) {
    // กรณีเป็นเลขบัตรประชาชน หรือเลข 13 หลักอยู่แล้ว
    return clean;
  }
  let formatted = clean;
  if (formatted.startsWith('0')) {
    formatted = '0066' + formatted.slice(1);
  } else if (!formatted.startsWith('0066')) {
    formatted = '0066' + formatted;
  }
  return formatted.padStart(13, '0');
}

/**
 * จัดรูปแบบเบอร์โทรศัพท์สำหรับแสดงผลบนหน้าจอ เช่น 093-363-2239
 * @param {string} phone เบอร์โทรศัพท์
 * @returns {string} เบอร์โทรศัพท์ที่มีขีดคั่น
 */
export function formatPhoneDisplay(phone = PROMPTPAY_PHONE) {
  const clean = String(phone).replace(/[^0-9]/g, '');
  if (clean.length === 10) {
    return `${clean.slice(0, 3)}-${clean.slice(3, 6)}-${clean.slice(6)}`;
  }
  return clean;
}

/**
 * จัดรูปแบบจำนวนเงินเป็นสกุลเงินบาท เช่น ฿ 250.00
 * @param {number|string} amount ยอดเงิน
 * @returns {string} ยอดเงินพร้อมเครื่องหมาย ฿
 */
export function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return `฿ ${num.toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * สร้าง PromptPay EMVCo Payload String สำหรับทำ QR Code สแกนจ่ายเงิน
 * รองรับการ "ล็อคยอดเงินอัตโนมัติ" (Dynamic QR)
 * @param {string} phone เบอร์โทรศัพท์พร้อมเพย์ (ค่าเริ่มต้น 0933632239)
 * @param {number|string} amount ยอดเงินที่ต้องการล็อค (บาท)
 * @returns {string} ข้อความ Payload ตามมาตรฐานธนาคารแห่งประเทศไทย
 */
export function generatePromptPayPayload(phone = PROMPTPAY_PHONE, amount = 0) {
  const target = formatPromptPayPhone(phone);
  const isIdCard = String(phone).replace(/[^0-9]/g, '').length === 13 && !String(phone).startsWith('0');
  const targetSubtag = isIdCard ? '02' : '01';

  // Tag 29: Merchant Account Information (PromptPay)
  // Subtag 00 = AID (A000000677010111)
  // Subtag 01 (Mobile) / 02 (National ID / Tax ID)
  const tag29_00 = '0016A000000677010111';
  const tag29_01 = `${targetSubtag}13${target}`;
  const tag29Length = String(tag29_00.length + tag29_01.length).padStart(2, '0');
  const tag29 = `29${tag29Length}${tag29_00}${tag29_01}`;

  const numAmount = Number(amount);
  const hasAmount = !isNaN(numAmount) && numAmount > 0;

  // Tag 01: Point of Initiation Method
  // 11 = Static (ลูกค้ากรอกยอดเอง)
  // 12 = Dynamic (ล็อคยอดเงินแน่นอนจากร้านค้า)
  const tag01 = hasAmount ? '010212' : '010211';

  // Tag 54: Transaction Amount (มีทศนิยม 2 ตำแหน่งเสมอ เช่น 250.00)
  let tag54 = '';
  if (hasAmount) {
    const formattedAmount = numAmount.toFixed(2);
    const amountLength = String(formattedAmount.length).padStart(2, '0');
    tag54 = `54${amountLength}${formattedAmount}`;
  }

  // Tag 00: Payload Format Indicator (01)
  // Tag 53: Transaction Currency (764 = THB)
  // Tag 58: Country Code (TH)
  // Tag 63: CRC Checksum (ความยาว 04)
  const rawPayload = `000201${tag01}${tag29}5303764${tag54}5802TH6304`;
  const checksum = crc16(rawPayload);

  return `${rawPayload}${checksum}`;
}

/**
 * สร้างรูป QR Code PromptPay เป็น Base64 Data URL (data:image/png;base64,...)
 * สำหรับแสดงผลในแท็ก <img />
 * @param {string} phone เบอร์โทรศัพท์พร้อมเพย์
 * @param {number|string} amount ยอดเงินที่ล็อค
 * @param {object} options ตัวเลือกเพิ่มเติมของ QRCode
 * @returns {Promise<string>} Base64 Data URL
 */
export async function generatePromptPayQrDataUrl(
  phone = PROMPTPAY_PHONE,
  amount = 0,
  options = {}
) {
  const payload = generatePromptPayPayload(phone, amount);
  const defaultOptions = {
    errorCorrectionLevel: 'M',
    type: 'image/png',
    quality: 0.95,
    margin: 2,
    scale: 8,
    color: {
      dark: '#001a33',
      light: '#ffffff',
    },
    ...options,
  };

  return await QRCode.toDataURL(payload, defaultOptions);
}
