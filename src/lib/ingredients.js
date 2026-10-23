// Ingredient details for each menu item, keyed by menu item id
// Each ingredient: { name, amount, unit }
export const menuIngredients = {
  // 1 - สลัดแซลมอนรมควัน
  1: [
    { name: 'แซลมอนรมควัน', amount: 120, unit: 'g' },
    { name: 'ผักสลัดรวม', amount: 80, unit: 'g' },
    { name: 'น้ำผึ้ง', amount: 15, unit: 'ml' },
    { name: 'น้ำมะนาว', amount: 20, unit: 'ml' },
    { name: 'น้ำมันมะกอก', amount: 10, unit: 'ml' },
    { name: 'เกลือ', amount: 2, unit: 'g' },
    { name: 'พริกไทยป่น', amount: 1, unit: 'g' },
  ],
  // 2 - เกี๊ยวซ่าหมู
  2: [
    { name: 'หมูสับ', amount: 150, unit: 'g' },
    { name: 'แผ่นเกี๊ยว', amount: 12, unit: 'แผ่น' },
    { name: 'กระเทียม', amount: 10, unit: 'g' },
    { name: 'ขิง', amount: 5, unit: 'g' },
    { name: 'ซอสถั่วเหลือง', amount: 20, unit: 'ml' },
    { name: 'น้ำมันงา', amount: 5, unit: 'ml' },
    { name: 'ซอสพอนซึ', amount: 30, unit: 'ml' },
  ],
  // 3 - ปอเปี๊ยะทอดไส้ผัก
  3: [
    { name: 'แผ่นปอเปี๊ยะ', amount: 8, unit: 'แผ่น' },
    { name: 'วุ้นเส้น', amount: 50, unit: 'g' },
    { name: 'กะหล่ำปลี', amount: 80, unit: 'g' },
    { name: 'แครอท', amount: 40, unit: 'g' },
    { name: 'เห็ดหอม', amount: 30, unit: 'g' },
    { name: 'น้ำมันทอด', amount: 500, unit: 'ml' },
    { name: 'ซอสบ๊วย', amount: 30, unit: 'ml' },
  ],
  // 4 - ต้มยำกุ้ง
  4: [
    { name: 'กุ้งสด', amount: 200, unit: 'g' },
    { name: 'เห็ดฟาง', amount: 80, unit: 'g' },
    { name: 'ตะไคร้', amount: 2, unit: 'ต้น' },
    { name: 'ใบมะกรูด', amount: 5, unit: 'ใบ' },
    { name: 'พริกขี้หนู', amount: 5, unit: 'เม็ด' },
    { name: 'น้ำมะนาว', amount: 30, unit: 'ml' },
    { name: 'น้ำปลา', amount: 20, unit: 'ml' },
    { name: 'เครื่องแกงต้มยำ', amount: 2, unit: 'ช้อนโต๊ะ' },
    { name: 'น้ำซุป', amount: 400, unit: 'ml' },
  ],
  // 5 - แกงเขียวหวานไก่
  5: [
    { name: 'เนื้อไก่', amount: 200, unit: 'g' },
    { name: 'เครื่องแกงเขียวหวาน', amount: 3, unit: 'ช้อนโต๊ะ' },
    { name: 'กะทิ', amount: 250, unit: 'ml' },
    { name: 'มะเขือเปราะ', amount: 80, unit: 'g' },
    { name: 'ใบโหระพา', amount: 10, unit: 'g' },
    { name: 'น้ำตาลปี๊บ', amount: 1, unit: 'ช้อนโต๊ะ' },
    { name: 'น้ำปลา', amount: 15, unit: 'ml' },
    { name: 'ข้าวหอมมะลิ', amount: 200, unit: 'g' },
  ],
  // 6 - ข้าวผัดปู
  6: [
    { name: 'ข้าวสวย', amount: 300, unit: 'g' },
    { name: 'เนื้อปู', amount: 100, unit: 'g' },
    { name: 'ไข่ไก่', amount: 2, unit: 'ฟอง' },
    { name: 'ต้นหอม', amount: 20, unit: 'g' },
    { name: 'กระเทียม', amount: 15, unit: 'g' },
    { name: 'น้ำมันพืช', amount: 30, unit: 'ml' },
    { name: 'ซอสถั่วเหลือง', amount: 15, unit: 'ml' },
    { name: 'น้ำมันหอย', amount: 10, unit: 'ml' },
  ],
  // 7 - กะเพราหมูสับ
  7: [
    { name: 'หมูสับ', amount: 200, unit: 'g' },
    { name: 'ใบกะเพรา', amount: 30, unit: 'g' },
    { name: 'พริกขี้หนู', amount: 8, unit: 'เม็ด' },
    { name: 'กระเทียม', amount: 20, unit: 'g' },
    { name: 'ซอสถั่วเหลือง', amount: 15, unit: 'ml' },
    { name: 'น้ำมันหอย', amount: 10, unit: 'ml' },
    { name: 'น้ำตาล', amount: 5, unit: 'g' },
    { name: 'ไข่ดาว', amount: 1, unit: 'ฟอง' },
    { name: 'ข้าวสวย', amount: 200, unit: 'g' },
  ],
  // 8 - สเต็กเนื้อวากิว
  8: [
    { name: 'เนื้อวากิว A5', amount: 300, unit: 'g' },
    { name: 'เนย', amount: 20, unit: 'g' },
    { name: 'กระเทียม', amount: 10, unit: 'g' },
    { name: 'โรสแมรี่', amount: 2, unit: 'ก้าน' },
    { name: 'เกลือทะเล', amount: 3, unit: 'g' },
    { name: 'พริกไทยดำ', amount: 2, unit: 'g' },
    { name: 'ซอสพริกไทยดำ', amount: 50, unit: 'ml' },
  ],
  // 9 - แซลมอนเทอริยากิ
  9: [
    { name: 'แซลมอนสด', amount: 250, unit: 'g' },
    { name: 'ซอสเทอริยากิ', amount: 60, unit: 'ml' },
    { name: 'ซอสถั่วเหลือง', amount: 20, unit: 'ml' },
    { name: 'สาเก', amount: 15, unit: 'ml' },
    { name: 'น้ำตาล', amount: 10, unit: 'g' },
    { name: 'ข้าวญี่ปุ่น', amount: 200, unit: 'g' },
    { name: 'ผักต้ม', amount: 80, unit: 'g' },
  ],
  // 10 - ผัดกระเพราทะเล
  10: [
    { name: 'กุ้ง', amount: 80, unit: 'g' },
    { name: 'หมึก', amount: 80, unit: 'g' },
    { name: 'หอย', amount: 80, unit: 'g' },
    { name: 'ใบกะเพรา', amount: 30, unit: 'g' },
    { name: 'พริกสด', amount: 10, unit: 'เม็ด' },
    { name: 'กระเทียม', amount: 20, unit: 'g' },
    { name: 'น้ำมันหอย', amount: 15, unit: 'ml' },
    { name: 'ซอสถั่วเหลือง', amount: 15, unit: 'ml' },
  ],
  // 11 - ผัดไทยกุ้งสด
  11: [
    { name: 'กุ้งสด', amount: 150, unit: 'g' },
    { name: 'เส้นจันท์', amount: 150, unit: 'g' },
    { name: 'เต้าหู้เหลือง', amount: 50, unit: 'g' },
    { name: 'ไข่ไก่', amount: 1, unit: 'ฟอง' },
    { name: 'ซอสผัดไทย', amount: 40, unit: 'ml' },
    { name: 'ถั่วป่น', amount: 20, unit: 'g' },
    { name: 'ต้นหอม', amount: 15, unit: 'g' },
    { name: 'มะนาว', amount: 0.5, unit: 'ลูก' },
  ],
  // 12 - ราเมนหมูชาชู
  12: [
    { name: 'เส้นราเมน', amount: 180, unit: 'g' },
    { name: 'หมูชาชู', amount: 100, unit: 'g' },
    { name: 'น้ำซุปกระดูก', amount: 500, unit: 'ml' },
    { name: 'ไข่ยางมะตูม', amount: 1, unit: 'ฟอง' },
    { name: 'โนริ', amount: 2, unit: 'แผ่น' },
    { name: 'ต้นหอม', amount: 10, unit: 'g' },
    { name: 'งาขาว', amount: 5, unit: 'g' },
    { name: 'เนย', amount: 10, unit: 'g' },
  ],
  // 13 - บะหมี่เกี๊ยวหมูแดง
  13: [
    { name: 'บะหมี่เหนียว', amount: 150, unit: 'g' },
    { name: 'หมูแดง', amount: 100, unit: 'g' },
    { name: 'เกี๊ยวกุ้ง', amount: 4, unit: 'ชิ้น' },
    { name: 'ผักชีฝรั่ง', amount: 10, unit: 'g' },
    { name: 'น้ำซุป', amount: 300, unit: 'ml' },
    { name: 'ซอสถั่วเหลือง', amount: 15, unit: 'ml' },
  ],
  // 14 - หมูสะเต๊ะ
  14: [
    { name: 'เนื้อหมู', amount: 300, unit: 'g' },
    { name: 'ผงกะหรี่', amount: 10, unit: 'g' },
    { name: 'กะทิ', amount: 50, unit: 'ml' },
    { name: 'น้ำตาล', amount: 15, unit: 'g' },
    { name: 'น้ำมันพืช', amount: 20, unit: 'ml' },
    { name: 'ไม้เสียบ', amount: 8, unit: 'ไม้' },
    { name: 'ซอสถั่ว', amount: 60, unit: 'ml' },
    { name: 'อาจาด', amount: 50, unit: 'g' },
  ],
  // 15 - ซี่โครงหมูบาร์บีคิว
  15: [
    { name: 'ซี่โครงหมู', amount: 500, unit: 'g' },
    { name: 'ซอส BBQ', amount: 80, unit: 'ml' },
    { name: 'น้ำผึ้ง', amount: 30, unit: 'ml' },
    { name: 'กระเทียม', amount: 20, unit: 'g' },
    { name: 'ซอสถั่วเหลือง', amount: 20, unit: 'ml' },
    { name: 'น้ำส้มสายชู', amount: 15, unit: 'ml' },
  ],
  // 16 - ไก่ย่างจิ้มแจ่ว
  16: [
    { name: 'ไก่ทั้งตัว', amount: 600, unit: 'g' },
    { name: 'กระเทียม', amount: 20, unit: 'g' },
    { name: 'ตะไคร้', amount: 1, unit: 'ต้น' },
    { name: 'น้ำจิ้มแจ่ว', amount: 60, unit: 'ml' },
    { name: 'ข้าวเหนียว', amount: 200, unit: 'g' },
    { name: 'เกลือ', amount: 5, unit: 'g' },
  ],
  // 17 - กุ้งเผาเกลือ
  17: [
    { name: 'กุ้งแม่น้ำ', amount: 300, unit: 'g' },
    { name: 'เกลือหยาบ', amount: 50, unit: 'g' },
    { name: 'ตะไคร้', amount: 1, unit: 'ต้น' },
    { name: 'ซอสซีฟู้ด', amount: 60, unit: 'ml' },
  ],
  // 18 - ปูนิ่มผัดผงกะหรี่
  18: [
    { name: 'ปูนิ่ม', amount: 2, unit: 'ตัว' },
    { name: 'ผงกะหรี่', amount: 15, unit: 'g' },
    { name: 'หัวหอม', amount: 50, unit: 'g' },
    { name: 'พริกชี้ฟ้า', amount: 30, unit: 'g' },
    { name: 'ไข่ไก่', amount: 1, unit: 'ฟอง' },
    { name: 'น้ำมันพืช', amount: 40, unit: 'ml' },
    { name: 'น้ำปลา', amount: 10, unit: 'ml' },
  ],
  // 19 - ปลากะพงนึ่งมะนาว
  19: [
    { name: 'ปลากะพง', amount: 500, unit: 'g' },
    { name: 'น้ำมะนาว', amount: 60, unit: 'ml' },
    { name: 'น้ำปลา', amount: 30, unit: 'ml' },
    { name: 'พริกขี้หนู', amount: 10, unit: 'เม็ด' },
    { name: 'กระเทียม', amount: 20, unit: 'g' },
    { name: 'น้ำตาล', amount: 10, unit: 'g' },
    { name: 'ตะไคร้', amount: 1, unit: 'ต้น' },
  ],
  // 20 - ข้าวเหนียวมะม่วง
  20: [
    { name: 'ข้าวเหนียวมูล', amount: 200, unit: 'g' },
    { name: 'กะทิ', amount: 150, unit: 'ml' },
    { name: 'น้ำตาล', amount: 40, unit: 'g' },
    { name: 'เกลือ', amount: 2, unit: 'g' },
    { name: 'มะม่วงน้ำดอกไม้', amount: 1, unit: 'ลูก' },
    { name: 'งาขาวคั่ว', amount: 5, unit: 'g' },
  ],
  // 21 - ลาวาช็อกโกแลตเค้ก
  21: [
    { name: 'ช็อกโกแลต 70%', amount: 100, unit: 'g' },
    { name: 'เนย', amount: 80, unit: 'g' },
    { name: 'ไข่ไก่', amount: 2, unit: 'ฟอง' },
    { name: 'แป้งสาลี', amount: 30, unit: 'g' },
    { name: 'น้ำตาลทราย', amount: 50, unit: 'g' },
    { name: 'ไอศกรีมวานิลลา', amount: 1, unit: 'สกูป' },
  ],
  // 22 - เครปเค้กชาเขียว
  22: [
    { name: 'ผงมัทฉะ', amount: 20, unit: 'g' },
    { name: 'แป้งสาลี', amount: 150, unit: 'g' },
    { name: 'ไข่ไก่', amount: 3, unit: 'ฟอง' },
    { name: 'นม', amount: 300, unit: 'ml' },
    { name: 'วิปปิ้งครีม', amount: 200, unit: 'ml' },
    { name: 'น้ำตาลทราย', amount: 60, unit: 'g' },
  ],
  // 23 - ชาไทยเย็น
  23: [
    { name: 'ชาไทย', amount: 30, unit: 'g' },
    { name: 'น้ำเดือด', amount: 200, unit: 'ml' },
    { name: 'นมข้นจืด', amount: 30, unit: 'ml' },
    { name: 'น้ำตาล', amount: 20, unit: 'g' },
    { name: 'น้ำแข็ง', amount: 150, unit: 'g' },
  ],
  // 24 - น้ำมะพร้าวปั่น
  24: [
    { name: 'น้ำมะพร้าว', amount: 250, unit: 'ml' },
    { name: 'เนื้อมะพร้าวอ่อน', amount: 80, unit: 'g' },
    { name: 'น้ำแข็ง', amount: 150, unit: 'g' },
    { name: 'น้ำตาล', amount: 15, unit: 'g' },
  ],
  // 25 - กาแฟลาเต้เย็น
  25: [
    { name: 'เมล็ดกาแฟอาราบิก้า', amount: 18, unit: 'g' },
    { name: 'นมสด', amount: 180, unit: 'ml' },
    { name: 'น้ำแข็ง', amount: 150, unit: 'g' },
    { name: 'น้ำตาลทราย', amount: 10, unit: 'g' },
  ],
  // 26 - สมูทตี้เบอร์รี่
  26: [
    { name: 'สตรอว์เบอร์รี่', amount: 80, unit: 'g' },
    { name: 'บลูเบอร์รี่', amount: 50, unit: 'g' },
    { name: 'ราสเบอร์รี่', amount: 50, unit: 'g' },
    { name: 'โยเกิร์ต', amount: 100, unit: 'ml' },
    { name: 'น้ำผึ้ง', amount: 20, unit: 'ml' },
    { name: 'น้ำแข็ง', amount: 100, unit: 'g' },
  ],
};
