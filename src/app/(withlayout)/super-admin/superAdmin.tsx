"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetUserProfileQuery } from "@/redux/api/userProfile";
import { getUserInfo } from "@/services/auth.service";


const SuperAdminPage = () => {
  const { id, role } = getUserInfo() as any;

  console.log(id);

  const { data: user } = useGetUserProfileQuery(id);

  return (
    <>
      <UMBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
        ]}
      />
      <div>
        <h1>{role} profile</h1>
        <h1>{user?.name}</h1>
      </div>
    </>
  );
};

export default SuperAdminPage;
