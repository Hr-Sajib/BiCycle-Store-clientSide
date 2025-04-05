import { useSelector } from "react-redux";
import { selectUser, selectUserLoading, selectUserError } from "@/redux/features/user/userSlice";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserMutation } from "@/redux/features/user/userApi";
import { useEffect } from "react";

const UserDashboard = () => {
  const authUser = useSelector(selectCurrentUser);
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  // Use mutation instead of query
  const [getUser, { data, isLoading, isError, error: mutationError }] = useGetUserMutation();

  useEffect(() => {
    if (authUser?.userEmail) {
      getUser({ email: authUser.userEmail });
    }
  }, [authUser, getUser]);

  if (isLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isError || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {(mutationError as any)?.data?.message || error}</p>
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
          User Dashboard
        </h2>
        {displayUser ? (
          <form className="space-y-6">
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
                value={displayUser.name}
                readOnly
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
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
                value={displayUser.email}
                readOnly
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={displayUser.password} // Hashed password (consider hiding or showing masked)
                readOnly
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
              />
              <p className="text-sm text-gray-500 mt-1">
                Note: This is your encrypted password
              </p>
            </div>
          </form>
        ) : (
          <p className="text-center text-gray-500">No user data available.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;