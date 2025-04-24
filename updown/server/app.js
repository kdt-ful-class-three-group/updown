import express from 'express';
import pool from './config/database.js';
import cors from 'cors';

const app = express();

// const express = require('express');
// const pool = require('./config/database');
// const Router = require('./router/router')
// const cors = require('cors');


app.use(cors({
  origin: `http://localhost:5173`, // 특정 출처 허용
  methods: 'GET, POST, PUT, DELETE, OPTIONS', // 특정 HTTP 메서드 허용
  allowedHeaders: ['Content-Type'], // 특정 헤더 허용
}));
app.use(express.json());


// 회원 가입 시 id,pw,name,email 삽입
app.post('/SignUp', async (req, res) => {
  const { id,pw,name,email } = req.body;
  console.log(req.body);
  try {
    const [rows] = await pool.query('INSERT INTO user_info (user_id, password,name, email) VALUES (?, ?, ?, ?)', [id, pw, name, email]);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/game', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM user_info');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// 받은 id와 pw를 확인
app.post('/login', async (req, res) => {
  const {id, pw} = req.body
  try {
    const [rows] = await pool.query('SELECT user_id, password FROM user_info where user_id= ? AND password = ?', [id, pw]);
    const user = rows[0];
    console.log(user.user_id);
    console.log(user.password);

    // id와 pw가 맞는지 확인
    if(user.user_id === id && user.password === pw){
      res.json(true);
    }

  } catch (err) {
    res.json(false);
    console.log("아이디 또는 비밀번호 맞지 않습니다.");
    // console.error(err.message);
    // res.status(500).send('Internal Server Error');
  }
});



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
// )


app.listen(8003, () => {
  console.log('Server running on http://localhost:8003');
});



