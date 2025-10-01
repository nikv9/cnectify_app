import React from "react";
import { useNavigate } from "react-router-dom";
import UserList from "../../modules/admin/user/UserList";

const Users = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-[4]">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="font-bold">USER LIST</p>
          <div
            className="bg-green-600 text-white p-2 rounded-md text-[0.8rem] cursor-pointer"
            onClick={() => navigate("/user?mode=add")}
          >
            ADD NEW USER
          </div>
        </div>

        <div className="mt-2">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default Users;
