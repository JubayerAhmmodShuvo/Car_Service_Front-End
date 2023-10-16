"use client";


import Form from "@/components/FORMS/Form";
import FormInput from "@/components/FORMS/FormInput";
import FormSelectField from "@/components/FORMS/FormSelectField";
import FormTextArea from "@/components/FORMS/FormTextArea";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "@/redux/api/userProfile";
import { getUserInfo } from "@/services/auth.service";
import { bloodGroupOptions } from "@/constants/global";

import { Button, Col, Row, Select, message } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

const { Option } = Select;



type IDProps = {
  params: any;
};

const EditAdminPage = ({ params }: IDProps) => {
  const { id } = params;
 const router = useRouter();
  const [updatedUser, setUpdatedUser] = useState(null);
  const { data: user,refetch } = useGetUserProfileQuery(id);
  const { role } = getUserInfo() as any;

  const [updateUserProfile, { error }] = useUpdateUserProfileMutation();

  const onSubmit = async (values: any) => {
    message.loading("Updating.....");
    try {
      const res = await updateUserProfile({
        id: id,
        body: values,
      }).unwrap();

      if (res?.id) {
        setUpdatedUser(res);
        message.success("Admin Successfully Updated!");
        refetch();
        router.push("/profile");
      }
    } catch (err: any) {
      console.error("Error updating user:", err);
      message.error(err.message || "Failed to update user");
      console.log(err);
    }
  };
  const userData = updatedUser || user;

  // @ts-ignore
  const defaultValues = {
    name: userData?.name || "",
    email: userData?.email || "",
    number: userData?.number || "",
    role: userData?.role || "",
    bio: userData?.bio || "",
    bloodGroup: userData?.bloodGroup || "",
    address: userData?.address || "",
   
  };
  

  return (
    <>
      <UMBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          { label: "update", link: `/${role}/update` },
        ]}
        style={{ marginTop: "10px",color:"black" }}
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
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
                name="number"
                label="Phone Number"
                size="large"
                value={user?.number}
                type="text"
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
              <FormSelectField
                size="large"
                name="bloodGroup"
                options={bloodGroupOptions}
                label="Blood group"
                placeholder="Select"
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
        <div style={{ display: "flex", justifyContent: "center",marginBottom:"30px" }}>
          <Button
            type="primary" 
            htmlType="submit"
            style={{ backgroundColor: "darkviolet", border: "none",width:"20%" }}
          >
            Update
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditAdminPage;
