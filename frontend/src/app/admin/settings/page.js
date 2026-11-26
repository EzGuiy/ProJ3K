"use client";

import { useEffect, useState } from "react";
import {
  MdAccessTime,
  MdCheckCircle,
  MdDataset,
  MdInfoOutline,
  MdPercent,
  MdSave,
  MdStorefront,
} from "react-icons/md";
import { DEFAULT_SYSTEM_SETTINGS, OPERATING_DAYS } from "@/lib/settingsDefaults";

const inputClass =
  "w-full rounded-lg border border-white/[0.1] bg-[#111111] px-3 py-2.5 text-sm text-[#e8eaed] outline-none transition focus:border-[#ff6b35]";

function Section({ title, description, Icon, children }) {
  return (
    <section className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#1c1c1e]">
      <div className="flex items-start gap-3 border-b border-white/[0.08] px-5 py-4">
        <Icon className="mt-0.5 shrink-0 text-xl text-[#ff6b35]" />
        <div>
          <h2 className="text-sm font-semibold text-[#e8eaed]">{title}</h2>
          <p className="mt-1 text-xs text-[#9aa0a6]">{description}</p>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SYSTEM_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [databaseStatus, setDatabaseStatus] = useState(null);
  const [checkingDatabase, setCheckingDatabase] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/admin/settings", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "โหลดการตั้งค่าไม่สำเร็จ");
        }
        if (active) setSettings(data.settings);
      })
      .catch((error) => {
        if (active) setLoadError(error.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const updateSettings = (updates) => {
    setSettings((current) => ({ ...current, ...updates }));
    setSaveMessage("");
  };

  const updateHours = (day, updates) => {
    setSettings((current) => ({
      ...current,
      operatingHours: {
        ...current.operatingHours,
        [day]: { ...current.operatingHours[day], ...updates },
      },
    }));
    setSaveMessage("");
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setSaveMessage("");

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "บันทึกการตั้งค่าไม่สำเร็จ");
      }

      setSettings(data.settings);
      setSaveMessage("บันทึกการตั้งค่าเรียบร้อยแล้ว");
    } catch (error) {
      setSaveMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  const checkDatabase = async () => {
    setCheckingDatabase(true);
    setDatabaseStatus(null);

    try {
      const response = await fetch("/api/db-test", { cache: "no-store" });
      const data = await response.json();
      setDatabaseStatus({
        connected: response.ok,
        message: response.ok
          ? data.message
          : data.hint || data.message || "เชื่อมต่อฐานข้อมูลไม่สำเร็จ",
      });
    } catch {
      setDatabaseStatus({
        connected: false,
        message: "ไม่สามารถเรียก API ตรวจสอบฐานข้อมูลได้",
      });
    } finally {
      setCheckingDatabase(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <div>
        <h2 className="text-lg font-semibold text-[#e8eaed]">ตั้งค่าระบบ</h2>
        <p className="mt-1 text-sm text-[#9aa0a6]">
          ตั้งค่าข้อมูลร้าน เวลาเปิดบริการ และยอดที่ใช้กับออเดอร์ใหม่
        </p>
      </div>

      {loadError && (
        <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          โหลดการตั้งค่าไม่ได้: {loadError}
        </div>
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <Section
          title="ข้อมูลร้าน"
          description="ข้อมูลติดต่อสำหรับแสดงในระบบ"
          Icon={MdStorefront}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-xs text-[#9aa0a6]">
              ชื่อร้าน
              <input
                className={inputClass}
                maxLength={120}
                value={settings.restaurantName}
                onChange={(event) => updateSettings({ restaurantName: event.target.value })}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-xs text-[#9aa0a6]">
              เบอร์โทรศัพท์
              <input
                className={inputClass}
                maxLength={30}
                type="tel"
                value={settings.phone}
                onChange={(event) => updateSettings({ phone: event.target.value })}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-xs text-[#9aa0a6] md:col-span-2">
              ที่อยู่
              <textarea
                className={inputClass}
                maxLength={500}
                rows={3}
                value={settings.address}
                onChange={(event) => updateSettings({ address: event.target.value })}
              />
            </label>
          </div>
        </Section>

        <Section
          title="เวลาเปิด-ปิด"
          description="ตั้งเวลาให้แต่ละวัน หรือเลือกปิดร้าน"
          Icon={MdAccessTime}
        >
          <div className="flex flex-col divide-y divide-white/[0.06]">
            {OPERATING_DAYS.map(({ key, label }) => {
              const hours = settings.operatingHours[key];
              return (
                <div key={key} className="grid grid-cols-[80px_1fr] items-center gap-3 py-3 first:pt-0 last:pb-0 sm:grid-cols-[100px_1fr_150px_150px]">
                  <span className="text-sm font-medium text-[#e8eaed]">{label}</span>
                  <label className="flex items-center gap-2 text-xs text-[#9aa0a6] sm:order-last">
                    <input
                      type="checkbox"
                      checked={hours.closed}
                      onChange={(event) => updateHours(key, { closed: event.target.checked })}
                      className="accent-[#ff6b35]"
                    />
                    ปิดร้าน
                  </label>
                  <label className="flex items-center gap-2 text-xs text-[#9aa0a6]">
                    เปิด
                    <input
                      type="time"
                      className={inputClass}
                      value={hours.open}
                      disabled={hours.closed}
                      required={!hours.closed}
                      onChange={(event) => updateHours(key, { open: event.target.value })}
                    />
                  </label>
                  <label className="flex items-center gap-2 text-xs text-[#9aa0a6]">
                    ปิด
                    <input
                      type="time"
                      className={inputClass}
                      value={hours.close}
                      disabled={hours.closed}
                      required={!hours.closed}
                      onChange={(event) => updateHours(key, { close: event.target.value })}
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </Section>

        <Section
          title="ภาษีและค่าบริการ"
          description="มีผลกับยอดออเดอร์ใหม่ ส่วนลดสมาชิกจะถูกหักก่อนคำนวณค่าบริการและภาษี"
          Icon={MdPercent}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-xs text-[#9aa0a6]">
              ภาษี (%)
              <input
                className={inputClass}
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={settings.taxRate}
                onChange={(event) => updateSettings({ taxRate: Number(event.target.value) })}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-xs text-[#9aa0a6]">
              ค่าบริการ (%)
              <input
                className={inputClass}
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={settings.serviceChargeRate}
                onChange={(event) => updateSettings({ serviceChargeRate: Number(event.target.value) })}
              />
            </label>
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm text-[#e8eaed]">
            <input
              type="checkbox"
              checked={settings.taxOnServiceCharge}
              onChange={(event) => updateSettings({ taxOnServiceCharge: event.target.checked })}
              className="accent-[#ff6b35]"
            />
            คิดภาษีจากค่าบริการด้วย
          </label>
          <p className="mt-3 text-xs text-[#9aa0a6]">
            สูตร: ยอดอาหารหลังหักส่วนลด + ค่าบริการ + ภาษี
          </p>
        </Section>

        <Section
          title="ฐานข้อมูล"
          description="ตรวจสอบสถานะ MySQL โดยไม่แสดงรหัสผ่านหรือข้อมูลลับ"
          Icon={MdDataset}
        >
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={checkDatabase}
              disabled={checkingDatabase}
              className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm font-medium text-[#e8eaed] transition hover:bg-white/[0.08] disabled:opacity-50"
            >
              {checkingDatabase ? "กำลังตรวจสอบ..." : "ทดสอบการเชื่อมต่อ"}
            </button>
            {databaseStatus && (
              <span className={`flex items-center gap-1.5 text-sm ${databaseStatus.connected ? "text-green-400" : "text-red-300"}`}>
                <MdCheckCircle />
                {databaseStatus.message}
              </span>
            )}
          </div>
        </Section>

        <Section
          title="บัญชีผู้ดูแลระบบ"
          description="สถานะการเข้าถึงหน้าแอดมิน"
          Icon={MdInfoOutline}
        >
          <p className="text-sm text-[#e8eaed]">ขณะนี้หน้าแอดมินเข้าใช้งานได้โดยไม่ต้องล็อกอิน</p>
          <p className="mt-1 text-xs text-[#9aa0a6]">
            ยังไม่มีระบบบัญชีหรือเปลี่ยนรหัสผ่านตามที่กำหนด
          </p>
        </Section>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div aria-live="polite" className="text-sm text-[#9aa0a6]">
            {saveMessage}
          </div>
          <button
            type="submit"
            disabled={loading || saving || Boolean(loadError)}
            className="flex items-center gap-2 rounded-lg bg-[#ff6b35] px-5 py-2.5 text-sm font-semibold text-[#111111] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MdSave className="text-lg" />
            {saving ? "กำลังบันทึก..." : "บันทึกการตั้งค่า"}
          </button>
        </div>
      </form>
    </div>
  );
}
