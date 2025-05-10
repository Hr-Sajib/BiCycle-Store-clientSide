/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import { selectAllUsers } from "@/redux/features/user/allUserSlice";
import { useOutletContext } from "react-router-dom";

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

  return (
    <div className="lg:!w-full w-[90vw]" data-aos="fade-down">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Users</h2>
      {users.length > 0 ? (
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
    </div>
  );
};

export default Users;