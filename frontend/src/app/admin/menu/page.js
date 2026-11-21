"use client";

import { useCallback, useEffect, useState } from "react";
import {
  MdRestaurantMenu,
  MdAdd,
  MdClose,
  MdRefresh,
  MdLocalFireDepartment,
  MdCheckCircle,
  MdErrorOutline,
} from "react-icons/md";

const EMPTY_FORM = {
  name: "",
  name_en: "",
  category_id: "",
  price: "",
  description: "",
  image_url: "",
  spicy_level: "0",
  is_popular: false,
};

const SPICY_OPTIONS = [
  { value: "0", label: "ไม่เผ็ด" },
  { value: "1", label: "เผ็ดน้อย 🌶️" },
  { value: "2", label: "เผ็ดกลาง 🌶️🌶️" },
  { value: "3", label: "เผ็ดมาก 🌶️🌶️🌶️" },
];

// หมวดหมู่สำรอง ใช้อ้างอิงรหัสจริงในตาราง menu_category
// เพื่อให้ dropdown ไม่ว่างแม้ API โหลดไม่ได้ (เช่นฐานข้อมูลยังไม่รัน)
const FALLBACK_CATEGORIES = [
  { category_id: "cat_appetizer", name: "อาหารเรียกน้ำย่อย" },
  { category_id: "cat_main", name: "จานหลัก" },
  { category_id: "cat_noodle", name: "ก๋วยเตี๋ยว & เส้น" },
  { category_id: "cat_grill", name: "ปิ้งย่าง" },
  { category_id: "cat_seafood", name: "อาหารทะเล" },
  { category_id: "cat_dessert", name: "ของหวาน" },
  { category_id: "cat_drink", name: "เครื่องดื่ม" },
];

const inputClass =
  "h-10 w-full px-3 rounded-xl bg-[#111111] border border-white/[0.1] text-[0.85rem] text-[#e8eaed] placeholder:text-[#5f6368] focus:border-[#ff6b35] outline-none transition-colors";
const labelClass = "block text-[0.75rem] text-[#9aa0a6] font-medium mb-1.5";

