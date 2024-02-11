import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const Header = () => {
  const auth = useSelector((state) => state.auth);

  const style = {
    container: {
      boxShadow: "0 .1rem .2rem rgb(0, 0, 0,.1)",
      borderBottom: "1px solid rgb(0, 0, 0, 0.1)",
    },

    icon: {
      fontSize: "2.7rem",
    },
  };

  return (
    <div
      className={
        "flex items-center justify-between w-full sticky top-0 bg-white h-16 z-10"
      }
      style={style.container}
    >
      <div className="pl-7">
        <Link to="/">
          <h3 className="primary_clr text-xl">social_verse</h3>
        </Link>
      </div>
      {auth.user && (
        <>
          <div>
            <div className="flex items-center border border-gray-300 rounded w-80 px-2 ">
              <SearchIcon className="text-gray-300 text-xl" />
              <input
                type="text"
                placeholder="Search friends..."
                className="w-full py-3 px-1 outline-none border-none text-sm"
              />
            </div>
          </div>
          <div className="pr-5">
            <div className="flex items-center gap-8">
              <NotificationsNoneIcon
                className="cursor-pointer text-gray-500 p-2.5 rounded-full bg-gray-200"
                style={style.icon}
              />
              <TelegramIcon
                className="cursor-pointer text-gray-500 p-2.5 rounded-full bg-gray-200"
                style={style.icon}
              />

              {auth.user.profileImg.imgUrl ? (
                <Avatar
                  className="bg-gray-200"
                  src={auth.user.profileImg.imgUrl}
                />
              ) : (
                <Avatar className="bg-gray-200" />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
