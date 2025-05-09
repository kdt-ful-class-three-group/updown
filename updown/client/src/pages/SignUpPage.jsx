import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { SignUpValid } from "./SignValid"
import { useMessage } from "../context/MessageContext"

export const SignUpPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [validID, setValidID] = useState(null);
  const [validName, setVaildName] = useState(null);
  const {message, setMessage} = useMessage();
  const navigate = useNavigate();
  
  const getFetch = async () => {
    try {
      const res = await fetch("http://localhost:8003/idsearch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id : (id !== "" ? id : null ), name : (name !== "" ? name : null )}),
      });
  
      const {idData, nameData} = await res.json();
      console.log('id:',idData);
      console.log('name:',nameData);
      // true, false값을 받아옴.
      setValidID(idData);
      setVaildName(nameData);
    } catch (err) {
      console.log(`${err} 에러발생`);
    }
  };




  const onClickBtn = async () => {

    // 유효성검사가 true면 실행
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

  }

  useEffect(() => {
    console.log(validID);
    if(validID === true) {
      setMessage('사용중인 아이디 입니다.');
    } else if(validID === false) {
      setMessage('사용가능한 아이디 입니다.');
    } else {
      setMessage('');
    }
  }, [validID]);

  useEffect(() => {
    console.log(validName);
    if(validName === true) {
      setMessage('사용중인 닉네임 입니다.');
    } else if(validName === false) {
      setMessage('사용가능한 닉네임 입니다.');
    } else {
      setMessage('');
    }
  }, [validName]);

      // {/* 아이디가 중복되면 p태그로 출력 */}
  return <>
    <h1>회원가입</h1>
    <div className="signup">
      <input type="text" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} />
      {message === '사용중인 아이디 입니다.' ? message : ''}
      {message === '사용가능한 아이디 입니다.' ? message : ''}
      <button onClick={getFetch}>id 중복 확인</button>
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="이름" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      {message === '사용중인 닉네임 입니다.'  ? message : ''}
      {message === '사용가능한 닉네임 입니다.'  ? message : ''}
      <button onClick={getFetch}>닉네임 중복 확인</button>
      <input type="text" placeholder="이메일" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button btnName={"가입"} type="submit" onClick={onClickBtn} />
    </div>
  </>
}
// {/* {validID ? <p>중복된 아이디입니다.</p> : <p>사용가능한 ID 입니다.</p>} */}
// {/* {validName ? <p>중복된 닉네임 입니다.</p> : <p>사용가능한 닉네임 입니다.</p>} */}
