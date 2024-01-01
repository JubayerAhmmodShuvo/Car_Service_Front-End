"use client";

import React from "react";
import { Carousel, Button } from "antd";
import { getUserInfo } from "@/services/auth.service";

const carouselData = [
  {
    image:
      "https://bookmygarage.com/_next/image/?url=%2Fstatic%2Fseo-pages%2Fuploads%2Fcar-servicing-header-2.png&w=3840&q=75",
    text: "The best you want for your car. Car what people loves more and more is our responsibility to give a better service",
    buttonText: "Learn More",
  },
  {
    image:
      "https://www.gaadizo.com/gaadizo-car-service-repairs/assets/media/components/b-main-slider/dent%20repairs.jpg",
    text: "The best you want for your car. Car what people loves more and more is our responsibility to give a better service",
    buttonText: "Get Started",
  },
  {
    image:
      "https://resources.servicemycar.com/upimages/blogs/Here-is-Everything-You-Need-to-Know-About-Getting-a-Car-Service-min-20210323120345.png",
    text: "The best you want for your car. Car what people loves more and more is our responsibility to give a better service",
    buttonText: "Read More",
  },
  {
    image:
      "https://cdn.boggsautomotive.com/wp-content/uploads/boggs-automotive-car-maintenance.jpg.webp",
    text: "We are the best and always at your service",
    buttonText: "Read More",
  },
];

const HeroSectionPage = ({}) => (
  <Carousel autoplay>
    {carouselData.map((slide, index) => (
      <div key={index}>
        <div
          style={{
            ...contentStyle,
            backgroundImage: `url(${slide.image})`,
          }}
        >
          <div>
            <h3 style={{ color: "#79155B" }}>{slide.text}</h3>
            <Button type="primary">{slide.buttonText}</Button>
          </div>
        </div>
      </div>
    ))}
  </Carousel>
);

const contentStyle: React.CSSProperties = {
  height: "70vh", 
  color: "#fff",
  lineHeight: "160px", 
  textAlign: "center",
  backgroundSize: "cover",
};

export default HeroSectionPage;
