"use client";

import AbailableService from "@/components/ui/AbailableService";
import Footer from "@/components/ui/Footer";
import HeroSectionPage from "@/components/ui/HeroSection";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
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
        style={{ marginTop: "10px",color:"black" }}
      />
      <div
        style={{
          margin: "20px 0px 0px 0px",
        }}
      >
        <HeroSectionPage />
        <AbailableService />
        <Footer />
      </div>
    </>
  );
};

export default MainPage;