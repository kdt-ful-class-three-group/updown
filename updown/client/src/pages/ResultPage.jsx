import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Div,Heading } from '../components/Tag';

//* ResultPage 컴포넌트 - 결과 페이지
//* 성공, 실패 결과에 따라 페이지 이동할 예정 - 지금은 성공일 때만 작동
export function ResultPage({name}) {
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

  // * 닉네임이라는 변수를 useState를 사용해서 관리
  const [nickName, setNickName] = useState('');

  const successOrFail = status === 'success';

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
     useEffect(() => {
      if (!name) {
        navigate('/');
      }
    }, [name, navigate]); 


// * Div의 Children으로 moveEvent와 historyBox를 넣어줌
// * successOrFail이 true일 때와 false일 때를 나누어 줌
// * successOrFail이 true일 때는 닉네임을 입력받는 버튼을 추가로 보여줌
  return (
        <> { name ? (
      <Div>
        <Heading number={1} content={successOrFail ? '성공' : '실패'} />
        <Div children={successOrFail ? 
          <>
          {moveEvent}
          <Button btnName={'기록하기'} onClick={() => { 
              let nickName = prompt("닉네임을 입력하세요", setNickName(''));
              if(nickName) {
              console.log(`닉네임 : ${nickName}`);
              navigate(-3);
              }
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
        ) : (
          <></>
        )
     }
        </>
      // </Div>
  )
}

