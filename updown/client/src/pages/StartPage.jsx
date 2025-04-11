// src/pages/StartPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Div } from "../components/Tag"  
import { Button } from "../components/Button"

//* StartPage 컴포넌트 - 시작 페이지
//* 버튼 클릭 시 모드 선택 페이지로 이동
export function StartPage() {
  // useNavigate 훅을 사용하여 페이지 이동
  const navigate = useNavigate();

  return (
    <Div>
      <Button btnName={'START'} onClick={() => navigate('/login')}/>
    </Div>
  );
}

