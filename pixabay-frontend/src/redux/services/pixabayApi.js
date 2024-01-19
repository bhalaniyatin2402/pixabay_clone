import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pixabayAccessKey = import.meta.env.VITE_APP_PIXABAY_ACCESS_KEY;

export const pixabayApi = createApi({
  reducerPath: "pixabatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_PIXABAY_API,
  }),
  endpoints: (build) => ({
    getBgImage: build.query({
      query: () =>
        `?key=${pixabayAccessKey}&image_type=photo&orientation=horizontal&colors=black`,
      transformResponse: (res) => {
        // get one image randomly from response for backgrond
        return res.hits[Math.round(Math.random() * 19)].webformatURL;
      },
    }),
    getImageList: build.query({
      query: (query) => ({
        url: `?key=${pixabayAccessKey}&image_type=photo&orientation=horizontal&per_page=30&q=${query}`,
      }),
    }),
    getImageDetails: build.query({
      query: (id) => ({
        url: `?key=${pixabayAccessKey}&id=${id}`,
      }),
      transformResponse: (response) => {
        return response.hits[0];
      },
    }),
  }),
});

export const {
  useGetBgImageQuery,
  useGetImageListQuery,
  useGetImageDetailsQuery,
} = pixabayApi;
