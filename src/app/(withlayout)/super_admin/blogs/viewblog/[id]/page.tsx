"use client";
import ReusableCard from "@/components/ui/BlogCard";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetBlogByIdQuery } from "@/redux/api/blogsApi";
import { getUserInfo } from "@/services/auth.service";

type IDProps = {
  params: any;
};
const ViewBlog = ({ params }: IDProps) => {
  const id = params.id;
  const { role } = getUserInfo() as any;

  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id);

  return (
    <div style={{ overflowX: "hidden" }}>
      <UMBreadCrumb
        items={[
          { label: `${role}`, link: `/${role}` },
          { label: "update", link: `/${role}/update` },
        ]}
        style={{ margin: "10px   0px 10px 5px", color: "black" }}
      />
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
