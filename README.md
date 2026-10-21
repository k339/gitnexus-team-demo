# GitNexus team demo

Demo project สำหรับ sharing วิธีใช้ GitNexus กับ Claude Code และเปิด dependency graph ใน browser
ใช้ตัวอย่างระบบสั่งซื้อสินค้า เพื่อดูว่าการเปลี่ยน function ส่วนลดเกี่ยวข้องกับโค้ดส่วนไหนบ้าง

## สิ่งที่จะเห็นใน demo

1. ให้ GitNexus อ่าน source code และสร้าง index
2. เปิด dependency graph ใน browser
3. ให้ Claude ใช้ GitNexus สำรวจ project และหา callers ของ function
4. เปิด source code ยืนยัน แล้วสรุปจุดที่ต้องแก้กับ tests ที่ควรรัน

ตัวอย่างนี้เน้นให้เห็นวิธีใช้งาน ไม่มี benchmark หรือผลเปรียบเทียบความเร็วและ token

## เตรียมเครื่อง

- Git
- Node.js ที่ GitNexus รองรับ ตัวอย่างนี้ใช้ Node.js สาย 24 เวอร์ชัน 24.11 ขึ้นไป
- Claude Code ที่ล็อกอินและใช้งานได้แล้ว
- GitNexus ถ้ายังไม่มี ให้ติดตั้งจาก Terminal:

```bash
npm install -g gitnexus@latest
```

ตรวจเวอร์ชันก่อนบันทึกคลิป:

```bash
node --version
claude --version
gitnexus --version
```

ตัวแอป demo ไม่มี dependencies เพิ่มเติม จึงไม่ต้องรัน npm install ใน project นี้

## 1. เปิด demo project

ถ้ายังไม่ได้ clone:

```bash
git clone https://github.com/k339/gitnexus-team-demo.git
cd gitnexus-team-demo
```

ถ้ามี project อยู่แล้ว ให้เปิด Terminal ในโฟลเดอร์หลักของ project

```bash
npm test
npm run demo
```

โค้ดเดิมควรผ่าน tests ทั้ง 6 ข้อ ส่วน npm run demo จะแสดงตัวอย่างผลลัพธ์ของ checkout, invoice, refund, offer และ savings

## 2. สร้าง index

รันจากโฟลเดอร์หลักของ project:

```bash
gitnexus analyze
```

รอให้คำสั่งทำงานเสร็จโดยไม่มี error คำสั่งนี้อาจเพิ่ม context files, skills และ config สำหรับ AI ใน project ด้วย
เมื่อ source code เปลี่ยนหรือสลับ branch ให้รัน analyze อีกครั้งก่อนวิเคราะห์ต่อ

## 3. เชื่อม Claude Code

```bash
gitnexus setup
```

อ่านสรุปว่า Claude Code ถูกตั้งค่าสำเร็จ setup อาจตั้งค่าให้เครื่องมือ AI ตัวอื่นที่พบในเครื่องด้วย
ถ้าเปิด Claude อยู่ ให้ออกก่อน แล้วเปิด session ใหม่จากโฟลเดอร์ project:

```bash
claude
```

ใน Claude Code พิมพ์:

```text
/mcp
```

เช็กว่า GitNexus เชื่อมต่อได้ จากนั้นใช้ข้อความในหัวข้อ “เช็กการเชื่อมต่อ” ของ [PROMPT.md](PROMPT.md)
ต้องเห็น tool call สำเร็จและเป็น project ที่ถูกต้อง

## 4. เปิด graph ใน browser

เปิด Terminal อีกหน้าหนึ่ง แล้วรัน:

```bash
gitnexus serve
```

เปิด [http://localhost:4747](http://localhost:4747) บนเครื่องเดียวกัน แล้วเลือก demo project
เปิด Terminal ค้างไว้ระหว่างใช้ และกด Ctrl+C เมื่อต้องการหยุด server
ถ้าเปลี่ยน port ให้ใช้ port เดียวกันใน URL

GitNexus 1.6.12 ที่ใช้ตรวจ demo มี Web UI มาพร้อม server และได้ตรวจแล้วว่าเปิดหน้า GitNexus ผ่าน local URL ได้
ถ้าใช้เวอร์ชันอื่นแล้วไม่พบหน้า graph ให้ตรวจแพ็กเกจและคู่มือของเวอร์ชันนั้นก่อน

## 5. ลำดับ demo สำหรับ sharing (ประมาณ 5–8 นาที)

| ช่วง | สิ่งที่แสดง | คำถามที่ต้องตอบ |
| --- | --- | --- |
| เปิด project | npm run demo และภาพรวมใน browser | ระบบตัวอย่างทำอะไร? |
| สำรวจด้วย Claude | Prompt 1 ใน PROMPT.md พร้อม tool calls | โค้ดแต่ละส่วนทำงานร่วมกันอย่างไร? |
| วิเคราะห์ก่อนแก้ | Prompt 2 พร้อมผลจาก GitNexus | ถ้าเปลี่ยน calculateDiscount ต้องเช็กอะไรบ้าง? |
| ยืนยันกับ source | Prompt 3 แล้วเปิดไฟล์ที่อ้างอิง | โค้ดใช้ return value อย่างไร และควร test อะไร? |

ส่ง prompt ทีละข้อ ไม่ต้องส่งทั้งไฟล์ในครั้งเดียว
ยังไม่ต้องแก้ source code ระหว่าง demo นี้ เพื่อให้เห็นขั้นตอนสำรวจก่อนลงมือแก้

ระหว่างอัดจอ ให้เห็นชื่อ GitNexus tool ที่ Claude เรียกใช้จริง เช่น context, impact หรือ trace
ถ้า Claude ไม่ได้ใช้ tools ให้ตรวจการเชื่อมต่อก่อน อย่านำคำตอบนั้นไปอธิบายว่าเป็นผลจาก GitNexus
หากตัดช่วงรอออกจากคลิป ให้ระบุว่าเป็นคลิปตัดต่อสำหรับ sharing

## โค้ดที่ใช้เล่าใน demo

- `src/pricing/calculateDiscount.js`: function ส่วนลดที่เราจะเปลี่ยน
- `src/checkout/`, `src/billing/`, `src/refunds/`: นำส่วนลดไปคำนวณยอด
- `src/marketing/`: ใช้ส่วนลดผ่าน re-export
- `src/analytics/`: รวมยอดส่วนลด
- `src/api/`, `src/jobs/`, `src/support/`: entry points ที่เรียกโค้ดต่ออีกชั้น
- `src/shipping/`: มี function ชื่อเหมือนกัน แต่เป็นส่วนลดค่าขนส่งคนละตัว
- `test/flows.test.js`: tests สำหรับ flows ของตัวอย่าง

## ข้อควรรู้

Dependency graph ช่วยหาโค้ดที่ควรตรวจต่อ ยังต้องอ่าน source และ run tests หลังแก้
การสร้าง index แบบ local ไม่ได้หมายความว่าข้อมูลที่ส่งให้บริการ AI จะอยู่ในเครื่องทั้งหมด
เรื่องการเก็บและใช้ข้อมูลขึ้นกับบริการ AI บัญชี และ config ที่ใช้ด้วย

คู่มือ: [GitNexus](https://github.com/abhigyanpatwari/GitNexus) และ [Claude Code MCP](https://code.claude.com/docs/en/mcp)
