import apiInstance from "../interceptors";

const postService = {};

postService.createPost = (data) => {
  return apiInstance.post("/post/create", data);
};

postService.getPosts = (page = 1) => {
  return apiInstance.get(`/posts?page=${page}&limit=${5}`);
};

postService.getAllPostsByUser = (userId) => {
  return apiInstance.get(`/posts/user/${userId}`);
};

const likeDislikeControllers = {};

postService.likeDislikePost = (data) => {
  // cancel previous request
  likeDislikeControllers[data.postId]?.abort();

  const controller = new AbortController();
  likeDislikeControllers[data.postId] = controller;

  return apiInstance
    .put("/post/like_dislike", data, { signal: controller.signal })
    .finally(() => {
      delete likeDislikeControllers[data.postId];
    });
};

postService.deletePost = (data) => {
  return apiInstance.delete(`/post/${data.postId}/user/${data.userId}`);
};

export default postService;
