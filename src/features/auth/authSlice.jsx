// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, user: null },
  reducers: {
    setAuth: (state, action) => {
      // console.log(state)
      // console.log(action)
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.user = [];
    },
    getAuth: (state, action) => {
      console.log(state)
      console.log(action)
      return state;
    },
  },
});

export const { setAuth } = authSlice.actions;

// export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
