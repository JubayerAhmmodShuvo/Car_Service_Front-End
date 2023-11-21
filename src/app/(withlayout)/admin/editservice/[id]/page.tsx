"use client";

import Form from "@/components/FORMS/Form";
import FormInput from "@/components/FORMS/FormInput";
import FormSelectField from "@/components/FORMS/FormSelectField";
import FormTextArea from "@/components/FORMS/FormTextArea";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/redux/api/userProfile";
import { getUserInfo } from "@/services/auth.service";
import { bloodGroupOptions } from "@/constants/global";

import { Button, Col, Row, Select, message } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetServiceByIdQuery,
  useUpdateServiceByIdMutation,
} from "@/redux/api/serviceApi";

const { Option } = Select;

type IDProps = {
  params: any;
};

const UpdateServicePage = ({ params }: IDProps) => {
  const { id } = params;
  const router = useRouter();
  const [updatedUser, setUpdatedUser] = useState(null);
  const { data: user, refetch } = useGetServiceByIdQuery(id);
  const { role } = getUserInfo() as any;

  const [updateUserProfile, { error }] = useUpdateServiceByIdMutation();

  const onSubmit = async (values: any) => {
    message.loading("Updating.....");
    try {
      const res = await updateUserProfile({
        id: id,
        body: values,
      }).unwrap();

      if (res?._id) {
        setUpdatedUser(res);
        message.success("User Successfully Updated!");
        router.push("/super_admin/servicetable");
        refetch();
      }
    } catch (err: any) {
      console.error("Error updating service:", err);
      message.error(err.message || "Failed to update service");
      //  console.log(err);
    }
  };
  const userData = updatedUser || user;

  // @ts-ignore
  const defaultValues = {
    title: userData?.title || "",
    description: userData?.description || "",
    pricing: userData?.pricing || "",
    contactInfo: userData?.contactInfo || "",
    email: userData?.email || "",
  };

  return (
    <>
      <UMBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          { label: "updateservice", link: `/${role}/updateservice` },
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
        Update Service
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
            Service information
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
                name="title"
                label="Title"
                size="large"
                value={user?.title}
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
                name="email"
                label="email"
                size="large"
                value={user?.email}
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
                name="pricing"
                label="Price"
                size="large"
                value={user?.pricing}
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
              <FormInput
                name="contactInfo"
                label="Contact Number"
                size="large"
                value={user?.contactInfo}
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
              <FormTextArea
                name="description"
                label="Description"
                rows={4}
                value={user?.description}
              />
            </Col>
          </Row>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "darkviolet",
              border: "none",
              width: "20%",
            }}
          >
            Update
          </Button>
        </div>
      </Form>
    </>
  );
};

export default UpdateServicePage;
