import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
  try {
    const { default: pool } = await import('../src/lib/db.js');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reservation (
        reservation_id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        party_size INT NOT NULL DEFAULT 2,
        booking_date DATE NOT NULL,
        booking_time VARCHAR(10) NOT NULL,
        booking_datetime DATETIME NOT NULL,
        order_type VARCHAR(20) DEFAULT 'buffet',
        special_requests TEXT NULL,
        promotion_id VARCHAR(50) NULL,
        status VARCHAR(20) DEFAULT 'confirmed',
        qr_token VARCHAR(30) UNIQUE,
        table_number VARCHAR(20) NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('SUCCESS: Table reservation created or verified');
    const [cols] = await pool.query('DESCRIBE reservation');
    console.log('Columns:', cols.map(c => c.Field));
  } catch (e) {
    console.error('Error creating table:', e);
  } finally {
    process.exit(0);
  }
}

main();
