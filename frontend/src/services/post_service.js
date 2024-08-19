import apiInstance from "../interceptors";
import Cookies from "js-cookie";

const postService = {};

postService.createPost = async (desc, media, mediaType) => {
  return apiInstance.post(
    "/post/create",
    {
      desc: desc,
      media: media,
      mediaType: mediaType,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("tokenId")}`,
      },
    }
  );
};

postService.getAllPosts = async (page = 1) => {
  return apiInstance.get(`/posts?page=${page}&limit=${2}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("tokenId")}`,
    },
  });
};
postService.getPosts = async () => {
  return apiInstance.get("/posts/admin", {
    headers: {
      Authorization: `Bearer ${Cookies.get("tokenId")}`,
    },
  });
};

postService.getAllPostsByUser = async (userId) => {
  return apiInstance.get(`/posts/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("tokenId")}`,
    },
  });
};

postService.likeDislikePost = async (postId, userId, action) => {
  return apiInstance.put(
    "/post/like_dislike",
    {
      postId: postId,
      userId: userId,
      action: action,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("tokenId")}`,
      },
    }
  );
};

postService.deletePost = async (postId, userId) => {
  return apiInstance.delete(`/post/${postId}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("tokenId")}`,
    },
  });
};

export default postService;
