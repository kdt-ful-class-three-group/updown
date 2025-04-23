import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { useState } from "react";

export const Login = ({setName}) => {
  
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  

return <> 
        <input placeholder="id" type="text" onChange={(e) => {setId(e.target.value)}}/>
        <input placeholder="pw" type="text" onChange={(e) => {setPw(e.target.value)}}/>
        <Button btnName={"로그인"} onClick={() => {
          const postData = {id, pw};
          if(id === "" || pw === ""){
            alert("모든 항목을 입력해주세요.");
            return; 
          } else { 
                fetch(`http://localhost:8003/login`, {
                method: "POST",
                headers: { 
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({postData})
              })
                // .then((response) => {
                //   response.json();
                //   if(response.status === 200) {
                //     alert('로그인 성공');
                //     navigate('/game'); 
                //   } else if (response.status === 401){
                //     alert('아이디 또는 비밀번호가 잘못되었습니다.')
                //   } else {
                //     alert('서버 오류');
                //   }
                // })
                .then((response) => response.json())
                // .then((data) => console.log(data))
                .then((data) => {console.log(data)
                if(data.message === '로그인 성공') {
                  setName(data.name);
                  alert('로그인 성공')
                  navigate('/game'); 
                } else if (data.message === '아이디가 존재하지 않습니다.') {
                  alert('아이디가 존재하지 않습니다.');
                } else if (data.message === '비밀번호가 올바르지 않습니다.') {
                  alert('비밀번호가 올바르지 않습니다.');
                } else {
                  alert('서버 오류');
                }
          })
                .catch((err) => console.log(`${err} 에러발생`)); 
            
              // if(data.message === 200){
              //   alert('로그인 성공');
              //   navigate('/game')
              // } else if (response.status === 401){
              //   alert('로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.');
              // } else {
              //   alert('로그인 실패: 서버 오류');
              // }
            }}}/>

            
        <Button btnName={"회원가입"} onClick={() => {navigate('/SignUp')}}/>
       </>
}
