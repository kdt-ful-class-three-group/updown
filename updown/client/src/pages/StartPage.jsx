// src/pages/StartPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Div } from "../components/Tag"  
import { Button } from "../components/Button"

export function StartPage() {
  const navigate = useNavigate();

  return (
    <Div>
      <Button btnName={'START'} onClick={() => navigate('/mode')}/>
    </Div>
  );
}

