import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

const signup_valid = ({id, password, name, email}) => {
  const validation = [
    {condition : id === '', message : "아이디를 입력해주세요"},
    {condition : password === '', message : "비밀번호를 입력해주세요"},
    {condition : name === '', message : "이름 입력해주세요"},
    {condition : !email.includes("@") === '', message : "이메일 형식이 아닙니다."}
  ]

  for(let validate of validaiton){
    if(validate.condition){
      alert(validation.message)
      return false
    }
  }
  return true;
};

export const SignUpPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  
  // 클릭하면 fetch 실행
  const onClickBtn = async () => {
    // 유효성 검사
    const valid = signup_valid({id, password, name, email});
    
    // 유효성 검사 통과하면 실행
    if(valid){
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
    }

  };

  return(
  <>
    <h1>회원가입</h1>
    <div>
    <input type="text" placeholder="아이디"  onChange={(e)=> setId(e.target.value)}/>
    <input type="password" placeholder="비밀번호"  onChange={(e) => setPassword(e.target.value)} />
    <input type="text" placeholder="이름" name="name"  onChange={(e)=> setName(e.target.value)} />
    <input type="text" placeholder="이메일" name="email" onChange={(e)=> setEmail(e.target.value)} />
    <Button btnName={"가입"} type="submit" onClick={onClickBtn} />
    </div>
  </> 
  )

}
