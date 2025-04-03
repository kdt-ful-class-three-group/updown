import React from "react";

export const Button = ({ btnName, type = "button" }) => {
  return <button type={type}>{btnName}</button>
}