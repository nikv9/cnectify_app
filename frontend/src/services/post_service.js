import apiInstance from "../interceptors";

const postService = {};

postService.createPost = async (desc, media, mediaType) => {
  return apiInstance.post("/post/create", {
    desc: desc,
    media: media,
    mediaType: mediaType,
  });
};

postService.getPosts = async (page = 1) => {
  return apiInstance.get(`/posts?page=${page}&limit=${5}`);
};

postService.getAllPostsByUser = async (userId) => {
  return apiInstance.get(`/posts/user/${userId}`);
};

const likeDislikeControllers = {};

postService.likeDislikePost = (postId, userId, action) => {
  // cancel previous request
  likeDislikeControllers[postId]?.abort();

  const controller = new AbortController();
  likeDislikeControllers[postId] = controller;

  return apiInstance
    .put(
      "/post/like_dislike",
      { postId, userId, action },
      { signal: controller.signal }
    )
    .finally(() => {
      delete likeDislikeControllers[postId];
    });
};

postService.deletePost = async (postId, userId) => {
  return apiInstance.delete(`/post/${postId}/user/${userId}`);
};

export default postService;
