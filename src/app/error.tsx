"use client";
import wrong from "../assets/something-wrong.png";

import { Row } from "antd";
import Image from "next/image";

const ErrorPage = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
        color: "red",
      }}
    >
      
      <Image src={wrong} width={350} alt="login image" />
    </Row>
  );
};

export default ErrorPage;
