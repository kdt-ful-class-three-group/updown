import React from "react";
import { useEffect} from "react";
import { useState } from "react";

export const RankingPage = () => {

  const [rankingData, setRankingData] = useState([]);
  const [mode, setMode] = useState('easy');

  const fetchRankingData = async () => {
    try {
      const response = await fetch(`http://localhost:8003/ranking?mode=${mode}`);
      if (!response.ok) {
        throw new Error('랭킹 에러');
      }
      const data = await response.json();
      setRankingData(data);
    } catch (error) {
      console.error('Error fetching ranking data:', error);
    }
  };

  useEffect(() => {
    fetchRankingData(mode);
  },[mode]);

  const modeClick = (selectMode) => {
    setMode(selectMode);
  }


  return (
    <div>
      <h1>랭킹</h1>
      <div>
        <button onClick={() => modeClick('easy')}>EASY</button>
        <button onClick={() => modeClick('normal')}>NORMAL</button>
        <button onClick={() => modeClick('hard')}>HARD</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>이름</th>
              <th>모드</th>
              <th>성공횟수</th>
              <th>시도횟수</th>
              <th>성공률</th>
            </tr>
          </thead>
          <tbody>
            {rankingData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.mode}</td>
                <td>{item.success}</td>
                <td>{item.total}</td>
                <td>{item.success / item.total * 100}%</td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>
    </div>
  )
}

