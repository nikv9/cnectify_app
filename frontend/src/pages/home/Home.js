import React from "react";
import stl from "./Home.module.css";
import Header from "../../components/layout/Header";
import LeftBar from "../../components/home/LeftBar";
import MidBar from "../../components/home/MidBar";
import RightBar from "../../components/home/RightBar";

const Home = () => {
  return (
    <div>
      <Header />
      <div className={stl.home}>
        <LeftBar />
        <MidBar />
        <RightBar />
      </div>
    </div>
  );
};

export default Home;
