"use client"

import React from "react";
import { useGetServiceByIdQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import { Row, Col, Divider, Card, Rate } from "antd";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

type IDProps = {
  params: any;
};

const centerAlign = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
 
};

const imageStyle = {
  width: "100%",
  maxWidth: "90%",
  height: "auto",
  margin: "20px",
};

const cardStyle = {
  marginBottom: "16px",
};

const responsiveCardStyle = {
  width: "100vw",
  maxWidth: "100%",
  
};

const ViewServicePage = ({ params }: IDProps) => {
  const id = params.id;
  const { data: service } = useGetServiceByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 6000,
  });
  const { role } = getUserInfo() as any;

  return (
    <>
      <UMBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          { label: "viewdetails", link: `` },
        ]}
        style={{ marginTop: "10px", color: "black" }}
      />
      <div style={centerAlign}>
        <div>
          <Row gutter={[16, 16]}>
            <Col sm={24} md={12} lg={12}>
              <img
                src={service?.images}
                alt="service image"
                style={imageStyle}
              />
            </Col>
            <Col
              sm={24}
              md={12}
              lg={12}
              style={{
                margin: "auto",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <div>
                <h1
                  style={{
                    color: "palevioletred",
                    fontSize: "2rem",
                    margin: "10px 0px",
                  }}
                >
                  {service?.title}
                </h1>
                <h3
                  style={{
                    color: "SlateBlue",
                    fontSize: "16px",
                    marginTop: "16px",
                  }}
                >
                  {service?.description}
                </h3>
                <h3
                  style={{
                    color: "SlateBlue",
                    fontSize: "16px",
                    marginTop: "16px",
                  }}
                >
                  {service?.location}
                </h3>

                <h3
                  style={{
                    color: "#6a5acd",
                    fontSize: "16px",
                    marginTop: "16px",
                  }}
                >
                  {service?.contactInfo}
                </h3>
                <h1
                  style={{
                    color: "MediumSeaGreen",
                    fontSize: "16px",
                    marginTop: "16px",
                  }}
                >
                  $&nbsp;{service?.pricing}
                </h1>
                {service?.availability ? (
                  <p
                    style={{
                      color: "green",
                      fontSize: "16px",
                      marginTop: "16px",
                    }}
                  >
                    Available
                  </p>
                ) : (
                  <p
                    style={{
                      color: "red",
                      fontSize: "16px",
                      marginTop: "16px",
                    }}
                  >
                    Out of Stock
                  </p>
                )}
                <p style={{ paddingTop: "8px" }}>
                  <Rate
                    allowHalf
                    disabled
                    defaultValue={service?.overallRating}
                  />
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Divider />
      <Row>
        <Col sm={24} md={24} lg={12}>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <div>
              <h3
                style={{
                  marginBottom: "26px",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                User Reviews
              </h3>
              <ul>
                {service?.userReviews.map((review: any) => (
                  <Card
                    key={review?._id}
                    style={{ ...cardStyle, ...responsiveCardStyle }}
                  >
                    <p>
                      Email:
                      <span style={{ color: "#1fada6", fontSize: "16px" }}>
                        &nbsp;{review?.email}
                      </span>
                    </p>
                    <p style={{ margin: "5px 0px" }}>
                      Comment: {review?.comment}
                    </p>
                    <p>
                      Rating:
                      <Rate allowHalf disabled defaultValue={review?.rating} />
                    </p>
                  </Card>
                ))}
              </ul>
            </div>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
};

export default ViewServicePage;
