import axios from "axios";
import {
  usersFailure,
  usersStart,
  usersSuccess,
} from "../reducers/user_reducer";

// get suggested users
export const getSuggestedUsersAction = () => async (dispatch) => {
  try {
    dispatch(usersStart());

    const { data } = await axios.get("/users/suggested");

    // console.log(data);
    dispatch(usersSuccess({ users: data }));
  } catch (error) {
    dispatch(usersFailure(error.response.data.msg));
  }
};
