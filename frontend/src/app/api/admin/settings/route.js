import { NextResponse } from "next/server";
import { getSystemSettings, saveSystemSettings } from "@/lib/systemSettings";
import { OPERATING_DAYS } from "@/lib/settingsDefaults";

export const dynamic = "force-dynamic";

function isValidTime(value) {
  return value === "" || /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function validateSettings(settings) {
  if (!settings || typeof settings !== "object" || Array.isArray(settings)) {
    return "ข้อมูลตั้งค่าไม่ถูกต้อง";
  }

  for (const field of ["restaurantName", "phone", "address"]) {
    if (typeof settings[field] !== "string") {
      return "ข้อมูลร้านไม่ถูกต้อง";
    }
  }

  for (const rate of ["taxRate", "serviceChargeRate"]) {
    if (
      typeof settings[rate] !== "number" ||
      !Number.isFinite(settings[rate]) ||
      settings[rate] < 0 ||
      settings[rate] > 100
    ) {
      return "อัตราภาษีและค่าบริการต้องอยู่ระหว่าง 0 ถึง 100";
    }
  }

  if (typeof settings.taxOnServiceCharge !== "boolean") {
    return "ค่าการคิดภาษีบนค่าบริการไม่ถูกต้อง";
  }

  for (const { key } of OPERATING_DAYS) {
    const hours = settings.operatingHours?.[key];
    if (
      !hours ||
      typeof hours.closed !== "boolean" ||
      typeof hours.open !== "string" ||
      typeof hours.close !== "string" ||
      !isValidTime(hours.open) ||
      !isValidTime(hours.close) ||
      (!hours.closed && (!hours.open || !hours.close))
    ) {
      return "กรุณาตรวจสอบเวลาเปิด-ปิดของแต่ละวัน";
    }
  }

  return null;
}

export async function GET() {
  try {
    const settings = await getSystemSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Get admin settings error:", error);
    return NextResponse.json(
      { error: "ไม่สามารถโหลดการตั้งค่าจากฐานข้อมูลได้" },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  try {
    const settings = await request.json();
    const validationError = validateSettings(settings);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    await saveSystemSettings(settings);
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Save admin settings error:", error);
    return NextResponse.json(
      { error: "ไม่สามารถบันทึกการตั้งค่าลงฐานข้อมูลได้" },
      { status: 500 },
    );
  }
}
