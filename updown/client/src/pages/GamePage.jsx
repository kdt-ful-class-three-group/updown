// 리액트, 훅
import React, { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

// 태그 컴포넌트들
import { Div, Heading } from '../components/Tag' 
import { Button } from '../components/Button'
import { Input } from '../components/Input';

// 정답 맞추는 로직 함수
import { InputNum } from '../utils/InputNum';

//*  이지,노말,하드 모두 한 템플릿에서 작동
export function GamePage() {
  const { level } = useParams();
  const [inputValue, setInputValue] = useState('');


  const maxNum = useMemo(() => {
    if (level === 'normal') return 50;
    if (level === 'hard') return 100;
    return 10;
  }, [level]);

  //! input에 입력하면 콘솔이 계속찍힘
  const randomNum = useRef(Math.floor(Math.random() * maxNum) + 1);
  console.log(`Game Start! - ${level} mode`);
  console.log(randomNum.current);
    
  const inputHandler = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  }

    return (
      <Div>
        <Div>
          <Heading>업다운</Heading>
          <p>1~{maxNum} 사이의 숫자</p>
        </Div>

        <Div>
          <Input value={inputValue} onChange={inputHandler} />
          <Button 
            btnName="확인" 
            onClick={() => InputNum({ value: inputValue, max: maxNum, answer: randomNum.current })} 
          />
        </Div>
      </Div>
      
    );
  }