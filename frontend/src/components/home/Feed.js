import React from "react";
import style from "./Feed.module.css";
import CreatePost from "../post/CreatePost";
import Post from "../post/Post";

const Feed = () => {
  return (
    <div className={style.container}>
      <CreatePost />
      <Post />
    </div>
  );
};

export default Feed;
