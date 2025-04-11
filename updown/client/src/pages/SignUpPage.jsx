import React from "react";
import { SignUpForm } from "../components/SignUpForm";
import { Div } from "../components/Tag";
import { Heading } from "../components/Tag";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

//* LoginPage 컴포넌트 - 로그인 페이지
//* - 로그인 후 /mode 페이지로 이동
export function SignUpPage() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // 로그인 처리 후 /mode 페이지로 이동
    navigate("/login");
  };

  return (
    <>
    <Div className="login-form">
      <Heading number={1} content={"회원가입"} />
      <SignUpForm onSubmit={handleSubmit} />
    </Div>
    </>
  );
}