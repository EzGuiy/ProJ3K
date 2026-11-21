import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
  try {
    const { default: pool } = await import('../src/lib/db.js');

    // 1. Check and add columns to dining_table
    const [cols] = await pool.query('DESCRIBE dining_table');
    const existingCols = cols.map((c) => c.Field);

    if (!existingCols.includes('pos_x')) {
      await pool.query('ALTER TABLE dining_table ADD COLUMN pos_x INT DEFAULT 50');
      console.log('Added pos_x');
    }
    if (!existingCols.includes('pos_y')) {
      await pool.query('ALTER TABLE dining_table ADD COLUMN pos_y INT DEFAULT 50');
      console.log('Added pos_y');
    }
    if (!existingCols.includes('capacity')) {
      await pool.query('ALTER TABLE dining_table ADD COLUMN capacity INT DEFAULT 4');
      console.log('Added capacity');
    }
    if (!existingCols.includes('shape')) {
      await pool.query("ALTER TABLE dining_table ADD COLUMN shape VARCHAR(20) DEFAULT 'square'");
      console.log('Added shape');
    }
    if (!existingCols.includes('zone')) {
      await pool.query("ALTER TABLE dining_table ADD COLUMN zone VARCHAR(50) DEFAULT 'MAIN'");
      console.log('Added zone');
    }
    if (!existingCols.includes('occupied_at')) {
      await pool.query("ALTER TABLE dining_table ADD COLUMN occupied_at DATETIME NULL");
      console.log('Added occupied_at');
    }

    // 2. Create restaurant_layout table for blueprint metadata and landmarks
    await pool.query(`
      CREATE TABLE IF NOT EXISTS restaurant_layout (
        layout_id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) DEFAULT 'Main Dining Hall',
        width INT DEFAULT 900,
        height INT DEFAULT 600,
        entrance_position VARCHAR(20) DEFAULT 'BOTTOM',
        landmarks JSON NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Created or verified restaurant_layout table');

    // 3. Insert or update default layout settings if not present
    const defaultLandmarks = JSON.stringify([
      { id: 'lm-entrance', type: 'ENTRANCE', label: '🚪 ทางเข้าร้าน (หน้าร้าน)', x: 350, y: 520, width: 200, height: 50 },
      { id: 'lm-cashier', type: 'CASHIER', label: '💵 แคชเชียร์ & บาร์น้ำ', x: 680, y: 480, width: 160, height: 70 },
      { id: 'lm-kitchen', type: 'KITCHEN', label: '🍳 ครัวหลัก & จุดรับอาหาร', x: 300, y: 20, width: 300, height: 60 },
      { id: 'lm-restroom', type: 'RESTROOM', label: '🚻 ห้องน้ำ', x: 40, y: 20, width: 120, height: 50 },
    ]);

    const [existingLayout] = await pool.query('SELECT layout_id FROM restaurant_layout WHERE layout_id = "default"');
    if (existingLayout.length === 0) {
      await pool.query(
        `INSERT INTO restaurant_layout (layout_id, name, width, height, entrance_position, landmarks)
         VALUES ('default', 'ห้องอาหารหลัก (Main Hall)', 920, 620, 'BOTTOM', ?)`,
        [defaultLandmarks]
      );
      console.log('Inserted default restaurant_layout');
    }

    // 4. Set initial clean positions for tables 1-10 if they are all at 0 or 50
    const [tables] = await pool.query('SELECT table_id, table_name_or_number, pos_x, pos_y FROM dining_table ORDER BY CAST(table_name_or_number AS UNSIGNED) ASC');
    const allAtInitial = tables.every((t) => t.pos_x === 0 || t.pos_x === 50 || t.pos_x == null);
    
    if (allAtInitial) {
      console.log('Seeding initial blueprint coordinates for tables...');
      // 2 columns of tables:
      // Left side: Table 1-5 (x: 120, y: 120, 200, 280, 360, 440)
      // Right side: Table 6-10 (x: 520, y: 120, 200, 280, 360, 440)
      for (let i = 0; i < tables.length; i++) {
        const t = tables[i];
        const num = parseInt(t.table_name_or_number) || (i + 1);
        let x = 120;
        let y = 140;
        let capacity = 4;
        let shape = 'square';

        if (num <= 5) {
          x = 100 + ((num - 1) % 2) * 160;
          y = 130 + Math.floor((num - 1) / 2) * 110;
        } else {
          x = 520 + ((num - 6) % 2) * 160;
          y = 130 + Math.floor((num - 6) / 2) * 110;
        }

        // Table 5 and 10 bigger tables (capacity 6)
        if (num === 5 || num === 10) {
          capacity = 6;
          shape = 'rectangle';
        }

        await pool.query(
          'UPDATE dining_table SET pos_x = ?, pos_y = ?, capacity = ?, shape = ? WHERE table_id = ?',
          [x, y, capacity, shape, t.table_id]
        );
      }
      console.log('Seeded coordinates for', tables.length, 'tables');
    }

    const [finalCols] = await pool.query('DESCRIBE dining_table');
    console.log('dining_table columns now:', finalCols.map((c) => c.Field));
  } catch (err) {
    console.error('Error in init-table-layout:', err);
  } finally {
    process.exit(0);
  }
}

main();
