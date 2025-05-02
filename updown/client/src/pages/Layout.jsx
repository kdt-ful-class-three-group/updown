// src/pages/StartPage.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useLogout } from "../components/Auth/Logout";
import { useNavigate } from "react-router-dom";

export function Layout() {
  
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const navigate = useNavigate();

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const rankingBtn = () => {
    // 랭킹 버튼 클릭 시 /ranking 페이지로 이동
    navigate('/ranking');
  }


  const logout = useLogout();
  // 세션 스토리지에서 id를 가져옴
  const username = sessionStorage.getItem("name");

  return (
    <div>
      <header>
        <button onClick={rankingBtn}>랭킹</button>
        <button className="info" onClick={togglePanel}>내 정보</button>
      </header>

      {isPanelOpen && (
        <div className="infoPanel">
          <h2>내 정보</h2>
          <p>{username}님</p>
          <button onClick={togglePanel}>닫기</button>
          <button onClick={logout}>로그아웃</button>

        </div>
      )}

      <main>
      <Outlet />
        {/* Outlet 컴포넌트는 중첩된 라우트를 렌더링하는 역할을 함 */}
        {/* Outlet은 부모 라우트에서 자식 라우트를 렌더링할 위치를 지정하는 역할을 함 */}
        {/* Outlet이 있는 곳에 자식 라우트의 컴포넌트가 렌더링됨 */}
      </main>
      
    </div>
  );
}

