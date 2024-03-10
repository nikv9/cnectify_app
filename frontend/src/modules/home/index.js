import React, { useEffect } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import RightBar from "./RightBar";
import MetaData from "../../components/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsAction } from "../../redux/post_store";

const HomeIdx = () => {
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const getPosts = () => {
    dispatch(getAllPostsAction());
  };

  useEffect(() => {
    getPosts();
  }, [dispatch]);

  const style = {
    container: {
      flex: "4",
    },
    feed: {
      flex: "4",
    },
    rightbar: {
      flex: "1",
    },
  };

  return (
    <>
      <MetaData title="sv - Home" />
      <div className="flex flex-wrap p-5" style={style.container}>
        {/* feed  */}
        <div className="" style={style.feed}>
          <CreatePost />
          <div className="postContainer">
            {post?.posts.map((item) => {
              return <Post post={item} key={item._id} />;
            })}
          </div>
        </div>

        {/* rightbar  */}
        <div className="" style={style.rightbar}>
          <RightBar />
        </div>
      </div>
    </>
  );
};

export default HomeIdx;
