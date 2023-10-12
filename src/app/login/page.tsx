import LoginPage from "@/components/Login/Login";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "UMS | Login",
};
const page = () => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default page;
