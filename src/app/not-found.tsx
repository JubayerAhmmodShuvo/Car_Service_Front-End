import { Button, Row } from "antd";
 import not from "../assets/404.png";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
      }}
    >
     
      <Image src={not} width={350} alt="login image" />
    </Row>
  );
};

export default NotFoundPage;
