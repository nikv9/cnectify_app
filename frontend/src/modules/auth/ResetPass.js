import React, { useState } from "react";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassAction } from "../../redux/auth_store";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const ResetPass = (props) => {
  const authState = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  const resetPassHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassAction({ token, password, confirmPassword }));
  };

  return (
    <div className="p-4 bg-white shadow-md w-[25rem]">
      <p className="primary_text text-center mt-1 text-xl">Change Password</p>
      <form className="p-3 mt-3" onSubmit={resetPassHandler}>
        <div className="flex items-center mb-5 bg-gray-200 ">
          <LockOpenIcon className="text-gray-400 ml-2 text-xl" />
          <input
            type="text"
            placeholder="Password"
            required
            className="p-2.5 w-full border-none outline-none text-gray-700 bg-gray-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center mb-5 bg-gray-200 ">
          <LockOpenIcon className="text-gray-400 ml-2 text-xl" />
          <input
            type="password"
            placeholder="Confirm password"
            required
            className="p-2.5 w-full border-none outline-none text-gray-700 bg-gray-200"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className="globalBtn bg-[crimson] font-bold w-full mt-3 flex items-center justify-center"
          type="submit"
        >
          {authState.loading.rstPwd ? (
            <Spinner color="aliceblue" size="1.3rem" />
          ) : (
            "SUBMIT"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPass;
