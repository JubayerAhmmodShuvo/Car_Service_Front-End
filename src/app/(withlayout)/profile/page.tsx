"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetUserProfileQuery } from "@/redux/api/userProfile";
import { getUserInfo } from "@/services/auth.service";

const Profile = () => {
  
 const { id:userId ,role} = getUserInfo() as any;



  const { data: user } = useGetUserProfileQuery(userId);
 


  

  

  return (
    <>
      <UMBreadCrumb
        items={[
         
          {
            label: "profile",
            link: `/profile`,
          },
        ]} style={{ marginTop: "10px",color:"black" }}
      />
      <div>
        <h1>{role} profile</h1>
        <h1>{user?.name}</h1>
      </div>
    </>
  );
};

export default Profile;
