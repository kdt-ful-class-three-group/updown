import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { Button } from "../components/Button"

export const SignUp = () => {
  
  const navigate = useNavigate();
  const [id, setIdValue] = useState('');
  const [pw, setPwValue] = useState('');
  const [name, setNameValue] = useState('');
  const [email, setEmailValue] = useState('');

  const fetchGet = () =>{
    fetch("http://localhost:8003/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id : id,
        pw : pw,
        name: name,
        email : email
      })
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(`${err} 에러발생`));
    alert("가입이 완료되었습니다.");
    navigate('/login')
  }


  // console.log(idValue);
  // console.log(pwValue);
return <>
        {/* <Input placeholder="id" type="text"/>
        <Input placeholder="pw" type="password"/> */}
        {/* id와 pw 임의로 input 생성 */}
        <input placeholder="id" type="text" onChange={(e) => setIdValue(e.target.value)} />
        <input placeholder="pw" type="password" onChange={(e) => setPwValue(e.target.value)} />
        <input placeholder="name" type="name" onChange={(e) => setNameValue(e.target.value)} />
        <input placeholder="email" type="email" onChange={(e) => setEmailValue(e.target.value)} />
        <Button btnName={"가입"} type="submit" onClick={fetchGet}/>
       </>
}
