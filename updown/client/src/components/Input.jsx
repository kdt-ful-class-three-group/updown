import React from "react";

export const Input = ({type = "text", placeholder = "", value, onChange, id, className = ""}) => 

    <input
      type={type}  
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${className}`}
      id={id}
    />