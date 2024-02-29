import { apiSlice } from "../api/api";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getScreens: builder.query({
            query: () => ({
                url: "screens",
                method: "GET",
            }),
            transformResponse: (responseData) => {
                console.log(responseData);
                return responseData;
            },
            providesTags: (result, error, arg) => [
                ...result.map(() => ({ type: "screens", id: "screensLIST" })),
            ],
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
    }),
    overrideExisting: false,
})

export const {
    useGetScreensQuery,
} = extendedApiSlice;