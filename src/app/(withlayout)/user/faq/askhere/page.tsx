"use client";

import Form from "@/components/FORMS/Form";
import FormTextArea from "@/components/FORMS/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useCreateFaqMutation } from "@/redux/api/faqApi";
import { useGetUserProfileQuery } from "@/redux/api/userProfile";
import { getUserInfo } from "@/services/auth.service";
import { Row, Col, Button, message } from "antd";
import React from "react";

const Ask = () => {
  // const { id: userId } = getUserInfo() as any;
  // console.log(userId);

  // const { data: user } = useGetUserProfileQuery(userId);
  // console.log(user.name);

  const [create, { error }] = useCreateFaqMutation();
  const onSubmit = async (values: any) => {
    try {
      const formData = new FormData();

      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          formData.append(key, values[key]);
        }
      }

      message.loading("Creating...");
      const response = await create(formData);

      if (response) {
        message.success("Faq's created successfully!");
      } else {
        message.error("Faq's creation failed.");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div style={{ overflowX: "hidden" }}>
      <UMBreadCrumb
        items={[
          {
            label: "user",
            link: "/user",
          },
          {
            label: "askhere",
            link: "/user/askhere",
          },
        ]}
        style={{ margin: "10px   0px 10px 5px", color: "black" }}
      />
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
            style={{
              fontSize: "18px",
              fontWeight: "500",
              margin: "5px 0px",
            }}
          >
            Ask Anything you want
          </p>
          <Row>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              style={{ margin: "10px 0" }}
            >
              <FormTextArea name="question" label="Your Question" rows={4} />
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
              width: "30%",
            }}
          >
            Ask
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Ask;

//
