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
        getJob: builder.query({
            // query: () => '/job/',
            query: () => ({
                url: "job",
                method: "GET",
                // body: detail
            }),
            transformResponse: (responseData) => {
                console.log(responseData);
                // setAuth("asdsa",{ isAuthenticated: true, user: responseData });
                // return authAdapter.setAll(initialState, responseData)
                return responseData;
            },
            providesTags: (result, error, arg) => {
                console.log(result)
                // if (result) {
                return [...result.map(() => ({ type: "job", id: "jobLIST" }))];
                // } else {
                //     return [{ type: "job", id: "jobLIST" }]
                // }
            },
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
        createJob: builder.mutation({
            query: (detail) => ({
                url: "job/add",
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
                // console.log(args);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                } catch (error) {
                    console.log("error", error);
                }
            },

            invalidatesTags: [{ type: "job", id: "jobLIST" }],
        }),
        getCodejob: builder.query({
            // query: () => '/shiftmaster/',
            query: () => ({
                url: "job/code",
                method: "GET",
                // body: detail
            }),
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
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    return data;
                    // dispatch(setAuth(data));
                } catch (error) {
                    console.log("error", error);
                }
            },
        }),
        deleteJob: builder.mutation({
            query: (data) => {
                console.log(data);
                return {
                    url: "job/delete/" + data,
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
            invalidatesTags: [{ type: "job", id: "jobLIST" }],
        }),
        getJobDetail: builder.mutation({
            // query: () => '/shiftmaster/',
            query: (data) => {
                console.log(data);
                return {
                    url: "job/" + data,
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
            invalidatesTags: [{ type: "job", id: "jobLIST" }],
        }),
        editJob: builder.mutation({
            query: (detail) => ({
                // need to change the endpoint
                url: "job/edit/" + detail.jobid,
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
                // console.log(args);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                } catch (error) {
                    console.log("error", error);
                }
            },

            invalidatesTags: [{ type: "job", id: "jobLIST" }],
        }),
        assignedtJob: builder.mutation({
            query: (detail) => ({
                // need to change the endpoint
                url: "job/assignedjob/" + detail.job_id,
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
                // console.log(args);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                } catch (error) {
                    console.log("error", error);
                }
            },

            invalidatesTags: [{ type: "job", id: "jobLIST" }],
        }),
        getUserjob: builder.query({
            query: (detail) => ({
                // need to change the endpoint
                url: "job/userjob/" + detail,
                // method: "POST",
                // body: detail,
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
                // console.log(args);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                } catch (error) {
                    console.log("error", error);
                }
            },

            invalidatesTags: [{ type: "job", id: "jobLIST" }],
        }),
        saveTime: builder.mutation({
            query: (detail) => ({
                // need to change the endpoint
                url: "job/savetime",
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
                // console.log(args);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                } catch (error) {
                    console.log("error", error);
                }
            },
        }),

        getJobhistory: builder.query({
            query: (detail) => ({
                // need to change the endpoint
                url: "job/jobhistory",
                // method: "POST",
                // body: detail,
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
                // console.log(args);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                } catch (error) {
                    console.log("error", error);
                }
            },
            providesTags: (result, error, arg) => {
                console.log(result)
                // if (result) {
                return [...result.map(() => ({ type: "jobhistory", id: "jobhistoryLIST" }))];
                // } else {
                //     return [{ type: "job", id: "jobLIST" }]
                // }
            },
            // invalidatesTags: [{ type: "job", id: "jobLIST" }],
        }),

    }),
    overrideExisting: false,
});

export const {
    useCreateJobMutation,
    useEditJobMutation,
    useGetJobDetailMutation,
    useDeleteJobMutation,
    useAssignedtJobMutation,
    useSaveTimeMutation,

    useGetJobhistoryQuery,
    useLazyGetCodejobQuery,
    useGetJobQuery,
    useGetUserjobQuery,
} = extendedApiSlice;

export default extendedApiSlice;
