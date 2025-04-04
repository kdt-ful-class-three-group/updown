//* GuessNum은 사용자가 입력한 숫자와 정답 숫자를 비교하는 함수
// 추가로 GuessNum 함수는 리액트함수가아닌 일반 함수이므로 useMessage를 사용할 수 없음.

// * guess: 사용자가 입력한 숫자
// * answer: 정답 숫자
// * setMessage: 메시지를 설정하는 함수
// * navigate: 페이지 이동을 위한 함수
// * count: 남은 기회
// * setCount: 남은 기회를 설정하는 함수

export function GuessNum({
  guess,
  answer,
  setMessage,
  navigate,
 }) {
  
  if (guess > answer) {
    // 사용자가 입력한 숫자가 정답보다 큰 경우
    console.log("DOWN!");
    setMessage("DOWN!");
    return;
    } else if (guess < answer) {
      // 사용자가 입력한 숫자가 정답보다 작은 경우
      console.log("UP!");
    setMessage("UP");
    return;
    } else {
      // 정답 맞춘 경우
      console.log("OKAY!");
    navigate('/result?status=success');
    return
  }
}
