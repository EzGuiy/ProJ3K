-- ===================================================
-- Restaurant POS — MySQL Schema (ตรงกับโค้ด frontend/src/app/api ปัจจุบัน)
-- Charset: utf8mb4 / utf8mb4_unicode_ci
-- ใช้: mysql -u root -p < database/schema.sql
-- ===================================================

SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS `restaurant_pos`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `restaurant_pos`;

CREATE TABLE IF NOT EXISTS `app_settings` (
  `setting_key` VARCHAR(32) NOT NULL,
  `settings_json` JSON NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ปิด FK ชั่วคราวเพื่อให้สร้างตารางซ้ำได้โดยไม่ชนลำดับ dependency
SET FOREIGN_KEY_CHECKS = 0;

-- 1. MENU_CATEGORY
CREATE TABLE IF NOT EXISTS `menu_category` (
  `category_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`category_id`),
  KEY `idx_menu_category_sort` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. MENU_ITEM
CREATE TABLE IF NOT EXISTS `menu_item` (
  `menu_id` VARCHAR(36) NOT NULL,
  `category_id` VARCHAR(36) NULL,
  `name` VARCHAR(150) NOT NULL,
  `name_en` VARCHAR(150) DEFAULT '',
  `description` TEXT NULL,
  `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `image_url` VARCHAR(255) DEFAULT '',
  `is_available` TINYINT NOT NULL DEFAULT 1,
  `spicy_level` INT NOT NULL DEFAULT 0,
  `is_popular` TINYINT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`menu_id`),
  KEY `idx_menu_item_category` (`category_id`),
  CONSTRAINT `fk_menu_item_category` FOREIGN KEY (`category_id`)
    REFERENCES `menu_category` (`category_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. STAFF
CREATE TABLE IF NOT EXISTS `staff` (
  `staff_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `role` ENUM('ADMIN','SERVER','CHEF','EXPO') NOT NULL DEFAULT 'SERVER',
  `pin_code` VARCHAR(10) NULL,
  `is_active` TINYINT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`staff_id`),
  KEY `idx_staff_role` (`role`, `is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. MEMBER
CREATE TABLE IF NOT EXISTS `member` (
  `member_id` VARCHAR(36) NOT NULL,
  `phone_number` VARCHAR(20) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `total_points` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `uq_member_phone` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. DINING_TABLE
CREATE TABLE IF NOT EXISTS `dining_table` (
  `table_id` VARCHAR(36) NOT NULL,
  `table_name_or_number` VARCHAR(20) NOT NULL,
  `status` ENUM('AVAILABLE','RESERVED','OCCUPIED') NOT NULL DEFAULT 'AVAILABLE',
  `current_order_id` VARCHAR(36) NULL,
  `qr_token` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`table_id`),
  UNIQUE KEY `uq_dining_table_number` (`table_name_or_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. ORDERS
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` VARCHAR(36) NOT NULL,
  `table_id` VARCHAR(36) NULL,
  `member_id` VARCHAR(36) NULL,
  `staff_id_opened` VARCHAR(36) NULL,
  `status` ENUM('OPEN','CLOSED') NOT NULL DEFAULT 'OPEN',
  `subtotal` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `discount_amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `net_total` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `note` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `idx_orders_table` (`table_id`),
  KEY `idx_orders_status_created` (`status`, `created_at`),
  KEY `idx_orders_created` (`created_at`),
  CONSTRAINT `fk_orders_table` FOREIGN KEY (`table_id`)
    REFERENCES `dining_table` (`table_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_orders_member` FOREIGN KEY (`member_id`)
    REFERENCES `member` (`member_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_orders_staff` FOREIGN KEY (`staff_id_opened`)
    REFERENCES `staff` (`staff_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. ORDER_ITEM
CREATE TABLE IF NOT EXISTS `order_item` (
  `order_item_id` VARCHAR(36) NOT NULL,
  `order_id` VARCHAR(36) NOT NULL,
  `menu_id` VARCHAR(36) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `unit_price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `kitchen_status` ENUM('PENDING','COOKING','READY','SERVED') NOT NULL DEFAULT 'PENDING',
  `station_code` VARCHAR(20) NULL,
  `quality_checked` TINYINT NOT NULL DEFAULT 0,
  `is_takeaway` TINYINT NOT NULL DEFAULT 0,
  `dispatched` TINYINT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_item_id`),
  KEY `idx_order_item_order` (`order_id`),
  KEY `idx_order_item_station` (`station_code`, `kitchen_status`),
  CONSTRAINT `fk_order_item_order` FOREIGN KEY (`order_id`)
    REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_order_item_menu` FOREIGN KEY (`menu_id`)
    REFERENCES `menu_item` (`menu_id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. MODIFIER_GROUP / MODIFIER / ORDER_ITEM_MODIFIER
CREATE TABLE IF NOT EXISTS `modifier_group` (
  `group_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `is_required` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `modifier` (
  `modifier_id` VARCHAR(36) NOT NULL,
  `group_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `extra_price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`modifier_id`),
  KEY `idx_modifier_group` (`group_id`),
  CONSTRAINT `fk_modifier_group` FOREIGN KEY (`group_id`)
    REFERENCES `modifier_group` (`group_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `order_item_modifier` (
  `order_item_modifier_id` VARCHAR(36) NOT NULL,
  `order_item_id` VARCHAR(36) NOT NULL,
  `modifier_id` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`order_item_modifier_id`),
  KEY `idx_oim_item` (`order_item_id`),
  CONSTRAINT `fk_oim_item` FOREIGN KEY (`order_item_id`)
    REFERENCES `order_item` (`order_item_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_oim_modifier` FOREIGN KEY (`modifier_id`)
    REFERENCES `modifier` (`modifier_id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. PAYMENT
CREATE TABLE IF NOT EXISTS `payment` (
  `payment_id` VARCHAR(36) NOT NULL,
  `order_id` VARCHAR(36) NOT NULL,
  `payment_method` ENUM('QR','CASH','CARD') NOT NULL DEFAULT 'QR',
  `amount` DECIMAL(10,2) NOT NULL,
  `status` ENUM('PENDING','SUCCESS') NOT NULL DEFAULT 'PENDING',
  `paid_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `idx_payment_order` (`order_id`),
  CONSTRAINT `fk_payment_order` FOREIGN KEY (`order_id`)
    REFERENCES `orders` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. POINT_LEDGER
CREATE TABLE IF NOT EXISTS `point_ledger` (
  `ledger_id` VARCHAR(36) NOT NULL,
  `member_id` VARCHAR(36) NOT NULL,
  `order_id` VARCHAR(36) NULL,
  `points_changed` INT NOT NULL,
  `transaction_type` ENUM('EARN','REDEEM') NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ledger_id`),
  KEY `idx_point_ledger_member` (`member_id`),
  CONSTRAINT `fk_point_ledger_member` FOREIGN KEY (`member_id`)
    REFERENCES `member` (`member_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_point_ledger_order` FOREIGN KEY (`order_id`)
    REFERENCES `orders` (`order_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. KITCHEN_STATION
CREATE TABLE IF NOT EXISTS `kitchen_station` (
  `station_code` VARCHAR(20) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `icon` VARCHAR(50) DEFAULT '',
  `description` VARCHAR(255) DEFAULT '',
  PRIMARY KEY (`station_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. KITCHEN_SHIFT
CREATE TABLE IF NOT EXISTS `kitchen_shift` (
  `shift_id` VARCHAR(36) NOT NULL,
  `staff_id` VARCHAR(36) NOT NULL,
  `station_code` VARCHAR(20) NOT NULL,
  `started_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ended_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`shift_id`),
  KEY `idx_kitchen_shift_station` (`station_code`, `ended_at`),
  KEY `idx_kitchen_shift_staff` (`staff_id`, `ended_at`),
  CONSTRAINT `fk_kitchen_shift_staff` FOREIGN KEY (`staff_id`)
    REFERENCES `staff` (`staff_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_kitchen_shift_station` FOREIGN KEY (`station_code`)
    REFERENCES `kitchen_station` (`station_code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
