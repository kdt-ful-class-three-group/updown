export const SignUpValid = ({ id, password, name, email }) => {
    // 원하는 유효성 검사 파일들 담아놓기
    const validation = [
      { condition: !id, message: "아이디를 입력해주세요" },
      { condition: !password, message: "비밀번호를 입력해주세요" },
      { condition: !name, message: "이름 입력해주세요" },
      { condition: !email.includes("@"), message: "이메일 형식이 아닙니다." }
    ]
  
    // 각각의 유효성 검사 실시
    for (let validate of validation) {
      // 각각의 값들이 true면 alert창 실행
      if (validate.condition) {
        alert(validate.message)
        return false
      }
    }
    // 문제가 없을 시 true로 진행
    return true;
  };
