import React from "react";
import { Button } from "./Button";
import { Input } from "./Input";

export const Form = ({ onSubmit, className, action }) => { 
  return (
    <form className={className} onSubmit={onSubmit} action={action} method="post">
      <Input type="text" placeholder="아이디" />   
      <Input type="password" placeholder="비밀번호" />   
      <Button btnName="로그인" type="submit"></Button>
    </form>
  )
}