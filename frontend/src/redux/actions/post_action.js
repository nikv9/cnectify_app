import axios from "axios";
import {
  createPostFailure,
  createPostStart,
  createPostSuccess,
} from "../reducers/post_reducer";

// create post
export const createPostAction =
  (desc, media, mediaType) => async (dispatch) => {
    try {
      dispatch(createPostStart());

      const { data } = await axios.post("/post/create", {
        desc,
        media,
        mediaType,
      });
      console.log(data);
      dispatch(createPostSuccess({ post: data }));
    } catch (error) {
      dispatch(createPostFailure(error.response.data.msg));
    }
  };
