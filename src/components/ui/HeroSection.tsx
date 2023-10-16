"use client";

import React from "react";
import { Carousel, Button } from "antd";
import { getUserInfo } from "@/services/auth.service";

const carouselData = [
  {
    image:
      "https://bookmygarage.com/_next/image/?url=%2Fstatic%2Fseo-pages%2Fuploads%2Fcar-servicing-header-2.png&w=3840&q=75",
    text: "Slide 1 Text",
    buttonText: "Learn More",
  },
  {
    image:
      "https://www.gaadizo.com/gaadizo-car-service-repairs/assets/media/components/b-main-slider/dent%20repairs.jpg",
    text: "Slide 2 Text",
    buttonText: "Get Started",
  },
  {
    image:
      "https://resources.servicemycar.com/upimages/blogs/Here-is-Everything-You-Need-to-Know-About-Getting-a-Car-Service-min-20210323120345.png",
    text: "Slide 3 Text",
    buttonText: "Read More",
  },
  {
    image:
      "https://cdn.boggsautomotive.com/wp-content/uploads/boggs-automotive-car-maintenance.jpg.webp",
    text: "Slide 4 Text",
    buttonText: "Read More",
  },
];

const HeroSectionPage = ({ }) => (
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
            <h3>{slide.text}</h3>
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
