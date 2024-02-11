import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import { logoutAction } from "../redux/auth_store";

const LeftBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  // assigning location variable
  const location = useLocation();
  const activePath = location.pathname;

  const style = {
    container: {
      flex: "1",
    },

    menu_link: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      padding: "0.9rem 0",
      cursor: "pointer",
      textDecoration: "none",
      color: "rgba(0, 0, 0, 0.6)",
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
    <div
      className="sticky top-16 bg-white overflow-y-scroll h-[calc(100vh-4rem)]"
      style={style.container}
    >
      <div className="pt-2">
        <Link
          style={style.menu_link}
          className={`hover:bg-gray-200
            ${
              activePath === `/profile/${user._id}`
                ? "primary_clr font-bold"
                : ""
            }`}
          to={`/profile/${user._id}`}
        >
          {user.profileImg.imgUrl ? (
            <Avatar
              className="ml-6 mr-4 text-gray-700 bg-gray-200"
              src={user.profileImg.imgUrl}
            />
          ) : (
            <Avatar className="ml-6 mr-4 text-gray-700 bg-gray-200" />
          )}
          {user.name}
        </Link>
        <Link
          style={style.menu_link}
          className={`hover:bg-gray-200
            ${
              activePath === `/profile/${user._id}`
                ? "primary_clr font-bold"
                : ""
            }`}
          to="/friends"
        >
          <PeopleOutlineIcon className="text-blue-500" style={style.icon} />
          Profile
        </Link>
        <Link
          style={style.menu_link}
          className={`hover:bg-gray-200
            ${
              activePath === `/profile/${user._id}`
                ? "primary_clr font-bold"
                : ""
            }`}
          to="/friends"
        >
          <PeopleOutlineIcon className="text-green-500" style={style.icon} />
          Connect friends
        </Link>

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

export default LeftBar;
