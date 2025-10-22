import apiInstance from "../interceptors";

const chatService = {};

chatService.accessChat = (data) => {
  return apiInstance.post("/chats", data);
};

chatService.getChats = (loggedinUserId) => {
  return apiInstance.get(`/chats/${loggedinUserId}`);
};

export default chatService;
