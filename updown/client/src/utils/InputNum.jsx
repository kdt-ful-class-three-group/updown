import { GuessNum } from "./GuessNum";

//* InputNum 함수는 사용자가 입력한 숫자를 검증하고, 유효한 경우 guessNum 함수를 호출
// InputNum은 쉽게 유효성 검사라고 생각하면 될 듯.
// * value: 사용자가 입력한 값
// * max: 최대 숫자 (레벨에 따라 다름)
// * answer: 정답 숫자 (랜덤으로 생성된 숫자)
export function InputNum({ value, max, answer, setMessage, navigate }) {
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
  // 사용자가 입력한 값이 숫자일 경우, Number() 메서드를 사용하여 숫자로 변환
  // guess는 1~max 사이의 숫자여야 함.
  const guess = Number(num);
  if (guess < 1 || guess > max) {
    alert(`1~${max} 사이 숫자를 입력하세요`);
    return;
  }
  
  // guess는 사용자가 입력한 숫자, answer는 랜덤으로 생성된 숫자
  GuessNum({ guess, answer, setMessage, navigate });
}

