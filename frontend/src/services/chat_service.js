import apiInstance from "../interceptors";

const chatService = {};

chatService.accessChat = async (data) => {
  return apiInstance.post("/chat/create", data);
};

chatService.getChats = async (loggedinUserId) => {
  return apiInstance.get(`/chats/${loggedinUserId}`);
};

export default chatService;
