"use client";

import AbailableService from "@/components/ui/AbailableService";
import AskHere from "@/components/ui/AskHere";
import BlogPage from "@/components/ui/Blog";
import Testimonials from "@/components/ui/ClientTestimonial";
import Footer from "@/components/ui/Footer";
import HeroSectionPage from "@/components/ui/HeroSection";
import PartnerShip from "@/components/ui/PartnerShip";
import TeamMembers from "@/components/ui/TeamMembers";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UpComingServices from "@/components/ui/UpComingServices";
import WhyChooseUs from "@/components/ui/WhyChooseUs";
import {
  CaretUpOutlined,
  CaretDownOutlined 
} from "@ant-design/icons";

import { getUserInfo } from "@/services/auth.service";

const { role } = getUserInfo() as any;
console.log(role)



import React, { useState, useEffect } from "react";
import { Button } from "antd";
const ScrollButton = () => {
  const [showUpButton, setShowUpButton] = useState(false);
  const [showDownButton, setShowDownButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowUpButton(true);
      setShowDownButton(false);
    } else {
      setShowUpButton(false);
      setShowDownButton(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const buttonStyles: React.CSSProperties = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 999,
  };

  return (
    <div>
      {showUpButton && (
        <div style={buttonStyles}>
          <Button onClick={scrollToTop}>
            <CaretUpOutlined /> 
          </Button>
        </div>
      )}
      {showDownButton && (
        <div style={buttonStyles}>
          <Button onClick={scrollToBottom}>
            <CaretDownOutlined /> 
          </Button>
        </div>
      )}
    </div>
  );
};
const buttonStyles = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 999,
};

const MainPage = () => {
  return (
    <>
     
      <UMBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          { label: "home", link: `/${role}/home` },
        ]}
        style={{ marginTop: "10px", color: "black" }}
      />
      <div
        style={{
          margin: "20px 0px 0px 0px",
             backgroundColor: "#fff",
        }}
      >
        <HeroSectionPage />
        <AbailableService />
        <UpComingServices />
        <Testimonials />
        <TeamMembers />
        <BlogPage />
        <PartnerShip />
        <WhyChooseUs />
        <AskHere />
        <Footer />
      </div>

  
      <ScrollButton />
    </>
  );
};

export default MainPage;
