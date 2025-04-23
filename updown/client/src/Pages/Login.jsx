import { Form, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { Input } from "../components/Input";

export const Login = () => {
  const [id, setIdValue] = useState('');
  const [pw, setPwValue] = useState('');
  const navigate = useNavigate();
  
  // id와 pw를 POST로 보냄
  async function fetchPost() {
    const res = await fetch("http://localhost:8003/login", {
      method : "POST", 
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        id : id,
        pw : pw,
      }),
    })
    const data = await res.json();
    console.log(data);
    if(data){
      alert('로그인에 성공하였습니다');
      navigate('/game')
    }
    else{
      alert('다시 시도해주세요');
    }
  }

  // useEffect(() => {
  //   fetchGet();
  // }, [])

  console.log(id);
  console.log(pw);

return <>
        <input type="text" onChange={(e)=> (setIdValue(e.target.value))} />
        <input type="password" onChange={(e)=>(setPwValue(e.target.value))}/>
        {/* <Input placeholder="id" type="text"/>
        <Input placeholder="pw" type="text"/> */}
        <Button btnName={"로그인"} onClick={fetchPost}/>
        <Button btnName={"회원가입"} onClick={() => {navigate('/SignUp')}}/>
       </>
}
