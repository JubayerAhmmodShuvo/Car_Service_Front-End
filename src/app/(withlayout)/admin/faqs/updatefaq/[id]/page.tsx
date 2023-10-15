"use client";

import Form from "@/components/FORMS/Form";
import FormInput from "@/components/FORMS/FormInput";
import FormSelectField from "@/components/FORMS/FormSelectField";
import FormTextArea from "@/components/FORMS/FormTextArea";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

import { getUserInfo } from "@/services/auth.service";
import { bloodGroupOptions } from "@/constants/global";

import { Button, Col, Row, Select, message } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetBlogByIdQuery, useUpdateBlogMutation } from "@/redux/api/blogsApi";
import { useUpdateFaqMutation } from "@/redux/api/faqApi";

const { Option } = Select;

type IDProps = {
  params: any;
};

const UpdateFaqPage= ({ params }: IDProps) => {
  const { id } = params;
  const router = useRouter();
  const [updatedFaq, setUpdatedFaq] = useState(null);
  const { data: faq, refetch } = useGetBlogByIdQuery(id);

  const { role } = getUserInfo() as any;

  const [updateFaq, { error }] = useUpdateFaqMutation();

  const onSubmit = async (values: any) => {
    message.loading("Updating.....");
    try {
      const res = await updateFaq({
        id: id,
        body: values,
      }).unwrap();

      if (res?.id) {
        setUpdatedFaq(res);
        message.success("Answer Successfully Updated!");
       
        router.push("/admin/faqs");
      }
    } catch (err: any) {
      console.error("Error updating faq:", err);
      message.error(err.message || "Failed to update faq");
      console.log(err);
    }
  };
  const userData = updatedFaq || faq;

  // @ts-ignore
  const defaultValues = {
    question: userData?.qeustion || "",
    answer: userData?.answer || "",
   
  };

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
        Answer The Asked Question
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
            Question's Answer
          </p>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              style={{ margin: "10px 0" }}
            >
              <FormInput
                name="question"
                label="Question"
                size="large"
                value={faq?.ques}
                disabled={true}
              />
            </Col>

            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              style={{ margin: "10px 0" }}
            >
              <FormTextArea
                name="answer"
                label="Answer"
                rows={4}
                value={faq?.description}
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

export default UpdateFaqPage;

