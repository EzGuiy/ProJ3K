-- ===================================================
-- Seed data สำหรับ restaurant_pos
-- สร้างจาก frontend/src/lib/menu.js (อัปเดตอัตโนมัติได้ด้วย temp/gen-seed.mjs)
-- ใช้: mysql -u root -p < database/seed.sql   (ไม่ต้องเลือก database ก่อน)
-- ปลอดภัยต่อการรันซ้ำ (upsert ตาม primary key)
-- ===================================================

SET NAMES utf8mb4;
CREATE DATABASE IF NOT EXISTS `restaurant_pos`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `restaurant_pos`;

-- 1) หมวดหมู่เมนู
INSERT INTO `menu_category` (`category_id`, `name`, `sort_order`) VALUES ('cat_appetizer', 'อาหารเรียกน้ำย่อย', 1)
ON DUPLICATE KEY UPDATE
  `name` = 'อาหารเรียกน้ำย่อย',
  `sort_order` = 1;

INSERT INTO `menu_category` (`category_id`, `name`, `sort_order`) VALUES ('cat_main', 'จานหลัก', 2)
ON DUPLICATE KEY UPDATE
  `name` = 'จานหลัก',
  `sort_order` = 2;

INSERT INTO `menu_category` (`category_id`, `name`, `sort_order`) VALUES ('cat_noodle', 'ก๋วยเตี๋ยว & เส้น', 3)
ON DUPLICATE KEY UPDATE
  `name` = 'ก๋วยเตี๋ยว & เส้น',
  `sort_order` = 3;

INSERT INTO `menu_category` (`category_id`, `name`, `sort_order`) VALUES ('cat_grill', 'ปิ้งย่าง', 4)
ON DUPLICATE KEY UPDATE
  `name` = 'ปิ้งย่าง',
  `sort_order` = 4;

INSERT INTO `menu_category` (`category_id`, `name`, `sort_order`) VALUES ('cat_seafood', 'อาหารทะเล', 5)
ON DUPLICATE KEY UPDATE
  `name` = 'อาหารทะเล',
  `sort_order` = 5;

INSERT INTO `menu_category` (`category_id`, `name`, `sort_order`) VALUES ('cat_dessert', 'ของหวาน', 6)
ON DUPLICATE KEY UPDATE
  `name` = 'ของหวาน',
  `sort_order` = 6;

INSERT INTO `menu_category` (`category_id`, `name`, `sort_order`) VALUES ('cat_drink', 'เครื่องดื่ม', 7)
ON DUPLICATE KEY UPDATE
  `name` = 'เครื่องดื่ม',
  `sort_order` = 7;

-- 2) โต๊ะอาหาร 1-12
INSERT INTO `dining_table` (`table_id`, `table_name_or_number`, `status`) VALUES ('tbl_001', '1', 'AVAILABLE')
ON DUPLICATE KEY UPDATE
  `table_name_or_number` = '1',
  `status` = 'AVAILABLE';

INSERT INTO `dining_table` (`table_id`, `table_name_or_number`, `status`) VALUES ('tbl_002', '2', 'AVAILABLE')
ON DUPLICATE KEY UPDATE
  `table_name_or_number` = '2',
  `status` = 'AVAILABLE';

INSERT INTO `dining_table` (`table_id`, `table_name_or_number`, `status`) VALUES ('tbl_003', '3', 'AVAILABLE')
ON DUPLICATE KEY UPDATE
  `table_name_or_number` = '3',
  `status` = 'AVAILABLE';

INSERT INTO `dining_table` (`table_id`, `table_name_or_number`, `status`) VALUES ('tbl_004', '4', 'AVAILABLE')
ON DUPLICATE KEY UPDATE
  `table_name_or_number` = '4',
  `status` = 'AVAILABLE';

