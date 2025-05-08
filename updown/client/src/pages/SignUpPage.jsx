import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { SignUpValid } from "./SignValid"
import { checkedIdName } from "../components/Auth/CheckIdName"

export const SignUpPage = () => {
  // 상태값 관리
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ id: '', name: '', password: '' });

  const navigate = useNavigate();

  const updateMessage = (field, text) => {
    setMessage(prev => ({ ...prev, [field]: text }));
  };

  const onClickBtn = async () => {
    // 유효성검사가 true면 실행
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
    updateMessage('password', '비밀번호를 다시 확인해 주세요.');
    } else {
    updateMessage('password', '');
    }
  }, [password, passwordCheck])



  return <>
    <h1>회원가입</h1>
    <div className="signup-form">

      <div className="form-group">
          <input type="text" placeholder="아이디" value={id} name='user_id' onChange={(e) => setId(e.target.value)} />
          <div className="form-message">{message.id}</div>
          <button className="signup-btn" onClick={() => { checkedIdName({ field: 'id', value: id, setMessage: (msg) => updateMessage('id', msg) }) }}>중복확인</button>
      </div>

      <div className="form-group">
          <input type="password" placeholder="비밀번호" value={password} name="pw" onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="form-group">
          <input type="password" placeholder="비밀번호 체크" value={passwordCheck} name="pw_check" onChange={(e) => setPasswordCheck(e.target.value)} />
          <div className="form-message">{message.password}</div>
          <button className="signup-btn" onClick={passwordCheckBtn}>비밀번호 확인</button>
      </div>
      
      <div className="form-group">
          <input type="text" placeholder="이름" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="form-message">{message.name}</div>
          <button className="signup-btn" onClick={() => { checkedIdName({ field: 'name', value: name, setMessage: (msg) => updateMessage('name', msg) }) } }>중복확인</button>
      </div>

      <div className="form-group">
          <input type="text" placeholder="이메일" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <Button btnName={"가입"} type="submit" onClick={onClickBtn} />

    </div>
  </>
}
