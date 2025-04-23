import { Form, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { Input } from "../components/Input";

export const Login = () => {
  const [id, setIdValue] = useState('');
  const [pw, setPwValue] = useState('');
  const navigate = useNavigate();
  
  const fetchGet = () => {
    fetch("http://localhost:8003/", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(`${err} 에러발생`));
  }

  useEffect(() => {
    fetchGet();
  }, [])

  console.log(id);
  console.log(pw);

return <>
        <input type="text" onChange={(e)=> (setIdValue(e.target.value))} />
        <input type="password" onChange={(e)=>(setPwValue(e.target.value))}/>
        {/* <Input placeholder="id" type="text"/>
        <Input placeholder="pw" type="text"/> */}
        <Button btnName={"로그인"} onClick={() => {navigate('/game')}}/>
        <Button btnName={"회원가입"} onClick={() => {navigate('/SignUp')}}/>
       </>
}
