import React from "react";
import style from "./RightBar.module.css";
import SuggestedUsers from "../user/SuggestedUsers";

const RightBar = () => {
  return (
    <div className={style.container}>
      <SuggestedUsers />
    </div>
  );
};

export default RightBar;
