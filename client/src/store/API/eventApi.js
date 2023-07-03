import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const eventApi = createApi({
  // Define a reducer path for this API, which will be used internally by Redux Toolkit
  reducerPath: "eventApi",

  // Define an array of tag types to be used in caching API responses
  tagTypes: ["Events"],

  // Define a base query to use for all requests, with the base URL for the API
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_API_EVENT_URL}/api/v1/events`, // we imprt this from the client/.env
  }), //we use import.meta.env instead f process.env beacuse this is Vite project, not React

  // Define the expected endpoints for this API, using a builder object
  endpoints: (builder) => ({
    // Define a "getEvent" endpoint that sends a GET request to the root URL of the API
    getEvent: builder.query({
      query: (name) => `/get-one-event/:eventID`,
      providesTags: ["Events"], // if we have query we use providesTags
    }),

    // Define a "getAllEvents" endpoint that sends a GET request to the root URL of the API
    getAllEvents: builder.query({
      query: () => "/get-all-events",
      providesTags: ["Events"],
    }),

    updateEvent: builder.mutation({
      query: (body) => ({
        url: `/update-event/${eventID}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Events"],
    }),

    createEvent: builder.mutation({
      query: (body) => ({
        url: "/create-event",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Events"],
    }),

    searchEvents: builder.query({
      query: (searchTerm) => `/search-events?search=${searchTerm}`,
      providesTags: ["Events"],
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateEventMutation,
  useGetEventQuery,
  useUpdateEventMutation,
  useGetAllEventsQuery,
  useSearchEventsQuery
} = eventApi;