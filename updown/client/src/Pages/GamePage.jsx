import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { useEffect } from "react";

export const GamePage = ({name}) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate('/');
    }
  }, [name, navigate]);

return (      
  <> { name ? (
      <>
        <Button btnName={"게임 진행"} onClick={() => {navigate('/gameEnd')}}/>
       </>
            ) : (
               <></>
            )}
             </>
       );
}