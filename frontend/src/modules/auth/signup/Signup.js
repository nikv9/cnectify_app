import React, { useEffect, useState } from "react";
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
  const signupStyle = {
    width: "25rem",
  };
  return (
    <div className="p-4" style={signupStyle}>
      <p className="primaryColor text-center mt-1 text-xl">social_verse</p>
      <form className="p-2" onSubmit={handleSignup}>
        <div className="flex items-center mb-5 bg-gray-200 rounded">
          <PersonIcon className="text-gray-400 ml-2 text-xl" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-2.5 w-full border-none outline-none text-gray-700 bg-gray-200"
            required
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-5 bg-gray-200 rounded">
          <MailOutlineIcon className="text-gray-400 ml-2 text-xl" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2.5 w-full border-none outline-none text-gray-700 bg-gray-200"
            required
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-5 bg-gray-200 rounded">
          <LockOpenIcon className="text-gray-400 ml-2 text-xl" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2.5 w-full border-none outline-none text-gray-700 bg-gray-200"
            required
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
          />
        </div>

        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          name="profileImg"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label
          className="flex items-center mb-5 bg-gray-200 rounded cursor-pointer py-2.5"
          htmlFor="fileInput"
        >
          <ImageIcon className="text-gray-400 ml-2 text-xl" />
          <span className="ml-2 text-gray-400">Select profile pic</span>
        </label>
        {formData.profileImg.value && (
          <span className="text-green-600">
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
          className={`py-2 outline-none rouded mt-2 w-full font-bold tracking-wide  ${
            !requiredFields.every((fieldName) => formData[fieldName]?.valid)
              ? "bg-transparent text-gray-600 cursor-not-allowed border border-gray-600"
              : "primaryBgColor text-white cursor-pointer"
          }`}
        >
          {loading ? (
            <Spinner color="aliceblue" hgt="1.3rem" wdth="1.3rem" />
          ) : (
            "SIGNUP"
          )}
        </button>

        <p
          className="mt-2 text-red-600 align-center underline cursor-pointer text-center hover:text-red-800"
          onClick={() => onTabChange(1)}
        >
          Already have an account?
        </p>
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
