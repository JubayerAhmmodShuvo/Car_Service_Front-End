"use client";
import { Row, Col, Divider, Card, Rate, message, Button } from "antd";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetUserProfileQuery } from "@/redux/api/userProfile";
import { getUserInfo } from "@/services/auth.service";

const centerAlign = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const imageStyle = {
  width: "300px",
  height: "300px",
  borderRadius: "50%",
  objectFit: "cover" as "cover",
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
        ]}
        style={{ margin: "10px   0px 10px 5px", color: "black" }}
      />
      <div style={centerAlign}>
        <Card style={{ width: "500px" }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={admin?.image}
                  alt="service image"
                  style={imageStyle}
                />
              </div>
            </Col>
            <Col span={24}>
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
            </Col>
          </Row>
        </Card>
      </div>

      {/* <div style={centerAlign}>
        <div style={{ overflowX: "hidden" }}>
          <Row gutter={[16, 16]}>
            <Col sm={24} md={12} lg={12}>
              <img src={admin?.image} alt="service image" style={imageStyle} />
            </Col>
            <Col
              sm={24}
              md={12}
              lg={12}
              style={{
                margin: "auto",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
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
            </Col>
          </Row>
        </div>
      </div> */}
    </>
  );
};

export default Admin;
