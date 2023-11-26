import React from "react";
import style from "./Header.module.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  return (
    <div className={style.header}>
      <div className={style.left}>
        <Link to="/">
          <h3>social_verse</h3>
        </Link>
      </div>
      {user && (
        <>
          <div className={style.mid}>
            <div className={style.searchContainer}>
              <SearchIcon className={style.searchIcon} />
              <input type="text" placeholder="Search friends..." />
            </div>
          </div>
          <div className={style.right}>
            <div className={style.icons}>
              <NotificationsNoneIcon className={style.notifIcon} />
              <TelegramIcon className={style.msgIcon} />
              {user.profileImg.imgUrl ? (
                <Avatar
                  className={style.profileImg}
                  src={user.profileImg.imgUrl}
                />
              ) : (
                <Avatar className={style.profileImg} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
