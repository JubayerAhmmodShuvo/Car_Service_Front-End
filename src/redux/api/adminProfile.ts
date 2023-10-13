"use client";

import { tagTypes } from "../tag-types";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { baseApi } from "./baseApi";

const { id } = getUserInfo() as any;

const Admin_Url = "/user";

export const AdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdminProfile: build.query({
      query: (id) => ({
        url: `${Admin_Url}/${id}`,
        method: "GET",
      }),
    }),

    updateAdminProfile: build.mutation({
      query: (id, ...body) => ({
        url: `${Admin_Url}/${id}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const { useGetAdminProfileQuery, useUpdateAdminProfileMutation } =
  AdminApi;
