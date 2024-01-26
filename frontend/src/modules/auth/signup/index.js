import React, { useEffect, useState } from "react";
import Signup from "./Signup";
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

const SignupIdx = (props) => {
  const auth = useSelector((state) => state.auth);
  // console.log(auth);
  // const { user, error, loading, success } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signinHandler = (e) => {
    e.preventDefault();
    dispatch(signinAction(email, password));
    // setEmail("");
    // setPassword("");
  };

  const signinWithGoogleHandler = (e) => {
    e.preventDefault();
    dispatch(signinWithGoogleAction());
  };

  useEffect(() => {
    if (auth.error) {
      toast.error(auth.error);
      dispatch(clrError());
    }
    if (auth.user) {
      toast.success(auth.success);
      setTimeout(() => {
        navigate("/");
      }, 3000);
      dispatch(clrSuccess());
    }
  }, [dispatch, auth.error, auth.user, auth.success]);
  return (
    <>
      <Signup
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        signinHandler={signinHandler}
        signinWithGoogleHandler={signinWithGoogleHandler}
        loading={auth.loading}
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

export default SignupIdx;
