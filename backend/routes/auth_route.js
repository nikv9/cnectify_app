import express from "express";
import {
  changePass,
  forgotPass,
  logoutUser,
  resetPass,
  signinUser,
  signinWithGoogle,
  signupUser,
} from "../controllers/auth_ctrl.js";
import { authenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/signup", signupUser);

router.post("/signin", signinUser);

router.post("/signin/google", signinWithGoogle);

router.get("/logout", logoutUser);

router.post("/forgot_pass", forgotPass);

router.put("/reset_pass/:token", resetPass);

router.put("/change_pass", authenticated, changePass);

export default router;
