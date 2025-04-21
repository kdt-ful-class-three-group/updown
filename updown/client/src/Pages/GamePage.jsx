import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

export const GamePage = () => {
  const navigate = useNavigate();
return <>
        <Button btnName={"게임 진행"} onClick={() => {navigate('/gameEnd')}}/>
       </>
}