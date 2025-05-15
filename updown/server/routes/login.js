import express from 'express';
import { pool } from '../database/database.js';

const router = express.Router();

//* 로그인
router.post('/', async (req, res) => {
  const { id, password } = req.body;
  try {
    // 데이터 조회 SELECT : 테이블에서 특정 조건에 맞는 행을 검색하는 명령어
    // WHERE 절을 사용하여 특정 조건을 만족하는 행을 검색. AND 연산자를 사용하여 두 개의 조건을 결합
    const [rows] = await pool.query('SELECT * FROM user WHERE user_id = ? AND password = ?', [id, password]);
    console.log(rows);
    // rows는 배열 형태로 반환되며, 조건에 맞는 행이 존재하면 그 행의 정보가 담김
    if (rows.length > 0) {
      const user = rows[0]
      req.session.user = {
        id: id, 
        name: user.name
      };
      req.session.touch();
      req.session.save((err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error 세션 저장 오류');
        }
        console.log(req.session.user, '성공');
        
        res.status(200).json({
          message: '로그인 성공',
          id: user.user_id,
          nickname: user.name,
        });

      });
    } else {
      res.status(401).json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error 서버 내부 오류');
  }
}
);

export { router };