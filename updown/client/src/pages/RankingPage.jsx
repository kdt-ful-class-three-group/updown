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
      console.log(data);
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

  // 성공률까지 만들어서
  const sortedData = rankingData.map((item) => ({
    name : item.name,
    mode : item.mode,
    success : item.success,
    total : item.total,
    // * rate를 %를 추가해서 데이터를 가공하는 경우, -> %는 유니코드로 문자열로 취급되어 js에서 숫자열 + '%' 를 넣으면 문자열 '숫자%' 로 변환된다.
    // rate : Math.round((item.success / item.total) * 100) + %
    // * 문자열이 아닌 숫자열로써 사용하기 위해서 + %를 지우고, 사용한다.
    rate : Math.round((item.success / item.total) * 100)
  }))

  console.log(sortedData);
  // 확률 기준으로 정렬
  sortedData.sort(function (a, b) {
  
    // * >, <, = 의 형태의 부호들은 true, false 값으로 판단해서, '숫자%'를 이해할 수 있다. 
    // if (a.rate > b.rate) {
    //   return 1;
    // }
    // if (a.rate < b.rate) {
    //   return -1;
    // }
    // // a must be equal to b
    // return 0;
    // * 그러나 b - a, b + a 와 같은 형태로 사용하는 경우에는 숫자열만을 인식한다. 
    // * 만일 위에서 rate에 %를 '+ %' 로 추가한 경우 .split으로 '%'앞의 것만 불러와서, 문자열 형태로 사용한다.
    // retrun b.rate.split('%')[0] - a.rate.split('%')[0] 
    return b.rate - a.rate;
  });

  console.log(sortedData);
  // * 위에서 + %를 지웠으므로, 표출 할 때, %를 추가해준다. {item.rat}로만 되어있던 부분을 {item.rate}{'%'} 로 변경해 준다.
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
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.mode}</td>
                <td>{item.success}</td>
                <td>{item.total}</td>
                <td>{item.rate}{'%'}</td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>
    </div>
  )
}

