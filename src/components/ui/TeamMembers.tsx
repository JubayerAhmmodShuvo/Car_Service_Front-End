"use client";

import React from "react";
import { Card, Avatar, Row, Col, Typography } from "antd";

const { Title, Paragraph } = Typography;

const teamMembers = [
  {
    name: "John Doe",
    role: "Team Lead",
    photo:
      "https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",

    description: "An experienced leader with a passion for innovation.",
  },
  {
    name: "Jane Smith",
    role: "Mechanic",
    photo:
      "https://media.istockphoto.com/id/1200677760/photo/portrait-of-handsome-smiling-young-man-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=g_ZmKDpK9VEEzWw4vJ6O577ENGLTOcrvYeiLxi8mVuo=",

    description: "A creative mind with a keen eye for aesthetics.",
  },
  {
    name: "Bob Johnson",
    role: "Senior Engineer",
    photo:
      "https://media.istockphoto.com/id/1253034911/photo/young-man-standing-with-hands-in-pockets-wearing-glasses-and-blank-white-tshirt-with-copy.jpg?b=1&s=612x612&w=0&k=20&c=xgT3wVJfqiBYn1-3f2uQrtMCIAWs4RlXDU1NPCLdSxE=",

    description: "A machine guru who loves turning ideas into reality.",
  },
];

const TeamMembers = () => {
  return (
    <div
      style={{
        padding: "20px",
     
        overflowX: "hidden",
      }}
    >
      <Title
        style={{
          textAlign: "center",
          color: "black",
          fontStyle: "italic",
          padding: "30px 0px",
        }}
      >
        Meet Our Team
      </Title>
      <Row gutter={[16, 16]} justify="space-around">
        {teamMembers.map((member, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              style={{
                backgroundColor: "#fff",
                color: "#000000",
                textAlign: "center",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <Avatar src={member.photo} size={100} />
              <Title style={{ color: "#000000" }} level={4}>
                {member.name}
              </Title>
              <Paragraph style={{ color: "#000000" }}>{member.role}</Paragraph>
              <Paragraph style={{ color: "#000000" }}>
                {member.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TeamMembers;
