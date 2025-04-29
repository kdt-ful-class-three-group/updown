// src/pages/StartPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export function Layout() {
  const navigate = useNavigate();

  const Logout = async () => {
    // 로그아웃 처리
    try {
        const res = await fetch("http://localhost:8003/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        })
      if(res.ok) {
        alert("로그아웃 성공");
        sessionStorage.clear();
        navigate('/login');
      } else {
        alert("로그아웃 실패");
      }
    }
    catch (err) {
      console.log(`${err} 에러발생`);
    }
  }


  return (
    <div>
      <header>
        <button onClick={Logout}>로그아웃</button>
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

