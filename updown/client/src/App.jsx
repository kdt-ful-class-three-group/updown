import React from "react";
import { Routes, Route } from "react-router-dom";

// 템플릿이 들어가있는 페이지들
import { StartPage } from "./pages/StartPage";
import { LoginPage } from "./pages/loginPage";
import { ModePage } from "./pages/ModePage";
import { GamePage } from "./pages/GamePage";
import { ResultPage } from "./pages/ResultPage";
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
        <Route path="/mode" element={<ModePage />} />
        <Route path="/:level" element={<GamePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Provider>
      
  );
}

export default App;