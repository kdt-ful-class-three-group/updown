import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Div, Heading } from '../components/Tag';
import { useGame } from '../components/GameContext';

export function ResultPage() {
  const { randomNum } = useGame();
  console.log(randomNum);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');
  const historyString = queryParams.get('history');
  const history = historyString ? historyString.split(',').map(Number) : [];
  console.log(history);
  const successOrFail = status === 'success';
  const recordRef = useRef(false);

  useEffect(() => {
    if (!sessionStorage.getItem('id')) {
      console.log('로그인을 해주세요.');
      navigate('/login'); // 또는 다른 인증되지 않은 사용자 처리
      return;
    }

    // * 랜덤넘버가 null값이거나, history에 randomNum의 값이 담겨있지 않으면 모드 선택 화면으로 돌아간다.
    if (randomNum === null && !history.includes(randomNum)) {
      navigate('/mode');
      console.log('잘못된 접근');
      return;
    }
  }, [randomNum, history, navigate]);

  useEffect(() => {
    if (!sessionStorage.getItem('id') || recordRef.current || randomNum === null) {
      return;
    }
    recordRef.current = true;

    const user_id = sessionStorage.getItem('id');
    const mode = queryParams.get('level');
    const key = 'data';
    const gameRecordSave = sessionStorage.getItem(key);

    if (gameRecordSave) {
      console.log('이미 저장함');
      return;
    }

    const gameRecord = {
      user_id,
      mode,
      success: successOrFail ? 1 : 0,
      answer: randomNum, // Context에서 가져온 randomNum 사용
    };
    console.log(gameRecord);
    sessionStorage.setItem(key, JSON.stringify(gameRecord));

    fetch('http://localhost:8003/record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameRecord),
    })
      .then((response) => {
        if (response.ok) {
          console.log('기록 저장되었습니다.');
        } else {
          console.error('기록 저장 실패');
          alert('기록 저장 실패');
        }
      });
  }, [recordRef, navigate, queryParams, successOrFail, randomNum]);

  const moveEvent = (
    <>
      <Button btnName={'다시하기'} onClick={() => { sessionStorage.removeItem('data'); navigate(-1); }} />
      <Button btnName={'모드선택'} onClick={() => { sessionStorage.removeItem('data'); navigate(-2); }} />
      <Button btnName={'홈'} onClick={() => { sessionStorage.removeItem('data'); navigate(-3); }} />
    </>
  );

  const historyBox = (
    <Div>
      <p>이전에 입력한 숫자</p>
      {history.map((num, index) => <p key={index}>{num}</p>)}
      {Array(4 - history.length).fill(null).map((_, index) => <p key={`empty-${index}`}></p>)}
    </Div>
  );

  return (
    (sessionStorage.getItem('id') ? 
    <Div>
      <Heading number={1} content={successOrFail ? '성공' : '실패'} />
      <Div>
        {moveEvent}
        {historyBox}
      </Div> 
    </Div>
    : 
    ""
    )
  );
}