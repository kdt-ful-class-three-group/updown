import React from 'react';
import { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Div,Heading } from '../components/Tag';

//* ResultPage 컴포넌트 - 결과 페이지
//* 성공, 실패 결과에 따라 페이지 이동할 예정 - 지금은 성공일 때만 작동
export function ResultPage() {
  // useLocation을 통해 url의 쿼리스트링을 가져옴
  const location = useLocation();
  const navigate = useNavigate();

  // URLSearchParams를 사용하여 쿼리스트링을 파싱
  // location 뒤에 search는 ?status=success 이런식으로 쿼리스트링을 가져옴
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status'); 
  const [nickName, setNickName] = useState('');

  const successOrFail = status === 'success';

  return (
      <Div>
        <Heading number={1} content={successOrFail ? '성공' : '실패'} />
        <Div children={successOrFail ? 
          <>
          <Button btnName={'다시하기'} onClick={() => navigate(-1)}/>
          <Button btnName={'모드선택'} onClick={() => navigate(-2)}/>
          <Button btnName={'홈'} onClick={() => navigate(-3)}/>
          <Button btnName={'기록하기'} onClick={() => { 
              let nickName = prompt("닉네임을 입력하세요", setNickName(''));
              if(nickName) {
              console.log(nickName);
              navigate(-3);
              }
          }}/> 
          </>
          
          : 
          <>
          <Button btnName={'다시하기'} onClick={() => navigate(-1)}/>
          <Button btnName={'모드선택'} onClick={() => navigate(-2)}/>
          <Button btnName={'홈'} onClick={() => navigate(-3)}/>
          </>
          } />
          {/* 페이지 이동 버튼들 */}
          {/* navigate 경로를 '/' 직접설정할 수 있지만 -숫자 이렇게 쓰면 숫자만큼 뒤로 갈 수 있음.
          서로의 장단점은 아직 모르겠음 */}

        </Div>
      // </Div>
  )
}
