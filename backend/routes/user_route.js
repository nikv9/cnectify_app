import express from "express";
import { authRole, authenticated } from "../middlewares/auth.js";
import {
  contactUs,
  deleteMyProfile,
  deleteUserProfile,
  followUser,
  getAllUsers,
  getMyProfile,
  getSuggestedFriends,
  getUser,
  getUserBySearch,
  getProfile,
  myFollowers,
  myFollowings,
  unfollowUser,
  updateMyProfile,
  updateUserRole,
} from "../controllers/user_ctrl.js";
const router = express.Router();

// for authorized users
router.get("/profile", authenticated, getMyProfile);

router.get("/profile/:id", authenticated, getProfile);

router.delete("/profile", authenticated, deleteMyProfile);

router.put("/profile", authenticated, updateMyProfile);

router.get("/users/suggested", authenticated, getSuggestedFriends);

router.put("/follow_user", authenticated, followUser);

router.put("/unfollow_user", authenticated, unfollowUser);

router.get("/search_users", authenticated, getUserBySearch);

router.get("/followings", authenticated, myFollowings);

router.get("/followers", authenticated, myFollowers);

router.post("/contact_us", authenticated, contactUs);

// for admin
router.get("/user/:id", authenticated, authRole("admin"), getUser);

router.get("/users", authenticated, authRole("admin"), getAllUsers);

router.delete("/user/:id", authenticated, authRole("admin"), deleteUserProfile);

router.put("/user/:id", authenticated, authRole("admin"), updateUserRole);

export default router;
