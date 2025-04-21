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
    const [rows] = await pool.query('SELECT * FROM user');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
}
);

app.get('/game', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM game');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
}
);

app.post('/login', async (req, res) => {
  const { dummy } = req.body;
  try {
    const [rows] = await pool.query('INSERT INTO user (dummy) VALUES (?)', [dummy]);
    res.status(201).json({ dummy });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
}
);

app.post('/gameEnd', async (req, res) => {
  const { dummy } = req.body;
  try {
    const [rows] = await pool.query('INSERT INTO game (dummy) VALUES (?)', [dummy]);
    res.status(201).json({ dummy });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
}
);













app.listen(8003, () => {
  console.log('Server running on http://localhost:8003');
});



