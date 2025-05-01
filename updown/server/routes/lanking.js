
import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();
//* 랭킹 조회
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT user_id, mode, success FROM game');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('랭킹 조회 오류');
  }
}
);