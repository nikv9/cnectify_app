import express from "express";
import { authenticated } from "../middlewares/auth.js";
import {
  createPost,
  deleteMyPost,
  getAllPosts,
  getFollowingUserPosts,
  getMyAllPosts,
  getPost,
  likeDislikePost,
} from "../controllers/post_ctrl.js";

const router = express.Router();

// authorized user's route
router.post("/post/create", authenticated, createPost);

router.get("/post/:id", authenticated, getPost);

router.get("/posts", authenticated, getAllPosts);

router.get("/posts/my", authenticated, getMyAllPosts);

router.get("/posts/following_user", authenticated, getFollowingUserPosts);

router.delete("/post/:id", authenticated, deleteMyPost);

router.put("/post/like_dislike", authenticated, likeDislikePost);

export default router;
