import React, { useEffect, useState } from "react";
import stl from "./Signin.module.css";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useDispatch, useSelector } from "react-redux";
import {
  signinAction,
  signinWithGoogleAction,
} from "../../redux/actions/authAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../layout/Loader";
import { clrError, clrSuccess } from "../../redux/reducers/authReducer";

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
    <div className={stl.container}>
      <p className={stl.heading}>social_verse</p>
      <form className={stl.form} onSubmit={handleSignin}>
        <div className={stl.inputContainer}>
          <MailOutlineIcon className={stl.authIcon} />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={stl.inputContainer}>
          <LockOpenIcon className={stl.authIcon} />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={stl.signinBtn} type="submit">
          {loading ? (
            <Loader color="aliceblue" hgt="1.3rem" wdth="1.3rem" />
          ) : (
            "SIGNIN"
          )}
        </button>

        <button
          className={stl.signinGoogleBtn}
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
