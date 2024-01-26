import React from "react";
import LeftBar from "../../components/layout/LeftBar";
import Feed from "../../components/home/Feed";
import RightBar from "../../components/home/RightBar";

const Home = () => {
  return (
    <div className="flex">
      <LeftBar />
      <Feed />
      <RightBar />
    </div>
  );
};

export default Home;
