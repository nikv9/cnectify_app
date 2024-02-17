import React from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import RightBar from "./RightBar";

const HomeIdx = () => {
  const style = {
    container: {
      flex: "4",
    },
    feed: {
      flex: "4",
    },
    rightbar: {
      flex: "1",
    },
  };
  return (
    <div className="flex flex-wrap p-5" style={style.container}>
      {/* feed  */}
      <div className="" style={style.feed}>
        <CreatePost />
        <Post />
      </div>

      {/* rightbar  */}
      <div className="" style={style.rightbar}>
        <RightBar />
      </div>
    </div>
  );
};

export default HomeIdx;
