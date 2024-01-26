import React, { useEffect, useState } from "react";
import style from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";
import ImageIcon from "@mui/icons-material/Image";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/layout/Spinner";
import { ToastContainer, toast } from "react-toastify";
import { clrError, clrSuccess, signupAction } from "../../../redux/authStore";

const Signup = ({ onTabChange }) => {
  const { user, error, loading, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: { value: "", valid: false, err: "" },
    email: { value: "", valid: false, err: "" },
    password: { value: "", valid: false, err: "" },
    profileImg: { value: null, valid: true, err: "" },
  });

  const navigate = useNavigate();
  const [clickedInput, setClickedInput] = useState(null);

  const requiredFields = ["name", "email", "password"];

  const handleInputClick = (inputName) => {
    setClickedInput(inputName);
    if (
      requiredFields.includes(inputName) &&
      formData[inputName].value.trim() === ""
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [inputName]: {
          ...prevFormData[inputName],
          err: "Required field!",
        },
      }));
    }
  };

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    let valid = true;
    let err = "";

    if (requiredFields.includes(inputName) && inputValue.trim() === "") {
      valid = false;
      err = "Required field!";
    } else if (inputName === "name" && inputValue.trim().length < 3) {
      valid = false;
      err = "Name should be at least 3 characters long!";
    } else if (inputName === "email" && !/\S+@\S+\.\S+/.test(inputValue)) {
      valid = false;
      err = "Invalid email format!";
    } else if (inputName === "password" && inputValue.trim().length < 4) {
      valid = false;
      err = "Password should be at least 4 characters long!";
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [inputName]: {
        value: inputValue,
        valid,
        err,
      },
    }));
  };

  // const handleFileChange = (e) => {
  //   const inputName = e.target.name;
  //   const file = e.target.files[0];

  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [inputName]: {
  //       value: file,
  //       isValid: true,
  //       errorMessage: "",
  //     },
  //   }));
  // };

  const handleFileChange = (e) => {
    const inputName = e.target.name;

    if (inputName === "profileImg") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () =>
        setFormData((prevFormData) => ({
          ...prevFormData,
          [inputName]: {
            value: reader.result,
            valid: true,
            err: "",
          },
        }));

      file && reader.readAsDataURL(file);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(
      signupAction(
        formData.name.value,
        formData.email.value,
        formData.password.value,
        formData.profileImg.value
      )
    );
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
      <form className={style.form} onSubmit={handleSignup}>
        <div className={style.inputContainer}>
          <PersonIcon className={style.authIcon} />
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            onClick={() => handleInputClick("name")}
            onChange={handleChange}
          />
        </div>
        {clickedInput === "name" && !formData.name.valid && (
          <span className={style.errMsg}>{formData.name.err}</span>
        )}

        <div className={style.inputContainer}>
          <MailOutlineIcon className={style.authIcon} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onClick={() => handleInputClick("email")}
            onChange={handleChange}
          />
        </div>
        {clickedInput === "email" && !formData.email.valid && (
          <span className={style.errMsg}>{formData.email.err}</span>
        )}

        <div className={style.inputContainer}>
          <LockOpenIcon className={style.authIcon} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onClick={() => handleInputClick("password")}
            onChange={handleChange}
          />
        </div>
        {clickedInput === "password" && !formData.password.valid && (
          <span className={style.errMsg}>{formData.password.err}</span>
        )}

        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          name="profileImg"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label
          className={`${style.inputContainer} ${style.fileInputContainer}`}
          htmlFor="fileInput"
        >
          <ImageIcon className={style.authIcon} />
          <span>Select profile pic</span>
        </label>
        {formData.profileImg.value && (
          <span className={style.selectedImg}>
            {formData.profileImg.value.length > 20
              ? formData.profileImg.value.slice(0, 20) + "..."
              : formData.profileImg.value}
          </span>
        )}

        <button
          type="submit"
          disabled={
            !requiredFields.every((fieldName) => formData[fieldName].valid)
          }
          className={
            !requiredFields.every((fieldName) => formData[fieldName].valid)
              ? style.disabled
              : style.enabled
          }
        >
          {loading ? (
            <Spinner color="aliceblue" hgt="1.3rem" wdth="1.3rem" />
          ) : (
            "SIGNUP"
          )}
        </button>

        <p onClick={() => onTabChange(1)}>Already have an account?</p>
      </form>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        toastStyle={{ backgroundColor: "black", color: "aliceblue" }}
      />
    </div>
  );
};

export default Signup;
