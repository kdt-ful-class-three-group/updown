import React from "react";
import { Form } from "../components/form";
import { Div } from "../components/Tag";
import { Heading } from "../components/Tag";
import { useNavigate } from "react-router-dom";

//* LoginPage 컴포넌트 - 로그인 페이지
//* - 로그인 후 /mode 페이지로 이동
export function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // 로그인 처리 후 /mode 페이지로 이동
    navigate("/mode");
  };

  return (
    <Div className="login-form">
      <Heading number={1} content={"로그인"} />
      <Form onSubmit={handleSubmit} />
    </Div>
  );
}