INSERT INTO `dining_table` (`table_id`, `table_name_or_number`, `status`) VALUES ('tbl_005', '5', 'AVAILABLE')
ON DUPLICATE KEY UPDATE
  `table_name_or_number` = '5',
  `status` = 'AVAILABLE';

INSERT INTO `dining_table` (`table_id`, `table_name_or_number`, `status`) VALUES ('tbl_006', '6', 'AVAILABLE')
ON DUPLICATE KEY UPDATE
  `table_name_or_number` = '6',
  `status` = 'AVAILABLE';

INSERT INTO `dining_table` (`table_id`, `table_name_or_number`, `status`) VALUES ('tbl_007', '7', 'AVAILABLE')
ON DUPLICATE KEY UPDATE
  `table_name_or_number` = '7',
  `status` = 'AVAILABLE';

INSERT INTO `dining_table` (`table_id`, `table_name_or_number`, `status`) VALUES ('tbl_008', '8', 'AVAILABLE')
ON DUPLICATE KEY UPDATE
  `table_name_or_number` = '8',
  `status` = 'AVAILABLE';

INSERT INTO `dining_table` (`table_id`, `table_name_or_number`, `status`) VALUES ('tbl_009', '9', 'AVAILABLE')
ON DUPLICATE KEY UPDATE
  `table_name_or_number` = '9',
  `status` = 'AVAILABLE';

INSERT INTO `dining_table` (`table_id`, `table_name_or_number`, `status`) VALUES ('tbl_010', '10', 'AVAILABLE')
ON DUPLICATE KEY UPDATE
  `table_name_or_number` = '10',
  `status` = 'AVAILABLE';

INSERT INTO `dining_table` (`table_id`, `table_name_or_number`, `status`) VALUES ('tbl_011', '11', 'AVAILABLE')
ON DUPLICATE KEY UPDATE
  `table_name_or_number` = '11',
  `status` = 'AVAILABLE';

INSERT INTO `dining_table` (`table_id`, `table_name_or_number`, `status`) VALUES ('tbl_012', '12', 'AVAILABLE')
ON DUPLICATE KEY UPDATE
  `table_name_or_number` = '12',
  `status` = 'AVAILABLE';

-- 3) สเตชั่นครัว (KDS)
INSERT INTO `kitchen_station` (`station_code`, `name`, `icon`, `description`) VALUES ('MAIN', 'จานหลัก', '🍳', 'อาหารจานหลัก ผัด ทอด และเมนูร้อน')
ON DUPLICATE KEY UPDATE
  `name` = 'จานหลัก',
  `icon` = '🍳',
  `description` = 'อาหารจานหลัก ผัด ทอด และเมนูร้อน';

INSERT INTO `kitchen_station` (`station_code`, `name`, `icon`, `description`) VALUES ('GRILL', 'ปิ้งย่าง', '🔥', 'ปิ้งย่าง เตาถ่าน และอาหารทะเลย่าง')
ON DUPLICATE KEY UPDATE
  `name` = 'ปิ้งย่าง',
  `icon` = '🔥',
  `description` = 'ปิ้งย่าง เตาถ่าน และอาหารทะเลย่าง';

INSERT INTO `kitchen_station` (`station_code`, `name`, `icon`, `description`) VALUES ('NOODLE', 'เส้น & ก๋วยเตี๋ยว', '🍜', 'ก๋วยเตี๋ยว ผัดไทย และราเมน')
ON DUPLICATE KEY UPDATE
  `name` = 'เส้น & ก๋วยเตี๋ยว',
  `icon` = '🍜',
  `description` = 'ก๋วยเตี๋ยว ผัดไทย และราเมน';

INSERT INTO `kitchen_station` (`station_code`, `name`, `icon`, `description`) VALUES ('APPETIZER', 'อาหารเรียกน้ำย่อย', '🥗', 'สลัด ของทอด และต้มยำ')
ON DUPLICATE KEY UPDATE
  `name` = 'อาหารเรียกน้ำย่อย',
  `icon` = '🥗',
  `description` = 'สลัด ของทอด และต้มยำ';

