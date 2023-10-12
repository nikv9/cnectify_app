import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: null,
  },

  reducers: {
    // signup
    signupStart: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.success = action.payload.success;
    },

    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // signin
    signinStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.success = action.payload.success;
    },

    signinFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // logout
    logoutStart: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
    },

    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // !!!
    clrUser: (state) => {
      state.user = null;
    },
    clrError: (state) => {
      state.error = null;
    },
    clrSucess: (state) => {
      state.success = null;
    },
  },
});

export const {
  signupStart,
  signupSuccess,
  signupFailure,
  signinStart,
  signinSuccess,
  signinFailure,
  clrUser,
  clrError,
  clrSucess,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;
