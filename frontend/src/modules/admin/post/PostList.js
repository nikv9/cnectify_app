import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { deletePostAction, getAllPostsAction } from "../../../redux/post_store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const PostList = () => {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const authState = useSelector((state) => state.auth);

  const columns = [
    { field: "_id", headerName: "Post Id", width: 250 },
    { field: "createdBy", headerName: "Created By", width: 200 },
    { field: "mediaType", headerName: "Media Type", width: 150 },
    { field: "createdAt", headerName: "Created Date", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <button
          className="px-3 py-1 bg-red-600 text-white text-sm rounded-sm"
          onClick={() => deletePostHandler(params.row._id)}
        >
          Delete
        </button>
      ),
    },
  ];

  const deletePostHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePostAction(id, authState.user?._id));
    }
  };

  // Transform posts for DataGrid
  const rows = postState.posts?.map((p) => ({
    _id: p._id,
    createdBy: p.userId?.name || "Unknown",
    mediaType: p.mediaType || "text",
    createdAt: new Date(p.createdAt).toLocaleDateString("en-GB"),
  }));

  useEffect(() => {
    dispatch(getAllPostsAction());
  }, [dispatch]);

  useEffect(() => {
    if (postState.success && !postState.success?.includes("fetched")) {
      toast.success(postState.success);
      dispatch(getAllPostsAction());
    }
  }, [postState.success, dispatch]);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows || []}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default PostList;
