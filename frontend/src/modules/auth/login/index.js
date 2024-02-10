import React, { useEffect, useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clrError, clrSuccess } from "../../../redux/auth_store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginIdx = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(1);

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (auth.error) {
      toast.error(auth.error);
      dispatch(clrError());
    }
    if (auth.user) {
      toast.success(auth.success);
      navigate("/");
      dispatch(clrSuccess());
    }
  }, [dispatch, auth.error, auth.user, auth.success]);

  const style = {
    form: {
      boxShadow: "0 0 0.3rem rgba(0, 0, 0, 0.5)",
    },
    active_tab: {
      color: "#1b49e1",
      borderBottom: "2px solid #1b49e1",
      fontWeight: "bold",
    },
  };
  return (
    <div className="hFull">
      <div className="flex items-center justify-center">
        <div
          className="mt-10 p-3 flex items-center justify-center flex-col rounded w-1/3"
          style={style.form}
        >
          <div className="flex items-center w-full">
            <div
              className="flex justify-center py-2 flex-1 cursor-pointer"
              style={activeTab === 1 ? style.active_tab : {}}
              onClick={() => changeTab(1)}
            >
              SIGNIN
            </div>
            <div
              className="flex justify-center py-2 flex-1 cursor-pointer"
              style={activeTab === 2 ? style.active_tab : {}}
              onClick={() => changeTab(2)}
            >
              SIGNUP
            </div>
          </div>

          <div>
            {activeTab === 1 && <Signin changeTab={changeTab} />}
            {activeTab === 2 && <Signup changeTab={changeTab} />}
          </div>
        </div>
      </div>

      <ToastContainer
        autoClose={2000}
        position="top-center"
        toastStyle={{ backgroundColor: "black", color: "aliceblue" }}
      />
    </div>
  );
};

export default LoginIdx;
