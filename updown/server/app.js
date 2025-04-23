const express = require('express');
const pool = require('./config/database');
const router = express.Router();
const app = express();
const cors = require('cors');


app.use(cors({
  origin: `http://localhost:5173`, // 특정 출처 허용
  methods: 'GET, POST, PUT, DELETE, OPTIONS', // 특정 HTTP 메서드 허용
  allowedHeaders: ['Content-Type'], // 특정 헤더 허용
}));
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
}
);

// app.get('/game', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM game');
//     res.json(rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Internal Server Error');
//   }
// }
// );

//* 회원가입
app.post('/signup', async (req, res) => {
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

//* 로그인
app.post('/login', async (req, res) => {
  const { id, password } = req.body;
  try {
    // 데이터 조회 SELECT : 테이블에서 특정 조건에 맞는 행을 검색하는 명령어
    // WHERE 절을 사용하여 특정 조건을 만족하는 행을 검색. AND 연산자를 사용하여 두 개의 조건을 결합
    const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ? AND password = ?', [id, password]);
    console.log(rows);
    // rows는 배열 형태로 반환되며, 조건에 맞는 행이 존재하면 그 행의 정보가 담김
    if (rows.length > 0) {
      res.status(200).json({ message: `${id}님 환영합니다.` });
    } else {
      res.status(401).json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error 서버 내부 오류');
  }
}
);
// app.post('/gameEnd', async (req, res) => {
//   const { dummy } = req.body;
//   try {
//     const [rows] = await pool.query('INSERT INTO game (dummy) VALUES (?)', [dummy]);
//     res.status(201).json({ dummy });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Internal Server Error');
//   }
// }
// );













app.listen(8003, () => {
  console.log('Server running on http://localhost:8003');
});



