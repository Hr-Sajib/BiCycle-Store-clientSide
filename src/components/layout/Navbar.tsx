import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice"; // Import selector
import { logout } from "@/redux/features/auth/authSlice"; // Import logout action

const Navbar = () => {
  const user = useSelector(selectCurrentUser); // Fetch current user from auth slice
  const dispatch = useDispatch(); // Get dispatch function

  // Handle logout
  const handleLogout = () => {
    dispatch(logout()); // Clear user and token
  };

  return (
    <div className="bg-black text-white scroll-container w-[90vw] rounded-md mt-5 flex justify-center gap-[50vw] fixed top-0 left-0 right-0 mx-auto p-4 z-10">
      <Link to="/">
        <p className="font-bold text-2xl">High Cycles</p>
      </Link>
      <nav className="flex items-center gap-5">
        <Link className="mr-5" to="/">Shop Now</Link>
        <Link className="mr-5" to="/allProducts">All Products</Link>
        <Link className="mr-5" to="/userDashboard">Dashboard</Link>
        <Link className="mr-5" to="/checkout">Check Out</Link>
        {user ? (
          <button
            onClick={handleLogout}
            className="mr-5 bg-blue-50 text-red-600 p-3 py-2 rounded-sm hover:bg-red-900"
          >
            Logout
          </button>
        ) : (
          <Link
            className="mr-5 bg-gray-100 text-black p-3 py-2 rounded-sm hover:bg-gray-100"
            to="/login"
          >
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;