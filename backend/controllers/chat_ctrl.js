import Chat from "../models/chat_model.js";

export const accessChat = async (req, res, next) => {
  try {
    const { loggedinUserId, targetUserId } = req.body;
    if (!targetUserId)
      return res.status(400).json({ msg: "targetUserId required" });

    // Check if chat already exists
    let chat = await Chat.findOne({
      isGroupChat: false,
      participants: { $all: [loggedinUserId, targetUserId], $size: 2 },
    }).populate("participants", "name email");

    if (!chat) {
      chat = await Chat.create({
        participants: [loggedinUserId, targetUserId],
      });
    }

    res.json(chat);
  } catch (err) {
    next(err);
  }
};

export const getChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({
      participants: req.params.loggedinUserId,
    })
      .populate("participants", "name email")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (err) {
    next(err);
  }
};
