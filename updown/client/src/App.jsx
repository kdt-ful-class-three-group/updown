import React from "react";
import { Routes, Route } from "react-router-dom";

// 템플릿이 들어가있는 페이지들
import { StartPage } from "./Pages/StartPage";
import { LoginPage } from "./Pages/LoginPage";
import { ModePage } from "./Pages/ModePage";
import { GamePage } from "./Pages/GamePage";
import { SignUpPage } from "./Pages/SignUpPage";
import { ResultPage } from "./Pages/ResultPage";
import { Provider } from './context/MessageContext';


import "./App.css";

// 라우터 경로설정
function App() {
  return (
    // <Routes> 컴포넌트는 react-router-dom에서 제공하는 라우팅 기능을 사용하기 위한 컴포넌트 그리고 각 경로에 해당하는 컴포넌트를 지정
    // path는 URL 경로를 지정
    <Provider>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mode" element={<ModePage />} />
        <Route path="/:level" element={<GamePage />} />
        {/* 쿼리스트링으로 레벨 값을 가져오기 위해서 사용 */}
        <Route path="/:level/result" element={<ResultPage />} />
      </Routes>
    </Provider>
      
  );
}

export default App;