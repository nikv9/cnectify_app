import apiInstance from "../interceptors";
import Cookies from "js-cookie";

const postService = {};

postService.createPost = async (desc, media, mediaType) => {
  return apiInstance.post("/post/create", {
    desc: desc,
    media: media,
    mediaType: mediaType,
  });
};
postService.getAllPosts = async () => {
  return apiInstance.get("/posts", {
    headers: {
      Authorization: `Bearer ${Cookies.get("tokenId")}`,
    },
  });
};

export default postService;
