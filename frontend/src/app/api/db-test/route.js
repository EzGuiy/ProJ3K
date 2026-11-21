import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // 1. ทดสอบการเชื่อมต่อพื้นฐาน
    const [rows] = await pool.query('SELECT 1 + 1 AS test_calc, NOW() AS server_time');

    // 2. ดึงรายชื่อตารางทั้งหมดในฐานข้อมูล
    const [tableRows] = await pool.query('SHOW TABLES');
    const dbName = process.env.DB_NAME || 'restaurant_pos';
    const keyName = `Tables_in_${dbName}`;
    const tables = tableRows.map((r) => r[keyName] || Object.values(r)[0]);

    const isSchemaReady = tables.includes('ORDER') || tables.includes('order') || tables.includes('orders');

    return NextResponse.json({
      status: 'success',
      message: 'เชื่อมต่อฐานข้อมูล MySQL สำเร็จ! 🎉',
      server_time: rows[0]?.server_time,
      database: dbName,
      host: process.env.DB_HOST || 'localhost',
      tables_count: tables.length,
      tables,
      schema_status: isSchemaReady
        ? 'ตารางพร้อมใช้งานแล้ว ✅'
        : 'ยังไม่มีตารางในฐานข้อมูล ⚠️ กรุณา Import ไฟล์ database/schema.sql ใน MySQL Workbench',
    });
  } catch (error) {
    console.error('MySQL connection error:', error);

    let hint = 'ตรวจสอบการตั้งค่าในไฟล์ .env.local แล้ว Restart เซิร์ฟเวอร์ (npm run dev)';
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      hint = 'ชื่อผู้ใช้ (DB_USER) หรือ รหัสผ่าน (DB_PASSWORD) ในไฟล์ .env.local ไม่ถูกต้อง';
    } else if (error.code === 'ECONNREFUSED') {
      hint = 'ไม่สามารถเชื่อมต่อ Service MySQL ได้ กรุณาตรวจสอบว่าเปิด MySQL อยู่หรือไม่ และ Host/Port ถูกต้อง';
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      hint = `ไม่พบฐานข้อมูลชื่อ '${process.env.DB_NAME}' กรุณาสร้างฐานข้อมูลนี้ใน MySQL ก่อน หรือแก้ไขชื่อ DB_NAME ใน .env.local`;
    }

    return NextResponse.json(
      {
        status: 'error',
        message: 'เชื่อมต่อฐานข้อมูล MySQL ไม่สำเร็จ',
        error_code: error.code,
        error_message: error.message,
        hint,
        note: 'หากเพิ่งแก้ไข .env.local อย่าลืมกด Ctrl+C ใน Terminal แล้วรัน npm run dev ใหม่เพื่อให้ค่าอัปเดต',
      },
      { status: 500 }
    );
  }
}
