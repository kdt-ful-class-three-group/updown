import React from "react";

export const Input = ({type = "text", placeholder = "", value, id, className = ""}) => 

    <input
      type={type}  
      placeholder={placeholder}
      value={value}
      className={`${className}`}
      id={id}
    />
