import { createContext, useContext, useState } from 'react';

//* Context API

//* 1. Context 생성
const Context = createContext();

//* 2. Provider 생성
export function Provider({ children }) {
  const [message, setMessage] = useState('');
  return (
//* 3. Provider로 감싸기
    <Context.Provider value={{ message, setMessage }}>
      {children}
    </Context.Provider>
  );
}

//* 4. Context를 사용하기 위한 커스텀 훅
export function useMessage() {
  return useContext(Context);
}
