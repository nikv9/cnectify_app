import React from "react";
import { useNavigate } from "react-router-dom";
import PostsTable from "./PostsTable";

const PostListIdx = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-[4]">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="font-bold">POST LIST</p>
          <div
            className="bg-green-600 text-white p-2 rounded-md text-[0.8rem] cursor-pointer"
            onClick={() => navigate("/post?mode=add")}
          >
            ADD NEW POST
          </div>
        </div>

        <div className="mt-2">
          <PostsTable />
        </div>
      </div>
    </div>
  );
};

export default PostListIdx;
