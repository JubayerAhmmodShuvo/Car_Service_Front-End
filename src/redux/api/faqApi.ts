import { tagTypes } from "../tag-types";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { baseApi } from "./baseApi";

const { id } = getUserInfo() as any;

const FAQ_URL = "/faq";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFaqById: build.query({
      query: (id) => ({
        url: `${FAQ_URL}/${id}`,
        method: "GET",
      }),
    }),

    updateFaq: build.mutation({
      query: (data) => ({
        url: `${FAQ_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getAllFaq: build.query({
      query: () => ({
        url: `${FAQ_URL}/`,
        method: "GET",
      }),
    }),
    deleteFaq: build.mutation({
      query: (id) => ({
        url: `${FAQ_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    createFaq: build.mutation({
      query: (blogData: any) => ({
        url: `${FAQ_URL}/`,
        method: "POST",
        data: blogData,
      }),
    }),
  }),
});

export const {
  useGetAllFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useGetFaqByIdQuery,
  useDeleteFaqMutation
} = blogApi;
