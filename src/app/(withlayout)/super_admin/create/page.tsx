"use client";

import Form from "@/components/FORMS/Form";
import FormDatePicker from "@/components/FORMS/FormDatePicker";
import FormInput from "@/components/FORMS/FormInput";
import FormSelectField from "@/components/FORMS/FormSelectField";
import FormTextArea from "@/components/FORMS/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { bloodGroupOptions, genderOptions } from "@/constants/global";

import { userSchema } from "@/schemas/user";

import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Col, Row, message } from "antd";

import { useCreateServiceMutation } from "@/redux/api/serviceApi";

const CreateUserPage = () => {
  const [addAdminWithFormData] = useCreateServiceMutation();
  

  const onSubmit = async (values: any) => {
    try {
      const formData = new FormData();

      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          formData.append(key, values[key]);
        }
      }

      message.loading("Creating...");
      const response = await addAdminWithFormData(formData);

      if (response) {
        message.success("Service created successfully!");
      } else {
        message.error("Service creation failed.");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
          {
            label: "create-service",
            link: "/super_admin/create-service",
          },
        ]}
        style={{ marginTop: "10px", color: "black" }}
      />
      <h1 style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}>
        Create User
      </h1>

      <div>
        <Form submitHandler={onSubmit}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}
            >
              Service Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Order Name"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="description"
                  size="large"
                  label="Description"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="email"
                  size="large"
                  label="Email"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="number"
                  name=" pricing"
                  size="large"
                  label="Price"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name=" location"
                  size="large"
                  label="Location"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name=" contactInfo"
                  size="large"
                  label="ContactInfo"
                
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
              Create Order
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateUserPage;
