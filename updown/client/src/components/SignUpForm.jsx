import React from "react";
import { Button } from "./Button";
import { Input } from "./Input";



export const SignUpForm = ({ onSubmit, className, action }) => { 

  return (
    <form className={className} onSubmit={onSubmit} action={action}>
      <Input type="text" placeholder="아이디" />   
      <Input type="password" placeholder="비밀번호" />
      <Input type="text" placeholder="닉네임" />   
      <Input type="text" placeholder="이메일" />   
      <Button btnName="회원가입" type="submit"></Button>
    </form>
  )
}