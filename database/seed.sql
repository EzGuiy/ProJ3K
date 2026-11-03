-- ===================================================
-- Seed Data for restaurant_pos (เฉพาะข้อมูลเริ่มต้น ไม่มีการสร้างตาราง)
-- ===================================================

USE `restaurant_pos`;

-- 1. หมวดหมู่อาหาร (Categories)
INSERT INTO `MENU_CATEGORY` (`category_id`, `name`) VALUES
('cat_appetizer', 'อาหารเรียกน้ำย่อย'),
('cat_main', 'จานหลัก'),
('cat_noodle', 'ก๋วยเตี๋ยว & เส้น'),
('cat_grill', 'ปิ้งย่าง'),
('cat_seafood', 'อาหารทะเล'),
('cat_dessert', 'ของหวาน'),
('cat_drink', 'เครื่องดื่ม')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- 2. รายการอาหารครบ 26 เมนู (ตรงกับหน้า Web POS)
INSERT INTO `MENU_ITEM` (`menu_id`, `category_id`, `name`, `price`, `is_available`) VALUES
-- อาหารเรียกน้ำย่อย (Appetizers)
('item_1', 'cat_appetizer', 'สลัดแซลมอนรมควัน', 189.00, 1),
('item_2', 'cat_appetizer', 'เกี๊ยวซ่าหมู', 129.00, 1),
('item_3', 'cat_appetizer', 'ปอเปี๊ยะทอดไส้ผัก', 99.00, 1),
('item_4', 'cat_appetizer', 'ต้มยำกุ้ง', 199.00, 1),

-- จานหลัก (Main Courses)
('item_5', 'cat_main', 'แกงเขียวหวานไก่', 169.00, 1),
('item_6', 'cat_main', 'ข้าวผัดปู', 219.00, 1),
('item_7', 'cat_main', 'กะเพราหมูสับ', 119.00, 1),
('item_8', 'cat_main', 'สเต็กเนื้อวากิว', 899.00, 1),
('item_9', 'cat_main', 'แซลมอนเทอริยากิ', 329.00, 1),
('item_10', 'cat_main', 'ผัดกระเพราทะเล', 249.00, 1),

-- ก๋วยเตี๋ยว & เส้น (Noodles)
('item_11', 'cat_noodle', 'ผัดไทยกุ้งสด', 179.00, 1),
('item_12', 'cat_noodle', 'ราเมนหมูชาชู', 229.00, 1),
('item_13', 'cat_noodle', 'บะหมี่เกี๊ยวหมูแดง', 119.00, 1),

-- ปิ้งย่าง (Grill)
('item_14', 'cat_grill', 'หมูสะเต๊ะ', 149.00, 1),
('item_15', 'cat_grill', 'ซี่โครงหมูบาร์บีคิว', 349.00, 1),
('item_16', 'cat_grill', 'ไก่ย่างจิ้มแจ่ว', 189.00, 1),

-- อาหารทะเล (Seafood)
('item_17', 'cat_seafood', 'กุ้งเผาเกลือ', 459.00, 1),
('item_18', 'cat_seafood', 'ปูนิ่มผัดผงกะหรี่', 379.00, 1),
('item_19', 'cat_seafood', 'ปลากะพงนึ่งมะนาว', 349.00, 1),

-- ของหวาน (Desserts)
('item_20', 'cat_dessert', 'ข้าวเหนียวมะม่วง', 139.00, 1),
('item_21', 'cat_dessert', 'ลาวาช็อกโกแลตเค้ก', 169.00, 1),
('item_22', 'cat_dessert', 'เครปเค้กชาเขียว', 159.00, 1),

-- เครื่องดื่ม (Drinks)
('item_23', 'cat_drink', 'ชาไทยเย็น', 69.00, 1),
('item_24', 'cat_drink', 'น้ำมะพร้าวปั่น', 89.00, 1),
('item_25', 'cat_drink', 'กาแฟลาเต้เย็น', 99.00, 1),
('item_26', 'cat_drink', 'สมูทตี้เบอร์รี่', 119.00, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `price` = VALUES(`price`), `is_available` = VALUES(`is_available`);

-- 3. โต๊ะอาหาร 1 - 10
INSERT INTO `DINING_TABLE` (`table_id`, `table_number`, `status`) VALUES
('tbl_1', '1', 'AVAILABLE'),
('tbl_2', '2', 'AVAILABLE'),
('tbl_3', '3', 'AVAILABLE'),
('tbl_4', '4', 'AVAILABLE'),
('tbl_5', '5', 'AVAILABLE'),
('tbl_6', '6', 'AVAILABLE'),
('tbl_7', '7', 'AVAILABLE'),
('tbl_8', '8', 'AVAILABLE'),
('tbl_9', '9', 'AVAILABLE'),
('tbl_10', '10', 'AVAILABLE')
ON DUPLICATE KEY UPDATE `status` = VALUES(`status`);

-- 4. ข้อมูลพนักงานตัวอย่าง (Staff)
INSERT INTO `STAFF` (`staff_id`, `name`, `role`, `pin_code`) VALUES
('staff_admin', 'ผู้จัดการร้าน', 'ADMIN', '1234'),
('staff_chef', 'เชฟสมศักดิ์', 'CHEF', '1111'),
('staff_server', 'พนักงานบริการ', 'SERVER', '2222')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- 5. ข้อมูลสมาชิกตัวอย่าง (Member)
INSERT INTO `MEMBER` (`member_id`, `phone_number`, `name`, `total_points`) VALUES
('mem_demo', '0812345678', 'สมชาย ใจดี', 150)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

