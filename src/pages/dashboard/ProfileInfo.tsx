/* eslint-disable @typescript-eslint/no-explicit-any */

import { useOutletContext } from "react-router-dom";

interface ContextType {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  oldPassword: string;
  setOldPassword: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  handleUpdate: () => Promise<void>;
  handleChangePassword: () => Promise<void>;
  isUpdating: boolean;
  isPasswordUpdating: boolean;
  isUpdateError: boolean;
  isPasswordError: boolean;
  updateError: any;
  passwordError: any;
}

const ProfileInfo = () => {
  const {
    name, setName, email, setEmail,
    oldPassword, setOldPassword, newPassword, setNewPassword,
    handleUpdate, handleChangePassword,
    isUpdating, isPasswordUpdating,
    isUpdateError, isPasswordError,
    updateError, passwordError,
  } = useOutletContext<ContextType>();

  const displayUser = { name, email }; // Simplified for display

  return (
    <div className="bg-white p-8 rounded-lg">
      {displayUser ? (
        <div className="flex lg:!flex-row flex-col gap-10 items-center">
          {/* User Info Form */}
          <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Info</h3>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
          <div className=" p-3 lg:!w-[30vw] w-full rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
            <div className="space-y-6">
              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
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
        </div>
      ) : (
        <p className="text-center text-gray-500">No user data available.</p>
      )}
    </div>
  );
};

export default ProfileInfo;