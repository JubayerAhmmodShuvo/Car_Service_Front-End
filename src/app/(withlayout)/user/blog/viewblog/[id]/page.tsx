"use client";
import ReusableCard from "@/components/ui/BlogCard";
import NewCardBlog from "@/components/ui/NewBlogCard";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetBlogByIdQuery } from "@/redux/api/blogsApi";

type IDProps = {
  params: any;
};
const ViewBlog = ({ params }: IDProps) => {
  const id = params.id;


  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id);

  return (
    <div style={{ overflowX: "hidden" }}>
      <UMBreadCrumb
        items={[
          {
            label: "user",
            link: "/user",
          },
          {
            label: "all",
            link: "/user/all",
          },
        ]}
        style={{ marginTop: "10px", color: "black" }}
      />
      {isLoading ? (
        <div></div>
      ) : isError ? (
        <div>Error fetching blog data</div>
      ) : !blog ? (
        <div>Blog not found</div>
      ) : (
        <NewCardBlog title={blog.title}>{blog.description}</NewCardBlog>
      )}
    </div>
  );
};

export default ViewBlog;