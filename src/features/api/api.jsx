import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/',
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const user = getState()?.auth

            // If we have a token set in state, let's assume that we should be passing it.
            if (user.isAuthenticated) {

                headers.set('authorization', `Bearer ${user.token.access.token}`)
            }

            return headers
        },

    }),
    tagTypes: ['auth', 'shiftmaster', 'shiftmastercode'],
    refetchOnReconnect: true,
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({})
})

// https://egghead.io/lessons/redux-manually-refetch-data-after-an-rtk-query-mutation-with-unwrap-and-refetch