import { createSlice } from "@reduxjs/toolkit";
import postService from "../services/post_service";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    postStart: (state) => {
      state.loading = true;
    },
    postFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createPostSuccess: (state, action) => {
      // console.log(action);
      state.loading = false;
      state.success = action.payload.success;
    },
    getAllPostsSuccess: (state, action) => {
      // console.log(action);
      state.loading = false;
      state.posts = action.payload.posts;
      state.success = action.payload.success;
    },
  },
});

export const { postStart, postFailure, createPostSuccess, getAllPostsSuccess } =
  postSlice.actions;

export default postSlice.reducer;

// actions

export const createPostAction =
  (desc, media, mediaType) => async (dispatch) => {
    try {
      dispatch(postStart());
      const res = await postService.createPost(desc, media, mediaType);
      // console.log(res);
      dispatch(createPostSuccess({ success: "Post uploaded!" }));
    } catch (error) {
      dispatch(postFailure(error.response.data.msg));
    }
  };

export const getAllPostsAction = () => async (dispatch) => {
  try {
    dispatch(postStart());
    const res = await postService.getAllPosts();
    // console.log(res);
    dispatch(getAllPostsSuccess({ posts: res, success: "Posts fetched!" }));
  } catch (error) {
    dispatch(postFailure(error.response.data.msg));
  }
};
