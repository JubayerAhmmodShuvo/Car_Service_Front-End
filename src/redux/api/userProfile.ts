import { tagTypes } from "../tag-types";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { baseApi } from "./baseApi";

const { id } = getUserInfo() as any;

const USER_URL = "/user";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
    }),

    updateUserProfile: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getAllUsers: build.query({
      query: () => ({
        url: `${USER_URL}/`, // Adjust the URL as needed
        method: "GET",
      }),
    }),
    deleteUserProfile: build.mutation({
    query: (id) => ({
    url: `${USER_URL}/${id}`,
    method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetAllUsersQuery, 
  useDeleteUserProfileMutation,
} = profileApi;
