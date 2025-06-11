import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpValid } from "./SignValid";
import { checkedIdName } from "../components/Auth/CheckIdName";
import { useMessage } from "../context/MessageContext";
import { urlData } from "../config/urlData";

export const SignUpPage = () => {
  // 상태값 관리
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { message, setMessage } = useMessage();
  const [emailChecked, setEmailChecked] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0); // 초 단위
  const timerRef = useRef(null);
  const [sendingCode, setSendingCode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setMessage("");
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
  }, []);

  const onClickBtn = async () => {
    // 유효성검사가 true면 실행
    if (
      message.id === "사용가능한 아이디입니다." &&
      message.name === "사용가능한 닉네임입니다." &&
      message.email === "사용가능한 이메일입니다." &&
      passwordMessage === "" &&
      codeVerified
    ) {
      if (password === passwordCheck) {
        const validPass = SignUpValid({ id, password, name, email });

        // 유효성 통과가 확인되면 실행
        if (validPass) {
          try {
            const res = await fetch(`${urlData.url}/signup`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: id,
                password: password,
                name: name,
                email: email,
              }),
            });

            const data = await res.json();
            console.log(data);

            alert("가입이 완료되었습니다.");
            navigate("/login");
          } catch (err) {
            console.log(`${err} 에러발생`);
          }
        }
      } else {
        console.log("비밀번호가 틀림");
      }
    } else {
      alert("모든 인증 절차를 완료해주세요.");
    }
  };

  const passwordCheckBtn = () => {
    const pw = document.querySelectorAll("input")[1];
    const pw_check = document.querySelectorAll("input")[2];
    if (pw.type === "password") {
      pw.type = "text";
      pw_check.type = "text";
    } else {
      pw.type = "password";
      pw_check.type = "password";
    }
  };

  useEffect(() => {
    if (password !== passwordCheck) {
      setPasswordMessage("비밀번호를 다시 확인해 주세요.");
    } else {
      setPasswordMessage("");
    }
  }, [password, passwordCheck]);

  // ! 추가

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
    } else {
      alert(data.msg || "인증 실패");
    }
  };


  return (
    <>
      <h1>회원가입</h1>
      <div className="signup-form">
        <div className="form-group">
          <div className="input-with-button">
            <input
              type="text"
              placeholder="아이디"
              value={id}
              name="user_id"
              onChange={(e) => {
                setId(e.target.value);
                setMessage((prev) => ({ ...prev, id: "" }));
              }}
            />
            <button
              className="input-inline-btn"
              onClick={() => {
                checkedIdName({
                  field: "id",
                  value: id,
                  setMessage: (msg) =>
                    setMessage((prev) => ({ ...prev, id: msg })),
                });
              }}
            >
              확인
            </button>
          </div>
          <div
            className={
              message.id === "사용가능한 아이디입니다."
                ? "form-message color-blue"
                : "form-message color-red"
            }
          >
            {message.id}
          </div>
        </div>

        <div className="form-group">
          <div className="input-with-button">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              name="pw"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-message"></div>
        </div>

        <div className="form-group">
          <div className="input-with-button">
            <input
              type="password"
              placeholder="비밀번호 체크"
              value={passwordCheck}
              name="pw_check"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <button className="input-inline-btn" onClick={passwordCheckBtn}>
              체크
            </button>
          </div>
          <div className="form-message color-red">{passwordMessage}</div>{" "}
        </div>

        <div className="form-group">
          <div className="input-with-button">
            <input
              type="text"
              placeholder="이름"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setMessage((prev) => ({ ...prev, name: "" }));
              }}
            />
            <button
              className="input-inline-btn"
              onClick={() => {
                checkedIdName({
                  field: "name",
                  value: name,
                  setMessage: (msg) =>
                    setMessage((prev) => ({ ...prev, name: msg })),
                });
              }}
            >
              확인
            </button>
          </div>
          <div
            className={
              message.name === "사용가능한 닉네임입니다."
                ? "form-message color-blue"
                : "form-message color-red"
            }
          >
            {message.name}
          </div>
        </div>

        <div className="form-group">
          <div className="input-with-button">
            <input
              type="text"
              placeholder="이메일"
              name="email"
              value={email}
              disabled={emailChecked}
              onChange={(e) => {
                setEmail(e.target.value)
                setMessage((prev) => ({ ...prev, email: "" }))
                setCodeVerified(false);
                setCodeSent(false);
                setEmailCode("");
                setTimeLeft(0);
                if (timerRef.current) clearInterval(timerRef.current);
              }}
            />
            {!emailChecked ? 
            <button
              className="input-inline-btn"
              onClick={() => {
                checkedIdName({
                  field: "email",
                  value: email,
                  setMessage: (msg) => {
                      setMessage((prev) => ({ ...prev, email: msg }))
                    if (msg === "사용가능한 이메일입니다.") {
                      setEmailChecked(true); // ✅ 중복체크 성공 시 비활성화
                    } else {
                      setEmailChecked(false);
                    }       
                  },
                });
              }}
            >
              확인
            </button>
            :
            <button
              className="input-inline-btn"
              onClick={() => {
                setEmailChecked(false);
              }}
            >
              변경
            </button>
            }
          </div>
          <div
            className={
              message.email === "사용가능한 이메일입니다."
                ? "form-message color-blue"
                : "form-message color-red"
            }
          >
            {message.email}
          </div>
        </div>

            {emailChecked && (
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

        <button className="all-btn" type="submit" onClick={onClickBtn}>
          가입
        </button>
      </div>
    </>
  );
};
