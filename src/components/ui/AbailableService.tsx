import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import React, { useState } from "react";
import CustomCard from "./CustomCard";
import { Row, Col, Button } from "antd";

const AvailableService = () => {
  const { data: services, isLoading } = useGetAllServiceQuery({});
  const [visibleServices, setVisibleServices] = useState(6); 

  const loadMore = () => {
    setVisibleServices(visibleServices + 6);
  };

  return (
    <div style={{ backgroundColor: "#fff7e6" }}>
      <h1
        style={{
          textAlign: "center",
          margin: "20px 0px",
          color: "red",
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
                _id: React.Key | null | undefined;
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

export default AvailableService;
