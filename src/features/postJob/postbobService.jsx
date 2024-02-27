// import {
//     createEntityAdapter
// } from "@reduxjs/toolkit";

import { apiSlice } from "../api/api";

// import { setAuth, logout } from './authSlice';

// const authAdapter = createEntityAdapter();

// const initialState = authAdapter.getInitialState()
// eve.holt@reqres.in
// cityslicka
export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPostjob: builder.query({
            // query: () => '/postjob/',
            query: () => ({
                url: "postjob",
                method: "GET",
                // body: detail
            }),
            transformResponse: (responseData) => {
                console.log(responseData);
                // setAuth("asdsa",{ isAuthenticated: true, user: responseData });
                // return authAdapter.setAll(initialState, responseData)
                return responseData;
            },
            providesTags: (result, error, arg) => [
                ...result.map(() => ({ type: "postjob", id: "postjobLIST" })),
            ],
            // invalidatesTags: [
            //     { type: 'shiftmaster', id: "LIST" }
            // ],
            async onQueryStarted(
                args,
                { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
            ) {
                console.log(args);
                // console.log(await getState());
                // console.log(await requestId);
                // console.log(await extra);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    // cookie('ssstoken', "sss", { httpOnly: true, secure: true, path: "/" });
                    // document.cookie = 'authToken=asssadas; path=/; secure; HttpOnly';

                    // dispatch(setAuth(data));
                } catch (error) {
                    console.log("error", error);
                }
            },
        }),
        createPostjob: builder.mutation({
            query: (detail) => ({
                url: "postjob/add",
                method: "POST",
                body: detail,
            }),
            transformResponse: (responseData) => {
                console.log(responseData);
                // setAuth("asdsa",{ isAuthenticated: true, user: responseData });
                // return authAdapter.setAll(initialState, responseData)
                return responseData;
            },

            // onError: (error, _, api) => {
            //     console.error('Login Error:', error);
            // },
            // onSettled: (result, error, variables) => {
            //     console.log('Mutation Settled:', result, error, variables);
            // },
            async onQueryStarted(args, { queryFulfilled }) {
                console.log(args);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                } catch (error) {
                    console.log("error", error);
                }
            },

            invalidatesTags: [
                { type: 'postjob', id: "postjobLIST" }
            ],
        }),
        getCode: builder.query({
            // query: () => '/shiftmaster/',
            query: () => ({
                url: 'postjob/code',
                method: 'GET',
                // body: detail
            }),
            transformResponse: responseData => {
                console.log(responseData)
                // setAuth("asdsa",{ isAuthenticated: true, user: responseData });
                // return authAdapter.setAll(initialState, responseData)
                return responseData;
            },
            async onQueryStarted(args, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
                // console.log(await getState());
                // console.log(await requestId);
                // console.log(await extra);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    return data
                    // dispatch(setAuth(data));
                } catch (error) {
                    console.log("error", error)
                }
            },

        }),
        deletePostjob: builder.mutation({
            // query: () => '/shiftmaster/',
            query: (data) => {
                console.log(data)
                return ({
                    url: 'postjob/delete/' + data,
                    method: 'GET',
                    // body: detail
                });
            },
            transformResponse: responseData => {
                console.log(responseData)
                // setAuth("asdsa",{ isAuthenticated: true, user: responseData });
                // return authAdapter.setAll(initialState, responseData)
                return responseData;
            },
            async onQueryStarted(args, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
                // console.log(await getState());
                // console.log(await requestId);
                // console.log(await extra);
                console.log(args)
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    return data
                    // dispatch(setAuth(data));
                } catch (error) {
                    console.log("error", error)
                }
            },
            invalidatesTags: [
                { type: 'postjob', id: "postjobLIST" }
            ],

        }),
        getPostjobDetail: builder.mutation({
            // query: () => '/shiftmaster/',
            query: (data) => {
                console.log(data)
                return ({
                    url: 'postjob/' + data,
                    method: 'GET',
                    // body: detail
                });
            },
            transformResponse: responseData => {
                console.log(responseData)
                // setAuth("asdsa",{ isAuthenticated: true, user: responseData });
                // return authAdapter.setAll(initialState, responseData)
                return responseData;
            },
            async onQueryStarted(args, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
                // console.log(await getState());
                // console.log(await requestId);
                // console.log(await extra);
                console.log(args)
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    return data
                    // dispatch(setAuth(data));
                } catch (error) {
                    console.log("error", error)
                }
            },
            invalidatesTags: [
                { type: 'postjob', id: "postjobLIST" }
            ],

        }),
        editPostjob: builder.mutation({
            query: (detail) => ({
                // need to change the endpoint
                url: 'postjob/edit/' + detail.shiftid,
                method: 'POST',
                body: detail
            }),
            transformResponse: responseData => {
                console.log(responseData)
                // setAuth("asdsa",{ isAuthenticated: true, user: responseData });
                // return authAdapter.setAll(initialState, responseData)
                return responseData;
            },

            // onError: (error, _, api) => {
            //     console.error('Login Error:', error);
            // },
            // onSettled: (result, error, variables) => {
            //     console.log('Mutation Settled:', result, error, variables);
            // },
            async onQueryStarted(args, { queryFulfilled }) {
                // console.log(args);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                } catch (error) {
                    console.log("error", error)
                }
            },

            invalidatesTags: [
                { type: 'postjob', id: "postjobLIST" }
            ],
        }),
    }),
    overrideExisting: false,
})

export const {
    useCreatePostjobMutation,
    useEditPostjobMutation,
    useGetPostjobDetailMutation,
    useDeletePostjobMutation,
    useLazyGetCodeQuery,
    useGetPostjobQuery

} = extendedApiSlice;

export default extendedApiSlice;
