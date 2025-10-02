import express from "express";
import { authenticated } from "../middleware/auth.js";
import { getMessages, sendMessage } from "../controllers/msg_ctrl.js";

const router = express.Router();

router.post("/msg/send", authenticated, sendMessage);
router.get("/msg/:chatId", authenticated, getMessages);

export default router;
