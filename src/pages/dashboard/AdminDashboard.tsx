import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  setAllUsers, deactivateUser } from "@/redux/features/user/allUserSlice";
import { useGetAllUsersQuery, useToggleUserStatusMutation } from "@/redux/features/user/allUserApi";
import {  setProducts, TProduct } from "@/redux/features/products/productSlice";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { setOrders, TOrder } from "@/redux/features/order/orderSlice";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import UpdateProductModal from "./UpdateProductModal";
import AddProductModal from "./AddProductModal";
import UpdateOrderModal from "./UpdateOrderModal";
import { toast } from "sonner";
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink, Outlet } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminDashboard = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    AOS.init({
      duration: 600,
      once: true,
      offset: 20,
    });
  }, []);

  const dispatch = useDispatch();
  const [search] = useState<string>("");

  const { data: userData, isLoading: isUsersLoading, error: userError } = useGetAllUsersQuery();
  const { data, isLoading: isProductsLoading, error: productError } = useGetAllProductsQuery({
    search: search || undefined,
  });
  const { data: orderData, isLoading: isOrdersLoading, error: orderError } = useGetAllOrdersQuery();

  console.log("error in order loading: ", orderError);

  const [toggleUserStatus, { isLoading: isToggling }] = useToggleUserStatusMutation();
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (userData?.success && userData.data) {
      dispatch(setAllUsers(userData.data));
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (data?.data) {
      const productsArray = Array.isArray(data.data) ? data.data : data.data.products;
      if (productsArray) {
        dispatch(setProducts(productsArray));
      }
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (orderData?.success && orderData.data) {
      dispatch(setOrders(orderData.data));
    }
  }, [orderData, dispatch]);

  const handleToggleStatus = async (userId: string) => {
    try {
      dispatch(deactivateUser(userId));
      const response = await toggleUserStatus(userId).unwrap();
      console.log("Status toggled successfully:", response);
      toast("✅ Toggled status successfully..");
    } catch (err) {
      console.error("Failed to toggle status:", err);
      toast("❌ Failed to toggle status!");
      dispatch(setAllUsers(userData?.data || []));
    }
  };

  const openUpdateModal = (product: TProduct) => setSelectedProduct(product);
  const closeUpdateModal = () => setSelectedProduct(null);
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openUpdateOrderModal = (order: TOrder) => setSelectedOrder(order);
  const closeUpdateOrderModal = () => setSelectedOrder(null);

  if (isUsersLoading || isProductsLoading || isOrdersLoading) {
    return (
      <div className="min-h-screen flex items-center mt-[30vh] justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (userError || productError || orderError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          {userError
            ? `Error loading users: ${JSON.stringify(userError)}`
            : productError
            ? `Error loading products: ${JSON.stringify(productError)}`
            : `Error loading orders: ${JSON.stringify(orderError)}`}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex relative">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:!hidden fixed top-28 left-4 z-50 p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        title="Open Sidebar"
      >
        Options
      </button>

      {isSidebarOpen && (
        <div data-aos="fade-right" className="fixed inset-0 z-50 lg:!hidden">
          <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Admin Options</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-300 hover:text-white"
                title="Close Sidebar"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <nav>
              <ul>
                <li className="mb-4">
                  <NavLink
                    to="/adminDashboard"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded bg-gray-700${isActive ? "bg-gray-800" : "bg-gray-800"}`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Overview
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink
                    to="/adminDashboard/users"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-700"}`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Users
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink
                    to="/adminDashboard/products"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-700"}`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Products
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink
                    to="/adminDashboard/orders"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-700"}`
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      <div className="w-64 bg-gray-800 text-white sticky top-58 rounded-r-2xl h-[60vh] z-10 lg:!block hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Admin Options</h2>
          <nav>
            <ul>
              <li className="mb-4">
                <NavLink
                  to="/adminDashboard"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded ${isActive ? "bg-gray-800" : "hover:bg-gray-700"}`
                  }
                >
                  Overview
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/adminDashboard/users"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-700"}`
                  }
                >
                  Users
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/adminDashboard/products"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-700"}`
                  }
                >
                  Products
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/adminDashboard/orders"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-700"}`
                  }
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-400 mb-6 text-center">Admin Dashboard</h1>
        <Outlet
          context={{
            handleToggleStatus,
            isToggling,
            openUpdateModal,
            closeUpdateModal,
            openAddModal,
            closeAddModal,
            openUpdateOrderModal,
            closeUpdateOrderModal,
          }}
        />
      </div>

      {selectedProduct && <UpdateProductModal product={selectedProduct} onClose={closeUpdateModal} />}
      {isAddModalOpen && <AddProductModal onClose={closeAddModal} />}
      {selectedOrder && <UpdateOrderModal order={selectedOrder} onClose={closeUpdateOrderModal} />}
    </div>
  );
};

export default AdminDashboard;