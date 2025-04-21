const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: ``,
  user: ``,
  password: ``,
  database: ``,
  port: 
});

pool.getConnection()
  .then(connection => {
    console.log('MySQL 데이터베이스에 성공적으로 연결되었습니다.');
    connection.release();
  })

module.exports = pool;