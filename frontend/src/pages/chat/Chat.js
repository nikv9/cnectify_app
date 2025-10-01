import React from "react";
import FriendsChatPanel from "../../modules/chat/FriendsChatPanel";
import ActiveChatWindow from "../../modules/chat/ActiveChatWindow";

const Chat = () => {
  return (
    <div className="flex ">
      <div className="flex-[1]">
        <FriendsChatPanel />
      </div>

      <div className="flex-[4]">
        <ActiveChatWindow />
      </div>
    </div>
  );
};

export default Chat;
