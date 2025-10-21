import { createSlice } from "@reduxjs/toolkit";
import msgService from "../services/msg_service";

const msgSlice = createSlice({
  name: "msg",
  initialState: {
    msg: null,
    msgs: [],
    error: null,
    success: null,
    loading: {
      sendMsg: false,
      getMsgs: false,
    },
  },

  reducers: {
    actionStart: (state, action) => {
      state.loading[action.payload?.loadingType] = true;
    },

    actionSuccess: (state, action) => {
      Object.keys(state.loading).forEach((key) => (state.loading[key] = false));

      if (action.payload?.msg) {
        state.msg = action.payload.msg;
      }

      if (action.payload?.msgs) {
        state.msgs = action.payload.msgs;
      }

      if (action.payload?.success) {
        state.success = action.payload.success;
      }
    },

    actionFailure: (state, action) => {
      Object.keys(state.loading).forEach((key) => (state.loading[key] = false));
      state.error = action.payload;
    },

    clrMsgStateMsg: (state) => {
      state.error = null;
      state.success = null;
    },

    appendNewMsg: (state, action) => {
      state.msgs.push(action.payload);
    },
  },
});

export const {
  actionStart,
  actionSuccess,
  actionFailure,
  clrMsgStateMsg,
  appendNewMsg,
} = msgSlice.actions;

export default msgSlice.reducer;

// actions
export const sendMsgAction = (data) => async (dispatch) => {
  try {
    dispatch(actionStart({ loadingType: "sendMsg" }));
    const res = await msgService.sendMsg(data);
    dispatch(actionSuccess({ msg: res }));
    return res;
  } catch (error) {
    dispatch(actionFailure(error.msg || error.response?.data?.msg));
  }
};

export const getMsgsAction = (data) => async (dispatch) => {
  try {
    dispatch(actionStart({ loadingType: "getMsgs" }));
    const res = await msgService.getMsgs(data);
    dispatch(actionSuccess({ msgs: res }));
  } catch (error) {
    dispatch(actionFailure(error.msg || error.response?.data?.msg));
  }
};
