import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const RankingPage = () => {
  const [rankingData, setRankingData] = useState([]);
  const [mode, setMode] = useState("easy");

  const fetchRankingData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8003/ranking?mode=${mode}`
      );
      if (!response.ok) {
        throw new Error("랭킹 에러");
      }
      const data = await response.json();
      console.log(data);
      setRankingData(data);
    } catch (error) {
      console.error("Error fetching ranking data:", error);
    }
  };

  useEffect(() => {
    fetchRankingData(mode);
  }, [mode]);

  const modeClick = (selectMode) => {
    setMode(selectMode);
  };

  // 성공률까지 만들어서 배열 저장. 내림차순으로 정렬 후 상위 10개 표출
  const sortedData = rankingData.map((item) => ({
    name : item.name,
    mode : item.mode,
    success : item.success,
    total : item.total,
    rate : Math.round((item.success / item.total) * 100)
  })).sort((a,b) => b.rate - a.rate).slice(0,9)



  return (
    <div>
      <h1>랭킹</h1>
      <div>
        <button className="all-btn easy" onClick={() => modeClick("easy")}>
          EASY
        </button>
        <button className="all-btn normal" onClick={() => modeClick("normal")}>
          NORMAL
        </button>
        <button className="all-btn hard" onClick={() => modeClick("hard")}>
          HARD
        </button>
      </div>
      <div>
        <table className="ranking-table">
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
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.mode}</td>
                <td>{item.success}</td>
                <td>{item.total}</td>
                <td>{item.rate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
