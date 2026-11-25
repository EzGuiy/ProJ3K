import pool from "./db";
import { readJson, writeJson } from "./jsonDb";

const FILE = "reservations.json";
const EMPTY = { nextId: 1, reservations: [] };

function loadJson() {
  const data = readJson(FILE, EMPTY);
  if (!data || !Array.isArray(data.reservations)) {
    return { nextId: 1, reservations: [] };
  }
  return data;
}

function saveJson(data) {
  writeJson(FILE, data);
}

function generateToken() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

function mapRow(row) {
  if (!row) return null;
  const dt = row.booking_datetime ? new Date(row.booking_datetime) : new Date();
  
  let dateStr = '';
  if (row.booking_date instanceof Date) {
    const y = row.booking_date.getFullYear();
    const m = String(row.booking_date.getMonth() + 1).padStart(2, '0');
    const d = String(row.booking_date.getDate()).padStart(2, '0');
    dateStr = `${y}-${m}-${d}`;
  } else if (typeof row.booking_date === 'string') {
    dateStr = row.booking_date.slice(0, 10);
  } else if (row.booking_datetime) {
    const bdt = new Date(row.booking_datetime);
    const y = bdt.getFullYear();
    const m = String(bdt.getMonth() + 1).padStart(2, '0');
    const d = String(bdt.getDate()).padStart(2, '0');
    dateStr = `${y}-${m}-${d}`;
  }

  return {
    id: row.reservation_id,
    reservationId: row.reservation_id,
    name: row.name,
    phone: row.phone,
    partySize: Number(row.party_size || 2),
    bookingDate: dateStr,
    bookingTime: row.booking_time || '18:00',
    timeSlot: dt.toISOString(),
    orderType: row.order_type || 'buffet',
    specialRequests: row.special_requests || '',
    promotionId: row.promotion_id || null,
    status: row.status || 'confirmed',
    qrToken: row.qr_token,
    tableNumber: row.table_number || null,
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
  };
}

export async function getReservations() {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM reservation 
      ORDER BY booking_datetime ASC, created_at ASC
    `);
    if (Array.isArray(rows) && rows.length > 0) {
      return rows.map(mapRow);
    }
  } catch (err) {
    console.error("MySQL getReservations error, falling back to JSON:", err?.message);
  }

  // Fallback to JSON
  const jsonList = loadJson().reservations || [];
  return jsonList
    .map((item) => ({
      id: item.id || item.reservationId,
      reservationId: String(item.id || item.reservationId),
      name: item.name,
      phone: item.phone,
      partySize: Number(item.partySize || item.party_size || 2),
      bookingDate: item.bookingDate || (item.timeSlot ? item.timeSlot.slice(0, 10) : ''),
      bookingTime: item.bookingTime || (item.timeSlot ? new Date(item.timeSlot).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false }) : ''),
      timeSlot: item.timeSlot,
      orderType: item.orderType || 'buffet',
      specialRequests: item.specialRequests || '',
      promotionId: item.promotionId || null,
      status: item.status || 'confirmed',
      qrToken: item.qrToken,
      tableNumber: item.tableNumber || null,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
    }))
    .sort((a, b) => new Date(a.timeSlot) - new Date(b.timeSlot));
}

export async function findReservation(idOrToken) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM reservation WHERE reservation_id = ? OR qr_token = ? LIMIT 1`,
      [idOrToken, idOrToken]
    );
    if (rows && rows.length > 0) {
      return mapRow(rows[0]);
    }
  } catch (err) {
    console.error("MySQL findReservation error:", err?.message);
  }

  // Fallback JSON
  const data = loadJson().reservations || [];
  const numeric = Number(idOrToken);
  const found = data.find((item) => {
    return (
      item.id === idOrToken ||
      item.reservationId === idOrToken ||
      item.qrToken === idOrToken ||
      (!Number.isNaN(numeric) && item.id === numeric)
    );
  });
  return found || null;
}

export async function addReservation({
  name,
  phone,
  partySize = 2,
  timeSlot,
  bookingDate,
  bookingTime,
  orderType = "buffet",
  specialRequests = "",
  promotionId = null,
}) {
  const qrToken = generateToken();
  const idNum = Math.floor(1000 + Math.random() * 9000);
  const reservationId = `RSV-${idNum}`;

  let dt;
  if (bookingDate && bookingTime) {
    dt = new Date(`${bookingDate}T${bookingTime}:00`);
  } else if (timeSlot) {
    dt = new Date(timeSlot);
  } else {
    dt = new Date();
  }

  const bDate = bookingDate || dt.toISOString().slice(0, 10);
  const bTime = bookingTime || dt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  const finalTimeSlot = dt.toISOString();

  const reservationObj = {
    id: reservationId,
    reservationId,
    name: name.trim(),
    phone: phone.trim(),
    partySize: Number(partySize),
    bookingDate: bDate,
    bookingTime: bTime,
    timeSlot: finalTimeSlot,
    orderType,
    specialRequests: (specialRequests || "").trim(),
    promotionId: promotionId || null,
    status: "confirmed",
    qrToken,
    tableNumber: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 1. Try MySQL insert
  try {
    await pool.query(
      `INSERT INTO reservation 
       (reservation_id, name, phone, party_size, booking_date, booking_time, booking_datetime, order_type, special_requests, promotion_id, status, qr_token, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        reservationId,
        reservationObj.name,
        reservationObj.phone,
        reservationObj.partySize,
        bDate,
        bTime,
        dt,
        orderType,
        specialRequests || null,
        promotionId || null,
        "confirmed",
        qrToken,
      ]
    );
  } catch (err) {
    console.error("MySQL insert reservation error:", err?.message);
  }

  // 2. Also save to JSON for backup
  try {
    const data = loadJson();
    data.reservations.push(reservationObj);
    saveJson(data);
  } catch (err) {
    console.error("JSON save reservation error:", err?.message);
  }

  return reservationObj;
}

export async function updateReservationStatus(idOrToken, status, tableNumber = null) {
  // 1. Try MySQL
  try {
    let query = `UPDATE reservation SET status = ?, updated_at = NOW()`;
    const params = [status];
    if (tableNumber) {
      query += `, table_number = ?`;
      params.push(String(tableNumber));
    }
    query += ` WHERE reservation_id = ? OR qr_token = ?`;
    params.push(idOrToken, idOrToken);

    await pool.query(query, params);
  } catch (err) {
    console.error("MySQL updateReservationStatus error:", err?.message);
  }

  // 2. Update JSON
  const data = loadJson();
  const numeric = Number(idOrToken);
  const found = data.reservations.find((item) => {
    return (
      item.id === idOrToken ||
      item.reservationId === idOrToken ||
      item.qrToken === idOrToken ||
      (!Number.isNaN(numeric) && item.id === numeric)
    );
  });
  if (found) {
    found.status = status;
    if (tableNumber) found.tableNumber = String(tableNumber);
    found.updatedAt = new Date().toISOString();
    saveJson(data);
  }

  return await findReservation(idOrToken);
}
