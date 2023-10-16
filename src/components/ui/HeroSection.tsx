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
      "https://bookmygarage.com/_next/image/?url=%2Fstatic%2Fseo-pages%2Fuploads%2Fcar-servicing-header-2.png&w=3840&q=75",
    text: "Slide 2 Text",
    buttonText: "Get Started",
  },
  {
    image:
      "https://bookmygarage.com/_next/image/?url=%2Fstatic%2Fseo-pages%2Fuploads%2Fcar-servicing-header-2.png&w=3840&q=75",
    text: "Slide 3 Text",
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
