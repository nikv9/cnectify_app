import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Spinner from "../../../components/layout/Spinner";

const Signin = (props) => {
  const signinStyle = {
    width: "25rem",
  };

  return (
    <div className="p-4" style={signinStyle}>
      <p className="primaryColor text-center mt-1 text-xl">social_verse</p>
      <form className="p-3 mt-3" onSubmit={props.signinHandler}>
        <div className="flex items-center mb-5 bg-gray-200 rounded">
          <MailOutlineIcon className="text-gray-400 ml-2 text-xl" />
          <input
            type="email"
            placeholder="Email"
            required
            className="p-2.5 w-full border-none outline-none text-gray-700 bg-gray-200"
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-5 bg-gray-200 ">
          <LockOpenIcon className="text-gray-400 ml-2 text-xl" />
          <input
            type="password"
            placeholder="Password"
            required
            className="p-2.5 w-full border-none outline-none text-gray-700 bg-gray-200"
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
          />
        </div>

        <button
          className="errBgColor bg-crimson text-white border-none p-2.5 font-bold w-full mt-3 rounded tracking-wider"
          type="submit"
        >
          {props.loading ? (
            <Spinner color="aliceblue" hgt="1.3rem" wdth="1.3rem" />
          ) : (
            "SIGNIN"
          )}
        </button>

        <button
          className="primaryBgColor text-white border-none p-2.5 font-bold w-full mt-3 rounded tracking-wider"
          onClick={props.signinWithGoogleHandler}
        >
          Signin With Google
        </button>

        <p
          className="mt-5 text-center cursor-pointer text-blue-800 underline hover:text-blue-600"
          onClick={() => props.onTabChange(2)}
        >
          Don't have any account?
        </p>
      </form>
    </div>
  );
};

export default Signin;
