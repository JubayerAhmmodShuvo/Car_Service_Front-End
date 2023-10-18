"use client";
import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import React, { useState } from "react";
import CustomCard from "./CustomCard";
import { Row, Col, Button } from "antd";
import Link from "next/link";

const AvailableService = () => {
  const { data: services, isLoading } = useGetAllServiceQuery({});
  const [visibleServices, setVisibleServices] = useState(6);

  const loadMore = () => {
    setVisibleServices(visibleServices + 0);


  };



  return (
    <div style={{ backgroundColor: "#001529", overflowX: "hidden" }}>
      <h1
        style={{
          textAlign: "center",
          margin: "0px 0px 0px 0px",
          color: "#fff",
          padding: "20px",
          fontStyle:"italic"
        }}
      >
        Available Service
      </h1>
      {isLoading ? (
        <p></p>
      ) : (
        <Row gutter={16}>
          {services
            ?.slice(0, visibleServices)
            .map(
              (service: {
                _id: React.Key | string | null | undefined;
                images: string;
                title: string;
                pricing: number;
                overallRating: number;
                availability: boolean;
              }) => (
                <Col xs={24} sm={24} md={12} lg={8} xl={8} key={service?._id}>
                  <CustomCard
                    image={service?.images}
                    title={service?.title}
                    price={service?.pricing}
                    rating={service?.overallRating}
                    availability={service?.availability}
                    onAddToCart={() => {}}
                    onDetails={() => {}}
                    serviceId={service?._id as string | undefined}
                  />
                </Col>
              )
            )}
        </Row>
      )}
      {services && visibleServices < services.length && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Link href={`/user/allservice`}>
            <Button
              style={{ textAlign: "center" }}
              type="primary"
              onClick={loadMore}
            >
              See More
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AvailableService;
