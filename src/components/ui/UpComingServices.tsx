"use client";

import React, { useState } from "react";
import { Card, Badge, Row, Col, Space, Button } from "antd";
import Link from "next/link";

const { Meta } = Card;



const UpComingServices = () => {
  const services = [
    {
      image:
        "https://www.schaeferautobody.com/wp-content/uploads/2020/03/scha_paintless-dent-removal-page-image.png",
      title: "Paintless Dent Repair",
      date: "August 15, 2022",
      description:
        "A description for Paintless Dent Repair. This is a short description of the service.",
      upcoming: true,
      link: "https://example.com/service1",
    },
    {
      image: "https://www.buzzweld.co.uk/user/products/large/IMG_3474.jpg",
      title: "Underbody Rust Proofing",
      date: "September 25, 2022",
      description:
        "A longer description for Underbody Rust Proofing. This is a more detailed description of the service that exceeds 40 words. A longer description for Underbody Rust Proofing. This is a more detailed description of the service that exceeds 40 words.",
      upcoming: true,
      link: "https://example.com/service2",
    },
    {
      image:
        "https://integritytinting.com/wp-content/uploads/2022/04/coated-2.png",
      title: "Ceramic Coating",
      date: "September 5, 2022",
      description:
        "A description for Ceramic Coating. This is another short description of the service.",
      upcoming: true,
      link: "https://example.com/service2",
    },
   
  ];

  const [expandedDescriptions, setExpandedDescriptions] = useState<{
    [title: string]: boolean;
  }>({});

  const toggleDescription = (title: string) => {
    setExpandedDescriptions({
      ...expandedDescriptions,
      [title]: !expandedDescriptions[title],
    });
  };

  return (
    <div style={{ backgroundColor: "#fff", overflowX: "hidden" }}>
      <div style={{ margin: "30px" }}>
        <h1
          style={{
            textAlign: "center",
            margin: "20px 0px",
            fontStyle: "italic",
            color: "#fff",
          }}
        >
          Upcoming Services
        </h1>
        <Row gutter={16}>
          {services.map((service) => (
            <Col xs={24} sm={24} md={12} lg={8} key={service.title}>
              <Card
                cover={
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img
                      alt={service.title}
                      src={service.image}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                }
                style={{ marginTop: 20 }}
              >
                {service.upcoming && (
                  <Badge.Ribbon
                    text="Upcoming"
                    color="#87d068"
                    style={{ marginRight: -20, marginTop: 12 }}
                  >
                    <Card.Meta
                      title={service.title}
                      description={
                        expandedDescriptions[service.title]
                          ? service.description
                          : `${service.description.slice(0, 40)}${
                              service.description.length > 40 ? "..." : ""
                            }`
                      }
                    />
                    {service.description.length > 40 && (
                      <Button
                        style={{ marginTop: "20px" }}
                        type="link"
                        onClick={() => toggleDescription(service.title)}
                      >
                        {expandedDescriptions[service.title]
                          ? "Show Less"
                          : "Show More"}
                      </Button>
                    )}
                    <Link
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    ></Link>
                  </Badge.Ribbon>
                )}
                {!service.upcoming && (
                  <Card.Meta title={service.title} description={service.date} />
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default UpComingServices;

