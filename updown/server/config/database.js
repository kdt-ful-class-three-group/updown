import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  // * 리모트 DB서버 인 경우 host를 localhost가 아닌, mysql -u poop -p -h ip주소 로 들어간 ip주소를 host로 설정 해야함.
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