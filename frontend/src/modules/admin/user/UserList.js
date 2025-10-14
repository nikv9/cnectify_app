import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteUserAction, getUsersAction } from "../../../redux/user_store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

const UserList = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const columns = [
    { id: 1, headerName: "Name" },
    { id: 2, headerName: "Email" },
    { id: 3, headerName: "Role" },
    { id: 4, headerName: "Actions" },
  ];

  const editUserHandler = (id) => {
    navigate(`/user?id=${id}&mode=edit`);
  };

  const deleteUserHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserAction(id));
    }
  };

  const handlePageChange = (newPage) => {
    if (
      newPage !== currentPage &&
      newPage > 0 &&
      newPage <= userState.users?.totalPages
    ) {
      setCurrentPage(newPage);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const totalPagesToShow = 5;
    const totalPages = userState.users?.totalPages || 1;

    if (totalPages <= totalPagesToShow + 1) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={currentPage === i}
            className={`px-4 py-2 rounded-md ${
              currentPage === i ? "bg-black" : "bg-gray-600"
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
            disabled={currentPage === i}
            className={`px-2 py-1 rounded-md ${
              currentPage === i ? "bg-black" : "bg-gray-600"
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
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 rounded-md ${
            currentPage === totalPages ? "bg-black" : "bg-gray-600"
          } text-white`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  const perPageChangeHandler = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const exportToExcel = () => {
    const data = userState.users?.users?.map((u) => ({
      Name: u.name,
      Email: u.email,
      Role: u.role,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "users.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("User List", 14, 10);

    const tableData = userState.users?.users?.map((u) => [
      u.name,
      u.email,
      u.role,
    ]);

    autoTable(doc, {
      head: [["Name", "Email", "Role"]],
      body: tableData,
      startY: 20,
    });

    doc.save("users.pdf");
  };

  useEffect(() => {
    dispatch(getUsersAction({ currentPage: currentPage, perPage: perPage }));
  }, [dispatch, currentPage, perPage]);

  useEffect(() => {
    if (userState.success) {
      toast.success(userState.success);
      dispatch(getUsersAction({ currentPage: currentPage, perPage: perPage }));
    }
  }, [dispatch, userState.success, currentPage, perPage]);

  return (
    <div className="overflow-x-auto border border-gray-200">
      <div className="flex gap-2 mb-3">
        <button
          onClick={exportToExcel}
          className="bg-blue-600 text-white px-3 py-1 rounded-sm text-xs"
        >
          Export Excel
        </button>
        <button
          onClick={exportToPDF}
          className="bg-red-600 text-white px-3 py-1 rounded-sm text-xs"
        >
          Download PDF
        </button>
      </div>

      <table className="min-w-full shadow-md rounded-lg overflow-hidden">
        <thead className="bg-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col.id}
                className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                {col.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {userState.users?.users?.length > 0 ? (
            userState.users?.users?.map((u) => (
              <tr key={u._id}>
                <td className="px-6 py-2 whitespace-nowrap text-sm">
                  {u.name}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm">
                  {u.email}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm">
                  {u.role}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => editUserHandler(u._id)}
                      className="px-3 py-1 bg-teal-600 text-white text-sm rounded-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUserHandler(u._id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center px-2 mt-5">
        <div className="flex gap-1 !text-xs">
          {renderPagination()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === userState.users?.totalPages}
            className="bg-gray-600 text-white p-2 rounded-md "
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs">
          Page {currentPage} of {userState.users?.totalPages || 1}
          <div>
            <label className="mr-2 text-xs">Per page:</label>
            <select
              value={perPage}
              onChange={perPageChangeHandler}
              className="p-1 border rounded-sm text-xs outline-none"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
