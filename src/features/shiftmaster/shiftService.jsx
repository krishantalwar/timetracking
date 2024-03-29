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
        getShift: builder.query({
            // query: () => '/shiftmaster/',
            query: () => ({
                url: "shiftmaster",
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
                ...result.map(() => ({ type: "shiftmaster", id: "shiftmasterLIST" })),
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
        createShiftMaster: builder.mutation({
            query: (detail) => ({
                url: "shiftmaster/add",
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
                { type: 'shiftmaster', id: "shiftmasterLIST" }
            ],
        }),
        getCode: builder.query({
            // query: () => '/shiftmaster/',
            query: () => ({
                url: 'shiftmaster/code',
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
        deleteShiftMaster: builder.mutation({
            // query: () => '/shiftmaster/',
            query: (data) => {
                console.log(data)
                return ({
                    url: 'shiftmaster/delete/' + data,
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
                { type: 'shiftmaster', id: "shiftmasterLIST" }
            ],

        }),
        getShiftMasterDetail: builder.mutation({
            // query: () => '/shiftmaster/',
            query: (data) => {
                console.log(data)
                return ({
                    url: 'shiftmaster/' + data,
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
                { type: 'shiftmaster', id: "shiftmasterLIST" }
            ],

        }),
        editShiftMaster: builder.mutation({
            query: (detail) => ({
                url: 'shiftmaster/edit/' + detail.shiftid,
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
                { type: 'shiftmaster', id: "shiftmasterLIST" }
            ],
        }),
    }),
    overrideExisting: false,
})

export const {
    useCreateShiftMasterMutation,
    useGetShiftQuery,
    useLazyGetCodeQuery,
    useDeleteShiftMasterMutation,
    useGetShiftMasterDetailMutation,
    useEditShiftMasterMutation,

} = extendedApiSlice;

export default extendedApiSlice;
