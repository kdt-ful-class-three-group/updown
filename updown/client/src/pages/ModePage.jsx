import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

 export function ModePage() {
   const navigate = useNavigate();
  return (
    <div>
      <h1>모드선택</h1>
      <Button btnName={'EASY'} onClick={() => navigate('/easy')}/>
      <Button btnName={'NORMAL'} onClick={() => navigate('/normal')}/>
      <Button btnName={'HARD'} onClick={() => navigate('/hard')}/>
    </div>
  )
}