import React from "react";
import "./Signin.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Loader from "../../../components/layout/Loader";

const Signin = (props) => {
  return (
    <div className="signin p-4">
      <p className="signinHeading text-center mt-1 text-xl">social_verse</p>
      <form className="signinForm p-3 mt-3" onSubmit={props.signinHandler}>
        <div className="inputContainer flex items-center mb-5">
          <MailOutlineIcon className="authIcon text-gray-400 ml-2" />
          <input
            type="email"
            placeholder="Email"
            required
            className="p-2.5 w-full border-none outline-none"
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
          />
        </div>

        <div className="inputContainer flex items-center mb-5">
          <LockOpenIcon className="authIcon text-gray-400 ml-2" />
          <input
            type="password"
            placeholder="Password"
            required
            className="p-2.5 w-full border-none outline-none"
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
          />
        </div>

        <button
          className="signinBtn text-white border-none p-2.5 font-bold w-full mt-3"
          type="submit"
        >
          {props.loading ? (
            <Loader color="aliceblue" hgt="1.3rem" wdth="1.3rem" />
          ) : (
            "SIGNIN"
          )}
        </button>

        <button
          className="signinGoogleBtn text-white border-none p-2.5 font-bold w-full mt-3"
          onClick={props.signinWithGoogleHandler}
        >
          Signin With Google
        </button>

        <p
          className="signinPText mt-5 text-center cursor-pointer text-blue-800 underline"
          onClick={() => props.onTabChange(2)}
        >
          Don't have any account?
        </p>
      </form>
    </div>
  );
};

export default Signin;
