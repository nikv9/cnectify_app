import React from "react";
import style from "./Home.module.css";
import Header from "../../components/layout/Header";
import LeftBar from "../../components/layout/LeftBar";
import Feed from "../../components/home/Feed";
import RightBar from "../../components/home/RightBar";

const Home = () => {
  return (
    <div>
      <Header />
      <div className={style.home}>
        <LeftBar />
        <Feed />
        <RightBar />
      </div>
    </div>
  );
};

export default Home;
