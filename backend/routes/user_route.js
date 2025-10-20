import express from "express";
import { authRole, authenticated } from "../middlewares/auth.js";
import {
  followUnfollowUser,
  getUsers,
  getUser,
  updateProfile,
  deleteUser,
  createOrUpdateUser,
  sendFollowReq,
  respondToFollowReq,
  getFollowReqs,
} from "../controllers/user_ctrl.js";

const router = express.Router();

router.get("/users", authenticated, getUsers);
router.get("/user/:id?", authenticated, getUser);
router.put("/profile", authenticated, updateProfile);
router.post("/profile/create_update", authenticated, createOrUpdateUser);
router.post("/send_follow_req", authenticated, sendFollowReq);
router.post("/respond_follow_req", authenticated, respondToFollowReq);
router.get("/follow_reqs", authenticated, getFollowReqs);
router.put("/user/follow_unfollow", authenticated, followUnfollowUser);
router.delete("/user/:id", authenticated, authRole("admin"), deleteUser);
router.post(
  "/user/create_update",
  authenticated,
  authRole("admin"),
  createOrUpdateUser
);

export default router;
