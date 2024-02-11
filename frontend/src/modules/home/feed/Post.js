import React from "react";
import style from "./Post.module.css";
import { Avatar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Post = () => {
  const style = {
    container: {
      boxShadow: "0 0.1rem 0.5rem rgb(0, 0, 0, 0.2)",
    },
  };
  return (
    <div className="p-1 bg-white rounded-md mt-4" style={style.container}>
      <div className={style.top}>
        <Avatar />
        <div className={style.author}>
          <h4>Naman</h4>
          <p>1 day ago</p>
        </div>
      </div>

      <div className={style.mid}>
        <p>Love Nature!</p>
        <img
          src="https://www.iucn.org/sites/default/files/styles/what_we_do_large/public/images-themes/biodiversity-shutterstock_1477256246.jpg.webp?itok=4i9JdtFu"
          alt=""
        />
      </div>

      <div className={style.bottom}>
        <div className={style.counts}>
          <p>120 Likes</p>
          <p>10 Comments</p>
        </div>
        <div className={style.actions}>
          <div className={style.iconContainer}>
            <FavoriteBorderIcon sx={{ color: "gray" }} />
            <span>Likes</span>
          </div>
          <div className={style.iconContainer}>
            <ChatBubbleOutlineIcon sx={{ color: "gray" }} />
            <span>Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
