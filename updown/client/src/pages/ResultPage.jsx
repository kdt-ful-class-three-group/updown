import React from "react";
import { useEffect, useRef } from "react";
import { data, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Div, Heading } from "../components/Tag";
// import { setEmitFlags } from 'typescript';

//* ResultPage 컴포넌트 - 결과 페이지
//* 성공, 실패 결과에 따라 페이지 이동할 예정 - 지금은 성공일 때만 작동
export function ResultPage() {
  const recordRef = useRef(false);
  // useLocation을 통해 url의 쿼리스트링을 가져옴
  const location = useLocation();
  const navigate = useNavigate();

  // URLSearchParams를 사용하여 쿼리스트링을 파싱
  // location 뒤에 search는 ?status=success 이런식으로 쿼리스트링을 가져옴
  const queryParams = new URLSearchParams(location.search);

  // * url에서 status의 값을 가져옴. status는 success, fail로 나뉨
  const status = queryParams.get("status");

  // * url에서 history의 값을 가져옴. history는 이전에 입력한 숫자들
  // * history는 문자열로 되어있으므로 split(',')을 사용하여 ,기준으로 나누어 배열로 변환 이후, map(Number)로 숫자로 변환.
  const history = queryParams.get("history").split(",").map(Number); // 문자열을 숫자로 변환

  const successOrFail = status === "success";
  // * 연속해서 사용되는 button요소들을 묶어서 변수에 담아줌
  const moveEvent = (
    <>
      <Button
        className="all-btn"
        btnName={"다시하기"}
        onClick={() => {
          sessionStorage.removeItem("data");
          navigate(-1);
        }}
      />
      <Button
        className="all-btn"
        btnName={"모드선택"}
        onClick={() => {
          sessionStorage.removeItem("data");
          navigate(-2);
        }}
      />
      <Button
        className="all-btn"
        btnName={"홈"}
        onClick={() => {
          sessionStorage.removeItem("data");
          navigate(-3);
        }}
      />
    </>
  );

  // * 연속해서 사용되는 history요소들을 묶어서 변수에 담아줌
  // * history는 최대 4개까지만 생성 되므로, 이후 스타일을 넣을 때, 모든 칸에 underline을 만들어 주기 위해, 밀 p태그를 생성해둠,
  const historyBox = (
    <>
      <Div className={"history-box"}>
        <div className="history start">이전에 입력한 숫자</div>
        <div className="history">{history[0]}</div>
        <div className="history">{history[1]}</div>
        <div className="history">{history[2]}</div>
        <div className="history end">{history[3]}</div>
      </Div>
    </>
  );

  // * useEffect를 사용해서 ResultPage가 렌더링 될 때 DB에 저장.
  useEffect(() => {
    if (!sessionStorage.getItem("id") || !sessionStorage.getItem("passed")) {
      // 세션이 없는 상태에서 접근하면 오류를 발생
      console.log("유효하지 않는 접근입니다.");
      sessionStorage.removeItem("passed");
      sessionStorage.removeItem("data");
      navigate("/mode");
    } else {
      if (recordRef.current) return;
      recordRef.current = true;

      const user_id = sessionStorage.getItem("id");
      const mode = queryParams.get("level");
      const key = "data";

      const gameRecordSave = sessionStorage.getItem(key);
      if (gameRecordSave) {
        sessionStorage.removeItem("passed");
        sessionStorage.removeItem("data");
        navigate("/mode");
        console.log("이미 저장함");
        return;
      }

      const gameRecord = {
        user_id, // 세션에서 가져온 아이디
        mode, // url에서 가져옴
        success: successOrFail ? 1 : 0, // 성공여부
      };
      console.log(gameRecord);

      sessionStorage.setItem(key, JSON.stringify(gameRecord));

      const validPass = sessionStorage.getItem("passed");

      if (validPass) {
        fetch("http://localhost:8003/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gameRecord),
        }).then((response) => {
          if (response.ok) {
            console.log("기록 저장되었습니다.");
            // alert('기록 저장되었습니다.');
          } else {
            console.error("기록 저장 실패");
            alert("기록 저장 실패");
          }
        });
      }
    }
  }, []);

  // * Div의 Children으로 moveEvent와 historyBox를 넣어줌
  // * successOrFail이 true일 때와 false일 때를 나누어 줌
  // * successOrFail이 true일 때는 닉네임을 입력받는 버튼을 추가로 보여줌
  return (
    <Div>
      <Heading number={1} content={successOrFail ? "성공" : "실패"} />

      <Div
        className="result-box"
        children={
          successOrFail ? (
            <>
              <div>{moveEvent}</div>
              <div>{historyBox}</div>
            </>
          ) : (
            <>
              <div>{moveEvent}</div>
              <div>{historyBox}</div>
            </>
          )
        }
      />
      {/* 페이지 이동 버튼들 */}
      {/* navigate 경로를 '/' 직접설정할 수 있지만 -숫자 이렇게 쓰면 숫자만큼 뒤로 갈 수 있음.
          서로의 장단점은 아직 모르겠음 */}
    </Div>
    // </Div>
  );
}
