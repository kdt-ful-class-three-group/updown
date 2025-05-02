
import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();
//* 랭킹 조회
router.get('/', async (req, res) => {
  const { mode } = req.query;
  try {
    const [rows] = await pool.query('SELECT user_id, mode, SUM(success) as success from game where mode = ? group by user_id', [mode]);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('랭킹 조회 오류');
  }
}
);

export { router };