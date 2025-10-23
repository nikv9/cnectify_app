import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendFollowReqAction,
  getUsersAction,
  clrUserStateMsg,
} from "../../redux/user_store";
import Spinner from "../../components/Spinner";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import userIcon from "../../assets/imgs/avatar.jpg";
import { toast } from "react-toastify";
import LoadingDots from "../../components/LoadingDots";

const FriendSuggestions = () => {
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [clickedUserId, setClickedUserId] = useState("");

  const sendFollowReqHandler = async (targetUserId) => {
    setClickedUserId(targetUserId);
    await dispatch(
      sendFollowReqAction({ loggedinUserId: authState.user._id, targetUserId })
    );
    await dispatch(
      getUsersAction({
        userId: authState.user._id,
        searchType: "userSuggested",
      })
    );
  };

  useEffect(() => {
    dispatch(
      getUsersAction({
        userId: authState.user._id,
        searchType: "userSuggested",
      })
    );
  }, [dispatch, authState.user._id]);

  useEffect(() => {
    if (userState.success) {
      toast.success(userState.success);
      dispatch(clrUserStateMsg());
    }
  }, [dispatch, userState.success]);

  return (
    <div className="flex-[4]">
      {userState.loading.suggestedUsers ? (
        <div className="flex items-center justify-center h-[100%]">
          <Spinner color="gray" size="3rem" />
        </div>
      ) : userState.suggestedUsers.length > 0 ? (
        <div className="flex flex-wrap gap-10 items-center p-4">
          {userState.suggestedUsers.map((u) => {
            const isReqSent = u.followReqsReceived?.includes(
              authState.user._id
            );
            return (
              <div
                className="shadow-md bg-white rounded-md w-[10rem]"
                key={u._id}
              >
                {u.profileImg?.imgUrl ? (
                  <img
                    src={u.profileImg.imgUrl}
                    alt=""
                    className="h-[8rem] w-[100%] object-cover"
                  />
                ) : (
                  <img
                    src={userIcon}
                    alt=""
                    className="h-[8rem] w-[100%] object-cover"
                  />
                )}
                <div className="flex flex-col items-center gap-2 py-1">
                  <p className="text-sm">{u.name}</p>

                  {userState.loading.sendFollowReq &&
                  clickedUserId === u._id ? (
                    <LoadingDots />
                  ) : (
                    <button
                      className={`flex gap-2 globalBtn justify-center items-center p-2 w-full ${
                        isReqSent
                          ? "bg-red-100 !text-red-600 !cursor-not-allowed"
                          : "bg-blue-100 !text-[#1b49e1]"
                      }`}
                      onClick={() => sendFollowReqHandler(u._id)}
                      disabled={isReqSent}
                    >
                      {!isReqSent && <PersonAddAltIcon />}
                      {isReqSent ? "Request Sent" : "Follow"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="err_clr font-semibold text-center pt-10">
          No user found!
        </div>
      )}
    </div>
  );
};

export default FriendSuggestions;
