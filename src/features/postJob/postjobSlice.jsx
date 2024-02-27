import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'postajob',
    initialState: {},
    reducers: {
        setAuth: (state, action) => {
            // console.log(state)
            // console.log(action)
            // state.isAuthenticated = action.payload.isAuthenticated;
            // state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.tokens;
            state.user = action.payload.user.userid;
            return state;
        },
        getAuth: (state, action) => {
            console.log(state)
            console.log(action)
            return state;
        },
        logout: (state, action) => {
            state.isAuthenticated = false;
            state.token = "";
            state.user = "";
            return state;
        },
    },
});

export const { setAuth, logout } = authSlice.actions;

// export const selectAuth = (state) => state.auth;

export default authSlice.reducer;