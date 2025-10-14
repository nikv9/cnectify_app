import React from "react";
import { useSelector } from "react-redux";
import userIcon from "../../assets/imgs/user.png";

const Followers = () => {
  const userState = useSelector((state) => state.user);

  return (
    <div className="pt-10">
      {userState.user.followers.length === 0 ? (
        <div className="err_text font-semibold">No followers !</div>
      ) : (
        <div className="flex flex-col gap-4">
          {userState.user.followers.map((u) => (
            <div className="flex items-center gap-4 flex-[2]">
              {u.profileImg?.imgUrl ? (
                <img
                  src={u.profileImg.imgUrl}
                  alt=""
                  className="h-[2.5rem] w-[2.5rem] object-cover border-2 border-gray-300 rounded-full p-1"
                />
              ) : (
                <img
                  src={userIcon}
                  alt=""
                  className="h-[2.5rem] w-[2.5rem] object-cover border-2 border-gray-300 rounded-full p-1"
                />
              )}
              <span>{u.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Followers;
