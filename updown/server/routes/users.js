import express from 'express';
import { pool } from '../database/database.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "user"');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
}
);


export { router };