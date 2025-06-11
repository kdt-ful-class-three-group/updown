// src/pages/StartPage.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useLogout } from "../components/Auth/Logout";

import { RankingPage } from "./RankingPage";
import { useEffect } from "react";
import { urlData } from "../config/urlData";

export function Layout() {
  
  // 랭킹,내 정보 상태값
  const [isInfoOpen, setisInfoOpen] = useState(false);
  const [isRankOpen, setRankOpen] = useState(false);
  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [pw, setPw] = useState("");
  const [rePw, setRePw] = useState("");
  const [name, setName] = useState("");
  const [samePw, setSamePw] = useState('');
  const [easyData, setEasyData] = useState([]);
  const [normalData, setNormalData] = useState([]);
  const [hardData, setHardData] = useState([]);

  const id = sessionStorage.getItem('id');


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

  const nameChange = () => {
    setNameModalOpen(prev => !prev);
  }

  // 커스텀 훅
  const logout = useLogout();


  // 세션 스토리지에서 id를 가져옴
  const username = sessionStorage.getItem("name");



    const changePw = async () => {
    if(pw === rePw) {
          try {
            const res = await fetch(`${urlData.url}/change/pw`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: id,
                password: pw
              }),
            });

            const data = await res.json();
            console.log(data.message);

            if(data.message === `${id}의 비밀번호 변경 성공`)  {
              alert('비밀번호 변경 성공');
              setPwModalOpen(false);
              setPw('');
              setRePw('');
            }
          } catch (err) {
            console.log(`${err} 에러발생`);
          }
        } else {
          alert('비밀번호가 일치하지 않습니다.')
        }
  }

      const changeName = async () => {
        if(username === name) {
          alert('같은 닉네임으로는 변경이 안됩니다.');
        } else {
          try {
            const res = await fetch(`${urlData.url}/change/name`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: id,
                name: name
              }),
            });

            const data = await res.json();
            console.log(data.message);

            if(data.message === `${id}의 닉네임 변경 성공`)  {
              sessionStorage.setItem("name", name);
              alert('닉네임 변경 성공');
              setNameModalOpen(false);
              setName('');
            }
          } catch (err) {
            console.log(`${err} 에러발생`);
          }
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
    },[pw, rePw])


    const fetchMyRankingData = async (mode) => {
    try {
      const response = await fetch(
        `http://${urlData.url}/ranking/myRank?mode=${mode}&id=${id}`
      );
      if (!response.ok) {
        throw new Error("랭킹 에러");
      }
      const data = await response.json();
      console.log(data);
      if(mode === 'easy') {
        setEasyData(data);
      } else if (mode === 'normal') {
        setNormalData(data);
      } else if (mode === 'hard') {
        setHardData(data);
      }
    } catch (error) {
      console.error("Error fetching ranking data:", error);
    }
  };

    useEffect(() => {
      fetchMyRankingData('easy');
      fetchMyRankingData('normal');
      fetchMyRankingData('hard');
    }, [isInfoOpen]);

    // useEffect(() => {
    //   console.log(easyData);
    //   console.log(normalData);
    //   console.log(hardData);
    // }, [easyData, normalData, hardData])

    // const rankingData = [
    //   easyData,
    //   normalData,
    //   hardData
    // ];
    
    const rankingData = [
      { ...easyData[0], mode: 'easy' },
      { ...normalData[0], mode: 'normal' },
      { ...hardData[0], mode: 'hard' },
    ];

  const sortedData = rankingData.map((item) => {
    if (!item || item.success === undefined || item.total === undefined) {
      return {
        mode: item?.mode || '',
        success: 0,
        total: 0,
        rate: 0,
      };
    }
  
    return {
      mode: item.mode,
      success: item.success,
      total: item.total,
      rate: item.total > 0 ? Math.round((item.success / item.total) * 100) : 0,
    };
  });

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
          <button className="all-btn" onClick={nameChange}>닉네임 변경</button>
          <button className="all-btn" onClick={pwChange}>
            비밀번호 변경
          </button>
          </div>
          <div className="height over-scroll border">
        <table className="ranking-table">
          <thead className="stiky bg-white">
            <tr>
              <th>모드</th>
              <th>성공횟수</th>
              <th>시도횟수</th>
              <th>성공률</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td>{item.mode}</td>
                <td>{item.success}</td>
                <td>{item.total}</td>
                <td>{item.rate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        {nameModalOpen && 
        <div className="modal">
          <div className="find-form">
          <input
            type="text"
            placeholder={username}
            value={name}
            onChange={(e) => {
              setName(e.target.value); 
            }}
          />
          
          <div className="login-btn">
            <button className="all-btn" type="submit" onClick={changeName}>
              닉네임 변경
            </button>
            <button className="all-btn" type="submit" onClick={() => {
              setNameModalOpen(false);
              setName(''); 
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

