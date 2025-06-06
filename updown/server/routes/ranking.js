
import express from 'express';
import { pool } from '../database/database.js';

const router = express.Router();
//* 랭킹 조회
router.get('/', async (req, res) => {
  const { mode } = req.query;
  try {
    const result = await pool.query('SELECT g.user_id, u.name, g.mode, SUM(CASE WHEN g.success THEN 1 ELSE 0 END) AS success, COUNT(g.success) AS total FROM game g JOIN "user" u ON g.user_id = u.user_id WHERE g.mode = $1 GROUP BY g.user_id, u.name, g.mode', [mode]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('랭킹 조회 오류');
  }
}
);

export { router };