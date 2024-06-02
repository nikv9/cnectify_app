import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import profileService from "../services/profile_service";

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

// actions
// get user's profile
export const getProfileAction = (userId) => async (dispatch) => {
  try {
    dispatch(profileStart());
    const res = await profileService.getProfile(userId);
    // console.log(res);
    dispatch(profileSuccess(res));
  } catch (error) {
    dispatch(profileFailure(error.response.data.msg));
  }
};
