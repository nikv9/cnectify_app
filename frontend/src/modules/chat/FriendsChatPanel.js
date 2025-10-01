import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import { logoutAction } from "../../redux/auth_store";
import SearchIcon from "@mui/icons-material/Search";
import userIcon from "../../assets/imgs/user1.png";
import Spinner from "../../components/Spinner";
import { getFriendsAction } from "../../redux/user_store";

const FriendsChatPanel = () => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  const searchFriendsHandler = (e) => {
    const inputVal = e.target.value;
    setSearchText(inputVal);
    dispatch(getFriendsAction(auth.user._id, inputVal, "followers"));
  };

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
    <div
      className="sticky top-16 bg-white overflow-y-scroll h-[calc(100vh-4rem)]"
      style={style.container}
    >
      <div className="flex items-center border border-b-gray-300 px-2">
        <SearchIcon className="text-gray-300 text-xl" />
        <input
          type="text"
          placeholder="Search friends..."
          className="w-full py-3 px-1 outline-none border-none text-sm"
          value={searchText}
          onChange={searchFriendsHandler}
        />
      </div>
      {user.users.length > 0 && searchText && (
        <div className="absolute top-12 p-2 bg-white shadow-md w-full flex flex-col gap-2">
          {user.loading ? (
            <div className="flex justify-center">
              <Spinner size="2rem" color="gray" />
            </div>
          ) : (
            user?.users.map((u) => (
              <div
                className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 p-2"
                key={u._id}
              >
                <img
                  src={u.profileImg?.imgUrl ? u.profileImg.imgUrl : userIcon}
                  alt=""
                  className="h-[2.5rem] w-[2.5rem] object-cover border-2 border-gray-300 rounded-full p-1"
                />
                <p>{u.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FriendsChatPanel;
