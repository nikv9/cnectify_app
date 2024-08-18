import express from "express";
import { authRole, authenticated } from "../middlewares/auth.js";
import {
  followUnfollowUser,
  getAllUsers,
  getMyProfile,
  getUsers,
  getUser,
  getProfile,
  updateMyProfile,
  updateUserRole,
  deleteUser,
} from "../controllers/user_ctrl.js";
const router = express.Router();

// for authorized users
router.get("/profile", authenticated, getMyProfile);

router.get("/profile/:id", authenticated, getProfile);

router.put("/profile", authenticated, updateMyProfile);

router.get("/users/search", authenticated, getUsers);

router.put("/user/follow_unfollow", authenticated, followUnfollowUser);

// for admin
router.get("/user/:id", authenticated, authRole("admin"), getUser);

router.get("/users", authenticated, authRole("admin"), getAllUsers);

router.delete("/user/:id", authenticated, authRole("admin"), deleteUser);

router.put("/user/:id", authenticated, authRole("admin"), updateUserRole);

export default router;
