import React from "react";

export const Button = ({ btnName, Click, type = "button" }) => {
  return <button type={type} Click>{btnName}</button>
}