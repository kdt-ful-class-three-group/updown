import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// 템플릿이 들어가있는 페이지들
import { StartPage } from "./Pages/StartPage";
import { LoginPage } from "./Pages/LoginPage";
import { ModePage } from "./Pages/ModePage";
import { GamePage } from "./Pages/GamePage";
import { SignUpPage } from "./Pages/SignUpPage";
import { ResultPage } from "./Pages/ResultPage";
import { Provider } from './context/MessageContext';
import { UserData } from "./components/UserData";

import "./App.css";

// 라우터 경로설정
function App() {

    // * 로그인 할 때, 닉네임 값을 받아서, name 이라는 변수에 저장 하기 위해 useState 사용
    // ! LoginPage에서 setName을 통해서 name을 변경함.
    const [name, setName] = useState("");

  return (
    // <Routes> 컴포넌트는 react-router-dom에서 제공하는 라우팅 기능을 사용하기 위한 컴포넌트 그리고 각 경로에 해당하는 컴포넌트를 지정
    // path는 URL 경로를 지정
    <Provider>
        {/* 로그인 했을 때, 유저 데이터를 표출하는 UserData 컴포넌트 사용 */}
        <>
        <UserData name={name} setName={setName} />
        </>

      <Routes>
        <Route path="/" element={<StartPage setName={setName} />} />
        <Route path="/login" element={<LoginPage setName={setName} />} />
        <Route path="/signup" element={<SignUpPage nickName={name} />} />
        <Route path="/mode" element={<ModePage name = {name}/>} />
        <Route path="/:level" element={<GamePage name = {name}/>} />
        <Route path="/result" element={<ResultPage name = {name}/>} />
      </Routes>
    </Provider>
      
  );
}

export default App;