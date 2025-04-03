import React from "react";
import { Routes, Route } from "react-router-dom";
import { StartPage } from "./pages/StartPage";
import { ModePage } from "./pages/ModePage";
import { GamePage } from "./pages/GamePage";

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