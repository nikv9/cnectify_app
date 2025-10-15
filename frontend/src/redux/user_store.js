import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user_service";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [],
    searchedUsers: [],
    error: null,
    success: null,
    loading: {
      getUser: false,
      getUsers: false,
      followUnfollow: false,
      deleteUser: false,
      createOrUpdate: false,
    },
  },
  reducers: {
    actionStart: (state, action) => {
      state.loading[action.payload?.loadingType] = true;
    },

    actionSuccess: (state, action) => {
      Object.keys(state.loading).forEach((key) => (state.loading[key] = false));
      if (action.payload?.user) state.user = action.payload.user;
      if (action.payload?.users) state.users = action.payload.users;
      if (action.payload?.success) state.success = action.payload.success;
    },

    actionFailure: (state, action) => {
      Object.keys(state.loading).forEach((key) => (state.loading[key] = false));
      state.error = action.payload;
    },

    clrUserStateMsg: (state) => {
      state.success = null;
      state.error = null;
    },
  },
});

export const { clrUserStateMsg, actionStart, actionSuccess, actionFailure } =
  userSlice.actions;

export default userSlice.reducer;

// actions
export const getUsersAction = (data) => async (dispatch) => {
  try {
    dispatch(actionStart({ loadingType: "getUsers" }));
    const res = await userService.getUsers(data);
    dispatch(actionSuccess({ users: res }));
  } catch (error) {
    dispatch(actionFailure(error.response?.data?.msg));
  }
};

export const getUserAction = (data) => async (dispatch) => {
  try {
    dispatch(actionStart({ loadingType: "getUser" }));
    const res = await userService.getUser(data);
    dispatch(actionSuccess({ user: res }));
  } catch (error) {
    dispatch(actionFailure(error.msg || error.response?.data?.msg));
  }
};

export const followUnfollowUserAction =
  (loggedinUser, targetUser) => async (dispatch) => {
    try {
      dispatch(actionStart({ loadingType: "followUnfollow" }));
      const res = await userService.followUnfollowUser(
        loggedinUser,
        targetUser
      );
      dispatch(actionSuccess({ user: res.user, success: res.msg }));
    } catch (error) {
      dispatch(actionFailure(error.response?.data?.msg));
    }
  };

export const deleteUserAction = (userId) => async (dispatch) => {
  try {
    dispatch(actionStart({ loadingType: "deleteUser" }));
    const res = await userService.deleteUser(userId);
    dispatch(actionSuccess({ success: res }));
  } catch (error) {
    dispatch(actionFailure(error.response?.data?.msg));
  }
};

export const createOrUpdateUserAction = (data) => async (dispatch) => {
  try {
    dispatch(actionStart({ loadingType: "createOrUpdate" }));
    await userService.createOrUpdateUser(data);
    dispatch(
      actionSuccess({
        success: data.id
          ? "User updated successfully"
          : "User created successfully",
      })
    );
  } catch (error) {
    dispatch(actionFailure(error.response?.data?.msg));
  }
};
