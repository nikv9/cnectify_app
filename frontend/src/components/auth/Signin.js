import React, { useEffect, useState } from "react";
import style from "./Signin.module.css";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useDispatch, useSelector } from "react-redux";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../layout/Loader";
import {
  clrError,
  clrSuccess,
  signinAction,
  signinWithGoogleAction,
} from "../../redux/authStore";

const Signin = ({ onTabChange }) => {
  const { user, error, loading, success } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    dispatch(signinAction(email, password));
    setEmail("");
    setPassword("");
  };

  const handleSigninWithGoogle = (e) => {
    e.preventDefault();
    dispatch(signinWithGoogleAction());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clrError());
    }
    if (user) {
      toast.success(success);
      navigate("/");
      dispatch(clrSuccess());
    }
  }, [dispatch, error, user, success]);

  return (
    <div className={style.container}>
      <p className={style.heading}>social_verse</p>
      <form className={style.form} onSubmit={handleSignin}>
        <div className={style.inputContainer}>
          <MailOutlineIcon className={style.authIcon} />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={style.inputContainer}>
          <LockOpenIcon className={style.authIcon} />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={style.signinBtn} type="submit">
          {loading ? (
            <Loader color="aliceblue" hgt="1.3rem" wdth="1.3rem" />
          ) : (
            "SIGNIN"
          )}
        </button>

        <button
          className={style.signinGoogleBtn}
          onClick={handleSigninWithGoogle}
        >
          Signin With Google
        </button>

        <p onClick={() => onTabChange(2)}>Don't have any account?</p>
      </form>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        toastStyle={{ backgroundColor: "black", color: "aliceblue" }}
      />
    </div>
  );
};

export default Signin;
