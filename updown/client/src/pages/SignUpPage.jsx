import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { SignUpValid } from "./SignValid"
import { checkedIdName } from "../components/Auth/CheckIdName"
import { useMessage } from "../context/MessageContext";

export const SignUpPage = () => {
  // 상태값 관리
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { message, setMessage } = useMessage();

  const navigate = useNavigate();

  useEffect(() => {
    setMessage("");
  }, [])

  const onClickBtn = async () => {
    // 유효성검사가 true면 실행
    if(message.id === "사용가능한 아이디입니다." && message.name === "사용가능한 닉네임입니다." && message.password === "") {
    if(password === passwordCheck) {
    const validPass = SignUpValid({id, password, name, email})

    // 유효성 통과가 확인되면 실행
    if (validPass) {
      try {
        const res = await fetch("http://localhost:8003/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id : id, password : password, name : name, email : email}),
        });

        const data = await res.json();
        console.log(data);

        alert("가입이 완료되었습니다.");
        navigate('/login');

      } catch (err) {
        console.log(`${err} 에러발생`);
      }
    };
  } else {
    console.log('비밀번호가 틀림');
  }
  } else {
    alert('중복체크를 전부 진행해 주세요.')
  }
}

  const passwordCheckBtn = () => {
    const pw = document.querySelectorAll('input')[1];
    const pw_check = document.querySelectorAll('input')[2];
    if (pw.type === 'password') {
      pw.type = 'text';
      pw_check.type = 'text';
    } else {
      pw.type = 'password';
      pw_check.type = 'password';
    }
  };

  useEffect(() => {
    if(password !== passwordCheck) {
    setMessage(prev => ({ ...prev, password: '비밀번호를 다시 확인해 주세요.' }))
    } else {
    setMessage(prev => ({ ...prev, password: '' }))
    }
  }, [password, passwordCheck])


  return <>
    <h1>회원가입</h1>
    <div className="signup-form">

      <div className="form-group">
        <div className="input-with-button">
          <input type="text" placeholder="아이디" value={id} name='user_id' onChange={(e) => {setId(e.target.value); message.id = ""}} />
          <button className="input-inline-btn" onClick={() => { checkedIdName({ field: 'id', value: id, setMessage: msg => setMessage(prev => ({ ...prev, id: msg })) }) }}>확인</button>
        </div>
        <div className={message.id === '사용가능한 아이디입니다.' ? "form-message color-blue" : "form-message color-red"}>{message.id}</div>
      </div>

      <div className="form-group">
        <div className="input-with-button">
          <input type="password" placeholder="비밀번호" value={password} name="pw" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-message"></div>
      </div>

      <div className="form-group">
        <div className="input-with-button">
          <input type="password" placeholder="비밀번호 체크" value={passwordCheck} name="pw_check" onChange={(e) => setPasswordCheck(e.target.value)} />
          <button className="input-inline-btn" onClick={passwordCheckBtn}>체크</button>
        </div>
        <div className="form-message color-red">{message.password}</div>
      </div>
      
      <div className="form-group">
        <div className="input-with-button">
          <input type="text" placeholder="이름" name="name" value={name} onChange={(e) => {setName(e.target.value); message.name = ""}} />
          <button className="input-inline-btn" onClick={() => { checkedIdName({ field: 'name', value: name, setMessage: msg => setMessage(prev => ({ ...prev, name: msg })) }) } }>확인</button>
        </div>
        <div className={message.name === '사용가능한 닉네임입니다.' ? "form-message color-blue" : "form-message color-red"}>{message.name}</div>
      </div>

      <div className="form-group">
        <div className="input-with-button">
          <input type="text" placeholder="이메일" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-message"></div>
      </div>

      <button className="signup-btn" type="submit" onClick={onClickBtn}>가입</button>
     
    </div>
  </>
}
