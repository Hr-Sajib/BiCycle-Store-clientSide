/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import { selectOrders, TOrder } from "@/redux/features/order/orderSlice";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

const Orders = () => {
  const orders = useSelector(selectOrders);
  const { openUpdateOrderModal } = useOutletContext<{
    openUpdateModal: (product: any) => void;
    closeUpdateModal: () => void;
    openAddModal: () => void;
    closeAddModal: () => void;
    openUpdateOrderModal: (order: TOrder) => void;
    closeUpdateOrderModal: () => void;
  }>();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of orders per page

  // Calculate pagination details
  const totalOrders = orders.length;
  const totalPages = Math.ceil(totalOrders / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

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
    <div data-aos="fade-right" className="lg:!w-full w-[90vw]">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Orders</h2>
      </div>
      {orders.length > 0 ? (
        <>
          {/* Orders Table */}
          <div className="overflow-x-auto mb-12">
            <table className="lg:!w-full w-[90vw] mx-auto bg-white shadow-md rounded-lg overflow-hidden table-fixed">
              <thead className="bg-gray-200">
                <tr>
                  <th className="w-2/6 py-3 px-4 text-left text-sm font-semibold text-gray-700">User Email</th>
                  <th className="w-1/6 py-3 px-4 text-left text-sm font-semibold text-gray-700">Total Price</th>
                  <th className="w-1/6 py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="w-1/6 py-3 px-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                  <th className="w-1/6 py-3 px-4 text-left text-sm font-semibold text-gray-700">Update</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="w-2/6 py-3 px-4 text-sm text-gray-600 truncate">{order.userEmail}</td>
                    <td className="w-1/6 py-3 px-4 text-sm text-gray-600">${order.totalPrice.toFixed(2)}</td>
                    <td className="w-1/6 py-3 px-4 text-sm text-gray-600">{order.status}</td>
                    <td className="w-1/6 py-3 px-4 text-sm text-gray-600 truncate">{order.contactNumber}</td>
                    <td className="w-1/6 py-3 px-4 text-sm text-gray-600">
                      <button
                        onClick={() => openUpdateOrderModal(order)}
                        className="py-1 px-3 rounded-sm text-white font-semibold bg-blue-500 hover:bg-blue-600 whitespace-nowrap"
                      >
                        Update
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
              className={`px-4 py-2 rounded-md text-sm w-24 font-medium ${
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
            Showing {startIndex + 1} to {Math.min(endIndex, totalOrders)} of {totalOrders} orders
          </p>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-4 mb-12">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;