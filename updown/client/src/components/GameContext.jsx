import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

// * provider로 랜덤 넘버와 셋 랜덤넘버를 관리.
export const GameProvider = ({ children }) => {
  const [randomNum, setRandomNum] = useState(null);

  return (
    <GameContext.Provider value={{ randomNum, setRandomNum }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);