import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAction } from "../../redux/post_store";
import MetaData from "../../components/MetaData";
import CreatePost from "../../modules/home/CreatePost";
import Post from "../../modules/home/Post";
import Spinner from "../../components/Spinner";

const Home = () => {
  const postState = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPostsAction(page));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    if (newPage !== page && newPage > 0 && newPage <= postState.totalPages) {
      setPage(newPage);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const totalPagesToShow = 5;

    if (postState.totalPages <= totalPagesToShow + 1) {
      for (let i = 1; i <= postState.totalPages; i++) {
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
          key={postState.totalPages}
          onClick={() => handlePageChange(postState.totalPages)}
          disabled={page === postState.totalPages}
          className={`p-2 rounded-md ${
            page === postState.totalPages ? "bg-black" : "bg-gray-700"
          } text-white`}
        >
          {postState.totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <>
      <MetaData title="sv - Home" />
      <div className="flex flex-wrap flex-[4] p-5">
        {/* feed  */}
        <div className="w-full">
          <CreatePost />

          {postState.loading.getPosts ? (
            <div className="flex items-center justify-center h-[50vh]">
              <Spinner color="crimson" size="3rem" />
            </div>
          ) : (
            <>
              <div className="postContainer">
                {postState?.posts?.map((item) => (
                  <Post post={item} key={item._id} />
                ))}
              </div>
              <div className="flex justify-between items-center px-2 mt-5">
                <div className="flex gap-1">
                  {renderPagination()}
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === postState.totalPages}
                    className="bg-gray-700 text-white p-2 rounded-md"
                  >
                    Next
                  </button>
                </div>
                <div>
                  Page {page} of {postState.totalPages}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
