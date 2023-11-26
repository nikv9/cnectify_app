import axios from "axios";
import { usersFail, usersStart, usersSuccess } from "../reducers/userReducer";

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
