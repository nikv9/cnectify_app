import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import authService from "../services/auth_service";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: null,
  },

  reducers: {
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
    clrUser: (state) => {
      state.user = null;
    },
    clrError: (state) => {
      state.error = null;
    },
    clrSuccess: (state) => {
      state.success = null;
    },
  },
});

export const {
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

    const data = await authService.login(email, password);
    console.log(data);
    dispatch(signinSuccess({ user: data, success: "Login successfully!" }));
  } catch (error) {
    console.log(error);
    dispatch(signinFail(error.msg));
  }
};
// export const signinAction = (email, password) => async (dispatch) => {
//   try {
//     dispatch(signinStart());

//     const { data } = await axios.post("/signin", {
//       email,
//       password,
//     });

//     dispatch(signinSuccess({ user: data, success: "Login successfully!" }));
//   } catch (error) {
//     console.log(error);
//     dispatch(signinFail(error.response.data.msg));
//   }
// };

// logout
export const logoutAction = () => async (dispatch) => {
  try {
    dispatch(logoutStart());

    await axios.get("/logout");
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error.msg));
  }
};

// google signin
export const signinWithGoogleAction = () => async (dispatch) => {
  try {
    dispatch(signinWithGoogleStart());

    const result = await signInWithPopup(auth, provider);

    const { data } = await axios.post("/signin/google", {
      name: result.user.displayName,
      email: result.user.email,
      profileImg: {
        img_id: Math.random().toString(36),
        img_url: result.user.photoURL,
      },
    });
    console.log(data);
    dispatch(
      signinWithGoogleSuccess({ user: data, success: "Login successfully!" })
    );
  } catch (error) {
    console.log(error);
    dispatch(signinWithGoogleFailure(error.msg));
  }
};
