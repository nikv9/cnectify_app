import { createSlice } from "@reduxjs/toolkit";
import chatService from "../services/chat_service";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chat: null,
    chats: [],
    error: null,
    success: null,
    loading: {
      accessChat: false,
      getChats: false,
    },
  },

  reducers: {
    actionStart: (state, action) => {
      state.loading[action.payload?.loadingType] = true;
    },

    actionSuccess: (state, action) => {
      Object.keys(state.loading).forEach((key) => (state.loading[key] = false));

      if (action.payload?.chat) state.chat = action.payload.chat;
      if (action.payload?.chats) state.chats = action.payload.chats;
      if (action.payload?.success) state.success = action.payload.success;
    },

    actionFailure: (state, action) => {
      Object.keys(state.loading).forEach((key) => (state.loading[key] = false));
      state.error = action.payload;
    },

    clrChatStateMsg: (state) => {
      state.error = null;
      state.success = null;
    },
  },
});

export const { actionStart, actionSuccess, actionFailure, clrChatStateMsg } =
  chatSlice.actions;

export default chatSlice.reducer;

// actions
export const accessChatAction = (data) => async (dispatch) => {
  try {
    dispatch(actionStart({ loadingType: "accessChat" }));
    const res = await chatService.accessChat(data);
    dispatch(actionSuccess({ chat: res }));
    return res;
  } catch (error) {
    dispatch(actionFailure(error.msg || error.response?.data?.msg));
  }
};

export const getChatsAction = (data) => async (dispatch) => {
  try {
    dispatch(actionStart({ loadingType: "getChats" }));
    const res = await chatService.getChats(data);
    dispatch(actionSuccess({ chats: res }));
  } catch (error) {
    dispatch(actionFailure(error.msg || error.response?.data?.msg));
  }
};
