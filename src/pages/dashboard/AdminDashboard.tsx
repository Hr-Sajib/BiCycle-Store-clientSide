import { useGetAllUsersQuery, useToggleUserStatusMutation } from "@/redux/features/user/allUserApi"; // Adjust path
import { selectAllUsers, setAllUsers, deactivateUser } from "@/redux/features/user/allUserSlice"; // Adjust path
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateProductModal from "./UpdateProductModal";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { setProducts, TProduct } from "@/redux/features/products/productSlice";
import AddProductModal from "./AddProductModal";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { setOrders, TOrder } from "@/redux/features/order/orderSlice";
import UpdateOrderModal from "./UpdateOrderModal";
import { toast } from "sonner";


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers); // Read users from Redux store

  // Fetch all users using RTK Query
  const { data: userData, isLoading: isUsersLoading, error: userError } = useGetAllUsersQuery();

  // Fetch all products using RTK Query
  const { data: productData, isLoading: isProductsLoading, error: productError } = useGetAllProductsQuery();

  // Fetch all orders using RTK Query
  const { data: orderData, isLoading: isOrdersLoading, error: orderError } = useGetAllOrdersQuery();

  // Toggle user status mutation
  const [toggleUserStatus, { isLoading: isToggling }] = useToggleUserStatusMutation();

  // State for modals
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null); // For Update Product modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // For Add Product modal
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null); // For Update Order modal

  // Set fetched users into Redux store when data is available
  useEffect(() => {
    if (userData?.success && userData.data) {
      dispatch(setAllUsers(userData.data));
    }
  }, [userData, dispatch]);

  // Set fetched products into Redux store when data is available
  useEffect(() => {
    if (productData?.success && productData.data) {
      dispatch(setProducts(productData.data));
    }
  }, [productData, dispatch]);

  // Set fetched orders into Redux store when data is available
  useEffect(() => {
    if (orderData?.success && orderData.data) {
      dispatch(setOrders(orderData.data));
    }
  }, [orderData, dispatch]);

  // Handle toggle status
  const handleToggleStatus = async (userId: string) => {
    try {
      dispatch(deactivateUser(userId));
      const response = await toggleUserStatus(userId).unwrap();
      console.log("Status toggled successfully:", response);
      toast('✅ Toggled status successfully..');

    } catch (err) {
      console.error("Failed to toggle status:", err);
      toast('❌ Failed to toggle status!');
      dispatch(setAllUsers(userData?.data || []));
    }
  };

  // Handle opening the update product modal
  const openUpdateModal = (product: TProduct) => {
    setSelectedProduct(product);
  };

  // Handle closing the update product modal
  const closeUpdateModal = () => {
    setSelectedProduct(null);
  };

  // Handle opening the add product modal
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Handle closing the add product modal
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Handle opening the update order modal
  const openUpdateOrderModal = (order: TOrder) => {
    setSelectedOrder(order);
  };

  // Handle closing the update order modal
  const closeUpdateOrderModal = () => {
    setSelectedOrder(null);
  };

  // Handle loading and error states for users
  if (isUsersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading users...</p>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading users: {JSON.stringify(userError)}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 mt-24">
      {/* Users Section */}
      <h1 className="text-3xl font-bold text-gray-400 mb-6 text-center">Admin Dashboard</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Users</h2>
      {users.length > 0 ? (
        <div className="overflow-x-auto mb-12">
          <table className="w-[70vw] mx-auto bg-white shadow-md rounded-lg overflow-hidden table-fixed">
            <thead className="bg-gray-200">
              <tr>
                <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="w-2/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="w-1/5 py-3 px-4 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
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
      ) : (
        <p className="text-center text-gray-500 mt-4 mb-12">No users found.</p>
      )}

      {/* Products Section */}
      <div className="flex justify-center gap-5 items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Products</h2>
        <button
          onClick={openAddModal}
          className="rounded-sm bg-gray-200 p-3 hover:bg-gray-300 text-gray-800 font-semibold"
        >
          Add Product
        </button>
      </div>

      {isProductsLoading ? (
        <div className="flex items-center justify-center">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : productError ? (
        <div className="flex items-center justify-center">
          <p className="text-red-500">Error loading products: {JSON.stringify(productError)}</p>
        </div>
      ) : productData?.data && productData.data.length > 0 ? (
        <div className="overflow-x-auto mb-12">
          <table className="w-[70vw] mx-auto bg-white shadow-md rounded-lg overflow-hidden table-fixed">
            <thead className="bg-gray-200">
              <tr>
                <th className="w-2/6 py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="w-1/6 py-3 px-4 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="w-1/6 py-3 px-4 text-left text-sm font-semibold text-gray-700">Quantity</th>
                <th className="w-1/6 py-3 px-4 text-left text-sm font-semibold text-gray-700">In Stock</th>
                <th className="w-1/6 py-3 px-4 text-left text-sm font-semibold text-gray-700">Update</th>
              </tr>
            </thead>
            <tbody>
              {productData.data.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="w-2/6 py-3 px-4 text-sm text-gray-600 truncate">{product.name}</td>
                  <td className="w-1/6 py-3 px-4 text-sm text-gray-600">${product.price.toFixed(2)}</td>
                  <td className="w-1/6 py-3 px-4 text-sm text-gray-600">{product.quantity}</td>
                  <td className="w-1/6 py-3 px-4 text-sm text-gray-600">
                    {product.inStock ? "Yes" : "No"}
                  </td>
                  <td className="w-1/6 py-3 px-4 text-sm text-gray-600">
                    <button
                      onClick={() => openUpdateModal(product)}
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
        <p className="text-center text-gray-500 mt-4 mb-12">No products found.</p>
      )}

      {/* Orders Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Orders</h2>
        <p className="text-center text-gray-300">You can go to All Products to add products and create an order</p>
      </div>

      {isOrdersLoading ? (
        <div className="flex items-center justify-center">
          <p className="text-gray-500">Loading orders...</p>
        </div>
      ) : orderError ? (
        <div className="flex items-center justify-center">
          <p className="text-red-500">Error loading orders: {JSON.stringify(orderError)}</p>
        </div>
      ) : orderData?.data && orderData.data.length > 0 ? (
        <div className="overflow-x-auto mb-12">
          <table className="w-[70vw] mx-auto bg-white shadow-md rounded-lg overflow-hidden table-fixed">
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
              {orderData.data.map((order) => (
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

      {/* Modals */}
      {selectedProduct && (
        <UpdateProductModal product={selectedProduct} onClose={closeUpdateModal} />
      )}
      {isAddModalOpen && <AddProductModal onClose={closeAddModal} />}
      {selectedOrder && (
        <UpdateOrderModal order={selectedOrder} onClose={closeUpdateOrderModal} />
      )}
    </div>
  );
};

export default AdminDashboard;