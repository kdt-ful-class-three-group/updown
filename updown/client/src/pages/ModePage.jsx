import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Div } from "../components/Tag";

//* ModePage 컴포넌트 - 모드 선택 페이지
//* EASY, NORMAL, HARD 모드 선택 후 각 페이지로 이동
 export function ModePage() {
  // useNavigate 훅을 사용하여 페이지 이동
   const navigate = useNavigate();
  return (
    <Div className="main-content">
      <Div >
      <h1>모드선택</h1>
      </Div>
      <Div>
        <Button className="all-btn easy" btnName={'EASY'} onClick={() => navigate('/easy')}/>
        <Button className="all-btn normal" btnName={'NORMAL'} onClick={() => navigate('/normal')}/>
        <Button className="all-btn hard" btnName={'HARD'} onClick={() => navigate('/hard')}/>
      </Div>
    </Div>
  )
}