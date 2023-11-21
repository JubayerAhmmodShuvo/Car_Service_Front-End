"use client";
import { useGetAllBlogsQuery } from "@/redux/api/blogsApi";
import React from "react";
import { Card, Row, Col } from "antd";
import Link from "next/link";
import { getUserInfo } from "@/services/auth.service";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const Blog = () => {
  const {
    data: blogs,
    isLoading,
    refetch,
  } = useGetAllBlogsQuery(
    {},
    { refetchOnMountOrArgChange: true, pollingInterval: 2000 }
  );
  const { role } = getUserInfo() as any;

  return (
    <div style={{ overflowX: "hidden" }}>
      <UMBreadCrumb
        items={[
          {
            label: "user",
            link: "/user",
          },
          {
            label: "viewblog",
            link: "/user/viewblog",
          },
        ]}
        style={{ margin: "10px   0px 10px 5px", color: "black" }}
      />
      <h1>Blog List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Row gutter={[16, 16]}>
          {blogs &&
            blogs.map(
              (blog: {
                id: React.Key | null | undefined;
                title:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | React.PromiseLikeOfReactNode
                  | null
                  | undefined;
                _id: any;
                description:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | React.PromiseLikeOfReactNode
                  | null
                  | undefined;
              }) => (
                <Col xs={24} sm={12} md={6} lg={6} key={blog.id}>
                  <Card
                    title={blog.title}
                    extra={
                      <Link href={`/${role}/blog/viewblog/${blog?._id}`}>
                        Read More
                      </Link>
                    }
                    style={{ margin: "16px 0" }}
                  >
                    <p>
                      {(blog?.description as string)?.length > 40
                        ? (blog?.description as string)?.slice(0, 40) + "..."
                        : blog?.description}
                    </p>
                  </Card>
                </Col>
              )
            )}
        </Row>
      )}
    </div>
  );
};

export default Blog;
