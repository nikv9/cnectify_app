import axios from "axios";
import {
  logoutFailure,
  logoutStart,
  logoutSuccess,
  signupStart,
  signupSuccess,
  signupFailure,
  signinStart,
  signinSuccess,
  signinFailure,
} from "../reducers/authReducer";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";

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
      dispatch(signupFailure(error.response.data.msg));
    }
  };

// signin action
export const signinAction = (email, password) => async (dispatch) => {
  try {
    dispatch(signinStart());

    const { data } = await axios.post("/signin", {
      email,
      password,
    });

    dispatch(signinSuccess({ user: data, success: "Login successfully!" }));
  } catch (error) {
    console.log(error);
    dispatch(signinFailure(error.response.data.msg));
  }
};

// logout
export const logoutAction = () => async (dispatch) => {
  try {
    dispatch(logoutStart());

    await axios.get("/logout");
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure(error.response.data.msg));
  }
};

// google signin
export const signinWithGoogleAction = () => async (dispatch) => {
  try {
    dispatch(signinStart());

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
    dispatch(signinSuccess({ user: data, success: "Login successfully!" }));
  } catch (error) {
    console.log(error);
    dispatch(signinFailure(error.response.data.msg));
  }
};
