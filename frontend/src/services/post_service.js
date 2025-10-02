import apiInstance from "../interceptors";

const postService = {};

postService.createPost = async (desc, media, mediaType) => {
  return apiInstance.post("/post/create", {
    desc: desc,
    media: media,
    mediaType: mediaType,
  });
};

postService.getAllPosts = async (page = 1) => {
  return apiInstance.get(`/posts?page=${page}&limit=${5}`);
};
postService.getPosts = async () => {
  return apiInstance.get("/posts/admin");
};

postService.getAllPostsByUser = async (userId) => {
  return apiInstance.get(`/posts/user/${userId}`);
};

postService.likeDislikePost = async (postId, userId, action) => {
  return apiInstance.put("/post/like_dislike", {
    postId: postId,
    userId: userId,
    action: action,
  });
};

postService.deletePost = async (postId, userId) => {
  return apiInstance.delete(`/post/${postId}/user/${userId}`);
};

export default postService;
