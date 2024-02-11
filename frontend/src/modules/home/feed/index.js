import React from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";

const FeedIdx = () => {
  const containerStyle = {
    flex: "3",
  };
  return (
    <div className="p-5" style={containerStyle}>
      <CreatePost />
      <Post />
    </div>
  );
};

export default FeedIdx;
