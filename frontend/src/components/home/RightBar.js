import React from "react";
import stl from "./RightBar.module.css";
import SuggestedUsers from "../user/SuggestedUsers";

const RightBar = () => {
  return (
    <div className={stl.container}>
      <SuggestedUsers />
    </div>
  );
};

export default RightBar;
