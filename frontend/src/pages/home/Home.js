import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAction } from "../../redux/post_store";
import MetaData from "../../components/MetaData";
import CreatePost from "../../modules/home/CreatePost";
import Post from "../../modules/home/Post";

const Home = () => {
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPostsAction(page));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    if (newPage !== page && newPage > 0 && newPage <= post.totalPages) {
      setPage(newPage);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const totalPagesToShow = 5;

    if (post.totalPages <= totalPagesToShow + 1) {
      for (let i = 1; i <= post.totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={page === i}
            className={`px-4 py-2 rounded-md ${
              page === i ? "bg-black" : "bg-gray-700"
            } text-white`}
          >
            {i}
          </button>
        );
      }
    } else {
      for (let i = 1; i <= totalPagesToShow; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={page === i}
            className={`p-2 rounded-md ${
              page === i ? "bg-black" : "bg-gray-700"
            } text-white`}
          >
            {i}
          </button>
        );
      }
      pages.push(
        <span key="dots" className="bg-gray-800 text-white p-2 rounded-md">
          ...
        </span>
      );
      pages.push(
        <button
          key={post.totalPages}
          onClick={() => handlePageChange(post.totalPages)}
          disabled={page === post.totalPages}
          className={`p-2 rounded-md ${
            page === post.totalPages ? "bg-black" : "bg-gray-700"
          } text-white`}
        >
          {post.totalPages}
        </button>
      );
    }

    return pages;
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
            {post?.posts?.map((item) => (
              <Post post={item} key={item._id} />
            ))}
          </div>
          <div className="flex justify-between items-center px-2 mt-5">
            <div className="flex gap-1">
              {renderPagination()}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === post.totalPages}
                className="bg-gray-700 text-white p-2 rounded-md"
              >
                Next
              </button>
            </div>
            <div>
              Page {page} of {post.totalPages}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
