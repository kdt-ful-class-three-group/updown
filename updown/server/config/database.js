import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: `192.168.100.74`,
  user: `poop`,
  password: `poop123`,
  database: `updowndb`,
  port: 3306
})

pool.getConnection()
  .then(connection => {
    console.log('MySQL 데이터베이스에 성공적으로 연결되었습니다.');
    connection.release();
  })

export { pool };