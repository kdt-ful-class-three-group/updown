import React from "react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom"

//* UserData 컴포넌트
//* - name, setName 은 App.jsx에서 useState를 사용해 관리하는 props
//* - {name && <코드></코드>} = name이 참일 때만, <코드></코드>를 표출한다는 뜻.
export const UserData = ({ name, setName }) => { 
  const navigate = useNavigate();

// * name 에 값이 있을 경우 div와 button을 표출, 값이 없을 경우 빈태그로 표출
// * 로그아웃 버튼 클릭시 confirm 창이 뜨고, 예를 누르면 name값이 초기화 되고, 초기 화면으로 이동, 아니오를 누르면 그대로 있음.
return <>
        <header>
          { name ? <div>{`${name}님 어서오세요`}</div> : <></>}
          { name ? <Button btnName={'로그아웃'} onClick={() => {
            if(confirm('정말로 로그아웃 하시겠습니까?')) {
            setName(""); 
            navigate('/');
          }}}/> : <></>}
        </header>
       </>
}
