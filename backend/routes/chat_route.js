import express from "express";
import { authenticated } from "../middlewares/auth.js";
import { accessChat, getChats } from "../controllers/chat_ctrl.js";

const router = express.Router();

// static routes
router.post("/chats", authenticated, accessChat);

// dynamic routes
router.get("/chats/:loggedinUserId", authenticated, getChats);

export default router;
