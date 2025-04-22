// ✅ 서버 전체 코드 (백엔드)
// 📁 경로: react-express-mysql/server/server.js

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// ✅ MySQL 연결 풀 생성
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "min1234!", // 비밀번호 환경에 따라 변경
  database: "testdb",
  waitForConnections: true,
  connectionLimit: 10,
});

// ✅ 콘솔에 CRUD 작업 로그 출력 함수
async function printTable() {
  try {
    const [rows] = await pool.execute("SELECT * FROM users");
    console.log("📊 현재 users 테이블:");
    console.table(rows);
  } catch (err) {
    console.error("❌ 테이블 출력 실패:", err.message);
  }
}

// ✅ 사용자 추가 (CREATE)
app.post("/users", async (req, res) => {
  const { name } = req.body;
  try {
    await pool.execute("INSERT INTO users (name) VALUES (?)", [name]);
    console.log(`✅ 이름 추가됨: ${name}`);
    await printTable();
    res.status(201).json({ message: "사용자 추가됨" });
  } catch (error) {
    console.error("❌ 사용자 추가 실패:", error.message);
    res.status(500).json({ message: "DB 오류" });
  }
});

// ✅ 전체 사용자 조회 (READ)
app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM users");
    console.log("📥 전체 사용자 조회됨");
    console.table(rows);
    res.json(rows);
  } catch (error) {
    console.error("❌ 사용자 조회 실패:", error.message);
    res.status(500).json({ message: "조회 실패" });
  }
});

// ✅ 사용자 삭제 (DELETE)
// app.delete("/users/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.execute("DELETE FROM users WHERE id = ?", [id]);
//     console.log(`🗑️ ID ${id} 삭제됨`);
//     await printTable();
//     res.json({ message: "삭제 완료" });
//   } catch (error) {
//     console.error("❌ 삭제 실패:", error.message);
//     res.status(500).json({ message: "삭제 실패" });
//   }
// });

// ✅ 서버 실행
app.listen(port, () => {
  console.log(`🚀 서버 실행됨: http://localhost:${port}`);
});
