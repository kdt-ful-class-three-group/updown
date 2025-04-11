import React from "react";

//* Input 컴포넌트
//* - type: input 타입 (default: text)
//* - placeholder: input placeholder (default: "")
//* - value: input 값
//* - onChange: input 값 변경 시 실행되는 함수
//* - id: input id (default: "")
//* - className: input 클래스 (default: "")
export const Input = ({type = "text", placeholder = "", value, onChange, id, className = ""}) => 

    <input
      type={type}  
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${className}`}
      id={id}
      required
    />