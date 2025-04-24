import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

export const GameEnd = () => {
  
  const navigate = useNavigate();
return <>
        <Button btnName={"다시하기"} onClick={() => {                                                                 
          if(confirm("내용을 기록 하시겠습니까?") === true){
          fetch("http://localhost:8003/gameEnd", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dummy: 1,
            })
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(`${err} 에러발생`));
          navigate('/game')
        }else {
          navigate('/game')}
        }
      }/>
       </>
}