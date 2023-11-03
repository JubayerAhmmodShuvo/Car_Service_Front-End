import { useGetAllBlogsQuery } from "@/redux/api/blogsApi";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "antd";
import { getUserInfo } from "@/services/auth.service";

const BlogPage = () => {
  const { role } = getUserInfo() as any;

  const {
    data: blogs,
    isLoading,
    refetch,
  } = useGetAllBlogsQuery(
    {},
    { refetchOnMountOrArgChange: true, pollingInterval: 2000 }
  );


  const [currentCardIndex, setCurrentCardIndex] = useState(0);


  const cycleToNextCard = () => {
    setCurrentCardIndex((currentCardIndex + 1) % (blogs ? blogs.length : 0));
  };

  
  useEffect(() => {
    const timer = setInterval(cycleToNextCard, 5000); 
    return () => {
      clearInterval(timer);
    };
  }, [blogs]);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        overflowX: "hidden",
      }}
    >
      <h1 style={{fontStyle:"italic", fontSize:"2rem", color:"black", textAlign:"center"}} >Blogs</h1>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Row gutter={[16, 16]} justify="space-around">
            {blogs &&
              blogs
                .slice(currentCardIndex, currentCardIndex + 2)
                .map(
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
                            ? (blog?.description as string)?.slice(0, 40) +
                              "..."
                            : blog?.description}
                        </p>
                      </Card>
                    </Col>
                  )
                )}
          </Row>
        )}
      </div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin:"20px 0px"
        }}
      >
        <Link style={{ textAlign: "center" }} href={`/user/blog`}>
          <Button type="primary">All Blog</Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogPage;
