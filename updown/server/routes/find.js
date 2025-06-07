import express from 'express';
import { pool } from '../database/database.js';

const router = express.Router();

//* 로그인
router.post('/id', async (req, res) => {
  const { email } = req.body;
  try {
    const query = `SELECT user_id FROM "user" WHERE e_mail = $1 `;
    const value = [email];

    const result = await pool.query(query, value);

    console.log(result.rows);

    if(result.rows.length > 0) {
      res.status(200).json({
        message: '가입된 아이디',
        user_id: result.rows
      })
    } else {

    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error 서버 내부 오류');
  }
}
);

router.post('/pw', async (req, res) => {
  const { user_id, email } = req.body;
  try {
    const query = `SELECT name FROM "user" WHERE user_id = $1 AND e_mail = $2 `;
    const value = [user_id, email];

    const result = await pool.query(query, value);

    console.log(result.rows);

    if(result.rows.length > 0) {
      res.status(200).json({
        message: "아이디 확인 완료."
      })
    } else {
        res.status(200).json({
        message: "일치하는 정보 없음"
      })
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error 서버 내부 오류');
  }
}
);

export { router };