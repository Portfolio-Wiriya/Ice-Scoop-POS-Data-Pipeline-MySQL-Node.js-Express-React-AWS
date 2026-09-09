# Ice-Scoop-POS-Data-Pipeline-MySQL-Node.js-Express-React-AWS

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white)

เว็บแอปพลิเคชันระบบจัดการหน้าร้าน (Point of Sale - POS) สำหรับร้านขายไอศกรีม พัฒนาขึ้นเพื่อเพิ่มความสะดวกในการบันทึกยอดขายและตรวจสอบสินค้าคงคลัง real-time มุ่งเน้นการจัดการข้อมูลผ่าน RESTful API ร่วมกับฐานข้อมูลบน cloud (AWS) เพื่อจำลองระบบซื้อขายจริงที่พร้อมต่อยอดใช้งานในเชิงธุรกิจ

---

## 🎯 Objectives (วัตถุประสงค์)
- พัฒนาระบบ POS หน้าร้านที่ใช้งานง่าย ตัดสต็อกและบันทึกยอดขายได้แม่นยำ
- ออกแบบ Data Pipeline และ REST API สำหรับรับ-ส่งข้อมูลระหว่าง Web Application และ Database
- ประยุกต์ใช้ Cloud Database (AWS) เพื่อจำลองการทำงานของระบบธุรกิจจริงที่มีความเสถียรและปลอดภัย

---

## ✨ Features (ฟีเจอร์หลัก)

- **Order POS:** หน้าจอขายสินค้า คำนวณราคา สรุปรายการสั่งซื้อ
- **Stock Management:** ระบบจัดการคลังสินค้า เช็คจำนวนคงเหลือ เพิ่ม/ลด/แก้ไขสินค้า
- **Dashboard:** สรุปภาพรวมยอดขายและสถิติสินค้าขายดี

---

## 🛠 Tech Stack (เทคโนโลยีที่ใช้)

### Front-End
- **React.js** - พัฒนา UI แบบ Dynamic Single Page Application
- **CSS / Tailwind CSS** - จัดสไตล์และ Responsive Design

### Back-End & Database
- **Node.js & Express.js** - สร้าง RESTful API บริหารจัดการข้อมูล
- **MySQL** - ฐานข้อมูลเชิงสัมพันธ์ (Relational Database)
- **AWS (Amazon RDS / Cloud Services)** - โฮสต์ฐานข้อมูลบนระบบ Cloud

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 ขึ้นไป)
- MySQL Database

### Installation & Run

1. **Clone repository**
   ```bash
   git clone [https://github.com/your-username/ice-cream-pos.git](https://github.com/your-username/ice-cream-pos.git)
   cd ice-cream-pos

