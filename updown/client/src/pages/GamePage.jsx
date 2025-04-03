import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

export function GamePage() {
  const { level } = useParams();

  const [maxNum, setMaxNum] = useState(10);
  const [randomNum, setRandomNum] = useState(0);
      
  useEffect(() => {
    let max = 10;

    if (level === 'normal') max = 50;
    if (level === 'hard') max = 100;

    setMaxNum(max);
    const random = Math.floor(Math.random() * max) + 1;
    setRandomNum(random);
       
    console.log(`Game Start! ${level} mode}`)
  }, [level]);
  
  return (
    <div>gd</div>
  )
}