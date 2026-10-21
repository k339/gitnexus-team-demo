# Prompts สำหรับ GitNexus demo

เปิด Claude Code จากโฟลเดอร์ project แล้วส่งทีละหัวข้อ
ใช้ชื่อ function พร้อม path เพื่อระบุ target ให้ชัดเจน

## เช็กการเชื่อมต่อ

```text
ใช้ GitNexus tools เช็กว่ามองเห็น project นี้หรือไม่
บอกชื่อ project ที่พบ และตรวจว่า index พร้อมใช้งาน
ยังไม่ต้องวิเคราะห์หรือแก้ source code
ถ้าเรียก tools ไม่ได้ ให้บอกข้อผิดพลาดก่อน
```

## Prompt 1: ทำความเข้าใจ project

```text
ใช้ GitNexus tools ช่วยสำรวจ project นี้ แล้วเปิด source code ประกอบ
อธิบายสั้น ๆ ว่าตอน checkout, ออก invoice และ refund มีโค้ดส่วนไหนทำงานบ้าง
แนบ path และชื่อ function ที่เกี่ยวข้อง เพื่อให้เปิดดูตามได้
ยังไม่ต้องแก้ source code
```

## Prompt 2: วิเคราะห์ก่อนเปลี่ยน return type

```text
ใช้ GitNexus tools วิเคราะห์ผลกระทบของการเปลี่ยน function นี้:

src/pricing/calculateDiscount.js
calculateDiscount(subtotal, tier)

ปัจจุบัน return เป็น number เช่น 20
เราต้องการเปลี่ยนให้ return เป็น object เช่น { amount: 20, rate: 0.2 }
โดยคงวิธีคำนวณส่วนลดเดิม

ช่วยหา:
1. Direct callers/consumers ใน src/ ที่ต้องตรวจการใช้ return value
2. Indirect callers หรือ entry points ที่เกี่ยวข้องต่ออีกชั้น
3. function ชื่อซ้ำที่เป็นคนละตัวและไม่เกี่ยวกับการเปลี่ยนนี้

เปิด source code ยืนยัน พร้อมระบุ path และชื่อ function
แยกสิ่งที่ยืนยันแล้วออกจากจุดที่ยังต้องตรวจเพิ่ม
ยังไม่ต้องแก้ source code
```

## Prompt 3: เปิด source ยืนยันและวางแผน

```text
จากผลเมื่อกี้ ช่วยเปิด source code ให้ดูตัวอย่างของ:
- Direct caller หนึ่งจุด
- Caller ที่ใช้ alias หรือ re-export
- function ชื่อซ้ำใน shipping ว่าใช่ตัวเดียวกับ pricing หรือไม่

อธิบายว่าตอนนี้โค้ดใช้ return value อย่างไร
ถ้าปรับเป็น object ต้องเปลี่ยนการอ่านค่าตรงไหน
แล้วสรุปแผนแก้ไขกับ tests ที่ควรรันหรือเพิ่ม

แนบ path และชื่อ function ของทุกตัวอย่าง
ยังไม่ต้องแก้ source code
```
