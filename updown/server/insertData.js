const pool = require('./config/database')

const userData = {
  user_id: "유저2",
  password: "qlalfqjsgh",
  name: "유저인것2",
  e_mail: "user@naver.com"
};

const insertUser = async () => {
  const query = `INSERT INTO users(user_id, password, name, e_mail) VALUES(?, ?, ?, ?)`;

  try {
    const [result] = await pool.query(query, [userData.user_id, userData.password, userData.name, userData.e_mail]);
    console.log(`${result.insertId}의 데이터가 성공적으로 추가 되었습니다.`);
  } catch (err) {
    console.error('데이터 추가 실패:', err.message);
  }
};

insertUser();