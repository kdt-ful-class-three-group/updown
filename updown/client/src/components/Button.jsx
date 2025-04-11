import React from "react";

//* Button 컴포넌트
//* - btnName: 버튼 이름
//* - onClick: 버튼 클릭 시 실행되는 함수
//* - type: 버튼 타입 (default: button)

export const Button = ({ btnName, onClick, type = "button", id}) => {
  return <button
    type={type}
    onClick={onClick}>
    {btnName}
    </button>
}