import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Div,Heading } from '../components/Tag';

//* ResultPage 컴포넌트 - 결과 페이지
//* 성공, 실패 결과에 따라 페이지 이동할 예정 - 지금은 성공일 때만 작동
export function ResultPage() {
  const navigate = useNavigate();

  return (
      <Div>
        <Heading number={1} content="성공" />
        <Div>
          {/* 페이지 이동 버튼들 */}
          {/* navigate 경로를 '/' 직접설정할 수 있지만 -숫자 이렇게 쓰면 숫자만큼 뒤로 갈 수 있음.
          서로의 장단점은 아직 모르겠음 */}
          <Button btnName={'다시하기'} onClick={() => navigate(-1)}/>
          <Button btnName={'모드선택'} onClick={() => navigate(-2)}/>
          <Button btnName={'홈'} onClick={() => navigate(-3)}/>
        </Div>
      </Div>
  )
}
