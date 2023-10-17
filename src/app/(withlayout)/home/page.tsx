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

import { getUserInfo } from "@/services/auth.service";

const { role } = getUserInfo() as any;
console.log(role)

const MainPage = () => {
 
  return (
    <>
      <UMBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          { label: "home", link: `/${role}/home` },
        ]}
        style={{ marginTop: "10px",color:"black", }}
      />
      <div
        style={{
          margin: "20px 0px 0px 0px",
          
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
    </>
  );
};

export default MainPage;