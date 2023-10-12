import mongoose from "mongoose";

const msgSchema = mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Types.ObjectId,
      ref: "Conversation",
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "USER",
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", msgSchema);

export default Message;
