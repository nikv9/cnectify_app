import React, { useState } from "react";
import stl from "./Login.module.css";
import Header from "../../components/layout/Header";
import Signup from "../../components/auth/Signup";
import Signin from "../../components/auth/Signin";

const Login = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={stl.container}>
      <Header />
      <div className={stl.loginContainer}>
        <div className={stl.formContainer}>
          <div className={stl.tabContainer}>
            <div
              className={`${stl.tab} ${activeTab === 1 ? stl.activeTab : ""}`}
              onClick={() => handleTabChange(1)}
            >
              SIGNIN
            </div>
            <div
              className={`${stl.tab} ${activeTab === 2 ? stl.activeTab : ""}`}
              onClick={() => handleTabChange(2)}
            >
              SIGNUP
            </div>
          </div>

          <div className={stl.forms}>
            {activeTab === 1 && <Signin onTabChange={handleTabChange} />}
            {activeTab === 2 && <Signup onTabChange={handleTabChange} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
