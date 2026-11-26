export function calculateOrderTotals(subtotal, discountAmount, settings) {
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const serviceChargeAmount = Math.round(
    discountedSubtotal * (settings.serviceChargeRate / 100) * 100,
  ) / 100;
  const taxableAmount =
    discountedSubtotal +
    (settings.taxOnServiceCharge ? serviceChargeAmount : 0);
  const taxAmount =
    Math.round(taxableAmount * (settings.taxRate / 100) * 100) / 100;
  const netTotal =
    Math.round((discountedSubtotal + serviceChargeAmount + taxAmount) * 100) /
    100;

  return {
    discountedSubtotal,
    serviceChargeAmount,
    taxAmount,
    netTotal,
  };
}
