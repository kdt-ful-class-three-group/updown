import express from 'express';
import { pool } from '../database/database.js';
import bcrypt from 'bcrypt';

const router = express.Router();

//* 회원가입
router.post('/pw', async (req, res) => {
  const { user_id, password } = req.body;
  try {

    const hashedPassword = await bcrypt.hash(password, 10);
    // 데이터 삽입 INSERT INTO : 테이블에 새 행을 추가하는 명령어
    // 여기서 ?는 자리표시자로, 실제 값은 배열의 요소로 대체됨 (id, password, name, email)
    // await pool.query('INSERT INTO user (user_id, password, name, e_mail) VALUES (?,?,?,?)', [id, password, name, email]);
    await pool.query('UPDATE "user" SET password = $1 WHERE user_id = $2', [hashedPassword, user_id]);
    res.status(201).json({
      message: `${user_id}의 비밀번호 변경 성공`
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error 서버 내부 오류');
  }
}
);

router.post('/name', async (req, res) => {
  const { user_id, name } = req.body;
  
  try {
   const check = await pool.query('SELECT name FROM "user" WHERE name = $1', [name]);


   if(check.rows.length > 0) {
      res.status(201).json({
      message: `이미 존재하는 닉네임입니다.`
    });
    } else {
    await pool.query('UPDATE "user" SET name = $1 WHERE user_id = $2', [name, user_id]);
    res.status(201).json({
      message: `${user_id}의 닉네임 변경 성공`
    });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error 서버 내부 오류');
  }
}
);

export { router };