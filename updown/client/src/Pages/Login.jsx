import { Form, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { Button } from "../components/Button"
import { Input } from "../components/Input";

export const Login = () => {

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

return <>
        <Input placeholder="id" type="text"/>
        <Input placeholder="pw" type="text"/>
        <Button btnName={"로그인"} onClick={() => {navigate('/game')}}/>
        <Button btnName={"회원가입"} onClick={() => {navigate('/SignUp')}}/>
       </>
}
