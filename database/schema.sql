-- ===================================================
-- Restaurant Management & POS Database Schema
-- Charset: utf8mb4, Collation: utf8mb4_unicode_ci
-- ===================================================

CREATE DATABASE IF NOT EXISTS `restaurant_pos` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `restaurant_pos`;

-- 1. MEMBER (สมาชิก)
CREATE TABLE IF NOT EXISTS `MEMBER` (
  `member_id` VARCHAR(36) PRIMARY KEY,
  `phone_number` VARCHAR(20) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `total_points` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. STAFF (พนักงาน)
CREATE TABLE IF NOT EXISTS `STAFF` (
  `staff_id` VARCHAR(36) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `role` ENUM('ADMIN', 'SERVER', 'CHEF', 'EXPO') NOT NULL DEFAULT 'SERVER',
  `pin_code` VARCHAR(10) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. DINING_TABLE (โต๊ะอาหาร)
CREATE TABLE IF NOT EXISTS `DINING_TABLE` (
  `table_id` VARCHAR(36) PRIMARY KEY,
  `table_number` VARCHAR(10) NOT NULL UNIQUE,
  `status` ENUM('AVAILABLE', 'OCCUPIED') NOT NULL DEFAULT 'AVAILABLE',
  `qr_token` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. MENU_CATEGORY (หมวดหมู่อาหาร)
CREATE TABLE IF NOT EXISTS `MENU_CATEGORY` (
  `category_id` VARCHAR(36) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- 5. MENU_ITEM (รายการอาหาร)
CREATE TABLE IF NOT EXISTS `MENU_ITEM` (
  `menu_id` VARCHAR(36) PRIMARY KEY,
  `category_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `is_available` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `MENU_CATEGORY` (`category_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. MODIFIER_GROUP (กลุ่มตัวเลือกเสริม)
CREATE TABLE IF NOT EXISTS `MODIFIER_GROUP` (
  `group_id` VARCHAR(36) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `is_required` TINYINT(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- 7. MENU_MODIFIER_MAPPING (Junction Table: เมนู <-> ตัวเลือก)
CREATE TABLE IF NOT EXISTS `MENU_MODIFIER_MAPPING` (
  `menu_id` VARCHAR(36) NOT NULL,
  `group_id` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`menu_id`, `group_id`),
  FOREIGN KEY (`menu_id`) REFERENCES `MENU_ITEM` (`menu_id`) ON DELETE CASCADE,
  FOREIGN KEY (`group_id`) REFERENCES `MODIFIER_GROUP` (`group_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 8. MODIFIER (ตัวเลือกเสริมแต่ละรายการ)
CREATE TABLE IF NOT EXISTS `MODIFIER` (
  `modifier_id` VARCHAR(36) PRIMARY KEY,
  `group_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `extra_price` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  FOREIGN KEY (`group_id`) REFERENCES `MODIFIER_GROUP` (`group_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 9. ORDER (คำสั่งซื้อหลัก)
CREATE TABLE IF NOT EXISTS `ORDER` (
  `order_id` VARCHAR(36) PRIMARY KEY,
  `table_id` VARCHAR(36) NULL,
  `member_id` VARCHAR(36) NULL,
  `staff_id_opened` VARCHAR(36) NULL,
  `status` ENUM('OPEN', 'CLOSED') NOT NULL DEFAULT 'OPEN',
  `net_total` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`table_id`) REFERENCES `DINING_TABLE` (`table_id`) ON DELETE SET NULL,
  FOREIGN KEY (`member_id`) REFERENCES `MEMBER` (`member_id`) ON DELETE SET NULL,
  FOREIGN KEY (`staff_id_opened`) REFERENCES `STAFF` (`staff_id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 10. ORDER_ITEM (รายการอาหารในออเดอร์)
CREATE TABLE IF NOT EXISTS `ORDER_ITEM` (
  `order_item_id` VARCHAR(36) PRIMARY KEY,
  `order_id` VARCHAR(36) NOT NULL,
  `menu_id` VARCHAR(36) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `kitchen_status` ENUM('PENDING', 'COOKING', 'READY', 'SERVED') NOT NULL DEFAULT 'PENDING',
  `is_takeaway` TINYINT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (`order_id`) REFERENCES `ORDER` (`order_id`) ON DELETE CASCADE,
  FOREIGN KEY (`menu_id`) REFERENCES `MENU_ITEM` (`menu_id`) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 11. ORDER_ITEM_MODIFIER (ตัวเลือกเสริมที่เลือกในแต่ละจาน)
CREATE TABLE IF NOT EXISTS `ORDER_ITEM_MODIFIER` (
  `order_item_modifier_id` VARCHAR(36) PRIMARY KEY,
  `order_item_id` VARCHAR(36) NOT NULL,
  `modifier_id` VARCHAR(36) NOT NULL,
  FOREIGN KEY (`order_item_id`) REFERENCES `ORDER_ITEM` (`order_item_id`) ON DELETE CASCADE,
  FOREIGN KEY (`modifier_id`) REFERENCES `MODIFIER` (`modifier_id`) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 12. PAYMENT (การชำระเงิน)
CREATE TABLE IF NOT EXISTS `PAYMENT` (
  `payment_id` VARCHAR(36) PRIMARY KEY,
  `order_id` VARCHAR(36) NOT NULL,
  `payment_method` ENUM('QR', 'CASH', 'CARD') NOT NULL DEFAULT 'QR',
  `amount` DECIMAL(10, 2) NOT NULL,
  `status` ENUM('PENDING', 'SUCCESS') NOT NULL DEFAULT 'PENDING',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `ORDER` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 13. POINT_LEDGER (สมุดบันทึกแต้มสะสม)
CREATE TABLE IF NOT EXISTS `POINT_LEDGER` (
  `ledger_id` VARCHAR(36) PRIMARY KEY,
  `member_id` VARCHAR(36) NOT NULL,
  `order_id` VARCHAR(36) NULL,
  `points_changed` INT NOT NULL,
  `transaction_type` ENUM('EARN', 'REDEEM') NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`member_id`) REFERENCES `MEMBER` (`member_id`) ON DELETE CASCADE,
  FOREIGN KEY (`order_id`) REFERENCES `ORDER` (`order_id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ===================================================
-- ข้อมูลเริ่มต้น (Sample Initial Data)
-- ===================================================

-- หมวดหมู่
INSERT IGNORE INTO `MENU_CATEGORY` (`category_id`, `name`) VALUES
('cat_appetizer', 'อาหารเรียกน้ำย่อย'),
('cat_main', 'จานหลัก'),
('cat_noodle', 'ก๋วยเตี๋ยว & เส้น'),
('cat_grill', 'ปิ้งย่าง'),
('cat_seafood', 'อาหารทะเล'),
('cat_dessert', 'ของหวาน'),
('cat_drink', 'เครื่องดื่ม');

-- โต๊ะอาหารตัวอย่าง (1-10)
INSERT IGNORE INTO `DINING_TABLE` (`table_id`, `table_number`, `status`) VALUES
(UUID(), '1', 'AVAILABLE'),
(UUID(), '2', 'AVAILABLE'),
(UUID(), '3', 'AVAILABLE'),
(UUID(), '4', 'AVAILABLE'),
(UUID(), '5', 'AVAILABLE'),
(UUID(), '6', 'AVAILABLE'),
(UUID(), '7', 'AVAILABLE'),
(UUID(), '8', 'AVAILABLE'),
(UUID(), '9', 'AVAILABLE'),
(UUID(), '10', 'AVAILABLE');

-- เมนูอาหารตัวอย่าง
INSERT IGNORE INTO `MENU_ITEM` (`menu_id`, `category_id`, `name`, `price`, `is_available`) VALUES
(UUID(), 'cat_appetizer', 'สลัดแซลมอนรมควัน', 189.00, 1),
(UUID(), 'cat_appetizer', 'เกี๊ยวซ่าหมู', 129.00, 1),
(UUID(), 'cat_appetizer', 'ต้มยำกุ้ง', 199.00, 1),
(UUID(), 'cat_main', 'แกงเขียวหวานไก่', 169.00, 1),
(UUID(), 'cat_main', 'ข้าวผัดปู', 219.00, 1),
(UUID(), 'cat_main', 'กะเพราหมูสับ', 119.00, 1),
(UUID(), 'cat_main', 'สเต็กเนื้อวากิว', 899.00, 1),
(UUID(), 'cat_noodle', 'ผัดไทยกุ้งสด', 179.00, 1),
(UUID(), 'cat_grill', 'หมูสะเต๊ะ', 149.00, 1),
(UUID(), 'cat_seafood', 'ปลากะพงนึ่งมะนาว', 349.00, 1),
(UUID(), 'cat_dessert', 'ข้าวเหนียวมะม่วง', 139.00, 1),
(UUID(), 'cat_drink', 'ชาไทยเย็น', 69.00, 1);

