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
import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "@/redux/api/blogsApi";

const { Option } = Select;

type IDProps = {
  params: any;
};

const UpdateBLogPage = ({ params }: IDProps) => {
  const { id } = params;
  const router = useRouter();
  const [updatedBlog, setUpdatedBlog] = useState(null);
  const { data: blog, refetch } = useGetBlogByIdQuery(id);

  const { role } = getUserInfo() as any;

  const [updateBlog, { error }] = useUpdateBlogMutation();

  const onSubmit = async (values: any) => {
    message.loading("Updating.....");
    try {
      const res = await updateBlog({
        id: id,
        body: values,
      }).unwrap();

      if (res?.id) {
        setUpdatedBlog(res);
        message.success("Blog Successfully Updated!");

        router.push("/admin/blogs");
      }
    } catch (err: any) {
      console.error("Error updating blog:", err);
      message.error(err.message || "Failed to update blog");
      //  console.log(err);
    }
  };
  const userData = updatedBlog || blog;

  // @ts-ignore
  const defaultValues = {
    title: userData?.title || "",
    email: userData?.description || "",
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
        Update Blog
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
            Blog information
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
                value={blog?.title}
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
                value={blog?.description}
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

export default UpdateBLogPage;