INSERT INTO `kitchen_station` (`station_code`, `name`, `icon`, `description`) VALUES ('DESSERT', 'ของหวาน & เครื่องดื่ม', '🍰', 'ของหวาน เครื่องดื่ม ชา กาแฟ')
ON DUPLICATE KEY UPDATE
  `name` = 'ของหวาน & เครื่องดื่ม',
  `icon` = '🍰',
  `description` = 'ของหวาน เครื่องดื่ม ชา กาแฟ';

-- 4) พนักงาน
INSERT INTO `staff` (`staff_id`, `name`, `role`, `pin_code`, `is_active`) VALUES ('staff_admin', 'ผู้จัดการร้าน', 'ADMIN', '0001', 1)
ON DUPLICATE KEY UPDATE
  `name` = 'ผู้จัดการร้าน',
  `role` = 'ADMIN',
  `pin_code` = '0001',
  `is_active` = 1;

INSERT INTO `staff` (`staff_id`, `name`, `role`, `pin_code`, `is_active`) VALUES ('staff_server1', 'พนักงานเสิร์ฟ 1', 'SERVER', '1111', 1)
ON DUPLICATE KEY UPDATE
  `name` = 'พนักงานเสิร์ฟ 1',
  `role` = 'SERVER',
  `pin_code` = '1111',
  `is_active` = 1;

INSERT INTO `staff` (`staff_id`, `name`, `role`, `pin_code`, `is_active`) VALUES ('staff_server2', 'พนักงานเสิร์ฟ 2', 'SERVER', '2222', 1)
ON DUPLICATE KEY UPDATE
  `name` = 'พนักงานเสิร์ฟ 2',
  `role` = 'SERVER',
  `pin_code` = '2222',
  `is_active` = 1;

INSERT INTO `staff` (`staff_id`, `name`, `role`, `pin_code`, `is_active`) VALUES ('staff_chef1', 'เชฟสมชาย', 'CHEF', '3333', 1)
ON DUPLICATE KEY UPDATE
  `name` = 'เชฟสมชาย',
  `role` = 'CHEF',
  `pin_code` = '3333',
  `is_active` = 1;

INSERT INTO `staff` (`staff_id`, `name`, `role`, `pin_code`, `is_active`) VALUES ('staff_chef2', 'เชฟสมหญิง', 'CHEF', '4444', 1)
ON DUPLICATE KEY UPDATE
  `name` = 'เชฟสมหญิง',
  `role` = 'CHEF',
  `pin_code` = '4444',
  `is_active` = 1;

INSERT INTO `staff` (`staff_id`, `name`, `role`, `pin_code`, `is_active`) VALUES ('staff_expo1', 'เอ็กซ์โป (คนคุมออเดอร์)', 'EXPO', '5555', 1)
ON DUPLICATE KEY UPDATE
  `name` = 'เอ็กซ์โป (คนคุมออเดอร์)',
  `role` = 'EXPO',
  `pin_code` = '5555',
  `is_active` = 1;

-- 5) สมาชิกตัวอย่าง
INSERT INTO `member` (`member_id`, `phone_number`, `name`, `total_points`) VALUES ('mem_001', '0812345678', 'คุณสมชาย ใจดี', 120)
ON DUPLICATE KEY UPDATE
  `phone_number` = '0812345678',
  `name` = 'คุณสมชาย ใจดี',
  `total_points` = 120;

INSERT INTO `member` (`member_id`, `phone_number`, `name`, `total_points`) VALUES ('mem_002', '0898765432', 'คุณสมหญิง รักอาหาร', 45)
ON DUPLICATE KEY UPDATE
  `phone_number` = '0898765432',
  `name` = 'คุณสมหญิง รักอาหาร',
  `total_points` = 45;