export default function AdminMenuPage() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [usingFallbackCategories, setUsingFallbackCategories] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadingError("");
    try {
      const res = await fetch("/api/admin/menus", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "โหลดข้อมูลเมนูไม่สำเร็จ");
      setMenus(data.menus || []);
      const loadedCategories = data.categories || [];
      setCategories(
        loadedCategories.length > 0 ? loadedCategories : FALLBACK_CATEGORIES
      );
      setUsingFallbackCategories(loadedCategories.length === 0);
    } catch (err) {
      setLoadingError(err.message || "โหลดข้อมูลเมนูไม่สำเร็จ");
      setCategories(FALLBACK_CATEGORIES);
      setUsingFallbackCategories(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ปิด popup ด้วยปุ่ม Esc และล็อกการเลื่อนหน้าเว็บขณะเปิด
  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape" && !submitting) setIsModalOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, submitting]);

  const openModal = () => {
    setForm({ ...EMPTY_FORM });
    setFormError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (formError) setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setFormError("กรุณากรอกชื่อเมนู");
      return;
    }
    if (!form.category_id) {
      setFormError("กรุณาเลือกหมวดหมู่อาหาร");
      return;
    }
    if (form.price === "" || Number(form.price) < 0) {
      setFormError("กรุณากรอกราคาให้ถูกต้อง");
      return;
    }

    setSubmitting(true);
    setFormError("");
    try {
      const name = form.name.trim();
      const res = await fetch("/api/admin/menus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          name_en: form.name_en.trim(),
          category_id: form.category_id,
          price: Number(form.price),
          description: form.description.trim(),
          image_url: form.image_url.trim(),
          spicy_level: Number(form.spicy_level),
          is_popular: form.is_popular,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "เพิ่มเมนูไม่สำเร็จ");

      setIsModalOpen(false);
      setSuccess(`เพิ่มเมนู "${name}" สำเร็จ`);
      window.setTimeout(() => setSuccess(""), 3000);
      await loadData();
    } catch (err) {
      setFormError(err.message || "เพิ่มเมนูไม่สำเร็จ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-[#1c1c1e] border border-white/[0.08] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/[0.08] flex-wrap">
          <div>
            <h2 className="text-[0.9rem] font-semibold text-[#e8eaed]">
              จัดการเมนูอาหาร
            </h2>
            <p className="text-[0.72rem] text-[#5f6368] mt-0.5">
              เพิ่ม แก้ไข หรือซ่อนรายการอาหารในระบบ POS
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadData}
              title="รีเฟรช"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/[0.1] text-[0.8rem] text-[#9aa0a6] hover:bg-white/[0.05] hover:text-[#e8eaed] transition-colors cursor-pointer"
            >
              <MdRefresh className="text-base" /> รีเฟรช
            </button>
            <button
              type="button"
              onClick={openModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ff6b35]/10 text-[#ff6b35] text-[0.8rem] font-medium hover:bg-[#ff6b35]/20 transition-colors cursor-pointer"
            >
              <MdAdd className="text-base" /> เพิ่มเมนูใหม่
            </button>
          </div>
        </div>
      </div>

      {success && (
        <div className="flex items-center gap-2 text-[0.8rem] text-[#81c995] bg-[#1e3a2a] border border-[#34a853]/30 rounded-xl px-4 py-2.5">
          <MdCheckCircle className="text-base" /> {success}
        </div>
      )}
      {loadingError && (
        <div className="flex items-center gap-2 text-[0.8rem] text-[#f28b82] bg-[#2d1e1e] border border-[#ea4335]/30 rounded-xl px-4 py-2.5">
          <MdErrorOutline className="text-base" /> {loadingError}
        </div>
      )}

      {/* รายการเมนู */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-[#5f6368] text-[0.875rem] gap-3">
          <div className="w-5 h-5 border-2 border-[#5f6368] border-t-[#ff6b35] rounded-full animate-spin" />
          กำลังโหลดข้อมูลเมนู...
        </div>
      ) : menus.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-[#5f6368] gap-2 bg-[#1c1c1e] border border-white/[0.08] rounded-xl">
          <MdRestaurantMenu className="text-4xl" />
          <p className="text-[0.875rem] font-medium text-[#9aa0a6]">
            ยังไม่มีเมนูอาหารในระบบ
          </p>
          <p className="text-[0.78rem]">
            กด "เพิ่มเมนูใหม่" เพื่อเพิ่มรายการอาหารแรก
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {menus.map((menu) => (
            <div
              key={menu.menu_id}
              className="bg-[#1c1c1e] border border-white/[0.08] rounded-xl p-4 flex flex-col gap-3 hover:border-white/[0.14] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#ff6b35]/10 flex items-center justify-center text-xl shrink-0">
                  {menu.image_url && !menu.image_url.startsWith("http")
                    ? menu.image_url
                    : "🍽️"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.95rem] font-semibold text-[#e8eaed] leading-tight truncate">
                    {menu.name}
                  </p>
                  {menu.name_en && (
                    <p className="text-[0.72rem] text-[#5f6368] truncate">
                      {menu.name_en}
                    </p>
                  )}
                </div>
                <span
                  className={`shrink-0 inline-flex items-center gap-1 text-[0.68rem] font-medium px-2 py-1 rounded-full ${
                    menu.is_available
                      ? "bg-[#34a853]/15 text-[#81c995]"
                      : "bg-white/[0.06] text-[#5f6368]"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      menu.is_available ? "bg-[#34a853]" : "bg-[#5f6368]"
                    }`}
                  />
                  {menu.is_available ? "เปิดขาย" : "ซ่อน"}
                </span>
              </div>

              {menu.description && (
                <p className="text-[0.76rem] text-[#9aa0a6] line-clamp-2 min-h-[2.2rem]">
                  {menu.description}
                </p>
              )}

              <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-white/[0.06]">
                <div className="flex flex-wrap items-center gap-1.5">
                  {menu.category_name && (
                    <span className="text-[0.68rem] text-[#9aa0a6] bg-white/[0.06] px-2 py-1 rounded-md">
                      {menu.category_name}
                    </span>
                  )}
                  {Number(menu.spicy_level) > 0 && (
                    <span className="text-[0.68rem] text-[#fdd663] bg-[#fbbc04]/10 px-2 py-1 rounded-md flex items-center gap-1">
                      <MdLocalFireDepartment /> {menu.spicy_level}
                    </span>
                  )}
                  {menu.is_popular && (
                    <span className="text-[0.68rem] text-[#ff6b35] bg-[#ff6b35]/10 px-2 py-1 rounded-md">
                      ยอดนิยม
                    </span>
                  )}
                </div>
                <span className="text-[1rem] font-semibold text-[#ff6b35] tabular-nums shrink-0">
                  ฿{Number(menu.price).toLocaleString("th-TH")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Popup เพิ่มเมนู */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-menu-title"
            className="relative w-full max-w-[560px] max-h-[90vh] overflow-y-auto bg-[#1c1c1e] border border-white/[0.1] rounded-2xl shadow-2xl"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] sticky top-0 bg-[#1c1c1e] z-10">
              <div>
                <h3
                  id="add-menu-title"
                  className="text-[1rem] font-semibold text-[#e8eaed]"
                >
                  เพิ่มเมนูอาหารใหม่
                </h3>
                <p className="text-[0.72rem] text-[#5f6368] mt-0.5">
                  กรอกรายละเอียดเมนูเพื่อเพิ่มเข้าสู่ระบบ POS
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                disabled={submitting}
                aria-label="ปิด"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9aa0a6] hover:bg-white/[0.06] hover:text-[#e8eaed] transition-colors cursor-pointer disabled:opacity-50"
              >
                <MdClose className="text-lg" />
              </button>
            </div>

            {/* Modal form */}
            <form
              onSubmit={handleSubmit}
              className="p-5 flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="menu-name" className={labelClass}>
                    ชื่อเมนู <span className="text-[#ff6b35]">*</span>
                  </label>
                  <input
                    id="menu-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="เช่น ต้มยำกุ้ง"
                    className={inputClass}
                    autoFocus
                  />
                </div>
                <div>
                  <label htmlFor="menu-name-en" className={labelClass}>
                    ชื่อภาษาอังกฤษ
                  </label>
                  <input
                    id="menu-name-en"
                    name="name_en"
                    value={form.name_en}
                    onChange={handleChange}
                    placeholder="เช่น Tom Yum Goong"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="menu-category" className={labelClass}>
                    หมวดหมู่ <span className="text-[#ff6b35]">*</span>
                  </label>
                  <select
                    id="menu-category"
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">-- เลือกหมวดหมู่ --</option>
                    {categories.map((cat) => (
                      <option key={cat.category_id} value={cat.category_id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {usingFallbackCategories && (
                    <p className="text-[0.68rem] text-[#fdd663] mt-1.5">
                      หมวดหมู่ตัวอย่าง (ฐานข้อมูลยังไม่เชื่อมต่อ)
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="menu-price" className={labelClass}>
                    ราคา (บาท) <span className="text-[#ff6b35]">*</span>
                  </label>
                  <input
                    id="menu-price"
                    name="price"
                    type="number"
                    min="0"
                    step="1"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="เช่น 199"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="menu-description" className={labelClass}>
                  รายละเอียดเมนู
                </label>
                <textarea
                  id="menu-description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="อธิบายส่วนผสมหรือรสชาติของเมนู"
                  className={`${inputClass} h-auto py-2.5 resize-none`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="menu-image" className={labelClass}>
                    รูปภาพ / อีโมจิ
                  </label>
                  <input
                    id="menu-image"
                    name="image_url"
                    value={form.image_url}
                    onChange={handleChange}
                    placeholder="เช่น 🍜 หรือ URL รูปภาพ"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="menu-spicy" className={labelClass}>
                    ระดับความเผ็ด
                  </label>
                  <select
                    id="menu-spicy"
                    name="spicy_level"
                    value={form.spicy_level}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {SPICY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-2.5 w-fit cursor-pointer">
                <input
                  type="checkbox"
                  name="is_popular"
                  checked={form.is_popular}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#ff6b35] cursor-pointer"
                />
                <span className="text-[0.8rem] text-[#9aa0a6]">
                  ตั้งเป็นเมนูยอดนิยม
                </span>
              </label>

              {formError && (
                <div className="flex items-center gap-2 text-[0.8rem] text-[#f28b82] bg-[#2d1e1e] border border-[#ea4335]/30 rounded-xl px-3 py-2.5">
                  <MdErrorOutline className="text-base shrink-0" />
                  {formError}
                </div>
              )}

              {/* Modal footer */}
              <div className="flex justify-end gap-2 pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg border border-white/[0.1] text-[0.82rem] text-[#9aa0a6] hover:bg-white/[0.05] hover:text-[#e8eaed] transition-colors cursor-pointer disabled:opacity-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ff6b35] text-white text-[0.82rem] font-semibold hover:bg-[#ff7f50] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      กำลังบันทึก...
                    </>
                  ) : (
                    <>
                      <MdAdd className="text-base" /> บันทึกเมนู
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
