import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import authService from "../services/auth_service";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: null,
    forgotPassLoading: false,
  },

  reducers: {
    authStart: (state, action) => {
      state[action.payload?.loadingType] &&= true;
      // above is shorter code of this below
      // state[action.payload?.loadingType] &&
      //   (state[action.payload?.loadingType] = true);
    },
    authSuccess: (state, action) => {
      console.log(state);
    },
    authFailure: (state, action) => {
      state[action.payload?.loadingType] &&= false;
    },
    // signup
    signupStart: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.success = action.payload.success;
    },

    signupFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // signin
    signinStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.success = action.payload.success;
    },

    signinFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signinWithGoogleStart: (state) => {
      state.loading = true;
    },
    signinWithGoogleSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.success = action.payload.success;
    },

    signinWithGoogleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // logout
    logoutStart: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
    },

    logoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // !!!
    setUser: (state, action) => {
      state.user = action;
    },
    clrUser: (state) => {
      state.user = null;
    },
    clrError: (state) => {
      state.error = null;
    },
    clrLoading: (state) => {
      state.loading = false;
    },
    clrSuccess: (state) => {
      state.success = null;
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFailure,
  signupStart,
  signupSuccess,
  signupFail,
  signinStart,
  signinSuccess,
  signinFail,
  clrUser,
  clrError,
  clrSuccess,
  logoutStart,
  logoutSuccess,
  logoutFail,
  signinWithGoogleStart,
  signinWithGoogleFailure,
  signinWithGoogleSuccess,
  setUser,
  clrLoading,
} = authSlice.actions;

export default authSlice.reducer;

// actions
// signup action
export const signupAction =
  (name, email, password, profileImg) => async (dispatch) => {
    try {
      dispatch(signupStart());

      const user = await axios.post("/signup", {
        name,
        email,
        password,
        profileImg,
      });

      console.log(user);

      if (user.data) {
        Cookies.set("tokenId", user.data.tokenId);
      }

      dispatch(
        signupSuccess({
          user: user.data,
          success: "Account created successfully!",
        })
      );
      // console.log(user);
    } catch (error) {
      dispatch(signupFail(error.msg));
    }
  };

// signin action
export const signinAction = (email, password) => async (dispatch) => {
  try {
    dispatch(signinStart());
    const res = await authService.login(email, password);
    console.log(res);
    if (res) {
      Cookies.set("tokenId", res.tokenId);
      localStorage.setItem("user", JSON.stringify(res));
    }
    dispatch(signinSuccess({ user: res, success: "Login successfully!" }));
  } catch (error) {
    console.log(error);
    dispatch(signinFail(error.msg));
  }
};

// logout
export const logoutAction = () => async (dispatch) => {
  try {
    dispatch(logoutStart());

    await axios.get("/logout");
    dispatch(logoutSuccess());
    Cookies.remove("tokenId");
    localStorage.removeItem("user");
  } catch (error) {
    dispatch(logoutFail(error.msg));
  }
};

// google signin
export const signinWithGoogleAction = () => async (dispatch) => {
  try {
    dispatch(signinWithGoogleStart());

    const result = await signInWithPopup(auth, provider);

    const res = await axios.post("/signin/google", {
      name: result.user.displayName,
      email: result.user.email,
      profileImg: {
        img_id: Math.random().toString(36),
        img_url: result.user.photoURL,
      },
    });
    console.log(res);
    if (res.data) {
      Cookies.set("tokenId", res.data.tokenId);
      localStorage.setItem("user", JSON.stringify(res));
    }

    dispatch(
      signinWithGoogleSuccess({
        user: res.data,
        success: "Login successfully!",
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(signinWithGoogleFailure(error.msg));
  }
};

export const forgotPassAction = (data) => async (dispatch) => {
  try {
    dispatch(authStart({ loadingType: "forgotPassLoading" }));

    const res = await authService.forgotPass(data);
    console.log(res);
  } catch (error) {
    console.log(error);
    dispatch(authFailure(error.msg));
  }
};

export const resetPassAction = (data) => async (dispatch) => {
  try {
    dispatch(authStart({ loadingType: "resetPassLoading" }));

    const res = await authService.resetPass(data);
    console.log(res);
  } catch (error) {
    console.log(error);
    dispatch(authFailure(error.msg));
  }
};
