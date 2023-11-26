import axios from "axios";
import {
  profileFail,
  profileStart,
  profileSuccess,
} from "../reducers/profileReducer";

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
