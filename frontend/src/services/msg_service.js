import apiInstance from "../interceptors";

const msgService = {};

msgService.sendMessage = async (data) => {
  return apiInstance.post("/msg/send", {
    data,
  });
};

msgService.getMessages = async (chatId) => {
  return apiInstance.get(`/msg/${chatId}`);
};

export default msgService;
