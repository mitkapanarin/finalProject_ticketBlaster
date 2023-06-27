import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/auth`,
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (name) => `/get-one-user/:userID`,
      providesTags: ["Users"],
    }),
    getAllUsers: builder.query({
      query: () => "/get-all-users",
      providesTags: ["Users"],
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
    forgotPassword: builder.mutation({
      queryFn: async (email) => {
        const response = await fetch("/forgot-password", {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to send password reset instructions");
        }
      },
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserQuery,
  useLoginUserMutation,
  useUpdateUserMutation,
  useGetAllUsersQuery,
  useForgotPasswordMutation,
} = userApi;
