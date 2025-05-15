import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from '../config/envConfig.js';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
})

pool.getConnection()
  .then(connection => {
    console.log('MySQL 데이터베이스에 성공적으로 연결되었습니다.');
    connection.release();
  })

export { pool };