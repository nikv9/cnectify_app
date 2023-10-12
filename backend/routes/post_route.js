import express from "express";
import { authenticated } from "../middlewares/auth.js";
import {
  commentOnPost,
  createPost,
  deleteMyPost,
  dislikePost,
  getAllPosts,
  getFollowingUserPosts,
  getMyAllPosts,
  getPost,
  likePost,
} from "../controllers/post_ctrl.js";
const router = express.Router();

// authorized user's route
router.post("/post/create", authenticated, createPost);

router.get("/post/:id", authenticated, getPost);

router.get("/posts", authenticated, getAllPosts);

router.get("/posts/my", authenticated, getMyAllPosts);

router.get("/posts/following_user", authenticated, getFollowingUserPosts);

router.delete("/post/:id", authenticated, deleteMyPost);

router.put("/post/like", authenticated, likePost);

router.put("/post/dislike", authenticated, dislikePost);

router.put("/post/comment", authenticated, commentOnPost);

export default router;
