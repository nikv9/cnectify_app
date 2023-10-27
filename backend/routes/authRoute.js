import express from "express";
import {
  changePass,
  forgotPass,
  logoutUser,
  resetPass,
  signinUser,
  signinWithGoogle,
  signupUser,
} from "../controllers/authCtrl.js";
import { authenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/signup", signupUser);

router.post("/signin", signinUser);

router.post("/signin/google", signinWithGoogle);

router.get("/logout", logoutUser);

router.post("/pass/forgot", forgotPass);

router.put("/pass/reset/:token", resetPass);

router.put("/pass/change", authenticated, changePass);

export default router;
