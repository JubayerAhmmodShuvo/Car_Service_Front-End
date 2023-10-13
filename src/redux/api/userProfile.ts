"use client";

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
      query: (id, ...body) => ({
        url: `${USER_URL}/${id}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetUserProfileQuery,useUpdateUserProfileMutation } = profileApi;
