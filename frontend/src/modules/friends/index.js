import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followUnfollowUserAction,
  getFriendsAction,
} from "../../redux/user_store";
import Spinner from "../../components/Spinner";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import userIcon from "../../imgs/user.png";
import { setUser, updateUserChanges } from "../../redux/auth_store";
import { toast } from "react-toastify";

const FriendsIdx = () => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getFriendsAction(auth.user._id));
  }, [dispatch, auth.user._id]);

  useEffect(() => {
    if (user.user) {
      const updateChanges = async () => {
        await dispatch(updateUserChanges(user.user));
      };
      updateChanges();
    }
    if (user.success) {
      toast.success(user.success);
    }
  }, [dispatch, user]);

  const followUnfollowUserHandler = async (targetUserId) => {
    setIsLoading(true);
    await dispatch(followUnfollowUserAction(auth.user._id, targetUserId));
    setIsLoading(false);
  };

  return (
    <div className="flex-[4]">
      {user.loading && isLoading === false ? (
        <div className="flex items-center justify-center h-[100%]">
          <Spinner color="gray" size="3rem" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-10 items-center p-4">
          {user.users.map((u) => (
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

                {auth.user.followings.includes(u._id) ? (
                  <p className="err_text font-semibold">Following</p>
                ) : (
                  <button
                    className="flex gap-2 globalBtn justify-center items-center bg-blue-100 !text-[#1b49e1] p-2 w-full"
                    onClick={() => followUnfollowUserHandler(u._id)}
                  >
                    <PersonAddAltIcon />
                    Follow
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

export default FriendsIdx;
