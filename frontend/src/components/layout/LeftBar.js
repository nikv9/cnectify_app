import React, { useEffect } from "react";
import style from "./LeftBar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import { logoutAction } from "../../redux/authStore";

const LeftBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
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

  const containerStyle = {
    flex: "0.4",
  };

  return (
    <div
      className="sticky top-16 bg-white overflow-y-scroll h-[calc(100vh-4rem)]"
      style={containerStyle}
    >
      <div className={style.listContainer}>
        <Link
          className={activePath === `/profile/${user._id}` ? style.active : ""}
          to={`/profile/${user._id}`}
        >
          {user.profileImg.imgUrl ? (
            <Avatar className={style.avatar} src={user.profileImg.imgUrl} />
          ) : (
            <Avatar className={style.avatar} />
          )}
          {user.name}
        </Link>
        <Link
          className={activePath === "/friends" ? style.active : ""}
          to="/friends"
        >
          <PeopleOutlineIcon
            className={style.icon}
            style={{ color: "#23bd0b" }}
          />
          Profile
        </Link>
        <Link
          className={activePath === "/friends" ? style.active : ""}
          to="/friends"
        >
          <PeopleOutlineIcon
            className={style.icon}
            style={{ color: "#007bff" }}
          />
          Connect friends
        </Link>

        <div className={style.logoutDiv} onClick={handleLogout}>
          <LogoutIcon className={style.icon} style={{ color: "crimson" }} />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
