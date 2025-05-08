import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();
//* 랭킹 조회
router.post('/', async (req, res) => {
    const { id, name } = req.body;
    console.log(id, name);
    try {
        const [idData] = (id !== null ? await pool.query('SELECT user_id FROM user where user_id = ? ', [id]) : '') 
        const [nameData] = (name !== null ? await pool.query('SELECT name FROM user where name = ? ', [name]) : '')

        console.log(idData, nameData);


        let checkID = new Object();
        let checkName = new Object();

        checkID = (id !== null ? idData[0] === undefined ? false : true : null)
        checkName = (name !== null ? nameData[0] === undefined ? false : true : null)

        console.log('id:', checkID, 'name:',checkName);
        res.send({idData : checkID, nameData : checkName})
        // res.status(200).json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('랭킹 조회 오류');
    }
}
);

export { router };