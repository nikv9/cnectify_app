import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket/socket";
import { sendMsgAction, getMsgsAction } from "../../redux/msg_store";

const ChatWindow = () => {
  const chatContainerRef = useRef(null);

  const auth = useSelector((state) => state.auth);
  const chat = useSelector((state) => state.chat);
  const msg = useSelector((state) => state.msg);
  const dispatch = useDispatch();

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!chat.selectedChat) return;

    dispatch(getMsgsAction(chat.selectedChat._id));
    socket.emit("joinRoom", chat.selectedChat._id);

    // When message is received via socket
    socket.on("receiveMsg", (message) => {
      console.log(typeof message.chat, typeof chat.selectedChat._id);
      // Only append if the message is for the current chat
      if (message.chat === chat.selectedChat._id) {
        dispatch({ type: "msg/appendNewMsg", payload: message });
      }
    });

    return () => {
      socket.off("receiveMsg");
    };
  }, [chat.selectedChat, dispatch]);

  const sendMessageHandler = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      content: newMessage,
      chatId: chat.selectedChat._id,
      loggedinUserId: auth.user._id,
    };

    const createdMsg = await dispatch(sendMsgAction(messageData));
    console.log(createdMsg);

    // Emit the new message to others
    socket.emit("sendMsg", {
      roomId: chat.selectedChat._id,
      message: createdMsg,
    });

    setNewMessage("");
  };

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [msg.msgs]);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="shadow-md p-4 bg-white">
        <h2>{chat.selectedChat?.chatName || "Chat"}</h2>
      </div>

      {/* Chat messages display */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-50"
      >
        {msg?.msgs?.map((message) => {
          const isSender = message.sender._id === auth.user._id;

          return (
            <div
              key={message._id}
              className={`mb-2 flex ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-lg shadow-sm ${
                  isSender
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-black rounded-bl-none"
                }`}
              >
                <div className="text-xs font-semibold mb-1 flex justify-between">
                  <span>{message.sender.name}</span>
                  <span className="ml-2 text-[0.7rem] text-white/80">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="text-sm break-words">{message.content}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat Input */}
      <div className="bg-white shadow-md flex items-center p-4">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 bg-white p-2 rounded-md outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="ml-4 bg-blue-600 text-white px-4 py-1.5 rounded-sm"
          onClick={sendMessageHandler}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
