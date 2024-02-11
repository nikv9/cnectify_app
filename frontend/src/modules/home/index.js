import React from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";

const HomeIdx = () => {
  const containerStyle = {
    flex: "3",
  };
  return (
    <div className="p-5" style={containerStyle}>
      {/* feed  */}
      <div>

      <CreatePost />
      <Post />
      </div>

      {/* rightbar  */}
      <div>

      <Post />
      </div>
    </div>
  );
};

export default HomeIdx;
