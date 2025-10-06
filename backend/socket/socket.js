import { Server } from "socket.io";
import Message from "../models/msg_model.js";
import Chat from "../models/chat_model.js";

export const initSocket = (server) => {
  // const io = new Server(server, {
  //   cors: {
  //     origin: "*",
  //     methods: ["GET", "POST", "PUT"],
  //   },
  // });
  const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Join a chat room
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`${socket.id} joined room ${roomId}`);
    });

    // Handle sending message
    socket.on("sendMsg", async (data) => {
      const { roomId, message } = data;
      const updateMsgObj = await Message.findById(message._id).populate(
        "sender",
        "name email"
      );

      // Emit the message to the room
      io.to(roomId).emit("receiveMsg", updateMsgObj);
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
