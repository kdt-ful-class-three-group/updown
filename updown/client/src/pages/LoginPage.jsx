import React from "react";
import { LoginForm } from "../components/LoginForm";
import { Div } from "../components/Tag";
import { Heading } from "../components/Tag";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

//* LoginPage 컴포넌트 - 로그인 페이지
//* - 로그인 후 /mode 페이지로 이동
export function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = document.querySelectorAll('input');
  
  //   const loginData = []
  
  //   try {
  //     const response = await fetch("http://localhost:8003/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userData),
  //     });
  
  //     const data = await response.json();
  //     console.log(data);
  
  //   // 로그인 처리 후 /mode 페이지로 이동
  //   navigate("/mode");
  //   } catch (error) {
  //     console.log(`${error} 에러발생`);
  //   }
  // };
  const userData = {
    user_id: input[0].value,
    password: input[1].value,
  };

  try {
    const response = await fetch("http://localhost:8003/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      navigate('/mode');
    } else {
      const errorData = await response.json();
      alert(errorData.message); // "아이디 또는 비밀번호가 올바르지 않습니다."
    }
  } catch (error) {
    console.log("로그인 중 오류 발생:", error);
    alert("서버 오류가 발생했습니다.");
  }
};
 

  return (
    <>
    <Div className="login-form">
      <Heading number={1} content={"로그인"} />
      <LoginForm onSubmit={handleSubmit} />
      <Button btnName={"회원가입"} onClick={() => {navigate("/signup")}}></Button>
    </Div>
    </>
  );
}