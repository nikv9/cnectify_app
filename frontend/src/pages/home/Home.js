import React from "react";
import stl from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/layout/Header";
import LeftBar from "../../components/home/LeftBar";
import MidBar from "../../components/home/MidBar";
import RightBar from "../../components/home/RightBar";

const Home = () => {
  return (
    <div className={stl.container}>
      <Header />
      <div className={stl.barContainer}>
        <LeftBar />
        <MidBar />
        <RightBar />
      </div>
    </div>
  );
};

export default Home;
