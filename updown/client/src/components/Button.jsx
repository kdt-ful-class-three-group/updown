import React from "react";

export const Button = ({ btnName, onClick, type = "button" }) => {
  return <button
    type={type}
    onClick={onClick}>
    {btnName}
    </button>
}