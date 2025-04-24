import React from "react";

//* Main 컴포넌트
//* - children: Main에 들어갈 내용
//* - Main은 페이지의 주요 내용을 담는 컴포넌트
//* - Main은 Header와 Footer 사이에 위치함
export const Main = ({ children }) => <main>{ children }</main>