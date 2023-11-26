import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    usersStart: (state) => {
      state.loading = true;
    },
    usersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.success = action.payload.success;
    },
    usersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { usersStart, usersSuccess, usersFail } = userSlice.actions;

export default userSlice.reducer;
