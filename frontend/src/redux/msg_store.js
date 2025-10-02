import { createSlice } from "@reduxjs/toolkit";
import msgService from "../services/msg_service";

const msgSlice = createSlice({
  name: "msg",
  initialState: {
    msg: null,
    msgs: [],
    loading: false,
    error: null,
    success: null,
  },

  reducers: {
    msgStart: (state) => {
      state.loading = true;
    },
    msgSuccess: (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
      state.success = action.payload.success;
    },
    msgsSuccess: (state, action) => {
      state.loading = false;
      state.msgs = action.payload.msgs;
      state.success = action.payload.success;
    },
    msgFail: (state, action) => {
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
  msgStart,
  msgSuccess,
  msgsSuccess,
  msgFail,
  clrErr,
  clrSuccess,
  stopLoading,
} = msgSlice.actions;

export default msgSlice.reducer;

// actions
export const sendMsgAction = (data) => async (dispatch) => {
  try {
    dispatch(msgStart());
    const res = await msgService.accessmsg(data);
    console.log(res);
    dispatch(msgSuccess({ msg: res }));
  } catch (error) {
    console.log(error);
    dispatch(msgFail(error.msg));
  }
};

export const getMsgsAction = (data) => async (dispatch) => {
  try {
    dispatch(msgStart());
    const res = await msgService.getmsgs(data);
    console.log(res);
    dispatch(msgsSuccess({ msgs: res }));
  } catch (error) {
    console.log(error);
    dispatch(msgFail(error.msg));
  }
};
