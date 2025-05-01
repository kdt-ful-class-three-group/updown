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
  // * history와 status는 바뀔 값들이기에 useState를 통해 관리
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState(null);


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

  // 다시하기를 했을 때 up,down 메세지가 그대로 남아있어 useEffect를 사용하여 message를 초기화
  useEffect(() => {
    setMessage('');
  }, [])

  // *useEffect를 사용하여, status값이 변경되면, navigate를 통해 결과 페이지로 이동
  // * status는 success, fail로 나뉨 => InputNum에 status를 변경하는 코드가 있음.
  useEffect(() => {
    if (status !== null) {
      // * 들어오는 status에 따라 header에 성공, 실패가 결정되고, history의 데이터를 통해, 이전에 입력한 숫자에 대한 내용이 결정 된다.
      // * navigate를 GamePage에서 관리를 하는 이유는 InputNum에서는 status와 history를 InputNum 함수의 매개 변수로 받아오는데, 그러면 useEffect를 사용해 status와 history를 관리 할 수 없다. 그리고, useEffect를 사용해야 하는 이유는, status와 history가 바뀐 이후에 navigate를 해야 하는데, useEffect를 사용하지 않으면, navigate가 먼저 실행되고, history가 바뀌지 않고 넘어가 마지막으로 입력한 history가 추가 되지 않기 때문. 
      navigate(`/result?status=${status}&history=${history}&mode=${level}`);
    }
  }, [status, history])

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
        <Heading number={1} content={message} />
        <Div className={count === 1 ? "color-red" : ""} children={`남은기회 : ${count}`} />
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
              count,
              setCount,
              history,
              setHistory,
              setStatus
            })
          }
        />
      </Div>
      <Div>
        <p>이전에 입력한 숫자</p>
        <p>{history[0]}</p>
        <p>{history[1]}</p>
        <p>{history[2]}</p>
        <p>{history[3]}</p>
      </Div>
    </Div>
  );
}