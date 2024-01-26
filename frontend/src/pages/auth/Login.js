import React, { useState } from "react";
import SigninIdx from "../../modules/auth/signin/index";
import SignupIdx from "../../modules/auth/signup";

const Login = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // style
  const formContainerStyle = {
    boxShadow: "0 0 0.3rem rgba(0, 0, 0, 0.5)",
  };
  const activeTabStyle = {
    color: "#1b49e1",
    borderBottom: "2px solid #1b49e1",
    fontWeight: "bold",
  };

  return (
    <div className="hFull">
      <div className="flex items-center justify-center">
        <div
          className="mt-10 p-3 flex items-center justify-center flex-col rounded w-1/3"
          style={formContainerStyle}
        >
          <div className="flex items-center w-full">
            <div
              className="flex justify-center py-2 flex-1 cursor-pointer"
              style={activeTab === 1 ? activeTabStyle : {}}
              onClick={() => handleTabChange(1)}
            >
              SIGNIN
            </div>
            <div
              className="flex justify-center py-2 flex-1 cursor-pointer"
              style={activeTab === 2 ? activeTabStyle : {}}
              onClick={() => handleTabChange(2)}
            >
              SIGNUP
            </div>
          </div>

          <div>
            {activeTab === 1 && <SigninIdx onTabChange={handleTabChange} />}
            {activeTab === 2 && <SignupIdx onTabChange={handleTabChange} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
