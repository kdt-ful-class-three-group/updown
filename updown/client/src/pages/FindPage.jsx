import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { urlData } from "../config/urlData";

export const FindPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [user_id, setUser_id] = useState("");
  const [pw, setPw] = useState("");
  const [rePw, setRePw] = useState("");
  const [mode, setMode] = useState('id');
  const [pwCheck, setPwCheck] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0); // 초 단위
  const timerRef = useRef(null);
  const [sendingCode, setSendingCode] = useState(false);
  const [message, setMessage] = useState('');
  const [idModal, setIdModal] = useState(false);
  const [pwModal, setPwModal] = useState(false);
  const [findedId, setFindedId] = useState('');
  const [samePw, setSamePw] = useState('');
  

  useEffect(() => {
    // 세션 스토리지에서 id를 가져옴
    const userId = sessionStorage.getItem("id");

    if (userId) {
      navigate("/mode");
    }
  }, [navigate]);

  const onClickBtn = () => {
    {mode === 'id' ? 
      findId(email)
      :
      mode === 'pw' ?
      findPw(user_id, email)
      :
      ''
    }
  };

  const findId = async () => {
          try {
            const res = await fetch(`${urlData.url}/find/id`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email
              }),
            });

            const data = await res.json();

            console.log(data.message, ':', data.user_id);
            setFindedId(`${data.message} : ${data.user_id[0].user_id}`);
            setIdModal(true);
            

          } catch (err) {
            console.log(`${err} 에러발생`);
          }
  }

  const pwClickBtn = async () => {
          try {
            const res = await fetch(`${urlData.url}/find/pw`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: user_id,
                email: email
              }),
            });

            const data = await res.json();
            console.log(data.message);
            setMessage(data.message);

            if(data.message === '아이디 확인 완료.')  {
            setPwCheck(true);
            }
          } catch (err) {
            console.log(`${err} 에러발생`);
          }
  }

    const startTimer = (seconds) => {
    setTimeLeft(seconds);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCodeSent(false); // 인증 만료 → 재발급 버튼 보이기
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendVerificationCode = async () => {
    // 중복 클릭 방지
    if (sendingCode) return;

    setSendingCode(true);

    try {
      const res = await fetch(`${urlData.url}/emailCheck/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        alert("인증코드가 이메일로 전송되었습니다.");
        setCodeSent(true);
        setCodeVerified(false);
        startTimer(180); // 3분
      } else {
        alert("이메일 전송 실패");
      }
    } catch (err) {
      console.error("전송 중 에러:", err);
      alert("오류가 발생했습니다.");
    } finally {
      setSendingCode(false); // 완료 후 버튼 다시 활성화
    }
  };

  const verifyCode = async () => {
    const res = await fetch(`${urlData.url}/emailCheck/verify"`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code: emailCode }),
    });

    const data = await res.json();
    if (data.success) {
      alert("인증 완료!");
      setCodeVerified(true);
      clearInterval(timerRef.current);
      setPwModal(true);
    } else {
      alert(data.msg || "인증 실패");
    }
  };

  const changePw = async () => {
    if(pw === rePw) {
          try {
            const res = await fetch(`${urlData.url}/change/pw"`, {
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
    <>
      <img src="/upDown_logo.png" className="start-logo" />
      {mode === 'id' ? <h1>아이디 찾기</h1> : mode === 'pw' ? <h1>비밀번호 찾기</h1> : null}
      <div className="d-flex">
        <button 
          className="all-btn"
          onClick={() => setMode('id')}>
          아이디 찾기
        </button>
        <button 
          className="all-btn"
          onClick={() => setMode('pw')}>
          비밀번호 찾기
        </button>
      </div>
      
    {mode === 'id' ? 
      <div className="find-form">
        <input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="login-btn">
          <button className="all-btn" type="submit" onClick={onClickBtn}>
            아이디 찾기
          </button>
        </div>
      </div>

       : mode === 'pw' ?  

       <div className="find-form">
        <input
          disabled={pwCheck}
          type="text"
          placeholder="아이디"
          value={user_id}
          onChange={(e) => setUser_id(e.target.value)}
        />

        <input
          disabled={pwCheck}
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {message ? <div className={message ==='일치하는 정보 없음' ? "form-message color-red" : "form-message color-blue"}>
          {message}
          </div> : null}

        {pwCheck && (
              <div className="form-group">
                <div className="input-with-button">
                  <input
                    type="text"
                    maxLength="6"
                    placeholder="인증코드"
                    value={emailCode}
                    onChange={(e) => setEmailCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    disabled={codeVerified}
                  />
                  {!codeSent ? (
                    <button 
                      className="input-inline-btn"
                      onClick={sendVerificationCode}
                      disabled={sendingCode}>
                        {sendingCode ? "전송 중..." : "인증코드 발급"}
                      </button>
                  ) : (
                    <button 
                      className="input-inline-btn"
                      onClick={verifyCode} disabled={codeVerified}>
                      확인
                    </button>
                  )}
                </div>
                {codeSent && !codeVerified && (
                  <div className="form-message">남은 시간: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</div>
                )}
                {codeVerified && <div className="form-message color-blue">이메일 인증 완료</div>}
              </div>
            )}

      {!pwCheck ?
        <div className="login-btn">
          <button className="all-btn" type="submit" onClick={pwClickBtn}>
            아이디 이메일 확인
          </button>
        </div>
      :
        <div className="login-btn">
          <button className="all-btn" type="submit" onClick={onClickBtn}>
            비밀번호 찾기
          </button>
        </div>
      }
      </div>
      : null }

      {idModal ? 
      <div className="modal">
        <div className="d-flex column">
        <p>
        {findedId}
        </p>

        <button 
          className="all-btn"
          onClick={() => navigate('/login')}>
          로그인 화면으로
        </button>
        </div>
      </div>
      : null }

      {pwModal ? 
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
        </div>
      </div>
      </div> 
      : null}
    </>
  );
};
