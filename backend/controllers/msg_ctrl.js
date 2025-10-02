import Chat from "../models/chat_model";
import Message from "../models/msg_model";

export const sendMessage = async (req, res, next) => {
  try {
    const { content, chatId, loggedinUserId } = req.body;
    if (!content || !chatId)
      return res.status(400).json({ msg: "Invalid data" });

    const message = await Message.create({
      sender: loggedinUserId,
      content,
      chat: chatId,
    });

    // update latestMessage
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });

    res.json(message);
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    next(err);
  }
};
