import React, { useEffect, useState } from "react";
import { TOrder } from "@/redux/features/order/orderSlice";
import {
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "@/redux/features/order/orderApi";
import { toast } from "sonner";
import AOS from "aos";
import "aos/dist/aos.css";


interface UpdateOrderModalProps {
  order: TOrder;
  onClose: () => void;
}

const UpdateOrderModal: React.FC<UpdateOrderModalProps> = ({ order, onClose }) => {
     useEffect(() => {
         AOS.init({
              duration: 600,
              once: true,
              offset: 20,
            });
      }, []);

  const [formData, setFormData] = useState({
    userEmail: order.userEmail,
    totalPrice: order.totalPrice,
    address: order.address,
    contactNumber: order.contactNumber,
    status: order.status,
  });

  const { refetch } = useGetAllOrdersQuery(); // Add refetch for getAllOrders
  const [updateOrder, { isLoading: isUpdating, error: updateError }] = useUpdateOrderMutation();
  const [deleteOrder, { isLoading: isDeleting, error: deleteError }] = useDeleteOrderMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalPrice" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateOrder({
        orderId: order._id,
        data: formData,
      }).unwrap();
      console.log("Order updated successfully:", response.data);
      toast("✅ Order updated successfully.");
      await refetch(); // Refetch the orders list
      onClose(); // Close modal after refetch
    } catch (err) {
      console.error("Failed to update order:", err);
      toast("❌ Order update error!");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteOrder(order._id).unwrap();
      console.log("Order deleted successfully");
      toast("🗑️ Order deleted successfully.");
      await refetch(); // Refetch the orders list
      onClose(); // Close modal after refetch
    } catch (err) {
      console.error("Failed to delete order:", err);
      toast("❌ Order deletion error!");
    }
  };

  return (
    <div data-aos="zoom-in" className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">User Email</label>
            <input
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Total Price</label>
            <input
              type="number"
              name="totalPrice"
              value={formData.totalPrice}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              step="0.01"
              min="0"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
              <option value="progressing">Progressing</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>

          {updateError && (
            <p className="text-red-500 mb-4">Update Error: {JSON.stringify(updateError)}</p>
          )}
          {deleteError && (
            <p className="text-red-500 mb-4">Delete Error: {JSON.stringify(deleteError)}</p>
          )}

          <div className="flex justify-between items-center space-x-2">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting || isUpdating}
              className={`py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 ${
                isDeleting || isUpdating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating || isDeleting}
                className={`py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
                  isUpdating || isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateOrderModal;