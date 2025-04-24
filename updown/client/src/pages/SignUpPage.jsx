import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

export const SignUpPage = ({nickName}) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const userData = {
    id: id,
    password: password,
    name: name,
    email: email
  };
  
  const onClickBtn = async () => {
    if (id === "" || password === "" || name === "" || email === "") {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8003/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log(data);

      alert("가입이 완료되었습니다.");
      navigate('/login');

    } catch (err) {
      console.log(`${err} 에러발생`);
    }
  };

  return (
          <> (
            <>
              <h1>회원가입</h1>
              <div>
              <input type="text" placeholder="아이디" value={id} onChange={(e)=> setId(e.target.value)}/>
              <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
              <input type="text" placeholder="이름" name="name" value={name} onChange={(e)=> setName(e.target.value)} />
              <input type="text" placeholder="이메일" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
              <Button btnName={"가입"} type="submit" onClick={onClickBtn} />
              </div>
            </>
    ) </> 
  )
}
