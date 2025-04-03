import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Button } from "./Button";

export const Select = ({address, detail}) => {
  return (
    <Link to = {address}>
      <Button btnName={detail}/>
    </Link>  
  )
}