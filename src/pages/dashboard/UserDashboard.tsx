import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUserLoading, selectUserError } from "@/redux/features/user/userSlice";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserQuery, useUpdateUserMutation, useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import { setUser } from "@/redux/features/user/userSlice";
import { toast } from "sonner";

const UserDashboard = () => {
  const authUser = useSelector(selectCurrentUser); // From auth slice
  const user = useSelector(selectUser); // From user slice
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const dispatch = useDispatch();
  // console.log("Usr: ",authUser)


  // Use query hook to fetch user data
  const { data, isLoading, isError, error: queryError } = useGetUserQuery();

  // Use mutation hook to update user data
  const [updateUser, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
    useUpdateUserMutation();

  // Use mutation hook to update password
  const [updatePassword, { isLoading: isPasswordUpdating, isError: isPasswordError, error: passwordError }] =
    useUpdatePasswordMutation();

  // Sync API data with Redux store and initialize form fields
  useEffect(() => {
    if (data?.data) {
      dispatch(setUser(data.data)); // Store fetched user in Redux
      setName(data.data.name); // Initialize name
      setEmail(data.data.email); // Initialize email
    }
  }, [data, dispatch]);

  // State for editable fields
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  // State for password change form
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Handle update button click
  const handleUpdate = async () => {
    try {
      const updatedData = { name, email };
      const result = await updateUser(updatedData).unwrap(); // Send update request
      dispatch(setUser(result.data)); // Update Redux store with response
      console.log("User updated successfully:", result.data);
      toast('✅ Updated successfully..');
    } catch (err) {
      console.error("Failed to update user:", err);
      toast('❌ Update error!');
    }
  };

  // Handle password change button click
  const handleChangePassword = async () => {
    try {
      const passwordData = { oldPassword, newPassword };
      const result = await updatePassword(passwordData).unwrap(); // Send password update request
      console.log("Password updated successfully:", result.message);
      toast('✅ Update successfull..');

      setOldPassword(""); // Clear form on success
      setNewPassword("");
    } catch (err) {
      console.error("Failed to update password:", err);
      toast('❌ Update error');

    }
  };

  if (isLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isError || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          Error: {(queryError as any)?.data?.message || error}
        </p>
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

  const displayUser = user || data?.data; // Use Redux state or API data

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          User Profile
        </h2>
        {displayUser ? (
          <>
            {/* User Info Form */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-red-200">
                  *Remember you have to log in with new email after changing email
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className={`bg-black text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isUpdating ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
              </div>
              {isUpdateError && (
                <p className="text-red-500 text-sm">
                  Error: {(updateError as any)?.data?.message || "Failed to update"}
                </p>
              )}
            </div>

            {/* Password Change Form */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Change Password
              </h3>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleChangePassword}
                    disabled={isPasswordUpdating}
                    className={`bg-black text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isPasswordUpdating ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isPasswordUpdating ? "Changing..." : "Change Password"}
                  </button>
                </div>
                {isPasswordError && (
                  <p className="text-red-500 text-sm">
                    Error: {(passwordError as any)?.data?.message || "Failed to change password"}
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No user data available.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;