import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import userService from "../services/user_service";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
    success: null,
    user: null,
  },
  reducers: {
    userStart: (state) => {
      state.loading = true;
    },
    userFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    usersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.success = action.payload.success;
    },
    userSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    },

    followUnfollowSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.success = action.payload.success;
    },
  },
});

export const {
  userStart,
  userFailure,
  userSuccess,
  usersSuccess,
  followUnfollowSuccess,
} = userSlice.actions;

export default userSlice.reducer;

// actions
// get friend users
export const getFriendsAction = (userId) => async (dispatch) => {
  try {
    dispatch(userStart());
    const res = await userService.getFriends(userId);

    // console.log(res);
    dispatch(usersSuccess({ users: res }));
  } catch (error) {
    dispatch(userFailure(error.response.data.msg));
  }
};

// get friend users
export const followUnfollowUserAction =
  (loggedinUser, targetUser) => async (dispatch) => {
    dispatch(userStart());
    try {
      const res = await userService.followUnfollowUser(
        loggedinUser,
        targetUser
      );

      // console.log(res);
      dispatch(followUnfollowSuccess({ user: res.user, success: res.msg }));
    } catch (error) {
      dispatch(userFailure(error.response.data.msg));
    }
  };
