import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: null,
    posts: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    createPostStart: (state) => {
      state.loading = true;
    },
    createPostSuccess: (state, action) => {
      state.loading = false;
      state.post = action.payload.post;
      state.success = action.payload.success;
    },
    createPostFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createPostStart, createPostSuccess, createPostFail } =
  postSlice.actions;

export default postSlice.reducer;