-- 6) เมนูอาหาร
INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_1', 'cat_appetizer', 'สลัดแซลมอนรมควัน', 'Smoked Salmon Salad', 'สลัดผักสดกับแซลมอนรมควัน ราดซอสมะนาวน้ำผึ้ง', 189, '', 1, 0, 1)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_appetizer',
  `name` = 'สลัดแซลมอนรมควัน',
  `name_en` = 'Smoked Salmon Salad',
  `description` = 'สลัดผักสดกับแซลมอนรมควัน ราดซอสมะนาวน้ำผึ้ง',
  `price` = 189,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 1;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_2', 'cat_appetizer', 'เกี๊ยวซ่าหมู', 'Pork Gyoza', 'เกี๊ยวซ่าไส้หมูสับเนื้อแน่น ทอดกรอบ เสิร์ฟพร้อมซอสพอนซึ', 129, '', 1, 0, 0)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_appetizer',
  `name` = 'เกี๊ยวซ่าหมู',
  `name_en` = 'Pork Gyoza',
  `description` = 'เกี๊ยวซ่าไส้หมูสับเนื้อแน่น ทอดกรอบ เสิร์ฟพร้อมซอสพอนซึ',
  `price` = 129,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 0;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_3', 'cat_appetizer', 'ปอเปี๊ยะทอดไส้ผัก', 'Vegetable Spring Rolls', 'ปอเปี๊ยะทอดกรอบไส้ผักรวม เสิร์ฟพร้อมซอสบ๊วย', 99, '', 1, 0, 0)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_appetizer',
  `name` = 'ปอเปี๊ยะทอดไส้ผัก',
  `name_en` = 'Vegetable Spring Rolls',
  `description` = 'ปอเปี๊ยะทอดกรอบไส้ผักรวม เสิร์ฟพร้อมซอสบ๊วย',
  `price` = 99,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 0;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_4', 'cat_appetizer', 'ต้มยำกุ้ง', 'Tom Yum Goong', 'ต้มยำกุ้งน้ำข้น รสเข้มข้น เต็มไปด้วยกุ้งสดและเห็ด', 199, '', 1, 3, 1)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_appetizer',
  `name` = 'ต้มยำกุ้ง',
  `name_en` = 'Tom Yum Goong',
  `description` = 'ต้มยำกุ้งน้ำข้น รสเข้มข้น เต็มไปด้วยกุ้งสดและเห็ด',
  `price` = 199,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 3,
  `is_popular` = 1;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_5', 'cat_main', 'แกงเขียวหวานไก่', 'Green Curry Chicken', 'แกงเขียวหวานไก่หอมมะพร้าวกะทิ เสิร์ฟพร้อมข้าวหอมมะลิ', 169, '', 1, 2, 1)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_main',
  `name` = 'แกงเขียวหวานไก่',
  `name_en` = 'Green Curry Chicken',
  `description` = 'แกงเขียวหวานไก่หอมมะพร้าวกะทิ เสิร์ฟพร้อมข้าวหอมมะลิ',
  `price` = 169,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 2,
  `is_popular` = 1;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_6', 'cat_main', 'ข้าวผัดปู', 'Crab Fried Rice', 'ข้าวผัดเนื้อปูก้อนใหญ่ ผัดกับไข่และผักสด', 219, '', 1, 0, 1)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_main',
  `name` = 'ข้าวผัดปู',
  `name_en` = 'Crab Fried Rice',
  `description` = 'ข้าวผัดเนื้อปูก้อนใหญ่ ผัดกับไข่และผักสด',
  `price` = 219,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 1;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_7', 'cat_main', 'กะเพราหมูสับ', 'Basil Minced Pork', 'กะเพราหมูสับผัดกรอบ ไข่ดาว เสิร์ฟพร้อมข้าวสวย', 119, '', 1, 2, 1)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_main',
  `name` = 'กะเพราหมูสับ',
  `name_en` = 'Basil Minced Pork',
  `description` = 'กะเพราหมูสับผัดกรอบ ไข่ดาว เสิร์ฟพร้อมข้าวสวย',
  `price` = 119,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 2,
  `is_popular` = 1;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_8', 'cat_main', 'สเต็กเนื้อวากิว', 'Wagyu Beef Steak', 'สเต็กเนื้อวากิว A5 ย่างระดับ Medium Rare พร้อมซอสพริกไทยดำ', 899, '', 1, 0, 0)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_main',
  `name` = 'สเต็กเนื้อวากิว',
  `name_en` = 'Wagyu Beef Steak',
  `description` = 'สเต็กเนื้อวากิว A5 ย่างระดับ Medium Rare พร้อมซอสพริกไทยดำ',
  `price` = 899,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 0;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_9', 'cat_main', 'แซลมอนเทอริยากิ', 'Teriyaki Salmon', 'แซลมอนย่างซอสเทอริยากิ เสิร์ฟพร้อมข้าวญี่ปุ่นและผักต้ม', 329, '', 1, 0, 0)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_main',
  `name` = 'แซลมอนเทอริยากิ',
  `name_en` = 'Teriyaki Salmon',
  `description` = 'แซลมอนย่างซอสเทอริยากิ เสิร์ฟพร้อมข้าวญี่ปุ่นและผักต้ม',
  `price` = 329,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 0;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_10', 'cat_main', 'ผัดกระเพราทะเล', 'Spicy Seafood Basil', 'ผัดกระเพราทะเลรวม กุ้ง หมึก หอย พริกสด', 249, '', 1, 3, 0)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_main',
  `name` = 'ผัดกระเพราทะเล',
  `name_en` = 'Spicy Seafood Basil',
  `description` = 'ผัดกระเพราทะเลรวม กุ้ง หมึก หอย พริกสด',
  `price` = 249,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 3,
  `is_popular` = 0;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_11', 'cat_noodle', 'ผัดไทยกุ้งสด', 'Pad Thai with Shrimp', 'ผัดไทยเส้นจันท์กุ้งสดตัวใหญ่ โรยถั่วป่นและมะนาว', 179, '', 1, 1, 1)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_noodle',
  `name` = 'ผัดไทยกุ้งสด',
  `name_en` = 'Pad Thai with Shrimp',
  `description` = 'ผัดไทยเส้นจันท์กุ้งสดตัวใหญ่ โรยถั่วป่นและมะนาว',
  `price` = 179,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 1,
  `is_popular` = 1;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_12', 'cat_noodle', 'ราเมนหมูชาชู', 'Chashu Pork Ramen', 'ราเมนน้ำซุปกระดูกเข้มข้น หมูชาชูนุ่ม ไข่ยางมะตูม', 229, '', 1, 0, 1)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_noodle',
  `name` = 'ราเมนหมูชาชู',
  `name_en` = 'Chashu Pork Ramen',
  `description` = 'ราเมนน้ำซุปกระดูกเข้มข้น หมูชาชูนุ่ม ไข่ยางมะตูม',
  `price` = 229,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 1;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_13', 'cat_noodle', 'บะหมี่เกี๊ยวหมูแดง', 'Red Pork Wonton Noodle', 'บะหมี่เหนียวนุ่มกับหมูแดงหอมเครื่องเทศ เกี๊ยวกุ้งสด', 119, '', 1, 0, 0)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_noodle',
  `name` = 'บะหมี่เกี๊ยวหมูแดง',
  `name_en` = 'Red Pork Wonton Noodle',
  `description` = 'บะหมี่เหนียวนุ่มกับหมูแดงหอมเครื่องเทศ เกี๊ยวกุ้งสด',
  `price` = 119,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 0;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_14', 'cat_grill', 'หมูสะเต๊ะ', 'Pork Satay', 'หมูสะเต๊ะย่างหอม 8 ไม้ พร้อมซอสถั่วและอาจาด', 149, '', 1, 0, 1)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_grill',
  `name` = 'หมูสะเต๊ะ',
  `name_en` = 'Pork Satay',
  `description` = 'หมูสะเต๊ะย่างหอม 8 ไม้ พร้อมซอสถั่วและอาจาด',
  `price` = 149,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 1;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_15', 'cat_grill', 'ซี่โครงหมูบาร์บีคิว', 'BBQ Pork Ribs', 'ซี่โครงหมูย่างซอส BBQ สูตรเด็ด เนื้อนุ่มหลุดกระดูก', 349, '', 1, 0, 0)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_grill',
  `name` = 'ซี่โครงหมูบาร์บีคิว',
  `name_en` = 'BBQ Pork Ribs',
  `description` = 'ซี่โครงหมูย่างซอส BBQ สูตรเด็ด เนื้อนุ่มหลุดกระดูก',
  `price` = 349,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 0;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_16', 'cat_grill', 'ไก่ย่างจิ้มแจ่ว', 'Grilled Chicken Jim Jaew', 'ไก่ย่างหอมถ่าน เสิร์ฟพร้อมน้ำจิ้มแจ่วรสเด็ด ข้าวเหนียว', 189, '', 1, 1, 1)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_grill',
  `name` = 'ไก่ย่างจิ้มแจ่ว',
  `name_en` = 'Grilled Chicken Jim Jaew',
  `description` = 'ไก่ย่างหอมถ่าน เสิร์ฟพร้อมน้ำจิ้มแจ่วรสเด็ด ข้าวเหนียว',
  `price` = 189,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 1,
  `is_popular` = 1;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_17', 'cat_seafood', 'กุ้งเผาเกลือ', 'Salt-Grilled Prawns', 'กุ้งแม่น้ำตัวใหญ่เผาเกลือ เสิร์ฟพร้อมซอสซีฟู้ด', 459, '', 1, 0, 0)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_seafood',
  `name` = 'กุ้งเผาเกลือ',
  `name_en` = 'Salt-Grilled Prawns',
  `description` = 'กุ้งแม่น้ำตัวใหญ่เผาเกลือ เสิร์ฟพร้อมซอสซีฟู้ด',
  `price` = 459,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 0;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_18', 'cat_seafood', 'ปูนิ่มผัดผงกะหรี่', 'Curry Soft Shell Crab', 'ปูนิ่มทอดกรอบผัดผงกะหรี่ หอมเครื่องเทศ', 379, '', 1, 1, 1)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_seafood',
  `name` = 'ปูนิ่มผัดผงกะหรี่',
  `name_en` = 'Curry Soft Shell Crab',
  `description` = 'ปูนิ่มทอดกรอบผัดผงกะหรี่ หอมเครื่องเทศ',
  `price` = 379,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 1,
  `is_popular` = 1;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_19', 'cat_seafood', 'ปลากะพงนึ่งมะนาว', 'Steamed Sea Bass with Lime', 'ปลากะพงนึ่งมะนาวสด รสจัดจ้าน เนื้อปลาแน่นหวาน', 349, '', 1, 3, 0)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_seafood',
  `name` = 'ปลากะพงนึ่งมะนาว',
  `name_en` = 'Steamed Sea Bass with Lime',
  `description` = 'ปลากะพงนึ่งมะนาวสด รสจัดจ้าน เนื้อปลาแน่นหวาน',
  `price` = 349,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 3,
  `is_popular` = 0;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_20', 'cat_dessert', 'ข้าวเหนียวมะม่วง', 'Mango Sticky Rice', 'ข้าวเหนียวมูลนุ่มราดกะทิ พร้อมมะม่วงน้ำดอกไม้สุก', 139, '', 1, 0, 1)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_dessert',
  `name` = 'ข้าวเหนียวมะม่วง',
  `name_en` = 'Mango Sticky Rice',
  `description` = 'ข้าวเหนียวมูลนุ่มราดกะทิ พร้อมมะม่วงน้ำดอกไม้สุก',
  `price` = 139,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 1;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_21', 'cat_dessert', 'ลาวาช็อกโกแลตเค้ก', 'Chocolate Lava Cake', 'ช็อกโกแลตลาวาเค้กร้อนๆ ไหลทะลัก เสิร์ฟพร้อมไอศกรีมวานิลลา', 169, '', 1, 0, 0)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_dessert',
  `name` = 'ลาวาช็อกโกแลตเค้ก',
  `name_en` = 'Chocolate Lava Cake',
  `description` = 'ช็อกโกแลตลาวาเค้กร้อนๆ ไหลทะลัก เสิร์ฟพร้อมไอศกรีมวานิลลา',
  `price` = 169,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 0;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_22', 'cat_dessert', 'เครปเค้กชาเขียว', 'Matcha Crepe Cake', 'เครปเค้กชาเขียวมัทฉะ ชั้นนุ่มละมุน หวานน้อย', 159, '', 1, 0, 0)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_dessert',
  `name` = 'เครปเค้กชาเขียว',
  `name_en` = 'Matcha Crepe Cake',
  `description` = 'เครปเค้กชาเขียวมัทฉะ ชั้นนุ่มละมุน หวานน้อย',
  `price` = 159,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 0;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_23', 'cat_drink', 'ชาไทยเย็น', 'Thai Iced Tea', 'ชาไทยเย็นหอมหวานมัน สูตรต้นตำรับ', 69, '', 1, 0, 1)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_drink',
  `name` = 'ชาไทยเย็น',
  `name_en` = 'Thai Iced Tea',
  `description` = 'ชาไทยเย็นหอมหวานมัน สูตรต้นตำรับ',
  `price` = 69,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 1;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_24', 'cat_drink', 'น้ำมะพร้าวปั่น', 'Coconut Smoothie', 'น้ำมะพร้าวปั่นเย็นๆ สดชื่น ใส่เนื้อมะพร้าวอ่อน', 89, '', 1, 0, 0)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_drink',
  `name` = 'น้ำมะพร้าวปั่น',
  `name_en` = 'Coconut Smoothie',
  `description` = 'น้ำมะพร้าวปั่นเย็นๆ สดชื่น ใส่เนื้อมะพร้าวอ่อน',
  `price` = 89,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 0;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_25', 'cat_drink', 'กาแฟลาเต้เย็น', 'Iced Café Latte', 'กาแฟลาเต้เย็น ใช้เมล็ดอาราบิก้าคั่วกลาง', 99, '', 1, 0, 0)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_drink',
  `name` = 'กาแฟลาเต้เย็น',
  `name_en` = 'Iced Café Latte',
  `description` = 'กาแฟลาเต้เย็น ใช้เมล็ดอาราบิก้าคั่วกลาง',
  `price` = 99,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 0;

INSERT INTO `menu_item` (`menu_id`, `category_id`, `name`, `name_en`, `description`, `price`, `image_url`, `is_available`, `spicy_level`, `is_popular`) VALUES ('menu_26', 'cat_drink', 'สมูทตี้เบอร์รี่', 'Mixed Berry Smoothie', 'สมูทตี้เบอร์รี่รวม สตรอว์เบอร์รี่ บลูเบอร์รี่ ราสเบอร์รี่', 119, '', 1, 0, 0)
ON DUPLICATE KEY UPDATE
  `category_id` = 'cat_drink',
  `name` = 'สมูทตี้เบอร์รี่',
  `name_en` = 'Mixed Berry Smoothie',
  `description` = 'สมูทตี้เบอร์รี่รวม สตรอว์เบอร์รี่ บลูเบอร์รี่ ราสเบอร์รี่',
  `price` = 119,
  `image_url` = '',
  `is_available` = 1,
  `spicy_level` = 0,
  `is_popular` = 0;
