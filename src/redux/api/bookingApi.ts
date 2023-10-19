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
    createBooking: build.mutation({
      query: (body) => ({
        url: BOOKING_URL,
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
  }),
});

export const {
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useUpdateBookingByIdMutation,
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
} = bookingApi;
