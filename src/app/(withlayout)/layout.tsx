"use client";
import Contents from "@/components/ui/Contents";
import SideBar from "@/components/ui/Sidebar";
import { isLoggedIn } from "@/services/auth.service";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter();
  const [isLoading, setIsLoading]= useState<boolean>(false)

  const userLoggedIn = isLoggedIn();
  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    } else {
      setIsLoading(true);
    }
  }, [router, isLoading]);

  if (!isLoading) {
    return <Loading />;
  }

  return (
    <Layout hasSider>
      <SideBar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
