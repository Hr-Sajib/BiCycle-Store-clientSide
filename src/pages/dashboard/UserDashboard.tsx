/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUserLoading, selectUserError } from "@/redux/features/user/userSlice";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserQuery, useUpdateUserMutation, useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import { setUser } from "@/redux/features/user/userSlice";
import { toast } from "sonner";
import { NavLink, Outlet } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const UserDashboard = () => {
  const authUser = useSelector(selectCurrentUser);
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const dispatch = useDispatch();

  const { data, isLoading, isError, error: queryError } = useGetUserQuery();
  const [updateUser, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] = useUpdateUserMutation();
  const [updatePassword, { isLoading: isPasswordUpdating, isError: isPasswordError, error: passwordError }] = useUpdatePasswordMutation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    AOS.init({
      duration: 600,
      once: true,
      offset: 20,
    });
  }, []);

  useEffect(() => {
    if (data?.data) {
      dispatch(setUser(data.data));
      setName(data.data.name);
      setEmail(data.data.email);
    }
  }, [data, dispatch]);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleUpdate = async () => {
    try {
      const updatedData = { name, email };
      const result = await updateUser(updatedData).unwrap();
      dispatch(setUser(result.data));
      console.log("User updated successfully:", result.data);
      toast("✅ Updated successfully..");
    } catch (err) {
      console.error("Failed to update user:", err);
      toast("❌ Update error!");
    }
  };

  const handleChangePassword = async () => {
    try {
      const passwordData = { oldPassword, newPassword };
      const result = await updatePassword(passwordData).unwrap();
      console.log("Password updated successfully:", result.message);
      toast("✅ Update successful..");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.error("Failed to update password:", err);
      toast("❌ Update error");
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex relative">
        {/* Skeleton Sidebar */}
        <div className="w-64 bg-gray-200 animate-pulse sticky top-42 rounded-r-2xl h-[60vh] z-10 lg:!block hidden"></div>

        {/* Skeleton Main Content */}
        <div className="flex-1 p-6 mt-42 lg:ml-0">
          <div className="w-3/4 mx-auto">
            <div className="h-10 bg-gray-200 animate-pulse rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>

        {/* Skeleton Hamburger Button for Mobile */}
        <button className="lg:!hidden fixed top-28 left-4 z-50 p-2 bg-gray-200 animate-pulse rounded-md"></button>
      </div>
    );
  }

  if (isError || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{(queryError as any)?.data?.message || error}</p>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Please log in to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex relative">
      {/* Hamburger Button for Mobile */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:!hidden fixed top-28 left-4 z-50 p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        title="Open Sidebar"
      >
        <FaBars />
      </button>

      {/* Mobile Sidebar (Visible when toggled) */}
      {isSidebarOpen && (
        <div data-aos="fade-right" className="fixed inset-0 z-50 lg:!hidden">
          <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">User Panel</h2>
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
                    to="/userDashboard/"
                    onClick={() => {
                      setIsSidebarOpen(false);
                    }}
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-700"}`
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink
                    to="/userDashboard/myOrders"
                    onClick={() => {
                      setIsSidebarOpen(false);
                    }}
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-700"}`
                    }
                  >
                    My Orders
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (Always visible on lg screens) */}
      <div className="w-64 bg-gray-800 text-white sticky top-42 rounded-r-2xl h-[60vh] z-10 lg:!block hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">User Panel</h2>
          <nav>
            <ul>
              <li className="mb-4">
                <NavLink
                  to="/userDashboard/"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-700"}`
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink
                  to="/userDashboard/myOrders"
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded ${isActive ? "bg-gray-600" : "hover:bg-gray-700"}`
                  }
                >
                  My Orders
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:ml-0">
        <h1 className="text-3xl font-bold text-gray-400 mb-6 text-center">User Dashboard</h1>
        <Outlet context={{ 
          name, setName, email, setEmail, 
          oldPassword, setOldPassword, newPassword, setNewPassword, 
          handleUpdate, handleChangePassword, 
          isUpdating, isPasswordUpdating, 
          isUpdateError, isPasswordError, 
          updateError, passwordError 
        }} />
      </div>
    </div>
  );
};

export default UserDashboard;