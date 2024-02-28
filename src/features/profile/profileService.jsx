import { apiSlice } from "../api/api";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            // query: () => '/shiftmaster/',
            query: () => ({
                url: "profile",
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
                ...result.map(() => ({ type: "profile", id: "profileLIST" })),
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
        createProfile: builder.mutation({
            query: (detail) => ({
                url: "profile/add",
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
                { type: 'profile', id: "profileLIST" }
            ],
        }),
        getCode: builder.query({
            // query: () => '/shiftmaster/',
            query: () => ({
                url: 'profile/code',
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
        deleteProfile: builder.mutation({
            // query: () => '/shiftmaster/',
            query: (data) => {
                console.log(data)
                return ({
                    //change end url
                    url: 'profile/delete/' + data,
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
                { type: 'profile', id: "profileLIST" }
            ],

        }),
        getProfileDetail: builder.mutation({
            // query: () => '/shiftmaster/',
            query: (data) => {
                console.log(data)
                return ({

                    //change the end point
                    url: 'profile/' + data,
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
                { type: 'profile', id: "profileLIST" }
            ],

        }),
        editProfile: builder.mutation({
            query: (detail) => ({
                //change end point
                url: 'profile/edit/' + detail.shiftid,
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
                { type: 'profile', id: "profileLIST" }
            ],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetProfileQuery,
    useCreateProfileMutation,
    useGetCodeQuery,
    useDeleteProfileMutation,
    useGetProfileDetailMutation,
    useEditProfileMutation
} = extendedApiSlice;

export default extendedApiSlice;
