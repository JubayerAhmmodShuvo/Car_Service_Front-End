import { tagTypes } from "../tag-types";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { baseApi } from "./baseApi";

const { id } = getUserInfo() as any;


const SERVICE_URL = "/service";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getServiceById: build.query({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET",
      }),
    }),
    addReview: build.mutation({
      query: (body:any) => ({
        url: `${SERVICE_URL}/${id}/add-review`,
        method: "POST",
        data: body,
      }),
    }),

    updateServiceById: build.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.service],
    }),
    getAllService: build.query({
      query: () => ({
        url: `${SERVICE_URL}/`,
        method: "GET",
      }),
    }),
    deleteService: build.mutation({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useGetAllServiceQuery,
  useUpdateServiceByIdMutation,
  useGetServiceByIdQuery,
  useDeleteServiceMutation,
  useAddReviewMutation
} = serviceApi;
