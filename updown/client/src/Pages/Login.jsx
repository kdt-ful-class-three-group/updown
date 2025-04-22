import { Form, useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Input } from "../components/Input";

export const Login = () => {

  const navigate = useNavigate();
return <>
        <Form>
        <Input placeholder="id" type="text"/>
        <Input placeholder="pw" type="text"/>
        <Button btnName={"로그인"} onClick={() => {navigate('/game')}}/>
        </Form>
        <Button btnName={"회원가입"} onClick={() => {navigate('/SignUp')}}/>
       </>
}
