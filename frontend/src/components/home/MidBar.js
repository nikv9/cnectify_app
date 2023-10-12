import React from "react";
import stl from "./MidBar.module.css";
import CreatePost from "../post/CreatePost";
import Post from "../post/Post";

const MidBar = () => {
  return (
    <div className={stl.container}>
      <CreatePost />
      <Post />
    </div>
  );
};

export default MidBar;
