import axios from "axios";
import {
  createPostFailure,
  createPostStart,
  createPostSuccess,
} from "../reducers/post_reducer";

// create post
export const createPostAction = (token, fd) => async (dispatch) => {
  try {
    dispatch(createPostStart());

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post("/post/create", fd, config);
    console.log(data);
    dispatch(createPostSuccess({ post: data }));
  } catch (error) {
    dispatch(createPostFailure(error.response.data.msg));
  }
};
