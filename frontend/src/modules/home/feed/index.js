import React from "react";
import CreatePost from "../../../components/post/CreatePost";
import Post from "../../../components/post/Post";

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
