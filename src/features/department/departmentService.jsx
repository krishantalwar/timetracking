// import {
//     createEntityAdapter
// } from "@reduxjs/toolkit";

import {
    apiSlice
} from "../api/api";


// import { setAuth, logout } from './authSlice';


// const authAdapter = createEntityAdapter();

// const initialState = authAdapter.getInitialState()
// eve.holt@reqres.in
// cityslicka
export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDepartment: builder.query({
            // query: () => '/shiftmaster/',
            query: () => ({
                url: 'department',
                method: 'GET',
                // body: detail
            }),
            transformResponse: responseData => {
                console.log(responseData)
                // setAuth("asdsa",{ isAuthenticated: true, user: responseData });
                // return authAdapter.setAll(initialState, responseData)
                return responseData;
            },
            providesTags: (result, error, arg) => [
                ...result.map(() => (
                    { type: 'department', id: "departmentLIST" }
                ))

            ],
            // invalidatesTags: [
            //     { type: 'shiftmaster', id: "LIST" }
            // ],
            async onQueryStarted(args, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
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
                    console.log("error", error)
                }
            },

        }),
        createDepartmentnMaster: builder.mutation({
            query: (detail) => ({
                url: 'department/add',
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
            async onQueryStarted(args, { id }, { queryFulfilled, }) {
                console.log(args);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                } catch (error) {
                    console.log("error", error)
                }
            },

            invalidatesTags: [
                { type: 'department', id: "departmentLIST" }
            ],
        }),
        getCodes: builder.query({
            // query: () => '/shiftmaster/',
            query: () => ({
                url: 'department/code',
                method: 'GET',
                // keepUnusedDataFor: 0,
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
            forceRefetch({ currentArg, previousArg }) {
                return true
            },

        }),
        deleteDepartment: builder.mutation({
            // query: () => '/department/',
            query: (data) => {
                console.log(data);
                return {
                    url: "department/delete/" + data,
                    method: "GET",
                    // body: detail
                };
            },
            transformResponse: (responseData) => {
                console.log(responseData);
                // setAuth("asdsa",{ isAuthenticated: true, user: responseData });
                // return authAdapter.setAll(initialState, responseData)
                return responseData;
            },
            async onQueryStarted(
                args,
                { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
            ) {
                // console.log(await getState());
                // console.log(await requestId);
                // console.log(await extra);
                console.log(args);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    return data;
                    // dispatch(setAuth(data));
                } catch (error) {
                    console.log("error", error);
                }
            },
            invalidatesTags: [{ type: "department", id: "departmentLIST" }],
        }),

        editDepartment: builder.mutation({
            query: (detail) => ({
                // end point need to chnage
                url: 'department/edit/' + detail.departmentid,
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
                { type: 'department', id: "departmentLIST" }
            ],
        }),

        getDepartmentDetail: builder.mutation({
            // query: () => '/shiftmaster/',
            query: (data) => {
                console.log(data)
                return ({
                    url: 'department/' + data,
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

        }),
    }),
    overrideExisting: false,
})

export const {
    useCreateDepartmentnMasterMutation,
    useGetDepartmentQuery,
    useDeleteDepartmentMutation,
    useEditDepartmentMutation,
    useGetDepartmentDetailMutation,
    useLazyGetCodesQuery,
} = extendedApiSlice


export default extendedApiSlice;


