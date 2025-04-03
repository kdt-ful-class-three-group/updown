import React from "react";

export const Paragraph = ({ children, className = ""}) => {
  return <p className={`${className}`}>{children}</p>;
}

export const Heading = ({ number=1, children }) => {
  const Tag = `h${number}`
  return <Tag>{children}</Tag>
}

export const Container = ({children, className = "",id}) => {
  return <div className={`${className}`}id={id}>{children}</div>
}
