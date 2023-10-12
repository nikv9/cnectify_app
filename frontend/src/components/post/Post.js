import React from "react";
import stl from "./Post.module.css";
import { Avatar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Post = () => {
  return (
    <div className={stl.container}>
      <div className={stl.top}>
        <Avatar />
        <div className={stl.author}>
          <h4>Naman</h4>
          <p>1 day ago</p>
        </div>
      </div>

      <div className={stl.mid}>
        <p>Love Nature!</p>
        <img
          src="https://www.iucn.org/sites/default/files/styles/what_we_do_large/public/images-themes/biodiversity-shutterstock_1477256246.jpg.webp?itok=4i9JdtFu"
          alt=""
        />
      </div>

      <div className={stl.bottom}>
        <div className={stl.counts}>
          <p>120 Likes</p>
          <p>10 Comments</p>
        </div>
        <div className={stl.actions}>
          <div className={stl.iconContainer}>
            <FavoriteBorderIcon sx={{ color: "gray" }} />
            <span>Likes</span>
          </div>
          <div className={stl.iconContainer}>
            <ChatBubbleOutlineIcon sx={{ color: "gray" }} />
            <span>Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
