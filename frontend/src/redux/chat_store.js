import { createSlice } from "@reduxjs/toolkit";
import chatService from "../services/chat_service";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chat: null,
    chats: [],
    loading: false,
    error: null,
    success: null,
  },

  reducers: {
    chatStart: (state) => {
      state.loading = true;
    },
    chatSuccess: (state, action) => {
      state.loading = false;
      state.chat = action.payload.chat;
      state.success = action.payload.success;
    },
    chatsSuccess: (state, action) => {
      state.loading = false;
      state.chats = action.payload.chats;
      state.success = action.payload.success;
    },
    chatFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clrErr: (state) => {
      state.error = null;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    clrSuccess: (state) => {
      state.success = null;
    },
  },
});

export const {
  chatStart,
  chatSuccess,
  chatsSuccess,
  chatFail,
  clrErr,
  clrSuccess,
  stopLoading,
} = chatSlice.actions;

export default chatSlice.reducer;

// actions
export const accessChatAction = (data) => async (dispatch) => {
  try {
    dispatch(chatStart());
    const res = await chatService.accessChat(data);
    console.log(res);
    dispatch(chatSuccess({ chat: res }));
  } catch (error) {
    console.log(error);
    dispatch(chatFail(error.msg));
  }
};

export const getChatsAction = (data) => async (dispatch) => {
  try {
    dispatch(chatStart());
    const res = await chatService.getChats(data);
    console.log(res);
    dispatch(chatsSuccess({ chats: res }));
  } catch (error) {
    console.log(error);
    dispatch(chatFail(error.msg));
  }
};
