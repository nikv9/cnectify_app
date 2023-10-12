import React from "react";
import cls from "./Loader.module.css";

const Loader = ({ color, hgt, wdth }) => {
  return (
    <div
      className={cls.divLoading}
      style={{ borderBottomColor: color, height: hgt, width: wdth }}
    ></div>
  );
};

export default Loader;
