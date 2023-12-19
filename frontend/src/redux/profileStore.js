import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    profileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { profileStart, profileSuccess, profileFail } =
  profileSlice.actions;

export default profileSlice.reducer;

// actions
// get user's profile
export const getProfileAction = (userId) => async (dispatch) => {
  try {
    dispatch(profileStart());

    const { data } = await axios.get(`/profile/${userId}`);

    console.log(data);
    dispatch(profileSuccess(data));
  } catch (error) {
    dispatch(profileFail(error.response.data.msg));
  }
};
