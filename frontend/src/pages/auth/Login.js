import { useEffect, useState } from "react";
import Signin from "../../modules/auth/Signin";
import Signup from "../../modules/auth/Signup";
import { toast } from "react-toastify";
import { clrAuthStateMsg } from "../../redux/auth_store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(1);

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (authState.error) {
      toast.error(authState.error);
      dispatch(clrAuthStateMsg());
    }
    if (authState.user) {
      toast.success(authState.success);
      navigate("/");
      dispatch(clrAuthStateMsg());
    }
  }, [dispatch, navigate, authState.error, authState.user, authState.success]);

  const style = {
    container: {
      flex: "1",
    },
    form: {
      boxShadow: "0 0 0.3rem rgba(0, 0, 0, 0.5)",
    },
    active_tab: {
      color: "red",
      borderBottom: "2px solid #1b49e1",
      fontWeight: "bold",
    },
  };
  return (
    <div className="h-[calc(100vh-4rem)]" style={style.container}>
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
    </div>
  );
};

export default Login;
