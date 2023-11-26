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

    signupFail: (state, action) => {
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

    signinFail: (state, action) => {
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

    logoutFail: (state, action) => {
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
    clrSuccess: (state) => {
      state.success = null;
    },
  },
});

export const {
  signupStart,
  signupSuccess,
  signupFail,
  signinStart,
  signinSuccess,
  signinFail,
  clrUser,
  clrError,
  clrSuccess,
  logoutStart,
  logoutSuccess,
  logoutFail,
} = authSlice.actions;

export default authSlice.reducer;
