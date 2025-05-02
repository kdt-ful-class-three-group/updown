import React from "react";
import { useEffect} from "react";
import { useState } from "react";

export const RankingPage = () => {

  const [rankingData, setRankingData] = useState([]);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8003/ranking');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRankingData(data);
      } catch (error) {
        console.error('Error fetching ranking data:', error);
      }
    }
    fetchData();
  }, [rankingData]);


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
              <th>아이디</th>
              <th>모드</th>
              <th>성공횟수</th>
              <th>시도횟수</th>
            </tr>
          </thead>
          <tbody>
            {rankingData.map((item, index) => (
              <tr key={index}>
                <td>{item.user_id}</td>
                <td>{item.mode}</td>
                <td>{item.success}</td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>
    </div>
  )
}

