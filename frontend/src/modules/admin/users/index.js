import React from "react";
import UsersTable from "./UsersTable";

const UserListIdx = () => {
  return (
    <div className="flex-[4]">
      <div className="p-5">
        <p className="mx-2 my-2 font-bold">USER LIST</p>
        <UsersTable />
      </div>
    </div>
  );
};

export default UserListIdx;
