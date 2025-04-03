import React from "react";

export const Button = ({id, btnName, onClick, type = "button" }) => {
  return <button
    id={id}
    type={type}
    onClick={onClick}>
    {btnName}
    </button>
}