"use client"

import React, { ReactNode } from "react";
import { Card } from "antd";

interface ReusableCardProps {
  title: string;
  children: ReactNode;
}

const NewCardBlog: React.FC<ReusableCardProps> = ({ title, children }) => {
  const cardStyle = {
    width: "100vw",
    margin: "10px auto",
    overflow: "hidden",
  };

  const isMobile = window.innerWidth < 768;

  const textStyle = {
    textAlign: "justify",
    whiteSpace: "normal" as "normal",
  };

  return (
    <div style={{ ...cardStyle, width: isMobile ? "100%" : cardStyle.width }}>
      <Card
        title={title}
        bordered={false}
        style={{
          ...cardStyle,
          width: isMobile ? "100%" : cardStyle.width,
        }}
      >
        <div style={textStyle as React.CSSProperties}>{children}</div>
      </Card>
    </div>
  );
};

export default NewCardBlog;
