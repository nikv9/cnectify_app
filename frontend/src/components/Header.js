import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { getUsersAction } from "../redux/user_store";
import Spinner from "./Spinner";
import userIcon from "../assets/imgs/avatar.jpg";

const Header = () => {
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const searchUsersHandler = (e) => {
    const inputVal = e.target.value;
    setSearchText(inputVal);
    dispatch(
      getUsersAction({
        userId: authState.user._id,
        userName: inputVal,
        searchType: "userSuggestions",
      })
    );
  };

  const goToProfilePage = (userId) => {
    setSearchText("");
    navigate(`/profile/${userId}`);
  };

  return (
    <div
      className={
        "flex items-center justify-between w-full sticky top-0 bg-white h-16 z-10 shadow-md"
      }
    >
      <div className="pl-7">
        <Link to="/">
          <h3 className="primary_clr text-xl">cnectify</h3>
        </Link>
      </div>
      {authState.user && (
        <>
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded w-80 px-2 ">
              <SearchIcon className="text-gray-300 text-xl" />
              <input
                type="text"
                placeholder="Search friends..."
                className="w-full py-3 px-1 outline-none border-none text-sm"
                value={searchText}
                onChange={searchUsersHandler}
              />
            </div>
            {userState.suggestedUsersBySearch.length > 0 && searchText && (
              <div className="absolute top-12 p-2 bg-white shadow-md w-full flex flex-col gap-2">
                {userState.loading.suggestedUsersBySearch ? (
                  <div className="flex justify-center">
                    <Spinner size="2rem" color="gray" />
                  </div>
                ) : (
                  userState?.suggestedUsersBySearch.map((u) => (
                    <div
                      className="flex items-center gap-4 cursor-pointer hover:bg-gray-200 p-2"
                      onClick={() => goToProfilePage(u._id)}
                      key={u._id}
                    >
                      <img
                        src={
                          u.profileImg?.imgUrl ? u.profileImg.imgUrl : userIcon
                        }
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
          <div className="pr-5">
            <div className="flex items-center gap-8">
              <Link to="/chat">
                <TelegramIcon className="cursor-pointer text-gray-500 p-2.5 rounded-full bg-gray-200 !text-[2.5rem]" />
              </Link>

              <Link to={`/profile/${authState.user._id}`}>
                <Avatar
                  className="bg-gray-200"
                  src={authState.user?.profileImg?.imgUrl}
                />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
