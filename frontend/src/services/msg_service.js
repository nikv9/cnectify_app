import apiInstance from "../interceptors";

const msgService = {};

msgService.sendMsg = (data) => {
  return apiInstance.post("/msg/send", data);
};

msgService.getMsgs = (chatId) => {
  return apiInstance.get(`/msg/${chatId}`);
};

export default msgService;
