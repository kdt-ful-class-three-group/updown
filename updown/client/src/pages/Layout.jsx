// src/pages/StartPage.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useLogout } from "../components/Auth/Logout";

import { RankingPage } from "./RankingPage";
import { useEffect } from "react";

export function Layout() {
  
  // 랭킹,내 정보 상태값
  const [isInfoOpen, setisInfoOpen] = useState(false);
  const [isRankOpen, setRankOpen] = useState(false);
  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [pw, setPw] = useState("");
  const [rePw, setRePw] = useState("");
  const [samePw, setSamePw] = useState('');
  

  //  랭킹버튼,내 정보 버튼 이벤트
  const rankToggle = () => {
    setRankOpen(prev => !prev);
    setisInfoOpen(false);
  };

  const infoToggle = () => {
    setisInfoOpen(prev => !prev);
    setRankOpen(false);
  };

  const pwChange = () => {
    setPwModalOpen(prev => !prev)
  }

  // 커스텀 훅
  const logout = useLogout();


  // 세션 스토리지에서 id를 가져옴
  const username = sessionStorage.getItem("name");

    const changePw = async () => {
    if(pw === rePw) {
          try {
            const res = await fetch("http://localhost:8003/change/pw", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: user_id,
                password: pw
              }),
            });

            const data = await res.json();
            console.log(data.message);

            if(data.message === `${user_id}의 비밀번호 변경 성공`)  {
              alert('비밀번호 변경 성공');
              navigate('/login');
            }
          } catch (err) {
            console.log(`${err} 에러발생`);
          }
        } else {
          alert('비밀번호가 일치하지 않습니다.')
        }
  }

    useEffect(() => {
      if(pw === rePw) {
        if(pw === '' || rePw === '') {
        setSamePw(''); 
        } else {
          setSamePw('비밀번호가 일치합니다.'); 
        }
      } else {
        setSamePw('비밀번호가 일치하지 않습니다.');
      }
    })

  return (
    <div>
      <header>
        <div className="header">
          <button className="all-btn rank"onClick={rankToggle}>랭킹</button>
          <button className="all-btn info" onClick={infoToggle}>내 정보</button>
        </div>
      </header>

      {isInfoOpen && (
        <div className="infoPanel d-flex column">
          <h2>내 정보</h2>
          <p>{username}님</p>
          <div>
          <button className="all-btn" onClick={pwChange}>
            비밀번호 변경
          </button>
          </div>
          <div className="d-flex j-center">
          <button className="all-btn" onClick={infoToggle}>닫기</button>
          <button className="all-btn" onClick={logout}>로그아웃</button>
          </div>
        </div>
      )}
      {isRankOpen && (
        <div className="rankPanel d-flex column j-between a-center">
          <RankingPage />
          <button className="all-btn" onClick={rankToggle}>닫기</button>
        </div>
      )}
      {pwModalOpen && 
        <div className="modal">
          <div className="find-form">
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value); 
            }}
          />
         <input
            type="password"
            placeholder="비밀번호 확인"
            value={rePw}
            onChange={(e) => {
              setRePw(e.target.value);
            }}
          />
          {samePw && 
          <div className={
            samePw === '비밀번호가 일치하지 않습니다.' ?
            "form-message color-red"
            : samePw === '비밀번호가 일치합니다.' ?
            "form-message color-blue"
            : null
            }>
            {samePw}  
          </div>}
          
          <div className="login-btn">
            <button className="all-btn" type="submit" onClick={changePw}>
              비밀번호 변경
            </button>
            <button className="all-btn" type="submit" onClick={() => {
              setPwModalOpen(false)
              setPw(''); 
              setRePw(''); 
              }}>
              취소
            </button>
          </div>
        </div>
        </div> 
        }


      <main>
      <Outlet />
        {/* Outlet 컴포넌트는 중첩된 라우트를 렌더링하는 역할을 함 */}
        {/* Outlet은 부모 라우트에서 자식 라우트를 렌더링할 위치를 지정하는 역할을 함 */}
        {/* Outlet이 있는 곳에 자식 라우트의 컴포넌트가 렌더링됨 */}
      </main>
      
    </div>
  );
}

