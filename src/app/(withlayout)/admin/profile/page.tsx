"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetAdminProfileQuery } from "@/redux/api/adminProfile";
import { useGetUserProfileQuery } from "@/redux/api/userProfile";
import { getUserInfo } from "@/services/auth.service";

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
        style={{ marginTop: "10px",color:"black" }}
      />
      <h1>Admin</h1>
    </div>
  );
};

export default AdminPage;
