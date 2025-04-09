import React from "react";

//* Tag 컴포넌트

//* Paragraph 컴포넌트
//* - children: Paragraph에 들어갈 내용
//* - className: Paragraph에 추가할 클래스 이름
export const Paragraph = ({ children, className = ""}) => {
  return <p className={`${className}`}>{children}</p>;
}

//* Heading 컴포넌트
//* - number: Heading의 레벨 (1~6)
//* - content: Heading에 들어갈 내용
export const Heading = ({ number=1, children }) => {
  const Tag = `h${number}`
  return <Tag>{children}</Tag>
}

//* Div 컴포넌트
//* - children: Div에 들어갈 내용
//* - className: Div에 추가할 클래스 이름
//* - id: Div의 id
export const Div = ({children, className = "",id}) => {
  return <div className={`${className}`}id={id}>{children}</div>
}
