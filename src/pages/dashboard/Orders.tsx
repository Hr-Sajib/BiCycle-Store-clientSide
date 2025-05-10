/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import { selectOrders, TOrder } from "@/redux/features/order/orderSlice";
import { useOutletContext } from "react-router-dom";

const Orders = () => {
  const orders = useSelector(selectOrders);
  const {openUpdateOrderModal } = useOutletContext<{
    openUpdateModal: (product: any) => void;
    closeUpdateModal: () => void;
    openAddModal: () => void;
    closeAddModal: () => void;
    openUpdateOrderModal: (order: TOrder) => void;
    closeUpdateOrderModal: () => void;
  }>();

  return (
    <div data-aos="fade-down" className="lg:!w-full w-[90vw]">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Orders</h2>
        <p className="text-center text-gray-300">You can go to All Products to add products and create an order</p>
      </div>
      {orders.length > 0 ? (
        <div className="overflow-x-auto mb-12">
          <table className="lg:!w-[70vw] mx-auto bg-white shadow-md rounded-lg overflow-hidden table-fixed">
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
              {orders.map((order) => (
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
      ) : (
        <p className="text-center text-gray-500 mt-4 mb-12">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;