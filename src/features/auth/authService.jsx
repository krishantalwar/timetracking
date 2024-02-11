// import {
//     createEntityAdapter
// } from "@reduxjs/toolkit";

import {
    apiSlice
} from "../api/api";


import { setAuth, logout } from './authSlice';


// const authAdapter = createEntityAdapter();

// const initialState = authAdapter.getInitialState()
// eve.holt@reqres.in
// cityslicka
export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        loginEmail: builder.mutation({
            query: (credentials) => ({
                url: 'authentication/login',
                method: 'POST',
                body: credentials
            }),
            // onSuccess: (data, variables, api, store) => {
            //     console.log("ddd");
            //     //     console.log(data)
            //     //     console.log(variables)
            //     //     console.log(api)
            //     //     console.log(store)
            //     //     // Assuming the server response contains user information
            //     //     const user = data.user;
            //     //     // dispatch(setAuth({ isAuthenticated: true, user: user }));
            //     //     // Update the React Query cache directly
            //     //     store.dispatch(setAuth({ isAuthenticated: true, user: user }));

            //     //          store.dispatch(authApi.util.updateQueryData('me', null, (draft) => {
            //     //   draft.entities = [];
            //     // }));

            // },
            transformResponse: responseData => {
                console.log(responseData)
                // setAuth("asdsa",{ isAuthenticated: true, user: responseData });
                // return authAdapter.setAll(initialState, responseData)
                return responseData;
            },
            providesTags: (result, error, arg) => [
                ...result.map(() => (
                    { type: 'login_user', id: "LIST" }
                ))

            ],
            // onError: (error, _, api) => {
            //     console.error('Login Error:', error);
            // },
            // onSettled: (result, error, variables) => {
            //     console.log('Mutation Settled:', result, error, variables);
            // },
            async onQueryStarted(args, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
                console.log(args);
                // console.log(await getState());
                // console.log(await requestId);
                // console.log(await extra);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    // cookie('ssstoken', "sss", { httpOnly: true, secure: true, path: "/" });
                    document.cookie = 'authToken=asssadas; path=/; secure; HttpOnly';

                    dispatch(setAuth(data));
                } catch (error) {
                    console.log("error", error)
                }
            },

        }),
        loginGoogle: builder.mutation({
            query: (credentials) => {
                console.log('Credentials in Query:', credentials);
                return {
                    url: 'api/login',
                    method: 'POST',
                    body: credentials
                };
            },
            onSuccess: (data, variables, api, store) => {
                console.log("ddd");
                //     console.log(data)
                //     console.log(variables)
                //     console.log(api)
                //     console.log(store)
                //     // Assuming the server response contains user information
                //     const user = data.user;
                //     // dispatch(setAuth({ isAuthenticated: true, user: user }));
                //     // Update the React Query cache directly
                //     store.dispatch(setAuth({ isAuthenticated: true, user: user }));

                //          store.dispatch(authApi.util.updateQueryData('me', null, (draft) => {
                //   draft.entities = [];
                // }));

            },
            transformResponse: responseData => {
                console.log(responseData)
                // setAuth("asdsa",{ isAuthenticated: true, user: responseData });
                // return authAdapter.setAll(initialState, responseData)
                return responseData;
            },
            providesTags: (result, error, arg) => [
                ...result.map(() => (
                    { type: 'login_user', id: "LIST" }
                ))

            ],
            onError: (error, _, api) => {
                console.error('Login Error:', error);
            },
            onSettled: (result, error, variables) => {
                console.log('Mutation Settled:', result, error, variables);
            },
            async onQueryStarted(args, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
                console.log(args);
                // console.log(await getState());
                // console.log(await requestId);
                // console.log(await extra);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);

                    dispatch(setAuth(data));
                } catch (error) {

                }
            },
        }),
        logouts: builder.mutation({
            query: () => ({
                url: 'authentication/logout',
                method: 'POST',
            }),
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

                    dispatch(logout());
                } catch (error) {
                    console.log("error", error)
                }
            },
        }),
        me: builder.query({
            query: () => '/api/me',
        }),
    }),
    overrideExisting: false,
})

export const {
    useLoginEmailMutation,
    useLoginGoogleMutation,
    useLogoutsMutation,
    useMeQuery
} = extendedApiSlice


export default extendedApiSlice;


// https://codevoweb.com/react-redux-toolkit-jwt-authentication-and-authorization/
// https://medium.com/@nolanalimonti/reddit-user-authentication-with-rtk-query-863ebda43a78