"use client"; 

import React, { useState } from "react";
import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Import your RootState type
import { Row, Col, Button } from "antd";
import CustomCard from "@/components/ui/CustomCard";
import PriceFilter from "@/components/ui/FliterComponent";
 // Import your PriceFilter component

const Page: React.FC = () => {
  const { data: services, isLoading } = useGetAllServiceQuery({});
  const { minPrice, maxPrice } = useSelector(
    (state: RootState) => state.services
  );

  const filteredServices = services?.filter(
    (service) => service.pricing >= minPrice && service.pricing <= maxPrice
  );

  const [visibleServices, setVisibleServices] = useState(6);

  const loadMore = () => {
    setVisibleServices(visibleServices + 6);
  };

  return (
    <div style={{ backgroundColor: "#fff7e6", overflowX: "hidden" }}>
      <h1
        style={{
          textAlign: "center",
          margin: "0px 0px 0px 30px",
          color: "darkviolet",
          padding: "20px",
        }}
      >
        Available Service
      </h1>
      <PriceFilter /> {/* Include the PriceFilter component here */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Row gutter={16}>
          {filteredServices?.slice(0, visibleServices).map((service) => (
            <Col xs={24} sm={24} md={12} lg={8} xl={8} key={service._id}>
              <CustomCard
                image={service.images}
                title={service.title}
                price={service.pricing}
                rating={service.overallRating}
                availability={service.availability}
                onAddToCart={() => {}}
                onDetails={() => {}}
                serviceId={service._id}
              />
            </Col>
          ))}
        </Row>
      )}
      {filteredServices && visibleServices < filteredServices.length && (
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

export default Page;
