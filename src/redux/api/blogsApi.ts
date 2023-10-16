import { tagTypes } from "../tag-types";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { baseApi } from "./baseApi";

const { id } = getUserInfo() as any;

const BLOGS_URL = "/blog";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBlogById: build.query({
      query: (id) => ({
        url: `${BLOGS_URL}/${id}`,
        method: "GET",
      }),
    }),

    updateBlog: build.mutation({
      query: (data) => ({
        url: `${BLOGS_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    getAllBlogs: build.query({
      query: () => ({
        url: `${BLOGS_URL}/`,
        method: "GET",
      }),
    }),
    deleteblog: build.mutation({
      query: (id) => ({
        url: `${BLOGS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    createBlog: build.mutation({
      query: (blogData:any) => ({
        url: `${BLOGS_URL}/`,
        method: "POST",
        data:blogData,
      }),
     
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useDeleteblogMutation,
 useCreateBlogMutation
} = blogApi;
