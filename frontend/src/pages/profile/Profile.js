import React, { useEffect, useState } from "react";
import stl from "./Profile.module.css";
import Header from "../../components/layout/Header";
import LeftBar from "../../components/home/LeftBar";
import { useDispatch, useSelector } from "react-redux";
import userImg from "../../assets/user.png";
import Followers from "../../components/profile/Followers";
import Followings from "../../components/profile/Followings";
import MyPosts from "../../components/profile/MyPosts";
import { useParams } from "react-router-dom";
import { getProfileAction } from "../../redux/actions/profile_action";
import Loader from "../../components/layout/Loader";

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
        <div className={stl.container}>
          <Header />

          <div className={stl.wrapper}>
            <LeftBar />

            <div className={stl.profile}>
              <div className={stl.profile_top}>
                <div className={stl.profile_top_left}>
                  <img
                    src={
                      user.profileImg && user.profileImg.img_url
                        ? user.profileImg.img_url
                        : userImg
                    }
                    alt=""
                  />
                </div>
                <div className={stl.profile_top_right}>
                  {/* <h3>{user.name}</h3> */}
                  <div className={stl.details}>
                    <span>10 Posts</span>
                    <span>110 Followers</span>
                    <span>10 Followings</span>
                  </div>
                  {user._id === loggedinUser._id && (
                    <div className={stl.action_btn}>
                      <button>Edit Profile</button>
                      <button>Change Password</button>
                    </div>
                  )}
                </div>
              </div>
              <div className={stl.profile_bottom}>
                <div className={stl.post_header}>
                  <p
                    className={activeTab === 1 ? stl.activeTab : ""}
                    onClick={() => handleTabChange(1)}
                  >
                    POSTS
                  </p>
                  <p
                    className={activeTab === 2 ? stl.activeTab : ""}
                    onClick={() => handleTabChange(2)}
                  >
                    FOLLOWERS
                  </p>
                  <p
                    className={activeTab === 3 ? stl.activeTab : ""}
                    onClick={() => handleTabChange(3)}
                  >
                    FOLLOWINGS
                  </p>
                </div>
                <div className={stl.post}>
                  {activeTab === 1 && <MyPosts />}
                  {activeTab === 2 && <Followers />}
                  {activeTab === 3 && <Followings />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
