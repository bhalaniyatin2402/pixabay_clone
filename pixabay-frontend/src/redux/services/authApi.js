import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_SERVER_API}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["User", "Course"],
  endpoints: (builder) => ({
    getLoggedInUserDetails: builder.query({
      query: () => ({
        url: "/user/me",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetLoggedInUserDetailsQuery } = authApi;
