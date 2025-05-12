import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM user');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
}
);


export { router };