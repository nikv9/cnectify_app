import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authService from "../services/auth_service";
import Cookies from "js-cookie";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    success: null,
    sgnUpLoading: false,
    sgnInLoading: false,
    sgnInGLoading: false,
    fgtPwdLoading: false,
    rstPwdLoading: false,
  },

  reducers: {
    authStart: (state, action) => {
      state[action.payload?.loadingType] &&= true;
      // above is shorter code of this below
      // state[action.payload?.loadingType] &&
      //   (state[action.payload?.loadingType] = true);
    },
    authSuccess: (state, action) => {
      state[action.payload?.loadingType] &&= false;
      state.user = action.payload.user;
      state.success = action.payload.success;
    },
    authFailure: (state, action) => {
      state[action.payload?.loadingType] &&= false;
      state.error = action.payload;
    },

    clrUser: (state) => {
      state.user = null;
    },
    clrAuthMsg: (state) => {
      state.error = null;
      state.success = null;
    },
  },
});

export const { authStart, authSuccess, authFailure, clrUser, clrAuthMsg } =
  authSlice.actions;

export default authSlice.reducer;

// actions
export const signupAction = (data) => async (dispatch) => {
  try {
    dispatch(authStart({ loadingType: "sgnUpLoading" }));

    const user = await authService.signup(data);

    if (user.data) {
      Cookies.set("tokenId", user.data.tokenId);
    }

    dispatch(
      authSuccess({
        user: user.data,
        success: "Account created successfully!",
      })
    );
    // console.log(user);
  } catch (error) {
    dispatch(authFailure(error.msg));
  }
};

export const signinAction = (email, password) => async (dispatch) => {
  try {
    dispatch(authStart({ loadingType: "sgnInLoading" }));
    const res = await authService.signin(email, password);
    console.log(res);
    if (res) {
      Cookies.set("tokenId", res.tokenId);
      localStorage.setItem("user", JSON.stringify(res));
    }
    dispatch(authSuccess({ user: res, success: "Login successfully!" }));
  } catch (error) {
    console.log(error);
    dispatch(authFailure(error.msg));
  }
};

export const signinWithGoogleAction = () => async (dispatch) => {
  try {
    dispatch(authStart({ loadingType: "sgnInGLoading" }));

    const result = await signInWithPopup(auth, provider);

    const res = await axios.post("/signin/google", {
      name: result.user.displayName,
      email: result.user.email,
      profileImg: {
        img_id: Math.random().toString(36),
        img_url: result.user.photoURL,
      },
    });
    if (res.data) {
      Cookies.set("tokenId", res.data.tokenId);
      localStorage.setItem("user", JSON.stringify(res));
    }

    dispatch(
      authSuccess({
        user: res.data,
        success: "Login successfully!",
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(authFailure(error.msg));
  }
};

export const forgotPassAction = (data) => async (dispatch) => {
  try {
    dispatch(authStart({ loadingType: "fgtPwdLoading" }));

    const res = await authService.forgotPass(data);
    console.log(res);
  } catch (error) {
    console.log(error);
    dispatch(authFailure(error.msg));
  }
};

export const resetPassAction = (data) => async (dispatch) => {
  try {
    dispatch(authStart({ loadingType: "rstPwdLoading" }));

    const res = await authService.resetPass(data);
    console.log(res);
  } catch (error) {
    console.log(error);
    dispatch(authFailure(error.msg));
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    await axios.get("/logout");
    dispatch(clrUser());
    Cookies.remove("tokenId");
    localStorage.removeItem("user");
  } catch (error) {
    dispatch(authFailure(error.msg));
  }
};
