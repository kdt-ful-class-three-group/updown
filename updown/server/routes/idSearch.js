import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();
//* 랭킹 조회
router.post('/', async (req, res) => {
    const { id } = req.body;
    try {
        const [rows] = await pool.query('SELECT user_id FROM user where user_id = ? ', [id]);
        let checkID = new Object();

        checkID = rows[0] === undefined ? false : true;
        res.send(checkID)
        // res.status(200).json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('랭킹 조회 오류');
    }
}
);

export { router };