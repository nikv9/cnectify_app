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
} from "../controllers/userCtrl.js";
const router = express.Router();

// for authorized users
router.get("/profile", authenticated, getMyProfile);

router.get("/profile/:id", authenticated, getProfile);

router.delete("/profile", authenticated, deleteMyProfile);

router.put("/profile", authenticated, updateMyProfile);

router.get("/users/suggested", authenticated, getSuggestedFriends);

router.put("/user/follow", authenticated, followUser);

router.put("/user/unfollow", authenticated, unfollowUser);

router.get("/users/search", authenticated, getUserBySearch);

router.get("/followings", authenticated, myFollowings);

router.get("/followers", authenticated, myFollowers);

router.post("/contactUs", authenticated, contactUs);

// for admin
router.get("/user/:id", authenticated, authRole("admin"), getUser);

router.get("/users", authenticated, authRole("admin"), getAllUsers);

router.delete("/user/:id", authenticated, authRole("admin"), deleteUserProfile);

router.put("/user/:id", authenticated, authRole("admin"), updateUserRole);

export default router;
