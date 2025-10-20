import express from "express";
import { authRole, authenticated } from "../middlewares/auth.js";
import {
  followUnfollowUser,
  getUsers,
  getUser,
  updateProfile,
  deleteUser,
  createOrUpdateUser,
} from "../controllers/user_ctrl.js";

const router = express.Router();

router.get("/users", authenticated, getUsers);
router.get("/user/:id?", authenticated, getUser);
router.put("/profile", authenticated, updateProfile);
router.post("/profile/create_update", authenticated, createOrUpdateUser);
router.put("/user/follow_unfollow", authenticated, followUnfollowUser);
router.delete("/user/:id", authenticated, authRole("admin"), deleteUser);
router.post(
  "/user/create_update",
  authenticated,
  authRole("admin"),
  createOrUpdateUser
);

export default router;
