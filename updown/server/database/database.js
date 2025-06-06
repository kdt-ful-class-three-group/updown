// import mysql from 'mysql2/promise';
// import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from '../config/envConfig.js';

// const pool = mysql.createPool({
//   host: DB_HOST,
//   user: DB_USER,
//   password: DB_PASSWORD,
//   database: DB_NAME,
//   port: DB_PORT,
// })

// pool.getConnection()
//   .then(connection => {
//     console.log('MySQL 데이터베이스에 성공적으로 연결되었습니다.');
//     connection.release();
//   })

// export { pool };

import { Pool } from 'pg';
import { DB_URL } from '../config/envConfig.js'; // 연결 URL을 저장한 환경 변수

const pool = new Pool({
  connectionString: DB_URL,
  ssl: {
    rejectUnauthorized: false, // Supabase는 SSL을 요구함
  },
});

pool.connect()
  .then(client => {
    console.log('Supabase PostgreSQL에 성공적으로 연결되었습니다.');
    client.release();
  })
  .catch(err => {
    console.error('데이터베이스 연결 실패:', err);
  });

export { pool };