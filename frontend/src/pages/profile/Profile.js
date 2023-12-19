import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import Header from "../../components/layout/Header";
import LeftBar from "../../components/layout/LeftBar";
import { useDispatch, useSelector } from "react-redux";
import userImg from "../../imgs/user.png";
import Followers from "../../components/profile/Followers";
import Followings from "../../components/profile/Followings";
import MyPosts from "../../components/profile/MyPosts";
import { useParams } from "react-router-dom";
import Loader from "../../components/layout/Loader";
import { getProfileAction } from "../../redux/profileStore";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.profile);
  const { user: loggedinUser } = useSelector((state) => state.auth);

  console.log(user);

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
          <Loader />
        </div>
      ) : (
        <>
          <Header />

          <div className={style.wrapper}>
            <LeftBar />

            <div className={style.profileContainer}>
              <div className={style.profileTop}>
                <div className={style.profile_top_left}>
                  <img
                    src={
                      user.profileImg && user.profileImg.imgUrl
                        ? user.profileImg.imgUrl
                        : userImg
                    }
                    alt=""
                  />
                </div>
                <div className={style.profile_top_right}>
                  {/* <h3>{user.name}</h3> */}
                  <div className={style.details}>
                    <span>10 Posts</span>
                    <span>110 Followers</span>
                    <span>10 Followings</span>
                  </div>
                  {user._id === loggedinUser._id && (
                    <div className={style.action_btn}>
                      <button>Edit Profile</button>
                      <button>Change Password</button>
                    </div>
                  )}
                </div>
              </div>
              <div className={style.profile_bottom}>
                <div className={style.post_header}>
                  <p
                    className={activeTab === 1 ? style.activeTab : ""}
                    onClick={() => handleTabChange(1)}
                  >
                    POSTS
                  </p>
                  <p
                    className={activeTab === 2 ? style.activeTab : ""}
                    onClick={() => handleTabChange(2)}
                  >
                    FOLLOWERS
                  </p>
                  <p
                    className={activeTab === 3 ? style.activeTab : ""}
                    onClick={() => handleTabChange(3)}
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
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
