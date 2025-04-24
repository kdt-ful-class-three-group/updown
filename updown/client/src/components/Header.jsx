import React from "react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom";

export const Header = ({name, setName}) => {
  const navigate = useNavigate();
return ( 
    <header>
      {name && <div>어서오세요 {name}님</div>}
      {name && <Button btnName={"로그아웃"} onClick={() => {if(confirm('정말로 로그아웃하시겠습니까?')) {setName(""); navigate('/'); alert('로그아웃 되셨습니다.')}}} />}
    </header>
 )
}
