import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();

//* 회원가입
router.post('/signup', async (req, res) => {
  const { userData } = req.body;
  const { id, password, name, email } = userData;
  try {
    // 데이터 삽입 INSERT INTO : 테이블에 새 행을 추가하는 명령어
    // 여기서 ?는 자리표시자로, 실제 값은 배열의 요소로 대체됨 (id, password, name, email)
    await pool.query('INSERT INTO users (user_id, password, name, e_mail) VALUES (?,?,?,?)', [id, password, name, email]);
    res.status(201).json(userData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error 서버 내부 오류');
  }
}
);

export { router };