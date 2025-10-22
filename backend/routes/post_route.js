import express from "express";
import { authenticated } from "../middlewares/auth.js";
import {
  createPost,
  deletePost,
  getPost,
  likeDislikePost,
  getPosts,
} from "../controllers/post_ctrl.js";

const router = express.Router();

router.post("/posts", authenticated, createPost);
router.get("/posts", authenticated, getPosts);
router.get("/posts/:id", authenticated, getPost);
router.delete("/posts/:id", authenticated, deletePost);
router.put("/posts/like-dislike", authenticated, likeDislikePost);

export default router;
