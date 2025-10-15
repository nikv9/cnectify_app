import express from "express";
import { authenticated } from "../middlewares/auth.js";
import {
  createPost,
  deletePost,
  getFollowingUserPosts,
  getAllPostsByUser,
  getPost,
  likeDislikePost,
  getPosts,
} from "../controllers/post_ctrl.js";

const router = express.Router();

router.post("/post/create", authenticated, createPost);
router.get("/post/:id", authenticated, getPost);
router.get("/posts", authenticated, getPosts);
router.get("/posts/user/:userId", authenticated, getAllPostsByUser);
router.get("/posts/following_user", authenticated, getFollowingUserPosts);
router.delete("/post/:postId/user/:userId", authenticated, deletePost);
router.put("/post/like_dislike", authenticated, likeDislikePost);

export default router;
