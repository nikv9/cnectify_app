import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userIcon from "../../assets/imgs/avatar.jpg";
import {
  manageFollowRelationAction,
  getUserAction,
} from "../../redux/user_store";
import { useParams } from "react-router-dom";
import LoadingDots from "../../components/LoadingDots";

const Followings = () => {
  const userState = useSelector((state) => state.user);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const params = useParams();

  const [clickedUserId, setClickedUserId] = useState("");

  const manageFollowRelationHandler = async (targetUserId) => {
    setClickedUserId(targetUserId);
    await dispatch(
      manageFollowRelationAction({
        loggedinUserId: authState.user._id,
        targetUserId,
        action: "removeFollowing",
      })
    );
    await dispatch(getUserAction(params.id));
  };

  return (
    <div className="pt-10">
      {userState.user.followings.length === 0 ? (
        <div className="err_clr font-semibold">No followings !</div>
      ) : (
        <div className="flex flex-col gap-4">
          {userState.user.followings.map((u) => (
            <div className="flex items-center" key={`${u._id}_`}>
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
                {userState.loading.followUnfollow && clickedUserId === u._id ? (
                  <LoadingDots />
                ) : (
                  <button
                    className="globalBtn err_bg"
                    onClick={() => manageFollowRelationHandler(u._id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Followings;
