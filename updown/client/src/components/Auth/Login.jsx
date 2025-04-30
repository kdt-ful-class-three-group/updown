import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {

  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const login = async (id, password) => {
    
    if (id === "" || password === "") {
      alert("아이디 또는 비밀번호를 입력해주세요.");
      return;
    }
    
    try {
      const res = await fetch("http://localhost:8003/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
        credentials: "include",
      });
        
      const data = await res.json();
      console.log(data);

        if (res.status === 200) {

          sessionStorage.setItem("id", id);
          sessionStorage.setItem("name", data.nickname);
          
          alert(`${data.nickname}님 환영합니다.`);
          navigate('/mode')

        }
        else {

          setId("");
          setPassword("");
          alert("아이디 또는 비밀번호가 틀렸습니다.");

        }
    }
    
      catch (err) {
        console.log(`${err} 에러발생`);
    }
  }
  return login
}