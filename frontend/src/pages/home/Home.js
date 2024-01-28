import React from "react";
import LeftBar from "../../components/LeftBar";
import FeedIdx from "../../modules/home/feed/index";
import RightBar from "../../components/RightBar";

const Home = () => {
  return (
    <div className="flex">
      <LeftBar />
      <FeedIdx />
      <RightBar />
    </div>
  );
};

export default Home;
