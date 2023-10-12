import React from "react";
import stl from "./Header.module.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useSelector } from "react-redux";
import userImg from "../../assets/user.png";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  return (
    <div className={stl.header}>
      <div className={stl.left}>
        <Link to="/">
          <h3>social_verse</h3>
        </Link>
      </div>
      {user && (
        <>
          <div className={stl.mid}>
            <div className={stl.searchContainer}>
              <SearchIcon className={stl.searchIcon} />
              <input type="text" placeholder="Search friends..." />
            </div>
          </div>
          <div className={stl.right}>
            <div className={stl.icons}>
              <NotificationsNoneIcon className={stl.notifIcon} />
              <TelegramIcon className={stl.msgIcon} />
              <img
                src={user.profileImg.img_url || userImg}
                className={stl.profileImg}
                style={
                  user.profileImg.img_url
                    ? { height: "2.7rem", width: "2.7rem" }
                    : { height: "2rem", width: "2rem", padding: ".4rem" }
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
