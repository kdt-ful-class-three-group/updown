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
  // * 데이터를 보내는 코드

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = document.querySelectorAll('input');
  
    const userData = {
      user_id: input[0].value,
      password: input[1].value,
      name: input[2].value,
      e_mail: input[3].value
    };
  
    try {
      const response = await fetch("http://localhost:8003/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
      console.log(data);
  
      // 성공 시 로그인 페이지로 이동
      navigate('/login');
    } catch (error) {
      console.log(`${error} 에러발생`);
    }
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