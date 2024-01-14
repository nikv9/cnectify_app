import React, { useEffect, useState } from "react";
import Signin from "./Signin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clrError,
  clrSuccess,
  signinAction,
  signinWithGoogleAction,
} from "../../../redux/authStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SigninIdx = (props) => {
  const { user, error, loading, success } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signinHandler = (e) => {
    e.preventDefault();
    dispatch(signinAction(email, password));
    setEmail("");
    setPassword("");
  };

  const signinWithGoogleHandler = (e) => {
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
    <>
      <Signin
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        signinHandler={signinHandler}
        signinWithGoogleHandler={signinWithGoogleHandler}
        loading={loading}
        onTabChange={props.onTabChange}
      />
      <ToastContainer
        autoClose={2000}
        position="top-center"
        toastStyle={{ backgroundColor: "black", color: "aliceblue" }}
      />
    </>
  );
};

export default SigninIdx;
