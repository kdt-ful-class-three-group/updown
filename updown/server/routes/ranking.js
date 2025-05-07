
import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();
//* 랭킹 조회
router.get('/', async (req, res) => {
  const { mode } = req.query;
  try {
    const [rows] = await pool.query('SELECT g.user_id, u.name, g.mode, SUM(g.success) as success, COUNT(g.success) as total from game g JOIN user u ON g.user_id = u.user_id WHERE g.mode = ? GROUP BY g.user_id, u.name, g.mode', [mode]);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('랭킹 조회 오류');
  }
}
);

export { router };