import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

// actions
// get suggested users
export const getSuggestedUsersAction = () => async (dispatch) => {
  try {
    dispatch(usersStart());

    const { data } = await axios.get("/users/suggested");

    // console.log(data);
    dispatch(usersSuccess({ users: data }));
  } catch (error) {
    dispatch(usersFail(error.response.data.msg));
  }
};
