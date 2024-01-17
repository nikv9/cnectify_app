import React, { useState } from "react";
import style from "./Login.module.css";
import Header from "../../components/layout/Header";
import Signup from "../../components/auth/Signup";
import SigninIdx from "../../modules/auth/signin/index";

const Login = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={style.login}>
      <Header />
      <div className={style.loginContainer}>
        <div className={style.formContainer}>
          <div className={style.tabContainer}>
            <div
              className={`${style.tab} ${
                activeTab === 1 ? style.activeTab : ""
              }`}
              onClick={() => handleTabChange(1)}
            >
              SIGNIN
            </div>
            <div
              className={`${style.tab} ${
                activeTab === 2 ? style.activeTab : ""
              }`}
              onClick={() => handleTabChange(2)}
            >
              SIGNUP
            </div>
          </div>

          <div className={style.forms}>
            {activeTab === 1 && <SigninIdx onTabChange={handleTabChange} />}
            {activeTab === 2 && <Signup onTabChange={handleTabChange} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
