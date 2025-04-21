import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

export const GameEnd = () => {
  
  const navigate = useNavigate();
return <>
        <Button btnName={"게임종료"} onClick={() => {
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
          navigate('/')}}/>
       </>
}