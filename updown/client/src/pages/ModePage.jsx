import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../context/MessageContext";

//* ModePage 컴포넌트 - 모드 선택 페이지
//* EASY, NORMAL, HARD 모드 선택 후 각 페이지로 이동
export function ModePage() {
  // useNavigate 훅을 사용하여 페이지 이동
  const { message, setMessage } = useMessage("");

  const navigate = useNavigate();

  useEffect(() => {
    // 페이지가 렌더링될 때 message를 초기화
    setMessage("");
  }, []);

  return (
    <div className="main-content">
      <div>
        <img src="/upDown_logo.png" className="start-logo" />
        <h1>모드선택</h1>
      </div>
      <div>
        <button className="all-btn easy" onClick={() => navigate("/easy")}>
          EASY
        </button>
        <button className="all-btn normal" onClick={() => navigate("/normal")}>
          NORMAL
        </button>
        <button className="all-btn hard" onClick={() => navigate("/hard")}>
          HARD
        </button>
      </div>
    </div>
  );
}
