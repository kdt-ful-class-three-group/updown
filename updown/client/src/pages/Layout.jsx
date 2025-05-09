// src/pages/StartPage.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useLogout } from "../components/Auth/Logout";

import { RankingPage } from "./RankingPage";

export function Layout() {
  
  // 랭킹,내 정보 상태값
  const [isInfoOpen, setisInfoOpen] = useState(false);
  const [isRankOpen, setRankOpen] = useState(false);

  //  랭킹버튼,내 정보 버튼 이벤트
  const rankToggle = () => {
    setRankOpen(prev => !prev);
    setisInfoOpen(false);
  };

  const infoToggle = () => {
    setisInfoOpen(prev => !prev);
    setRankOpen(false);
  };

  // 커스텀 훅
  const logout = useLogout();


  // 세션 스토리지에서 id를 가져옴
  const username = sessionStorage.getItem("name");

  return (
    <div>
      <header>
        <div className="header">
          <button className="all-btn rank"onClick={rankToggle}>랭킹</button>
          <button className="all-btn info" onClick={infoToggle}>내 정보</button>
        </div>
      </header>

      {isInfoOpen && (
        <div className="infoPanel">
          <h2>내 정보</h2>
          <p>{username}님</p>
          <button className="all-btn" onClick={infoToggle}>닫기</button>
          <button className="all-btn" onClick={logout}>로그아웃</button>
        </div>
      )}
      {isRankOpen && (
        <div className="rankPanel d-flex column j-between a-center">
          <RankingPage />
          <button className="all-btn" onClick={rankToggle}>닫기</button>
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

