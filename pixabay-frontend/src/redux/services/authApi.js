import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_SERVER_API}/api/user`,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/sign-up",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: "/me",
      }),
      providesTags: ["User"],
    }),
    getFavoriteList: builder.query({
      query: () => "/favorite",
      providesTags: [{ type: "User", id: "Favorite" }],
    }),
    updateFavoriteList: builder.mutation({
      query: (data) => ({
        url: "/favorite",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "Favorite" }],
    }),
    getDownloadHistory: builder.query({
      query: () => "/history",
      providesTags: [{ type: "User", id: "History" }],
    }),
    addIntoDownloadHistory: builder.mutation({
      query: (data) => ({
        url: "/history",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "History" }],
    }),
    removeFromDownloadHistory: builder.mutation({
      query: (data) => ({
        url: "/history",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "History" }],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserDetailsQuery,
  useGetFavoriteListQuery,
  useUpdateFavoriteListMutation,
  useGetDownloadHistoryQuery,
  useAddIntoDownloadHistoryMutation,
  useRemoveFromDownloadHistoryMutation,
} = authApi;
