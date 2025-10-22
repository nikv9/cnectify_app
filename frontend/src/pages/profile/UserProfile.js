import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Followers from "../../modules/profile/Followers";
import Followings from "../../modules/profile/Followings";
import Posts from "../../modules/profile/Posts";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import defaultUserImg from "../../assets/imgs/avatar.jpg";
import {
  sendFollowReqAction,
  getUserAction,
  getUserPostsAction,
} from "../../redux/user_store";
import LoadingDots from "../../components/LoadingDots";

const UserProfile = () => {
  const { user, loading } = useSelector((state) => state.user);
  const { user: loggedinUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const navigateEditProfile = () => {
    navigate(`/profile/edit?id=${params.id}`);
  };

  useEffect(() => {
    const initializeProfile = async () => {
      setIsLoading(true);
      await dispatch(getUserPostsAction(params.id));
      await dispatch(getUserAction());
      setIsLoading(false);
    };
    initializeProfile();
  }, [dispatch, params.id]);

  const sendFollowReqHandler = async (targetUserId) => {
    await dispatch(
      sendFollowReqAction({ loggedinUserId: loggedinUser._id, targetUserId })
    );
    await dispatch(getUserAction());
  };

  return (
    <div className="flex flex-[4] flex-col items-center p-3">
      {isLoading ? (
        <div className="flex items-center justify-center h-[100%]">
          <Spinner color="gray" size="3rem" />
        </div>
      ) : (
        <>
          <div className="flex gap-10 mt-5">
            <div>
              <img
                src={
                  user?.profileImg && user?.profileImg.imgUrl
                    ? user.profileImg.imgUrl
                    : defaultUserImg
                }
                alt=""
                className="rounded-full h-[10rem] w-[10rem] border border-gray-400 object-cover"
              />
            </div>
            <div className="pt-5">
              <h3>{user?.name}</h3>
              <div className="flex items-center gap-4 mt-4 ">
                <span>{user?.userPosts?.length} Posts</span>
                <span>{user?.followers.length} Followers</span>
                <span>{user?.followings.length} Followings</span>
              </div>
              {user?._id === loggedinUser?._id ? (
                <div className="flex items-center gap-5 mt-5">
                  <button
                    className="globalBtn err_bg"
                    onClick={navigateEditProfile}
                  >
                    Edit Profile
                  </button>
                </div>
              ) : user?.followers.some((u) => u._id === loggedinUser._id) ? (
                <button
                  className="globalBtn err_bg mt-5"
                  onClick={() => sendFollowReqHandler(user?._id)}
                >
                  {loading ? <LoadingDots /> : "Unfollow"}
                </button>
              ) : (
                <button
                  className="globalBtn primary_bg mt-5"
                  onClick={() => sendFollowReqHandler(user?._id)}
                >
                  {loading ? <LoadingDots /> : "Follow"}
                </button>
              )}
            </div>
          </div>
          <div className="mt-7 border-t border-gray-400 w-[80%]">
            <div className="flex items-center justify-center gap-40 p-[.7rem]">
              <p
                className={`${
                  activeTab === 1 &&
                  "primary_clr tracking-wide font-bold border-b-2 border-[#007bff]"
                } cursor-pointer px-4 py-2`}
                onClick={() => handleTabChange(1)}
              >
                POSTS
              </p>
              <p
                className={`${
                  activeTab === 2 &&
                  "primary_clr tracking-wide font-bold border-b-2 border-[#007bff]"
                } cursor-pointer px-4 py-2`}
                onClick={() => handleTabChange(2)}
              >
                FOLLOWERS
              </p>
              <p
                className={`${
                  activeTab === 3 &&
                  "primary_clr tracking-wide font-bold border-b-2 border-[#007bff]"
                } cursor-pointer px-4 py-2`}
                onClick={() => handleTabChange(3)}
              >
                FOLLOWINGS
              </p>
            </div>
            <div className="">
              {activeTab === 1 && <Posts />}
              {activeTab === 2 && <Followers />}
              {activeTab === 3 && <Followings />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
