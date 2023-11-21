"use client";
import { Row, Col, Divider, Card, Rate, message, Button } from "antd";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetUserProfileQuery } from "@/redux/api/userProfile";
import { getUserInfo } from "@/services/auth.service";

const centerAlign = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const imageStyle = {
  width: "100%",
  maxWidth: "90%",
  height: "auto",
  margin: "20px",
};

const cardStyle = {
  marginBottom: "16px",
};

const responsiveCardStyle = {
  width: "100vw",
  maxWidth: "100%",
};

const Admin = () => {
  const { id, role } = getUserInfo() as any;

  const { data: admin } = useGetUserProfileQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 6000,
  });

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
            link: `/${role}/profile`,
          },
        ]}
        style={{ margin: "10px   0px 10px 5px", color: "black" }}
      />
      <div>
        <h1
          style={{
            color: "palevioletred",
            fontSize: "2rem",
            margin: "10px 0px",
          }}
        >
          Name: {admin?.name}
        </h1>
        <h3
          style={{
            color: "SlateBlue",
            fontSize: "16px",
            marginTop: "16px",
          }}
        >
          Email: {admin?.email}
        </h3>
        <h3
          style={{
            color: "SlateBlue",
            fontSize: "16px",
            marginTop: "16px",
          }}
        >
          Number: {admin?.number}
        </h3>

        <h3
          style={{
            color: "#6a5acd",
            fontSize: "16px",
            marginTop: "16px",
          }}
        >
          Bio: {admin?.bio}
        </h3>
        <h3
          style={{
            color: "#6a5acd",
            fontSize: "16px",
            marginTop: "16px",
          }}
        >
          Address: {admin?.address}
        </h3>
        <h1
          style={{
            color: "MediumSeaGreen",
            fontSize: "16px",
            marginTop: "16px",
          }}
        >
          BloodGroup: {admin?.bloodGroup}
        </h1>
      </div>
    </>
  );
};

export default Admin;
