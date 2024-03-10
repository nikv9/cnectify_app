import React from "react";
import { Avatar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import moment from "moment";

const Post = (props) => {
  const style = {
    container: {
      boxShadow: "0 0.1rem 0.5rem rgb(0, 0, 0, 0.2)",
    },
  };
  return (
    <div className="p-2 bg-white rounded-md mt-4" style={style.container}>
      <div className="flex items-center gap-4 px-2">
        <Avatar />
        <div>
          <h4>{props.post.userId.name}</h4>
          <p className="text-gray-600 text-sm">
            {moment(props.post.createdAt).fromNow()} (
            {moment(props.post.createdAt).format("lll")})
          </p>
        </div>
      </div>

      <div className="p-3">
        {props.post.mediaType === "photo" ? (
          <img
            src={props.post.media.mediaUrl}
            alt=""
            className="w-full object-contain h-[25rem]"
          />
        ) : (
          <video controls className="w-full object-contain h-[25rem]">
            <source src={props.post.media.mediaUrl} />
          </video>
        )}
      </div>

      <div className="mt-4">
        <p className="m-2">{props.post.description}</p>

        <div className="flex items-center gap-3 mb-4 px-3">
          <p className="text-sm text-gray-600">
            {props.post.likes.length} Likes
          </p>
          <p className="text-sm text-gray-600">
            {props.post.comments.length} Comments
          </p>
        </div>
        <div className="flex items-center justify-evenly border-t border-gray-300 pt-2">
          <div className="flex items-center justify-center gap-2 flex-1 cursor-pointer py-1 hover:bg-gray-200">
            <FavoriteBorderIcon sx={{ color: "gray" }} />
            <span className="text-gray-600">Likes</span>
          </div>
          <div className="flex items-center justify-center gap-2 flex-1 cursor-pointer py-1 hover:bg-gray-200">
            <ChatBubbleOutlineIcon sx={{ color: "gray" }} />
            <span className="text-gray-600">Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
