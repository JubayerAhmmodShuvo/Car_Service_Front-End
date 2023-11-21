"use client";

import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import React, { useState } from "react";

import { Row, Col, Button } from "antd";
import CustomCard from "@/components/ui/CustomCard";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const AllService = () => {
  const { data: services, isLoading } = useGetAllServiceQuery({});
  const [visibleServices, setVisibleServices] = useState(6);

  const loadMore = () => {
    setVisibleServices(visibleServices + 6);
  };

  return (
    <div style={{ backgroundColor: "#fff7e6", overflowX: "hidden" }}>
      <UMBreadCrumb
        items={[
          {
            label: "user",
            link: "/user",
          },
          {
            label: "all",
            link: "/user/all",
          },
        ]}
        style={{ margin: "10px   0px 10px 5px", color: "black" }}
      />
      <h1
        style={{
          textAlign: "center",
          margin: "0px 0px 0px 30px",
          color: "dark violet",
          padding: "20px",
        }}
      >
        Available Service
      </h1>
      {isLoading ? (
        <p>Loading...</p>
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
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Button
            style={{ textAlign: "center", marginBottom: "20px" }}
            type="primary"
            onClick={loadMore}
          >
            See More
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllService;
