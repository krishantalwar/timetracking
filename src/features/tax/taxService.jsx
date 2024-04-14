
import { apiSlice } from "../api/api";
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTax: builder.query({
      query: () => ({
        url: "tax",
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
        ...result.map(() => ({ type: "tax", id: "taxLIST" })),
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
    createTaxMaster: builder.mutation({
      query: (detail) => ({
        url: "tax/add",
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
      invalidatesTags: [{ type: "tax", id: "taxLIST" }],
    }),
    deleteTax: builder.mutation({
      // query: () => '/designation/',
      query: (data) => {
        console.log(data);
        return {
          url: "tax/delete/" + data,
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
      invalidatesTags: [{ type: "tax", id: "taxLIST" }],
    }),
    getTaxDetail: builder.mutation({
      // query: () => '/shiftmaster/',
      query: (data) => {
        console.log(data);
        return {
          url: "tax/" + data,
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
    editTax: builder.mutation({
      query: (detail) => ({
        url: "tax/edit/" + detail.taxid,
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

      invalidatesTags: [{ type: "tax", id: "taxLIST" }],
    }),
    getCodestax: builder.query({
      // query: () => '/shiftmaster/',
      query: () => ({
        url: "tax/code",
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
  useGetTaxQuery,
  useCreateTaxMasterMutation,
  useDeleteTaxMutation,
  useGetTaxDetailMutation,
  useEditTaxMutation,
  useGetTaxesQuery,
  useLazyGetCodestaxQuery,
} = extendedApiSlice;

export default extendedApiSlice;
