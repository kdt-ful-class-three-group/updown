// src/pages/StartPage.jsx
import React from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
  const logoutHandle = async () => {
    // 로그아웃 처리
    try {
        await fetch("http://localhost:8003/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
    }
    catch (err) {
      console.log(`${err} 에러발생`);
    }
  }


  return (
    <div>
      <header>
        <button onClick={logoutHandle}>로그아웃</button>
      </header>

      <main>
      <Outlet />
        {/* Outlet 컴포넌트는 중첩된 라우트를 렌더링하는 역할을 함 */}
        {/* Outlet은 부모 라우트에서 자식 라우트를 렌더링할 위치를 지정하는 역할을 함 */}
        {/* Outlet이 있는 곳에 자식 라우트의 컴포넌트가 렌더링됨 */}
      </main>

      <footer>
        <h1>ㅂㅇ</h1>
      </footer>
    </div>
  );
}

