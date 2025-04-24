import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

export const LoginPage = () => {

  const navigate = useNavigate();
  
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onClickBtn = async () => {
    if (id === "" || password === "") {
      alert("아이디 또는 비밀번호를 입력해주세요.");
      return;
    }
    else {
      try {
        const res = await fetch("http://localhost:8003/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, password }),
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 200) {
          alert("로그인 성공");
          navigate('/mode');
        } else {
          setId("");
          setPassword("");
          alert("아이디 또는 비밀번호가 틀렸습니다.");
        }
      }
      catch (err) {
        console.log(`${err} 에러발생`);
      }
    }
  }
    return <>
      <h1>로그인</h1>
      <div>
        <input type="text" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button btnName={"로그인"} type="submit" onClick={onClickBtn} />
        <Button btnName={"회원가입"} onClick={() => { navigate('/signup') }} />
      </div>
    </>
  }
