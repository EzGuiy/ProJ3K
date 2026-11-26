export const OPERATING_DAYS = [
  { key: "monday", label: "จันทร์" },
  { key: "tuesday", label: "อังคาร" },
  { key: "wednesday", label: "พุธ" },
  { key: "thursday", label: "พฤหัสบดี" },
  { key: "friday", label: "ศุกร์" },
  { key: "saturday", label: "เสาร์" },
  { key: "sunday", label: "อาทิตย์" },
];

export const DEFAULT_SYSTEM_SETTINGS = {
  restaurantName: "ครัวสุดโหด",
  phone: "",
  address: "",
  operatingHours: Object.fromEntries(
    OPERATING_DAYS.map(({ key }) => [
      key,
      { closed: true, open: "", close: "" },
    ]),
  ),
  taxRate: 7,
  serviceChargeRate: 0,
  taxOnServiceCharge: true,
};
