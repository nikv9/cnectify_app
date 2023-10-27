import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    profileStart: (state) => {
      state.loading = true;
    },
    profileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = action.payload;
    },
    profileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { profileStart, profileSuccess, profileFailure } =
  profileSlice.actions;

export default profileSlice.reducer;
