"use client";


import Form from "@/components/FORMS/Form";
import FormInput from "@/components/FORMS/FormInput";
import FormTextArea from "@/components/FORMS/FormTextArea";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "@/redux/api/userProfile";
import { getUserInfo } from "@/services/auth.service";

import { Button, Col, Row, Select, message } from "antd";

const { Option } = Select;

const bloodGroupOptions = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

type IDProps = {
  params: any;
};

const EditAdminPage = ({ params }: IDProps) => {
  const { id } = params;
  console.log(id);

  const { data: user } = useGetUserProfileQuery(id);
 
  const [updateUserProfile,error] = useUpdateUserProfileMutation();

 
 const onSubmit = async (values: any) => {
   message.loading("Updating.....");
   try {
     // Update the user's profile with the form values
     const updatedProfile = {
       id, // Include the user's ID
       ...values, // Include the form values (e.g., name, phoneNumber, etc.)
     };

     // Call the updateUserProfile mutation with the updated profile data
     const response = await updateUserProfile(updatedProfile);

     if (error) {
       message.error("Error updating the profile");
     } else {
       message.success("Profile updated successfully");
     }
   } catch (err: any) {
     message.error(err.message);
   }
 };

  // @ts-ignore
  const defaultValues = {
    title: user?.title || "",
  };
  const {  role } = getUserInfo() as any;

  return (
    <>
      <UMBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          { label: "update", link: `/${role}/update` },
        ]}
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
      <Form submitHandler={onSubmit}>
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

export default EditAdminPage;
