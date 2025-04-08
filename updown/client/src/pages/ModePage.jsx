import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Div, Heading } from "../components/Tag";

//* ModePage 컴포넌트 - 모드 선택 페이지
//* EASY, NORMAL, HARD 모드 선택 후 각 페이지로 이동
 export function ModePage() {
  // useNavigate 훅을 사용하여 페이지 이동
   const navigate = useNavigate();
  return (
    <Div>
      <Div>
      <h1>모드선택</h1>
      </Div>
      <Div>
        <Button btnName={'EASY'} onClick={() => navigate('/easy')}/>
        <Button btnName={'NORMAL'} onClick={() => navigate('/normal')}/>
        <Button btnName={'HARD'} onClick={() => navigate('/hard')}/>
      </Div>
    </Div>
  )
}