import express from 'express';
import { pool } from '../database/database.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const {user_id, mode, success } = req.body;
  try {
    await pool.query('INSERT INTO game (user_id, mode, success) VALUES (?,?,?)', [user_id, mode, success]);
    res.status(201).json({message: '기록 저장 성공', user_id, mode, success});
  } catch (err) {
    console.error('기록 저장 실패', err);
    res.status(500).send('서버에러');
  }
}
);

export { router };