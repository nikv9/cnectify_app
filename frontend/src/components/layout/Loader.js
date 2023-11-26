import React from "react";
import style from "./Loader.module.css";

const Loader = ({ color, hgt, wdth }) => {
  return (
    <div
      className={style.divLoading}
      style={{ borderBottomColor: color, height: hgt, width: wdth }}
    ></div>
  );
};

export default Loader;
