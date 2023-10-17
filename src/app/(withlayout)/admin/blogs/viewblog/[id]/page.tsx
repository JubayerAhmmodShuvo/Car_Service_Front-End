"use client";
import ReusableCard from "@/components/ui/BlogCard";
import { useGetBlogByIdQuery } from "@/redux/api/blogsApi";

type IDProps = {
  params: any;
};
const ViewBlog = ({ params }: IDProps) => {
  const id = params.id;


  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id);

  return (
    <div style={{ overflowX: "hidden" }}>
      {isLoading ? (
        <div></div>
      ) : isError ? (
        <div>Error fetching blog data</div>
      ) : !blog ? (
        <div>Blog not found</div>
      ) : (
        <ReusableCard title={blog.title}>{blog.description}</ReusableCard>
      )}
    </div>
  );
};

export default ViewBlog;