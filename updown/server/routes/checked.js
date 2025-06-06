import express from 'express';
import { pool } from '../database/database.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { id, name } = req.body;
  try {
    let checkIdName = {
      checkId: false,
      checkName: false
    };

    if (id) {
      const idRows = await pool.query('SELECT * FROM "user" WHERE user_id = $1', [id]);
      checkIdName.checkId = idRows.rows.length > 0;
    }
    if (name) {
      const nameRows = await pool.query('SELECT * FROM "user" WHERE name =$1', [name]);
      checkIdName.checkName = nameRows.rows.length > 0;
    }

    return res.json({
      success: true,
      ...checkIdName
    });    

  } catch (error){
    console.error('중복체크 오류: ', error);
    return res.status(500).json({ success: false, message: '서버 오류' });
    }
  })

export { router };