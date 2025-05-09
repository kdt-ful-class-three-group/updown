import React, { useState, useEffect } from "react";
import { useLogin } from "../components/Auth/Login";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  useEffect(() => {
    // 세션 스토리지에서 id를 가져옴
    const userId = sessionStorage.getItem("id");

    if (userId) {
      navigate("/mode");
    }
  }, [navigate]);

  const onClickBtn = () => {
    login(id, password, setId, setPassword);
  };

  return (
    <>
      <img src="/upDown_logo.png" className="start-logo" />
      <h1>로그인</h1>
      <div className="login-form">
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="login-btn">
          <Button
            className="all-btn"
            btnName={"로그인"}
            type="submit"
            onClick={onClickBtn}
          />
          <Button
            className="all-btn"
            btnName={"회원가입"}
            onClick={() => {
              navigate("/signup");
            }}
          />
        </div>
      </div>
    </>
  );
};
