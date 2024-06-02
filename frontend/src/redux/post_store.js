import { createSlice } from "@reduxjs/toolkit";
import postService from "../services/post_service";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    userPosts: [],
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
    postSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    },
    getAllPostsSuccess: (state, action) => {
      // console.log(action);
      state.loading = false;
      state.posts = action.payload.posts;
      state.success = action.payload.success;
    },
    getAllPostsByUserSuccess: (state, action) => {
      console.log(action);
      state.loading = false;
      state.userPosts = action.payload.posts;
      state.success = action.payload.success;
    },
  },
});

export const {
  postStart,
  postFailure,
  postSuccess,
  getAllPostsSuccess,
  getAllPostsByUserSuccess,
} = postSlice.actions;

export default postSlice.reducer;

// actions

export const createPostAction =
  (desc, media, mediaType) => async (dispatch) => {
    try {
      dispatch(postStart());
      const res = await postService.createPost(desc, media, mediaType);
      // console.log(res);
      dispatch(postSuccess({ success: "Post uploaded!" }));
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

export const getAllPostsByUserAction = (userId) => async (dispatch) => {
  try {
    dispatch(postStart());
    const res = await postService.getAllPostsByUser(userId);
    console.log(res);
    dispatch(
      getAllPostsByUserSuccess({ posts: res, success: "Posts fetched!" })
    );
  } catch (error) {
    dispatch(postFailure(error.response.data.msg));
  }
};

export const likeDislikePostAction =
  (postId, userId, action) => async (dispatch) => {
    try {
      dispatch(postStart());
      const res = await postService.likeDislikePost(postId, userId, action);
      // console.log(res);
      dispatch(postSuccess({ posts: res, success: "Reacted to post!" }));
    } catch (error) {
      dispatch(postFailure(error.response.data.msg));
    }
  };
