import React, { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassAction } from "../../redux/auth_store";

const ForgotPass = (props) => {
  const authState = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const forgotPassHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassAction(email));
  };

  const style = {
    container: {
      width: "25rem",
    },
  };
  return (
    <div className="p-4 bg-white shadow-md" style={style.container}>
      <p className="primary_text text-center mt-1 text-xl">
        Get a reset password link
      </p>
      <form className="p-3 mt-3" onSubmit={forgotPassHandler}>
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

        <button
          className="globalBtn bg-[crimson] font-bold w-full mt-3 flex items-center justify-center"
          type="submit"
        >
          {authState.fgtPwdLoading ? (
            <Spinner color="aliceblue" size="1.3rem" />
          ) : (
            "SUBMIT"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPass;
