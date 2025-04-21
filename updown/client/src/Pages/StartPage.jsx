import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

export const StartPage = () => {

  const navigate = useNavigate();
return <>
        <Button btnName={"가입"} onClick={() => {  
          fetch("http://localhost:8003/login", {
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
        navigate('/game')}}/>
       </>
}
