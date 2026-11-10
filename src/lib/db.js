import mysql from 'mysql2/promise';

// ป้องกัน connection leak ในระหว่างพัฒนาเมื่อ Next.js ทำ Hot Reload
let pool;

if (!global._mysqlPool) {
  global._mysqlPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'restaurant_pos',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
  });
}

pool = global._mysqlPool;

export default pool;

