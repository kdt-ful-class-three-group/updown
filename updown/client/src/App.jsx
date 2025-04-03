import React from "react";
import { Routes, Route } from "react-router-dom";

// 템플릿이 들어가있는 페이지들
import { StartPage } from "./pages/StartPage";
import { ModePage } from "./pages/ModePage";
import { GamePage } from "./pages/GamePage";

// 라우터 경로설정
function App() {
  return (
    <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/mode" element={<ModePage />} />
        <Route path="/:level" element={<GamePage />} />
    </Routes>
  );
}

export default App;