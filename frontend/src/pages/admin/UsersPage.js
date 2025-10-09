import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "../../modules/admin/user/UserList";
import { useDispatch } from "react-redux";
import { getAllUsersAction } from "../../redux/user_store";

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    userName: "",
    sortType: "asc",
  });

  const filterUserHandler = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    console.log(updatedFilters);
    dispatch(
      getAllUsersAction({
        userName: updatedFilters.userName,
        sortType: updatedFilters.sortType,
      })
    );
  };

  return (
    <div className="flex-[4]">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="font-bold">USER LIST</p>
          <div className="flex gap-2">
            <input
              type="text"
              name="userName"
              value={filters.userName}
              onChange={filterUserHandler}
              placeholder="Search user"
              className="p-2 outline-none border text-sm"
            />
            <select
              name="sortType"
              value={filters.sortType}
              onChange={filterUserHandler}
              className="p-2 outline-none border text-sm text-gray-400"
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>
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
