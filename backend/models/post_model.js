import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "USER",
    },
    description: {
      type: String,
      max: 500,
    },
    media: {
      mediaId: {
        type: String,
      },
      mediaUrl: {
        type: String,
      },
    },
    mediaType: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "USER",
      },
    ],
    comments: [
      {
        comment: {
          type: String,
          required: true,
        },
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "USER",
        },
      },
    ],
  },
  { timestamps: true }
);
const Post = mongoose.model("POST", postSchema);

export default Post;
