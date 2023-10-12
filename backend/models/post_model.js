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
    mediaType: {
      type: String,
      required: true,
    },
    media: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
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
