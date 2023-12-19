import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

// actions
// create post
export const createPostAction =
  (desc, media, mediaType) => async (dispatch) => {
    try {
      dispatch(createPostStart());

      const { data } = await axios.post("/post/create", {
        desc,
        media,
        mediaType,
      });
      console.log(data);
      dispatch(createPostSuccess({ post: data }));
    } catch (error) {
      dispatch(createPostFail(error.response.data.msg));
    }
  };
