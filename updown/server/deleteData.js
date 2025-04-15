const pool = require('./config/database')

const deleteData = "4";

const deleteUser = async () => {
  const query = `DELETE FROM users WHERE id = ${deleteData}`;

  try {
    const [result] = await pool.query(query);
    console.log(`${result.Id}의 데이터가 성공적으로 삭제 되었습니다.`);
  } catch (err) {
    console.error('데이터 삭제 실패:', err.message);
  }
};

deleteUser();