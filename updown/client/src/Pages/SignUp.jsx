import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { useState } from "react";
import { GetFetch } from "../../public/modules/GetFetch";


export const SignUp = () => {
  const [ id, setId ] = useState("");
  const [ pw, setPw ] = useState("");
  const [ name, setName ] = useState("");
  const [ e_mail, setEmail ] = useState("");
  
  const navigate = useNavigate();
return <>        
        <input placeholder="id" onChange={(e) => {setId(e.target.value)}} />
        <input placeholder="pw" onChange={(e) => {setPw(e.target.value)}} type="password" />
        <input placeholder="nickName" onChange={(e) => {setName(e.target.value)}} />
        <input placeholder="email" onChange={(e) => {setEmail(e.target.value)}}/>
        <Button btnName={"가입"} onClick={() => {  
          const postData = {id, pw, name, e_mail};
          if(id === "" || pw === "" || name === "" || e_mail === ""){
            alert("모든 항목을 입력해주세요.");
            return;
          } else {
            GetFetch("8003/signUp", "POST", postData);
        alert("가입이 완료되었습니다.");
        navigate('/login')}}}/>
      </>
}
