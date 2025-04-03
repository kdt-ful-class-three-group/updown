import React, { useState } from "react";

//* 나중에 버튼이벤트에서 난이도에 맞게 사용하면 됨 
  // useState 상태설정. maxNum은 easy모드 max가 10이니 초기값 10설정.
  
  export function GameStart(level){
    const [maxNum, setMaxNum] = useState(10);
    const [randomNum, setRandomNum] = useState(0);
    
    let max = 10;

    if (level === 'easy') max;
    if (level === 'normal') max = 50;
    if (level === 'hard') max = 100;
    setMaxNum(max);

    
    const random = Math.floor(Math.random() * max) + 1;
    setRandomNum(random);
    console.log(`Game Start! ${level} 모드}`)
  };

    const inputNum = (value) => {
      // trim함수이용해서 공백제거 
      const num = value.trim();

      // 아무것도 입력안했을 때 조건문
      if (num === "") {
        alert("숫자를 입력해주세요");
        return;
      }
      if (isNaN(num)) {
        alert("숫자만 입력해주세요");
        return;
      }
      if (num < 1 || num > 10) {
        alert("1~10 사이 숫자를 입력하세요");
        return;
      }
      guessNum(num);
    }


  function guessNum(value) {

    const guess = Number(value);
    // 각자 조건문 안에 업 다운 문구 표출하게 두면 될듯.
    if (guess > randomNumber) {
      console.log("down");
    } else if (guess < randomNumber) {
      console.log("up");
    } else {
      console.log("okay");
    }
  }

