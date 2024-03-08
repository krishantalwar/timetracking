import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002/",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const user = getState()?.auth;

      // If we have a token set in state, let's assume that we should be passing it.
      if (user.isAuthenticated) {
        headers.set("authorization", `Bearer ${user.token.access.token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["auth", "shiftmaster", "shiftmastercode"],
  refetchOnReconnect: true,
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({}),
});

// https://egghead.io/lessons/redux-manually-refetch-data-after-an-rtk-query-mutation-with-unwrap-and-refetch

// https://codesandbox.io/p/sandbox/redux-toolkit-query-uselazyquery-25t2cj?file=%2Fsrc%2FApp.js
// https://redux-toolkit.js.org/rtk-query/usage/cache-behavior#re-fetching-on-demand-with-refetchinitiate
// https://redux-toolkit.js.org/rtk-query/usage/queries
// https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#uselazyquery
// https://stackoverflow.com/questions/71231118/refetching-upon-a-button-click-in-rtk-query-does-not-trigger-component-update
