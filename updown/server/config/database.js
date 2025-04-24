import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: `localhost`,
  user: `root`,
  password: `Sksmstjsdlf4350@`,
  database: `TEST`,
  port: 3306
})

pool.getConnection()
  .then(connection => {
    console.log('MySQL 데이터베이스에 성공적으로 연결되었습니다.');
    connection.release();
  })

export { pool };