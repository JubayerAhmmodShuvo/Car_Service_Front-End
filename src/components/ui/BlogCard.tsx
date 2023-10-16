import React, { ReactNode, useState } from "react";
import { Card } from "antd";

interface ReusableCardProps {
  title: string;
  children: ReactNode;
}

const ReusableCard: React.FC<ReusableCardProps> = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const cardStyle = {
    width: "100vw", // Set width to 100% for mobile
    margin: "10px auto", // Set margin to "auto" to center the card horizontally
    overflow: "hidden", // Prevent text from overflowing outside the card
  };

  const buttonStyle = {
    display: "block",
    margin: "10px 0",
    backgroundColor: "#1890ff",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
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
          ...(expanded ? { maxHeight: "none" } : {}),
        }}
      >
        <div style={textStyle as React.CSSProperties}>
          {expanded ? children : truncateDescription(children)}
        </div>

        {children && children.toString().split(" ").length > 30 && (
          <button onClick={toggleExpand} style={buttonStyle}>
            {expanded ? "Show Less" : "Show More"}
          </button>
        )}
      </Card>
    </div>
  );
};

const truncateDescription = (description: ReactNode) => {
  if (typeof description === "string") {
    return description.split(" ").slice(0, 30).join(" ") + " .....";
  }
  return description;
};

export default ReusableCard;
