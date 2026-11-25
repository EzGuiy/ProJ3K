export function isPromoEligible(promo, { partySize, orderType, hour }) {
  const rule = promo?.rule;
  if (!rule) return false;
  if (rule.type === "beforeHour") return hour < rule.hour;
  if (rule.type === "minParty") return partySize >= rule.min;
  if (rule.type === "orderType") return orderType === rule.orderType;
  return false;
}
