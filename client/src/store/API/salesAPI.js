import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const salesAPI = createApi({
  reducerPath: "salesAPI",
  tagTypes: ["Sales"],

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_API_SALES_URL}/api/v1/sales`,
  }),

  endpoints: (builder) => ({
    purchaseTicket: builder.mutation({
      query: (body) => ({
        url: `/purchase-ticket`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sales"],
    }),
    purchaseHistory: builder.query({
      query: (customerID) => `/purchase-history/${customerID}`,
      providesTags: ["Sales"], // if we have query we use providesTags
    }),
  }),
});

export const { usePurchaseTicketMutation, usePurchaseHistoryQuery } = salesAPI;
