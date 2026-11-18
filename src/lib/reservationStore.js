import { readJson, writeJson } from "./jsonDb";

const FILE = "reservations.json";
const EMPTY = { nextId: 1, reservations: [] };

function load() {
  const data = readJson(FILE, EMPTY);
  if (!data || !Array.isArray(data.reservations)) {
    return { nextId: 1, reservations: [] };
  }
  return data;
}

function save(data) {
  writeJson(FILE, data);
}

function generateToken() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

export function getReservations() {
  return load().reservations;
}

export function getReservationByToken(token) {
  return load().reservations.find((item) => item.qrToken === token) || null;
}

export function getReservationById(id) {
  return load().reservations.find((item) => item.id === id) || null;
}

export function findReservation(idOrToken) {
  const data = load().reservations;
  const numeric = Number(idOrToken);
  if (!Number.isNaN(numeric) && String(numeric) === String(idOrToken)) {
    const byId = data.find((item) => item.id === numeric);
    if (byId) return byId;
  }
  return data.find((item) => item.qrToken === idOrToken) || null;
}

export function addReservation({ name, phone, partySize, timeSlot, orderType, promotionId }) {
  const data = load();
  const reservation = {
    id: data.nextId++,
    name,
    phone,
    partySize: Number(partySize),
    timeSlot,
    orderType,
    promotionId: promotionId || null,
    status: "confirmed",
    qrToken: generateToken(),
    createdAt: new Date().toISOString(),
  };
  data.reservations.push(reservation);
  save(data);
  return reservation;
}

export function updateReservationStatus(idOrToken, status) {
  const data = load();
  const numeric = Number(idOrToken);
  const reservation = data.reservations.find((item) => {
    if (!Number.isNaN(numeric) && String(numeric) === String(idOrToken) && item.id === numeric) {
      return true;
    }
    return item.qrToken === idOrToken;
  });
  if (!reservation) return null;
  reservation.status = status;
  reservation.updatedAt = new Date().toISOString();
  save(data);
  return reservation;
}
