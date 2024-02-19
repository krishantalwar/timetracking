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
        getDesignation: builder.query({
            // query: () => '/shiftmaster/',
            query: () => ({
                url: 'designation',
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
                    { type: 'designation', id: "designationLIST" }
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
        createDesignationMaster: builder.mutation({
            query: (detail) => ({
                url: 'designation/add',
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
                { type: 'designation', id: "designationLIST" }
            ],
        }),
    }),
    overrideExisting: false,
})

export const {
    useCreateDesignationMasterMutation,
    useGetDesignationQuery
} = extendedApiSlice


export default extendedApiSlice;


