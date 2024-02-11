import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "USER",
      },
    ],
    messages: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

const Chat = mongoose.model("CHAT", chatSchema);

export default Chat;
