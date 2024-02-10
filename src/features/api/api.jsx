import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/',
        prepareHeaders: (headers, { getState }) => {
            const user = getState()?.auth

            // If we have a token set in state, let's assume that we should be passing it.
            if (user.isAuthenticated) {

                headers.set('authorization', `Bearer ${user.token.access.token}`)
            }

            return headers
        },
    }),
    tagTypes: ['auth'],
    endpoints: builder => ({})
})