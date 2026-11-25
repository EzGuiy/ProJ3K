import { readJson } from "./jsonDb";

export function getPromotions() {
  const data = readJson("promotions.json", []);
  return Array.isArray(data) ? data : [];
}
