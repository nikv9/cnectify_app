import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Followers from "./Followers";
import Followings from "./Followings";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import userImg from "../../imgs/user.png";
import { getAllPostsByUserAction } from "../../redux/post_store";
import Posts from "./Posts";
import {
  followUnfollowUserAction,
  getUserDetailsAction,
} from "../../redux/user_store";
import LoadingDots from "../../components/LoadingDots";

const ProfileIdx = () => {
  const { profile, loading } = useSelector((state) => state.user);
  const { user: loggedinUser } = useSelector((state) => state.auth);
  const { userPosts } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  // console.log(params);

  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const initializeProfile = async () => {
      setIsLoading(true);
      await dispatch(getAllPostsByUserAction(params.id));
      await dispatch(getUserDetailsAction(params.id));
      setIsLoading(false);
    };
    initializeProfile();
  }, [dispatch, params.id]);

  const followUnfollowUserHandler = async (targetUserId) => {
    await dispatch(followUnfollowUserAction(loggedinUser._id, targetUserId));
    await dispatch(getUserDetailsAction(params.id));
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
                  profile?.profileImg && profile?.profileImg.imgUrl
                    ? profile.profileImg.imgUrl
                    : userImg
                }
                alt=""
                className="rounded-full h-[10rem] w-[10rem] border border-gray-400 object-cover"
              />
            </div>
            <div className="pt-5">
              <h3>{profile?.name}</h3>
              <div className="flex items-center gap-4 mt-4 ">
                <span>{userPosts.length} Posts</span>
                <span>{profile?.followers.length} Followers</span>
                <span>{profile?.followings.length} Followings</span>
              </div>
              {profile?._id === loggedinUser?._id ? (
                <div className="flex items-center gap-5 mt-5">
                  <button className="globalBtn primary_bg">Edit Profile</button>
                  <button className="globalBtn err_bg">Change Password</button>
                </div>
              ) : profile?.followers.some((u) => u._id === loggedinUser._id) ? (
                <button
                  className="globalBtn err_bg mt-5"
                  onClick={() => followUnfollowUserHandler(profile?._id)}
                >
                  {loading ? <LoadingDots /> : "Unfollow"}
                </button>
              ) : (
                <button
                  className="globalBtn primary_bg mt-5"
                  onClick={() => followUnfollowUserHandler(profile?._id)}
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
                  "primary_text tracking-wide font-bold border-b-2 border-[#007bff]"
                } cursor-pointer px-4 py-2`}
                onClick={() => handleTabChange(1)}
              >
                POSTS
              </p>
              <p
                className={`${
                  activeTab === 2 &&
                  "primary_text tracking-wide font-bold border-b-2 border-[#007bff]"
                } cursor-pointer px-4 py-2`}
                onClick={() => handleTabChange(2)}
              >
                FOLLOWERS
              </p>
              <p
                className={`${
                  activeTab === 3 &&
                  "primary_text tracking-wide font-bold border-b-2 border-[#007bff]"
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

export default ProfileIdx;
