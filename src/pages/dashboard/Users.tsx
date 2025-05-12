/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import { selectAllUsers } from "@/redux/features/user/allUserSlice";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

const Users = () => {
  const users = useSelector(selectAllUsers);
  const {
    handleToggleStatus,
    isToggling,
  } = useOutletContext<{
    handleToggleStatus: (userId: string) => void;
    isToggling: boolean;
    openUpdateModal: (product: any) => void;
    closeUpdateModal: () => void;
    openAddModal: () => void;
    closeAddModal: () => void;
    openUpdateOrderModal: (order: any) => void;
    closeUpdateOrderModal: () => void;
  }>();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of users per page

  // Calculate pagination details
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
  };

  // Generate page numbers for display
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="lg:!w-full w-[90vw]" data-aos="fade-right">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Users</h2>
      {users.length > 0 ? (
        <>
          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden table-fixed">
              <thead className="bg-gray-200">
                <tr>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="w-2/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="w-1/5 py-3 px-4 text-sm text-gray-600 truncate">{user.name}</td>
                    <td className="w-2/5 py-3 px-4 text-sm text-gray-600 truncate">{user.email}</td>
                    <td className="w-1/5 py-3 px-4 text-sm text-gray-600 truncate">{user.status}</td>
                    <td className="w-1/5 py-3 px-4 text-sm text-gray-600">
                      <button
                        onClick={() => handleToggleStatus(user._id)}
                        disabled={isToggling}
                        className={`py-1 px-3 rounded-sm text-white font-semibold whitespace-nowrap ${
                          user.status === "active"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        } ${isToggling ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {isToggling
                          ? "Toggling..."
                          : user.status === "active"
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-2">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentPage === number
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md w-24 text-sm font-medium ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>

          {/* Page Info */}
          <p className="text-sm text-gray-600 mt-2 text-center">
            Showing {startIndex + 1} to {Math.min(endIndex, totalUsers)} of {totalUsers} users
          </p>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-4 mb-12">No users found.</p>
      )}
    </div>
  );
};

export default Users;