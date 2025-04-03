import React from "react";

export const Paragraph = ({ children, className = ""}) => {
  return <p className={`${className}`}>{children}</p>;
}

export const Heading = ({ number=1, content }) => {
  const Tag = `h${number}`
  return <Tag>{content}</Tag>
}

export const Div = ({children, className = "",id}) => {
  return <div className={`${className}`}id={id}>{children}</div>
}
