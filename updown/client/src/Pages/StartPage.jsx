import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

export const StartPage = () => {

  const navigate = useNavigate();
return <>
        <Button btnName={"로그인"} onClick={() => {navigate('/login')}}/>
       </>
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 