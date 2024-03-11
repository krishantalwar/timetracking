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
    getDesignation: builder.query({
      // query: () => '/shiftmaster/',
      query: () => ({
        url: "designation",
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
        ...result.map(() => ({ type: "designation", id: "designationLIST" })),
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
    createDesignationMaster: builder.mutation({
      query: (detail) => ({
        url: "designation/add",
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
      async onQueryStarted(args, { id }, { queryFulfilled }) {
        console.log(args);
        try {
          const { data } = await queryFulfilled;
          console.log(data);
        } catch (error) {
          console.log("error", error);
        }
      },
      invalidatesTags: [{ type: "designation", id: "designationLIST" }],
    }),
    deleteDesignation: builder.mutation({
      // query: () => '/designation/',
      query: (data) => {
        console.log(data);
        return {
          url: "designation/delete/" + data,
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
      invalidatesTags: [{ type: "designation", id: "designationLIST" }],
    }),
    getDesignationDetail: builder.mutation({
      // query: () => '/shiftmaster/',
      query: (data) => {
        console.log(data);
        return {
          url: "designation/" + data,
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
    }),
    editDesignation: builder.mutation({
      query: (detail) => ({
        url: "designation/edit/" + detail.designationid,
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

      invalidatesTags: [{ type: "designation", id: "designationLIST" }],
    }),
    getCodesdesignation: builder.query({
      // query: () => '/shiftmaster/',
      query: () => ({
        url: "designation/code",
        method: "GET",
        // keepUnusedDataFor: 0,
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
      forceRefetch({ currentArg, previousArg }) {
        return true;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateDesignationMasterMutation,
  useGetDesignationQuery,
  useDeleteDesignationMutation,
  useEditDesignationMutation,
  useGetDesignationDetailMutation,
  useLazyGetCodesdesignationQuery,
} = extendedApiSlice;

export default extendedApiSlice;
