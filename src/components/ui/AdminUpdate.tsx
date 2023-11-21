"use client";
import { Button, Col, Row, Select, message } from "antd";
import FormInput from "../FORMS/FormInput";
import FormTextArea from "../FORMS/FormTextArea";
import Form from "../FORMS/Form";
import UMBreadCrumb from "./UMBreadCrumb";
import { getUserInfo } from "@/services/auth.service";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/redux/api/userProfile";
import { FormEvent } from "react";

const { Option } = Select;

const bloodGroupOptions = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const AdminUpdate = () => {
  const { id, role } = getUserInfo() as any;
  const { data: user } = useGetUserProfileQuery(id);

  const [updateUserProfile] = useUpdateUserProfileMutation();

  const OnSubmit = async (values: any) => {
    try {
      const response = await updateUserProfile({ id, ...values });

      if ("error" in response) {
        console.error(response.error);
      } else {
        message.success("User profile updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <UMBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          { label: "update", link: `/${role}/update` },
        ]}
        style={{ margin: "10px   0px 10px 5px", color: "black" }}
      />
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Update Profile
      </h1>
      <Form submitHandler={OnSubmit}>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}>
            Profile information
          </p>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              style={{ margin: "10px 0" }}
            >
              <FormInput
                name="name"
                label="Name"
                size="large"
                value={user?.name}
              />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              style={{ margin: "10px 0" }}
            >
              <FormInput
                name="phoneNumber"
                label="Phone Number"
                size="large"
                value={user?.number}
                type="tel"
              />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              style={{ margin: "10px 0" }}
            >
              <label htmlFor="bloodGroup">Blood Group</label>{" "}
              {/* Add this label */}
              <Select
                id="bloodGroup" // Add an id for accessibility
                style={{ width: "100%", height: "40px" }}
              >
                {bloodGroupOptions.map((group) => (
                  <Option key={group} value={group}>
                    {group}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              style={{ margin: "10px 0" }}
            >
              <FormTextArea
                name="address"
                label="Address"
                rows={4}
                value={user?.address}
              />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              style={{ margin: "10px 0" }}
            >
              <FormTextArea name="bio" label="Bio" rows={4} value={user?.bio} />
            </Col>
          </Row>
        </div>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </>
  );
};

export default AdminUpdate;
