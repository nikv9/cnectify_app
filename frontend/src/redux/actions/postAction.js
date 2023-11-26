import axios from "axios";
import {
  createPostFail,
  createPostStart,
  createPostSuccess,
} from "../reducers/postReducer";

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
      dispatch(createPostFail(error.response.data.msg));
    }
  };
