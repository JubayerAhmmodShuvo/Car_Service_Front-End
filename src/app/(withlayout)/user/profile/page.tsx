"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";

const UserProfile = () => {
  const { role } = getUserInfo() as any;

  const base = "user";
  return (
    <>
      <UMBreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: "profile",
            link: `${role}/profile`,
          },
        ]}
      />
      <div>
        <h1>user profile</h1>
      </div>
    </>
  );
};

export default UserProfile;
