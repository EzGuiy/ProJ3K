import pool from "@/lib/db";
import { DEFAULT_SYSTEM_SETTINGS, OPERATING_DAYS } from "@/lib/settingsDefaults";

const SETTINGS_KEY = "restaurant";

export async function getSystemSettings() {
  const [rows] = await pool.query(
    "SELECT settings_json FROM app_settings WHERE setting_key = ? LIMIT 1",
    [SETTINGS_KEY],
  );
  if (rows.length === 0) return DEFAULT_SYSTEM_SETTINGS;

  const stored = rows[0].settings_json;
  const parsed = typeof stored === "string" ? JSON.parse(stored) : stored;

  return {
    ...DEFAULT_SYSTEM_SETTINGS,
    ...parsed,
    operatingHours: Object.fromEntries(
      OPERATING_DAYS.map(({ key }) => [
        key,
        {
          ...DEFAULT_SYSTEM_SETTINGS.operatingHours[key],
          ...parsed.operatingHours?.[key],
        },
      ]),
    ),
  };
}

export async function saveSystemSettings(settings) {
  await pool.query(
    `INSERT INTO app_settings (setting_key, settings_json)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE settings_json = VALUES(settings_json)`,
    [SETTINGS_KEY, JSON.stringify(settings)],
  );
  return settings;
}
