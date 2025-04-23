import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

export const SignUp = () => {

  const navigate = useNavigate();
return <>
        <input placeholder="id"></input>
        <input placeholder="pw"></input>
        <input placeholder="nickName"></input>
        <input placeholder="email"></input>
        <Button btnName={"가입"} onClick={() => {  
          const input = document.querySelectorAll("input");
          const user_id = input[0].value;
          const password = input[1].value;
          const name = input[2].value;
          const e_mail = input[3].value;
          const postData = {user_id, password, name, e_mail};
          console.log(postData);
          if(user_id === "" || password === "" || name === "" || e_mail === ""){
            alert("모든 항목을 입력해주세요.");
            return;
          } else {
          fetch("http://localhost:8003/login", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({postData})
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((err) => console.log(`${err} 에러발생`));
        alert("가입이 완료되었습니다.");
        navigate('/login')}}}/>
       </>
}
