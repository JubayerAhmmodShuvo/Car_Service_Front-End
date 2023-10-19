import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BOOKING_URL = "/booking"; 


export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBookingById: build.query({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "GET",
      }),
    }),
    getUserBookingById: build.query({
      query: (id) => ({
        url: `${BOOKING_URL}/bookings/${id}`,
        method: "GET",
      }),
    }),
    createBooking: build.mutation({
      query: (body) => ({
        url: `${BOOKING_URL}/create-booking`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    updateBookingById: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    getAllBookings: build.query({
      query: () => ({
        url: BOOKING_URL,
        method: "GET",
      }),
    }),
    cancelBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/cancel/${id}`,
        method: "PATCH", 
      }),
     
    }),
    approveBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/approve/${id}`,
        method: "PATCH", // or "POST" depending on your API
      }),
     
    }),
  }),
});

export const {
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useUpdateBookingByIdMutation,
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
  useGetUserBookingByIdQuery,
  useCancelBookingMutation,
  useApproveBookingMutation
} = bookingApi;
