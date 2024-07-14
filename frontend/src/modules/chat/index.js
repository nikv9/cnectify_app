import React from "react";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";

const ChatIdx = () => {
  return (
    <div className="flex ">
      <div className="flex-[1]">
        <Leftbar />
      </div>

      <div className="flex-[4]">
        <Rightbar />
      </div>
    </div>
  );
};

export default ChatIdx;
