import React from "react";
import FollowReqs from "../../modules/user/FollowReqs";
import { useState } from "react";

const FollowReqsPage = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabChangeHandler = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="flex-[4]">
      <div className="flex items-center gap-4 p-3">
        <span
          className={`${
            activeTab === 1 && "border-b-2 border-[crimson] text-[crimson]"
          } px-1 cursor-pointer text-gray-700`}
          onClick={() => tabChangeHandler(1)}
        >
          Received Requests
        </span>
        <span
          className={`${
            activeTab === 2 && "border-b-2 border-[crimson] text-[crimson]"
          } px-1 cursor-pointer text-gray-700`}
          onClick={() => tabChangeHandler(2)}
        >
          Sent Requests
        </span>
      </div>
      <FollowReqs activeTab={activeTab} />
    </div>
  );
};

export default FollowReqsPage;
