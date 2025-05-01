import React from 'react';
import { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Div,Heading } from '../components/Tag';
import { useEffect } from 'react';

//* ResultPage 컴포넌트 - 결과 페이지
//* 성공, 실패 결과에 따라 페이지 이동할 예정 - 지금은 성공일 때만 작동
export function ResultPage({easy, setEasy, normal, setNormal, hard, setHard}) {
  // useLocation을 통해 url의 쿼리스트링을 가져옴
  const location = useLocation();
  const navigate = useNavigate();


  // URLSearchParams를 사용하여 쿼리스트링을 파싱
  // location 뒤에 search는 ?status=success 이런식으로 쿼리스트링을 가져옴
  const queryParams = new URLSearchParams(location.search);

  // * url에서 status의 값을 가져옴. status는 success, fail로 나뉨
  const status = queryParams.get('status'); 

  // * url에서 history의 값을 가져옴. history는 이전에 입력한 숫자들
  // * history는 문자열로 되어있으므로 split(',')을 사용하여 ,기준으로 나누어 배열로 변환 이후, map(Number)로 숫자로 변환.
  const history = queryParams.get('history').split(',').map(Number); // 문자열을 숫자로 변환 

  // * 게임 페이지에서, 결과페이지로 url을 보낼때, mode라는 키에 설정한 값을 가져온다. 
  const mode = queryParams.get('mode');

  // // * 닉네임이라는 변수를 useState를 사용해서 관리
  // const [nickName, setNickName] = useState('');

  // * 성공 여부를 관리, 만일 status가 success라면 true라는 뜻으로 사용가능.
  const successOrFail = status === 'success';
  // * easyMode 라는 변수에 mode의 값이 easy인 경우 true
  const easyMode = mode === 'easy';
  // * normalMode 라는 변수에 mode의 값이 normal인 경우 true
  const normalMode = mode === 'normal';
  // * hardMode 라는 변수에 mode의 값이 hard인 경우 true
  const hardMode = mode === 'hard';


  // * 연속해서 사용되는 button요소들을 묶어서 변수에 담아줌
  const moveEvent = 
    <>
      <Button btnName={'다시하기'} onClick={() => navigate(-1)}/>
      <Button btnName={'모드선택'} onClick={() => navigate(-2)}/>
      <Button btnName={'홈'} onClick={() => navigate(-3)}/>
    </>;   

  // * 연속해서 사용되는 history요소들을 묶어서 변수에 담아줌
  const historyBox = 
  // * history는 최대 4개까지만 생성 되므로, 이후 스타일을 넣을 때, 모든 칸에 underline을 만들어 주기 위해, 밀 p태그를 생성해둠, 
  <>
    <Div>
      <p>이전에 입력한 숫자</p>
      <p>{history[0]}</p>
      <p>{history[1]}</p>
      <p>{history[2]}</p>
      <p>{history[3]}</p>
    </Div>
  </>;

// * 게임데이터 라는 변수에 db에 보낼 데이터들을 지정해준다.
const gameData = {
  // * name은 세션스토리지의 name값
  name : sessionStorage.getItem('name'),
  // * mode는 queryParams로 가져온 mode의 값
  mode : mode,
  // * challenge는 easy, normal, hard 각각에 대한, App.jsx에서 가져온 매개변수들
  challenge : {
    easy : easy,
    normal : normal,
    hard : hard
  },
  // * successOrFail은 queryParams로 가져온 status의 값.
  successOrFail : status,
  // * history는 queryParams로 가져온 history의 값 들.
  history : {
    first : history[0],
    second : history[1],
    third : history[2],
    fourth : history[3],
  },
};


// * useEffect로 easy, normal, hard 값이 바뀔 때 마다 실행되는 함수를 지정.
  useEffect(() => {
    // * 만일 mode가 easy라면?
    if(easyMode) {
      // * easy의 값이 1씩 올라간다.
      return setEasy( easy++ );
    // * 만일 mode가 normal 이라면?
    } else if (normalMode) {
      // * normal의 값이 1씩 올라간다.
      return setNormal( normal++ );
    // * 만일 mode가 hard라면?
    } else if (hardMode) {
      // * hard의 값이 1씩 올라간다.
      return setHard( hard++ );
    }
  }, [easy, normal, hard])


// * Div의 Children으로 moveEvent와 historyBox를 넣어줌
// * successOrFail이 true일 때와 false일 때를 나누어 줌
// * successOrFail이 true일 때는 닉네임을 입력받는 버튼을 추가로 보여줌
  return (
      <Div>
        <Heading number={1} content={successOrFail ? '성공' : '실패'} />
        <Div children={successOrFail ? 
          <>
          {moveEvent}
          <Button btnName={'기록하기'} onClick={async () => { 
              // let nickName = prompt("닉네임을 입력하세요", setNickName(''));
              // if(nickName) {
              // console.log(`닉네임 : ${nickName}`);
              // navigate(-3);
              // }
              // * 기록하기 버튼 클릭시 콘솔 로그로 gameData의 데이터를 표출
              console.log(gameData);
          }}/> 
          {historyBox}
          </>
          
          : 
          <>
          {moveEvent}
          {historyBox}
          </>
          } />
          {/* 페이지 이동 버튼들 */}
          {/* navigate 경로를 '/' 직접설정할 수 있지만 -숫자 이렇게 쓰면 숫자만큼 뒤로 갈 수 있음.
          서로의 장단점은 아직 모르겠음 */}

        </Div>
      // </Div>
  )
}

