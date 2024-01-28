import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";
import ImageIcon from "@mui/icons-material/Image";
import { useSelector } from "react-redux";
import Spinner from "../../../components/Spinner";

const Signup = (props) => {
  const auth = useSelector((state) => state.auth);

  const signupStyle = {
    width: "25rem",
  };
  return (
    <div className="p-4" style={signupStyle}>
      <p className="primaryColor text-center mt-1 text-xl">social_verse</p>
      <form className="p-2" onSubmit={props.signupHandler}>
        <div className="flex items-center mb-5 bg-gray-200 rounded">
          <PersonIcon className="text-gray-400 ml-2 text-xl" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-2.5 w-full border-none outline-none text-gray-700 bg-gray-200"
            required
            value={props.name}
            onChange={(e) => props.setName(e.target.value)}
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
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
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
          onChange={props.selectProfileImg}
        />
        <label
          className="flex items-center mb-5 bg-gray-200 rounded cursor-pointer py-2.5"
          htmlFor="fileInput"
        >
          <ImageIcon className="text-gray-400 ml-2 text-xl" />
          <span className="ml-2 text-gray-400">Select profile pic</span>
        </label>
        {props.profileImg && (
          <span className="text-green-600">
            {props.profileImg.length > 20
              ? props.profileImg.slice(0, 20) + "..."
              : props.profileImg}
          </span>
        )}

        <button
          type="submit"
          disabled={props.validations()}
          className={`py-2 outline-none rouded mt-2 w-full font-bold tracking-wide flex items-center justify-center  ${
            props.validations()
              ? "bg-transparent text-gray-600 cursor-not-allowed border border-gray-600"
              : "primaryBgColor text-white cursor-pointer"
          }`}
        >
          {auth.loading ? (
            <Spinner color="aliceblue" size="1.3rem" />
          ) : (
            "SIGNUP"
          )}
        </button>

        <p
          className="mt-2 text-red-600 align-center underline cursor-pointer text-center hover:text-red-800"
          onClick={() => props.onTabChange(1)}
        >
          Already have an account?
        </p>
      </form>
    </div>
  );
};

export default Signup;
