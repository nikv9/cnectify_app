import React from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import RightBar from "./RightBar";

const HomeIdx = () => {
  const style = {
    container: {
      flex: "4",
    },
  };
  return (
    <div className="flex p-5" style={style.container}>
      {/* feed  */}
      <div className="feed">
        <CreatePost />
        <Post />
      </div>

      {/* rightbar  */}
      <div className="">
        <RightBar />
      </div>
    </div>
  );
};

export default HomeIdx;
