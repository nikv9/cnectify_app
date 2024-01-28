import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clrError,
  clrSuccess,
  signinAction,
  signinWithGoogleAction,
  signupAction,
} from "../../../redux/authStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupIdx = (props) => {
  const { user, error, loading, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImg, setProfileImg] = useState(null);

  const selectProfileImg = (e) => {
    const selectedFile = e.target.files[0];
    // console.log(selectedFile);

    const reader = new FileReader();
    //  console.log(reader);
    reader.readAsDataURL(selectedFile);

    reader.onload = () => {
      setProfileImg(reader.result);
    };
  };

  const formValidation = () => {
    return !name || !email || !password;
  };

  const signupHandler = (e) => {
    e.preventDefault();
    dispatch(signupAction(name, email, password, profileImg));
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
      <Signup
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        profileImg={profileImg}
        selectProfileImg={selectProfileImg}
        signupHandler={signupHandler}
        onTabChange={props.onTabChange}
        validations={formValidation}
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
