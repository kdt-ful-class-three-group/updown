<<<<<<< HEAD
import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();


router.get('/', async (req, res) => {
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

export { router };
=======
import express, from 'express';

const router = express.Router();

router.

export { Router }
>>>>>>> joon14
