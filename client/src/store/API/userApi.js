import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  // Define a reducer path for this API, which will be used internally by Redux Toolkit
  reducerPath: "userApi",

  // Define an array of tag types to be used in caching API responses
  tagTypes: ["Users"],

  // Define a base query to use for all requests, with the base URL for the API
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/auth`, // we imprt this from the client/.env
  }), //we use import.meta.env instead of process.env beacuse this is Vite project, not React

  // Define the expected endpoints for this API, using a builder object
  endpoints: (builder) => ({
    // Define a "getUser" endpoint that sends a GET request to the root URL of the API
    getUser: builder.query({
      query: (name) => `/get-one-user/:userID`,
      providesTags: ["Users"], // if we have a query, we use providesTags
    }),

    updateUser: builder.mutation({
      query: (body) => ({
        url: `/update-user/${body._id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    createUser: builder.mutation({
      query: (body) => ({
        url: "/create-user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    loginUser: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateUserMutation,
  useGetUserQuery,
  useLoginUserMutation,
  useUpdateUserMutation,
} = userApi;