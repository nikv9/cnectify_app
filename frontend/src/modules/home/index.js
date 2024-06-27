import React, { useEffect, useState } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import RightBar from "./RightBar";
import MetaData from "../../components/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsAction } from "../../redux/post_store";

const HomeIdx = () => {
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllPostsAction(page));
  }, [dispatch, page]);

  const handleNextPage = () => {
    if (page < post.totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

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
          <div>
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={page === post.totalPages}
            >
              Next
            </button>
            <p>
              Page {page} of {post.totalPages}
            </p>
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
