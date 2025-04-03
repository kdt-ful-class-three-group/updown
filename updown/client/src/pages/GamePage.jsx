// 리액트, 훅
import React, { useMemo, useRef } from 'react';
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

  const maxNum = useMemo(() => {
    if (level === 'normal') return 50;
    if (level === 'hard') return 100;
    return 10;
  }, [level]);

  const randomNum = useRef(Math.floor(Math.random() * maxNum) + 1);
  console.log(`Game Start! - ${level} mode`);
  console.log(randomNum.current);
    
  const handleSubmit = () => {
    InputNum({
      value: inputValue,
      max: maxNum,
      answer: randomNum.current
    });

    return (
      <Div>
        <Heading number={1} content={level} />
        <Input type='text' />
        <Button btnName={'입력'} onClick={()=> handleSubmit()} />
      </Div>
    );
  }
}