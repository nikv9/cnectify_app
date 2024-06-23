import React from "react";
import { useSelector } from "react-redux";
import userIcon from "../../imgs/user.png";

const Followings = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="pt-10">
      {user.profile.followings.length === 0 ? (
        <div className="err_text font-semibold">No followings !</div>
      ) : (
        <div className="flex flex-col gap-4">
          {user.profile.followings.map((u) => (
            <div className="flex">
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
              <div className="flex-[3]">
                <button className="globalBtn err_bg">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Followings;
