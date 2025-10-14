import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import { logoutAction } from "../redux/auth_store";
import Diversity3Icon from "@mui/icons-material/Diversity3";

const MenuBar = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  // assigning location variable
  const location = useLocation();
  const activePath = location.pathname;

  const style = {
    menu_link: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      padding: "0.9rem 0",
      cursor: "pointer",
      textDecoration: "none",
    },

    icon: {
      padding: "0.6rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgb(235, 235, 235)",
      borderRadius: "50%",
      marginLeft: "1.5rem",
      marginRight: "1rem",
      fontSize: "2.5rem",
    },
  };

  return (
    <div className="!flex-1 sticky top-16 bg-white overflow-y-scroll h-[calc(100vh-4rem)]">
      <div className="pt-2">
        {authState.user.role === "admin" &&
        (location.pathname === "/dashboard/admin" ||
          location.pathname === "/users/admin" ||
          location.pathname === "/user" ||
          location.pathname === "/posts/admin") ? (
          <>
            <Link
              style={style.menu_link}
              className={`text-gray-500 hover:bg-gray-200
            ${
              activePath === `/dashboard/admin` ? "primary_text font-bold" : ""
            }`}
              to="/dashboard/admin"
            >
              <PeopleOutlineIcon
                className="text-purple-500"
                style={style.icon}
              />
              Dashboard
            </Link>
            <Link
              style={style.menu_link}
              className={`text-gray-500 hover:bg-gray-200
            ${
              activePath === `/users/admin` || activePath === "/user"
                ? "primary_text font-bold"
                : ""
            }`}
              to="/users/admin"
            >
              <PeopleOutlineIcon
                className="text-green-500"
                style={style.icon}
              />
              Users
            </Link>
            <Link
              style={style.menu_link}
              className={`text-gray-500 hover:bg-gray-200
            ${
              activePath === `/posts/admin` || activePath === "/post"
                ? "primary_text font-bold"
                : ""
            }`}
              to="/posts/admin"
            >
              <PermMediaIcon className="text-blue-500" style={style.icon} />
              Posts
            </Link>
          </>
        ) : (
          <>
            <Link
              style={style.menu_link}
              className={`text-gray-500 hover:bg-gray-200
            ${
              activePath === `/profile/${authState.user._id}`
                ? "primary_text font-bold"
                : ""
            }`}
              to={`/profile/${authState.user._id}`}
            >
              {authState.user.profileImg.imgUrl ? (
                <Avatar
                  className="ml-6 mr-4 text-gray-700 bg-gray-200"
                  src={authState.user.profileImg.imgUrl}
                />
              ) : (
                <Avatar className="ml-6 mr-4 text-gray-700 bg-gray-200" />
              )}
              {authState.user.name}
            </Link>

            <Link
              style={style.menu_link}
              className={`text-gray-500 hover:bg-gray-200
            ${activePath === `/friends` ? "primary_text font-bold" : ""}`}
              to="/friends"
            >
              <PeopleOutlineIcon
                className="text-green-500"
                style={style.icon}
              />
              Connect Friends
            </Link>

            <Link
              style={style.menu_link}
              className={`text-gray-500 hover:bg-gray-200
            ${activePath === `/reqs` ? "primary_text font-bold" : ""}`}
              to="/reqs"
            >
              <Diversity3Icon className="text-purple-500" style={style.icon} />
              Requests
            </Link>
          </>
        )}

        <div
          className="flex items-center py-4 cursor-pointer hover:bg-gray-200"
          onClick={logoutHandler}
        >
          <LogoutIcon className="text-red-500" style={style.icon} />
          <p className="text-gray-500">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
