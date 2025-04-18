const express = require('express');
const router = express.Router();
const pool = require('../config/database')

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/signUp', async (req, res) => {
  
  const query = `INSERT INTO users(user_id, password, name, e_mail) VALUES(?, ?, ?, ?)`;
  const userData = req.body;
  
  try {
    const [result] = await pool.query(query, [userData.user_id, userData.password, userData.name, userData.e_mail]);
    console.log(`${result.insertId}의 데이터가 성공적으로 추가 되었습니다.`);
    res.status(200).json({ message: "회원가입 성공" });
  } catch (err) {
    console.error('데이터 추가 실패:', err.message);
  }
});

// router.post('/login', async (req, res) => {
//   const { user_id, password } = req.body;

//   const query = `SELECT * FROM users WHERE user_id = ? AND password = ?`;


//   try {
//     const [rows] = await pool.query(query, [user_id, password]);
//     res.json(rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Internal Server Error');
//   }
// });

router.post('/login', async (req, res) => {
  const { user_id, password } = req.body;

  const query = 'SELECT * FROM users WHERE user_id = ? AND password = ?';

  try {
    const [rows] = await pool.query(query, [user_id, password]);

    if (rows.length > 0) {
      // 로그인 성공
      res.status(200).json({ message: '로그인 성공', user: rows[0] });
    } else {
      // 로그인 실패
      res.status(401).json({ message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
    }
  } catch (err) {
    console.error('로그인 오류:', err.message);
    res.status(500).json({ message: '서버 오류' });
  }
});


module.exports = router;


