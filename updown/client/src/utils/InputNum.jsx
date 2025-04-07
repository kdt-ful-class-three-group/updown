import { GuessNum } from "./GuessNum";

//* InputNum 함수는 사용자가 입력한 숫자를 검증하고, 유효한 경우 guessNum 함수를 호출
// InputNum은 쉽게 유효성 검사라고 생각하면 될 듯.
// * value: 사용자가 입력한 값
// * max: 최대 숫자 (레벨에 따라 다름)
// * answer: 정답 숫자 (랜덤으로 생성된 숫자)
// * setMessage: 메시지를 설정하는 함수
// * navigate: 페이지 이동을 위한 함수

export function InputNum({
  value,
  max,
  answer,
  setMessage,
  navigate,
  count,
  setCount,
  history, 
  setHistory,
  status,
  setStatus
  }) {
  
  // trim() 메서드는 문자열의 양쪽 공백을 제거 , 사용자가 입력한 값이 공백일 경우를 방지.
  const num = value.trim();

  // 사용자가 입력한 값이 비어있거나, 숫자가 아닌 경우를 체크
  if (num === "") {
    alert("숫자를 입력해주세요");
    return;
  }
  if (isNaN(num)) {
    alert("숫자만 입력해주세요");
    return;
  }
  // 사용자가 입력한 값이 소수점인 경우를 체크
  if (num.includes('.', 0)) {
    alert("소수점은 입력할 수 없습니다");
    return;
  }
  // 사용자가 입력한 값이 숫자일 경우, Number() 메서드를 사용하여 숫자로 변환
  // guess는 1~max 사이의 숫자여야 함.

  const guess = Number(num);
  if (guess < 1 || guess > max) {
    alert(`1~${max} 사이 숫자를 입력하세요`);
    return;
  }
  
  setHistory((history) => [...history, guess]);
  // 정답일 경우 조건은 원래 GuessNum에서 처리했지만 기회가 0이될때 정답일경우에도 실패처리가 되므로 카운트가 0이 되기전에 미리 처리해줌
  if (guess === answer) {
    // 사용자가 입력한 값이 정답인 경우
    console.log("OKAY!");
    // setHistory((history) => [...history, guess]);
    // navigate(`/result?status=success&history=${history}`);
    setStatus("success");
    return;
  }
  // 사용자가 입력한 값이 유효한 경우, 남은 기회를 줄이고 GuessNum 함수를 호출
  const newCount = count - 1;

  setCount(newCount);
  
  console.log(`남은 기회: ${newCount}`);
  if (newCount <= 0) {
    // setHistory((history) => [...history, guess]);
      // navigate(`/result?status=fail&history=${history}`);
      setStatus("fail");
    return;
  }

  // guess는 사용자가 입력한 숫자, answer는 랜덤으로 생성된 숫자
  GuessNum({ guess, answer, setMessage });
}

