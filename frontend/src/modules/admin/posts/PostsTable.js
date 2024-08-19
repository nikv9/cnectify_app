import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { getAllPostsAction } from "../../../redux/post_store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostsTable = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const navigate = useNavigate();

  const columns = [
    { id: 1, headerName: "Post Id" },
    { id: 2, headerName: "Created By" },
    { id: 3, headerName: "Media Type" },
    { id: 4, headerName: "Created Date" },
    { id: 5, headerName: "Actions" },
  ];

  const editPostHandler = (id) => {
    navigate(`/post?id=${id}&mode=edit`);
  };

  const deletePostHandler = async (id) => {
    console.log(id);
    // if (window.confirm("Are you sure you want to delete this user?")) {
    //   // await dispatch(deleteUserAction(id));
    //   dispatch(getAllPostsAction());
    // }
  };

  useEffect(() => {
    dispatch(getAllPostsAction());
  }, [dispatch]);

  useEffect(() => {
    if (post.success) {
      toast.success(post.success);
    }
  }, [post.success]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            {columns.map((i) => (
              <th
                key={i.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                {i.headerName}
              </th>
            ))}
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {post.posts.length > 0 ? (
            post.posts.map((post) => (
              <tr key={post._id}>
                <td className="px-6 py-4 whitespace-nowrap">{post._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {post?.userId.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {post.mediaType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(post.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td className=" ">
                  <div className="flex gap-4 items-center whitespace-nowrap">
                    <button
                      onClick={() => deletePostHandler(post._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => editPostHandler(post._id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                No posts available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PostsTable;
