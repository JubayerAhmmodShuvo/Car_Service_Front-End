import React from "react";
import { Typography, Row, Col, Space } from "antd";
import {
  CheckCircleOutlined,
  TeamOutlined,
  CustomerServiceOutlined,
  RocketOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const cardStyles = {
  borderRadius: "10px",
  padding: "30px",
  height: "100%",
  background: "linear-gradient(135deg, #abecd6 0%, #fbed96 100%)",
  color: "white",
  textAlign: "center",
};

const WhyChooseUs = () => {
  return (
    <div
      style={{
        padding: "50px",
        backgroundColor: "#001529",
        paddingBottom: "5rem",
        overflowX: "hidden",
      }}
    >
      <Title
        style={{ textAlign: "center", color: "#ffffff", paddingBottom: "20px" }}
      >
        Why Choose Us
      </Title>
      <Row gutter={[16, 16]} justify="space-around">
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ ...cardStyles, textAlign: "center" }}>
            <Space align="center">
              <CheckCircleOutlined
                style={{ fontSize: "32px", color: "#09203f" }}
              />
              <Title level={3}>Quality</Title>
            </Space>
            <Paragraph>
              We are committed to delivering the highest quality services.
            </Paragraph>
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ ...cardStyles, textAlign: "center" }}>
            <Space align="center">
              <TeamOutlined style={{ fontSize: "32px", color: "#09203f" }} />
              <Title level={3}>Expertise</Title>
            </Space>
            <Paragraph>
              Our team consists of experts in their respective fields.
            </Paragraph>
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ ...cardStyles, textAlign: "center" }}>
            <Space align="center">
              <CustomerServiceOutlined
                style={{ fontSize: "32px", color: "#09203f" }}
              />
              <Title level={3}>Customer-Centric</Title>
            </Space>
            <Paragraph>
              We prioritize the needs and satisfaction of our customers.
            </Paragraph>
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div style={{ ...cardStyles, textAlign: "center" }}>
            <Space align="center">
              <RocketOutlined style={{ fontSize: "32px", color: "#09203f" }} />
              <Title level={3}>Innovation</Title>
            </Space>
            <Paragraph>
              We constantly innovate to stay ahead in the industry.
            </Paragraph>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default WhyChooseUs;
