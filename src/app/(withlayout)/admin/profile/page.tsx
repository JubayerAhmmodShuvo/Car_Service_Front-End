"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetAdminProfileQuery } from "@/redux/api/adminProfile";
import { useGetUserProfileQuery } from "@/redux/api/userProfile";
import { getUserInfo } from "@/services/auth.service";

const AdminPage = () => {
 
  
  const { id ,role} = getUserInfo() as any;
 
  
  const { data: admin } = useGetUserProfileQuery(id);
 

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
      />
      <h1>Admin</h1>
    </div>
  );
};

export default AdminPage;
