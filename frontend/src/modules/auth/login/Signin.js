import React, { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Spinner from "../../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signinAction,
  signinWithGoogleAction,
} from "../../../redux/auth_store";

const Signin = (props) => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  const style = {
    container: {
      width: "25rem",
    },
  };
  return (
    <div className="p-4" style={style.container}>
      <p className="primary_clr text-center mt-1 text-xl">social_verse</p>
      <form className="p-3 mt-3" onSubmit={signinHandler}>
        <div className="flex items-center mb-5 bg-gray-200 rounded">
          <MailOutlineIcon className="text-gray-400 ml-2 text-xl" />
          <input
            type="email"
            placeholder="Email"
            required
            className="p-2.5 w-full border-none outline-none text-gray-700 bg-gray-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-5 bg-gray-200 ">
          <LockOpenIcon className="text-gray-400 ml-2 text-xl" />
          <input
            type="password"
            placeholder="Password"
            required
            className="p-2.5 w-full border-none outline-none text-gray-700 bg-gray-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="err_bg_clr bg-crimson text-white border-none p-2.5 font-bold w-full mt-3 rounded tracking-wider flex items-center justify-center"
          type="submit"
        >
          {auth.loading ? (
            <Spinner color="aliceblue" size="1.3rem" />
          ) : (
            "SIGNIN"
          )}
        </button>

        <button
          className="primary_bg_clr text-white border-none p-2.5 font-bold w-full mt-3 rounded tracking-wider"
          onClick={signinWithGoogleHandler}
        >
          Signin With Google
        </button>

        <p
          className="mt-5 text-center cursor-pointer text-blue-800 underline hover:text-blue-600"
          onClick={() => props.changeTab(2)}
        >
          Don't have any account?
        </p>
      </form>
    </div>
  );
};

export default Signin;
