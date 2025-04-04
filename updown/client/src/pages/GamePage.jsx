// 리액트, 훅
import React, { useMemo, useRef, useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMessage } from '../context/MessageContext';

// 레벨별 설정값.
import { levelData } from '../config/levelData';

// 정답 맞추는 로직 함수
import { InputNum } from '../utils/InputNum';

// 태그 컴포넌트들
import { Div, Heading } from '../components/Tag';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

//*  이지,노말,하드 모두 한 템플릿(GamePage)에서 작동

export function GamePage() {
  // useParams를 통해 url에서 level(easy, normal, hard) 가져오기
  const { level } = useParams();

  const navigate = useNavigate();
  // useState를 통해 input값을 관리
  const [inputValue, setInputValue] = useState('');
  // useMessage를 통해 message값을 관리
  // useMessage는 MessageContext에서 만든 커스텀 훅
  const { message, setMessage } = useMessage();
  // useMemo를 통해 level에 따라 maxNum을 설정
  
  // levelData에서 level에 해당하는 설정값을 가져옴
  const setting = useMemo(() => levelData[level], [level]);
  const maxNum = setting.max;
  const [count, setCount] = useState(setting.count);
  
  //! randomNum을 한 번만 초기화
  const randomNum = useRef(null);
  // useEffect를 통해 randomNum을 초기화
  useEffect(() => {
    // 시작할 때 콘솔이 두번찍히는 이유는 main.jsx에  <StrictMode>가 있기 때문. 두번 렌더링되서 그런것
    // StrictMode를 제거하면 한 번만 렌더링됨 or if (randomNum.current === null) 조건을 추가해서 한 번만 렌더링되게 할 수 있음
    if (randomNum.current === null) {
      randomNum.current = Math.floor(Math.random() * maxNum) + 1;
      console.log(`Game Start! - ${level} mode`);
      console.log(randomNum.current);
    }
  }, [maxNum]);

  // inputHandler는 input값을 관리하는 함수
  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };


  return (
    <Div>
      <Div>
        <Heading number={1} content={level} />
      </Div>
      <Div>
        {/* UP,DOWN 메세지가 들어갈 컨테이너  */}
        <Heading number={1} content={message}/>
      </Div>
      <Div>
        <Input value={inputValue} onChange={inputHandler} />
        <Button
          btnName="확인"
          onClick={() =>
            InputNum({
              value: inputValue,
              max: maxNum,
              answer: randomNum.current,
              setMessage,
              navigate,
              count,
              setCount
            })
          }
        />
      </Div>
      </Div>
      
  );
}