import axios from "axios";
import {
  profileFailure,
  profileStart,
  profileSuccess,
} from "../reducers/profile_reducer";

// get user's profile
export const getProfileAction = (userId) => async (dispatch) => {
  try {
    dispatch(profileStart());

    const { data } = await axios.get(`/profile/${userId}`);

    console.log(data);
    dispatch(profileSuccess(data));
  } catch (error) {
    dispatch(profileFailure(error.response.data.msg));
  }
};
