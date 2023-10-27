import React, { useEffect } from "react";
import stl from "./LeftBar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import userImg from "../../assets/user.png";
import { Avatar } from "@mui/material";

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

  return (
    <div className={stl.container}>
      <div className={stl.listContainer}>
        <Link
          className={activePath === `/profile/${user._id}` ? stl.active : ""}
          to={`/profile/${user._id}`}
        >
          {user.profileImg.imgUrl ? (
            <img src={user.profileImg.imgUrl} className={stl.profileImg} />
          ) : (
            <Avatar className={stl.avatar} />
          )}
          {user.name}
        </Link>
        <Link
          className={activePath === "/friends" ? stl.active : ""}
          to="/friends"
        >
          <PeopleOutlineIcon className={stl.icon} style={{ color: "teal" }} />
          Profile
        </Link>
        <Link
          className={activePath === "/friends" ? stl.active : ""}
          to="/friends"
        >
          <PeopleOutlineIcon
            className={stl.icon}
            style={{ color: "#007bff" }}
          />
          Connect friends
        </Link>

        <div className={stl.logoutDiv} onClick={handleLogout}>
          <LogoutIcon className={stl.icon} style={{ color: "crimson" }} />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
