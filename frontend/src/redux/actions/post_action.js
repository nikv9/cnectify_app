import axios from "axios";
import {
  createPostFailure,
  createPostStart,
  createPostSuccess,
} from "../reducers/post_reducer";

// create post
export const createPostAction = (FormData) => async (dispatch) => {
  try {
    dispatch(createPostStart());

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const { data } = await axios.post("/post/create", FormData, config);
    console.log(data);
    dispatch(createPostSuccess({ post: data }));
  } catch (error) {
    dispatch(createPostFailure(error.response.data.msg));
  }
};
