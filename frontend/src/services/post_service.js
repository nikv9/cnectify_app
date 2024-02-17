import apiInstance from "../interceptors";

const postService = {};

postService.createPost = async (desc, media, mediaType) => {
  return apiInstance.post("/post/create", {
    desc: desc,
    media: media,
    mediaType: mediaType,
  });
};

export default postService;
