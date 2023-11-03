"use client";

import React, { useEffect, useState } from "react";
import { Card, Avatar, Row, Col, Typography, Rate } from "antd";
import { StarOutlined } from "@ant-design/icons";
const { Meta } = Card;

const clientTestimonials = [
  {
    name: "John Doe",
    photo:
      "https://www.muscleandfitness.com/wp-content/uploads/2015/08/what_makes_a_man_more_manly_main0.jpg?quality=86&strip=all",
    feedback:
      "I was highly impressed with the quality of service I received for my car. The team at your service center went above and beyond to ensure that my car was in the best condition. I can confidently say that I'll be coming back for all my car service needs in the future.",
  },
  {
    name: "Jane Smith",
    photo:
      "https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
    feedback:
      "Your service was exceptional. My car not only runs better but looks better than ever before. The attention to detail and care you put into your work is truly commendable. Thank you for providing such a top-notch service.",
  },
  {
    name: "Jonathon",
    photo:
      "https://media.istockphoto.com/id/1200677760/photo/portrait-of-handsome-smiling-young-man-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=g_ZmKDpK9VEEzWw4vJ6O577ENGLTOcrvYeiLxi8mVuo=",
    feedback:
      "I'm extremely satisfied with the car service I received from your team. You not only fixed the issues but also explained everything to me, which was very helpful. Your professionalism and expertise are truly impressive.",
  },
  {
    name: "Bob Johnson",
    photo:
      "https://media.istockphoto.com/id/1253034911/photo/young-man-standing-with-hands-in-pockets-wearing-glasses-and-blank-white-tshirt-with-copy.jpg?b=1&s=612x612&w=0&k=20&c=xgT3wVJfqiBYn1-3f2uQrtMCIAWs4RlXDU1NPCLdSxE=",
    feedback:
      "I can't thank your team enough for the excellent car service. My car looks and feels brand new. Your attention to detail and commitment to quality are evident in the results. I'm a happy and satisfied customer.",
  },
  {
    name: "David",
    photo:
      "https://img.freepik.com/free-photo/portrait-smiling-happy-young-man-isolated-white_186202-6708.jpg",
    feedback:
      "Your service has exceeded my expectations. My car runs smoothly, and I feel safer on the road. Your team's dedication to customer satisfaction is remarkable. I will definitely recommend your service to others.",
  },
];
const { Paragraph } = Typography;
const Testimonials = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialIndex(
        (prevIndex) => (prevIndex + 1) % clientTestimonials.length
      );
    }, 6000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <h1
        style={{
          padding: "30px 0px",
          textAlign: "center",
          color: "black",
          justifyContent: "center",
          backgroundColor: "#fff",
          margin: "auto",
          alignItems: "center",
          fontSize:"28px" , overflowX: "hidden"
        }}
      >
        Testimonials
      </h1>
      <div
        style={{
          padding: "30px",
          paddingBottom: "50px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#fff",
          height: "100%",
          margin: "auto",
          alignItems: "center",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Card
              style={{
                height: "250px",
                width: "100%",
                maxWidth: "400px",
                margin: "auto",
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    src={clientTestimonials[currentTestimonialIndex].photo}
                  />
                }
                title={clientTestimonials[currentTestimonialIndex].name}
                description={
                  <>
                    <Rate
                      disabled
                      defaultValue={5}
                      character={<StarOutlined />}
                    />
                    <Paragraph >
                      {clientTestimonials[currentTestimonialIndex].feedback}
                    </Paragraph>
                  </>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Card
              style={{
                height: "250px",
                width: "100%",
                maxWidth: "400px",
                margin: "auto",
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    src={
                      clientTestimonials[
                        (currentTestimonialIndex + 1) %
                          clientTestimonials.length
                      ].photo
                    }
                  />
                }
                title={
                  clientTestimonials[
                    (currentTestimonialIndex + 1) % clientTestimonials.length
                  ].name
                }
                description={
                  <>
                    <Rate
                      disabled
                      defaultValue={4}
                      character={<StarOutlined />}
                    />
                    <Paragraph >
                      {
                        clientTestimonials[
                          (currentTestimonialIndex + 1) %
                            clientTestimonials.length
                        ].feedback
                      }
                    </Paragraph>
                  </>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Card
              style={{
                height: "250px",
                width: "100%",
                maxWidth: "400px",
                margin: "auto",
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    src={
                      clientTestimonials[
                        (currentTestimonialIndex + 2) %
                          clientTestimonials.length
                      ].photo
                    }
                  />
                }
                title={
                  clientTestimonials[
                    (currentTestimonialIndex + 2) % clientTestimonials.length
                  ].name
                }
                description={
                  <>
                    <Rate
                      disabled
                      defaultValue={4}
                      character={<StarOutlined />}
                    />
                    <Paragraph>
                      {
                        clientTestimonials[
                          (currentTestimonialIndex + 2) %
                            clientTestimonials.length
                        ].feedback
                      }
                    </Paragraph>
                  </>
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Testimonials;
