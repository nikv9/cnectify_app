import React from "react";
import { Avatar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Post = () => {
  const style = {
    container: {
      boxShadow: "0 0.1rem 0.5rem rgb(0, 0, 0, 0.2)",
    },
    post_img: {
      height: "30rem",
    },
  };
  return (
    <div className="p-2 bg-white rounded-md mt-4" style={style.container}>
      <div className="flex items-center gap-4 px-2">
        <Avatar />
        <div>
          <h4>Naman</h4>
          <p className="text-gray-600 text-sm">1 day ago</p>
        </div>
      </div>

      <div className="p-3">
        <p className="m-2">Love Nature!</p>
        <img
          src="https://www.iucn.org/sites/default/files/styles/what_we_do_large/public/images-themes/biodiversity-shutterstock_1477256246.jpg.webp?itok=4i9JdtFu"
          alt=""
          className="w-full object-contain"
          style={style.post_img}
        />
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-3 mb-4 px-3">
          <p className="text-sm text-gray-600">120 Likes</p>
          <p className="text-sm text-gray-600">10 Comments</p>
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
