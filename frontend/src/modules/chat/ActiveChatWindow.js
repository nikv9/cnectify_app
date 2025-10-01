import React, { useState, useEffect, useRef } from "react";

const ActiveChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length, text: newMessage }]);
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="shadow-md p-4 bg-white">
        <h2>Ishan</h2>
      </div>

      {/* chat content  */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <div className="bg-white text-black shadow-md p-2 rounded-md w-fit">
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* chat Input */}
      <div className="bg-white shadow-md flex items-center p-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          placeholder="Type a message"
          className="flex-1 bg-white p-2 rounded-md outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 bg-blue-600 text-white px-4 py-1.5 rounded-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ActiveChatWindow;
