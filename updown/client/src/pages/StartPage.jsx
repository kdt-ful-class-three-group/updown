import React from "react";
import { useNavigate } from "react-router-dom";

//* StartPage 컴포넌트 - 시작 페이지
//* 버튼 클릭 시 모드 선택 페이지로 이동
export function StartPage() {
  // useNavigate 훅을 사용하여 페이지 이동
  const navigate = useNavigate();

  return (
    <div className="start-page-container">
      <img src="/upDown_logo.png" className="start-logo" />
      <button className="all-btn" onClick={() => navigate("/login")}>
        START
      </button>
    </div>
  );
}
