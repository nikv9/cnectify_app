import React from "react";
import ChatList from "../../modules/chat/ChatList";
import ChatWindow from "../../modules/chat/ChatWindow";

const Chat = () => {
  return (
    <div className="flex ">
      <div className="flex-[1]">
        <ChatList />
      </div>

      <div className="flex-[4]">
        <ChatWindow />
      </div>
    </div>
  );
};

export default Chat;
