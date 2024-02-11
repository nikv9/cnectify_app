import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Followers from "./Followers";
import Followings from "./Followings";
import MyPosts from "./MyPosts";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { getProfileAction } from "../../redux/profile_store";
import userImg from "../../imgs/user.png";

const ProfileIdx = () => {
  const { user, loading } = useSelector((state) => state.profile);
  const { user: loggedinUser } = useSelector((state) => state.auth);

  console.log(loading);

  const dispatch = useDispatch();

  const params = useParams();
  // console.log(params);

  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    dispatch(getProfileAction(params.id));
  }, [dispatch, params.id]);

  const style = {
    container: {
      flex: "4",
    },
    profile_tab_container: {
      width: "80%",
    },
    tab_heading: {
      padding: ".7rem",
      cursor: "pointer",
    },
    activeTab: {
      borderBottom: "2px solid #007bff",
    },
  };

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
          <div
            className="flex flex-col items-center p-3"
            style={style.container}
          >
            <div className="flex gap-10 mt-5">
              <div>
                <img
                  src={userImg}
                  alt=""
                  className="h-40 w-40 border border-gray-300 rounded-full object-cover"
                />
                {/* <img
                    src={
                      user.profileImg && user.profileImg.imgUrl
                        ? user.profileImg.imgUrl
                        : userImg
                    }
                    alt=""
                  /> */}
              </div>
              <div className="pt-5">
                {/* <h3>{user.name}</h3> */}
                <div className="flex items-center gap-4 mt-4 ">
                  <span>10 Posts</span>
                  <span>110 Followers</span>
                  <span>10 Followings</span>
                </div>
                {/* {user._id === loggedinUser._id && (
                    <div className='flex items-center gap-5 mt-5'>
                      <button className='globalBtn primary_bg_clr'>Edit Profile</button>
                      <button className='globalBtn err_bg_clr'>Change Password</button>
                    </div>
                  )} */}
              </div>
            </div>
            <div
              className="mt-7 border-t border-gray-400"
              style={style.profile_tab_container}
            >
              <div className="flex items-center justify-center gap-40">
                <p
                  className={
                    activeTab === 1 ? "primary_clr tracking-wide font-bold" : ""
                  }
                  onClick={() => handleTabChange(1)}
                  style={{
                    ...style.tab_heading,
                    ...(activeTab === 1 ? style.activeTab : {}),
                  }}
                >
                  POSTS
                </p>
                <p
                  className={
                    activeTab === 2 ? "primary_clr tracking-wide font-bold" : ""
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
                    activeTab === 3 ? "primary_clr tracking-wide font-bold" : ""
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
                {activeTab === 1 && <MyPosts />}
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
