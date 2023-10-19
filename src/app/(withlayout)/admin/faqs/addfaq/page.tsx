"use client";

import Form from "@/components/FORMS/Form";
import FormInput from "@/components/FORMS/FormInput";
import FormSelectField from "@/components/FORMS/FormSelectField";
import FormTextArea from "@/components/FORMS/FormTextArea";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

import { getUserInfo } from "@/services/auth.service";


import { Button, Col, Row, Select, message } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateFaqMutation } from "@/redux/api/faqApi";



const { Option } = Select;

type IDProps = {
  params: any;
};

const CreateFaqPage = ({ params }: IDProps) => {
  const { id } = params;
  const router = useRouter();
  const [updatedBlog, setUpdatedBlog] = useState(null);

  const { role } = getUserInfo() as any;

  const [blog, { error }] = useCreateFaqMutation();

  const onSubmit = async (values: any) => {
    try {
      const formData = new FormData();

      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          formData.append(key, values[key]);
        }
      }

      message.loading("Creating...");
      const response = await blog(formData);

      if (response) {
        message.success("Faq's created successfully!");
        router.push("/admin/faqs");
      } else {
        message.error("Faq's creation failed.");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <>
      <UMBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          { label: "addfaq", link: `/${role}/addfaq` },
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
        Ask & Answer
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
           Frequenty Ask a Question
          </p>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{ margin: "10px 0" }}
            >
              <FormInput
                name="question"
                label="Ask Question"
                size="large"
                type="text"
                required
              />
            </Col>

            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{ margin: "10px 0" }}
            >
              <FormTextArea name="answer" label="Give The Answer" rows={4} />
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
            Add FAQ's
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateFaqPage;
