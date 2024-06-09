import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Followers from "./Followers";
import Followings from "./Followings";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { getProfileAction } from "../../redux/profile_store";
import userImg from "../../imgs/user.png";
import { getAllPostsByUserAction } from "../../redux/post_store";
import Posts from "./Posts";

const ProfileIdx = () => {
  const style = {
    activeTab: {
      borderBottom: "2px solid #007bff",
    },
  };

  const { user, loading } = useSelector((state) => state.profile);
  const { user: loggedinUser } = useSelector((state) => state.auth);
  const { userPosts } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  const params = useParams();
  // console.log(params);

  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    dispatch(getAllPostsByUserAction(params.id));
    dispatch(getProfileAction(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <Spinner color="gray" size="3rem" />
        </div>
      ) : (
        <>
          <div className="flex flex-[4] flex-col items-center p-3">
            <div className="flex gap-10 mt-5">
              <div>
                <img
                  src={
                    user?.profileImg && user?.profileImg.imgUrl
                      ? user.profileImg.imgUrl
                      : userImg
                  }
                  alt=""
                  className="rounded-full h-[10rem] w-[10rem] border border-gray-400 object-cover"
                />
              </div>
              <div className="pt-5">
                {/* <h3>{user.name}</h3> */}
                <div className="flex items-center gap-4 mt-4 ">
                  <span>{userPosts.length} Posts</span>
                  <span>{user?.followers.length} Followers</span>
                  <span>{user?.followings.length} Followings</span>
                </div>
                {user?._id === loggedinUser?._id && (
                  <div className="flex items-center gap-5 mt-5">
                    <button className="globalBtn primary_bg">
                      Edit Profile
                    </button>
                    <button className="globalBtn err_bg">
                      Change Password
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-7 border-t border-gray-400 w-[80%]">
              <div className="flex items-center justify-center gap-40">
                <p
                  className={
                    activeTab === 1
                      ? "primary_text tracking-wide font-bold p-[.7rem] cursor-pointer"
                      : ""
                  }
                  onClick={() => handleTabChange(1)}
                  style={{
                    ...(activeTab === 1 ? style.activeTab : {}),
                  }}
                >
                  POSTS
                </p>
                <p
                  className={
                    activeTab === 2
                      ? "primary_text tracking-wide font-bold"
                      : ""
                  }
                  onClick={() => handleTabChange(2)}
                  style={{
                    ...style.tab_heading,
                    ...(activeTab === 2 ? style.activeTab : {}),
                  }}
                >
                  FOLLOWERS
                </p>
                <p
                  className={
                    activeTab === 3
                      ? "primary_text tracking-wide font-bold"
                      : ""
                  }
                  onClick={() => handleTabChange(3)}
                  style={{
                    ...style.tab_heading,
                    ...(activeTab === 3 ? style.activeTab : {}),
                  }}
                >
                  FOLLOWINGS
                </p>
              </div>
              <div className={style.post}>
                {activeTab === 1 && <Posts />}
                {activeTab === 2 && <Followers />}
                {activeTab === 3 && <Followings />}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileIdx;
