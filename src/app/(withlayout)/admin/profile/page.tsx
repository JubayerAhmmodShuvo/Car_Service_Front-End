"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetAdminProfileQuery } from "@/redux/api/adminProfile";
import { useGetUserProfileQuery } from "@/redux/api/userProfile";
import { getUserInfo } from "@/services/auth.service";
import Image from "next/image";

const AdminPage = () => {
 
  
  const { id, role } = getUserInfo() as any;
  
 
  
  const { data: admin } = useGetUserProfileQuery(id);
  console.log(admin);
 

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: "profile",
            link: "/profile",
          },
        ]}
        style={{ marginTop: "10px", color: "black" }}
      />
      <h1>Admin</h1>
    <img src={admin?.image} alt="Girl in a jacket" width="500" height="600" />
    </div>
  );
};

export default AdminPage;
