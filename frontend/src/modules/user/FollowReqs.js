import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendFollowReqAction, getUsersAction } from "../../redux/user_store";
import Spinner from "../../components/Spinner";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import userIcon from "../../assets/imgs/avatar.jpg";
import { toast } from "react-toastify";
import LoadingDots from "../../components/LoadingDots";

const FollowReqs = () => {
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [clickedUserId, setClickedUserId] = useState("");

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
    }
  }, [dispatch, userState.success]);

  console.log(userState);

  const sendFollowReqHandler = async (targetUserId) => {
    setIsLoading(true);
    setClickedUserId(targetUserId);
    await dispatch(
      sendFollowReqAction({ loggedinUserId: authState.user._id, targetUserId })
    );
    await dispatch(
      getUsersAction({
        userId: authState.user._id,
        searchType: "userSuggestions",
      })
    );
    setIsLoading(false);
  };

  return (
    <div className="flex-[4]">
      {userState.loading.suggestedUsers && isLoading === false ? (
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
              <div className="shadow-md" key={u._id}>
                {u.profileImg?.imgUrl ? (
                  <img
                    src={u.profileImg.imgUrl}
                    alt=""
                    className="h-[10rem] w-[10rem] object-cover"
                  />
                ) : (
                  <img
                    src={userIcon}
                    alt=""
                    className="h-[10rem] w-[10rem] object-cover"
                  />
                )}
                <div className="flex flex-col items-center gap-2 p-4 ">
                  <p>{u.name}</p>

                  {userState.loading.suggestedUsers &&
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

export default FollowReqs;
