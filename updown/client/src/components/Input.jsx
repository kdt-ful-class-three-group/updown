import React from "react";

//* Input 컴포넌트
//* - type: input 타입 (default: text)
//* - placeholder: input placeholder (default: "")
//* - name: input name (form 요소 참조용)
//* - id: input id (default: "")
//* - className: input 클래스 (default: "")
export const Input = ({
  type = "text",
  placeholder = "",
  name = "",
  id = "",
  className = "",
  ...rest
}) => 
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    id={id}
    className={`${className}`}
    {...rest}
  />;