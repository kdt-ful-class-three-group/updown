export function InputNum({ value, max, answer}) {
  const num = value.trim();

  if (num === "") {
    alert("숫자를 입력해주세요");
    return;
  }
  if (isNaN(num)) {
    alert("숫자만 입력해주세요");
    return;
  }

  const guess = Number(num);
  if (guess < 1 || guess > max) {
    alert(`1~${max} 사이 숫자를 입력하세요`);
    return;
  }

  guessNum({ guess, answer});
}

function guessNum({ guess, answer}) {
 if (guess > answer) {
      console.log("down");
    } else if (guess < answer) {
      console.log("up");
    } else {
      console.log("okay");
    }
}
