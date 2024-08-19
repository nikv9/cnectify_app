import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { deleteUserAction, getAllUsersAction } from "../../../redux/user_store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UsersTable = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "role", headerName: "Role", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <>
          <div className="flex gap-4 items-center h-full">
            <button
              className="px-4 h-9 flex items-center bg-teal-600 text-white rounded-md"
              onClick={() => editUserHandler(params.row._id)}
            >
              Edit
            </button>

            <button
              className="px-4 h-9 flex items-center bg-red-600 text-white rounded-md"
              onClick={() => deleteUserHandler(params.row._id)}
            >
              Delete
            </button>
          </div>
        </>
      ),
    },
  ];

  const editUserHandler = (id) => {
    navigate(`/user?id=${id}&mode=edit`);
  };

  const deleteUserHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await dispatch(deleteUserAction(id));
      dispatch(getAllUsersAction());
    }
  };

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);

  useEffect(() => {
    if (user.success) {
      toast.success(user.success);
    }
  }, [user.success]);

  return (
    <DataGrid
      columns={columns}
      rows={user?.users}
      getRowId={(row) => row._id}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  );
};

export default UsersTable;
