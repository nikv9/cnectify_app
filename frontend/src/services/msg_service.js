import apiInstance from "../interceptors";

const msgService = {};

msgService.sendMsg = async (data) => {
  return apiInstance.post("/msg/send", data);
};

msgService.getMsgs = async (chatId) => {
  return apiInstance.get(`/msg/${chatId}`);
};

export default msgService;
