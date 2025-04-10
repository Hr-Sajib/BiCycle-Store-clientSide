import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logout } from "@/redux/features/auth/authSlice";
import { useState } from "react";
import { toast } from "sonner";

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    toast('✅ Logged Out');

  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-black text-white w-full lg:max-w-[90vw] max-w-[95vw] mx-auto rounded-md mt-5 flex justify-between items-center fixed top-0 left-0 right-0 p-4 z-50">
      {/* Brand */}
      <Link to="/" className="font-bold text-2xl">
        Cycles Garden
      </Link>

      {/* Hamburger Icon */}
      <button
        className="md:hidden text-3xl focus:outline-none"
        onClick={toggleMenu}
      >
        ☰
      </button>

      {/* Mobile Navigation Menu */}
      <nav
        className={`${
          isMenuOpen ? "block mobile-nav" : "hidden"
        } md:flex md:items-center mt-2 md:gap-5 absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent p-4 md:p-0 rounded-md md:rounded-none transition-all duration-300 z-40`}
      >
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="block md:inline-block py-2 md:py-0 hover:text-gray-300"
        >
          Shop Now
        </Link>
        <Link
          to="/allProducts"
          onClick={() => setIsMenuOpen(false)}
          className="block md:inline-block py-2 md:py-0 hover:text-gray-300"
        >
          All Products
        </Link>
        {user?.role === "admin" ? (
          <Link
            to="/adminDashboard"
            onClick={() => setIsMenuOpen(false)}
            className="block md:inline-block py-2 md:py-0 hover:text-gray-300"
          >
            Admin Dashboard
          </Link>
        ) : (
          <Link
            to="/userDashboard"
            onClick={() => setIsMenuOpen(false)}
            className="block md:inline-block py-2 md:py-0 hover:text-gray-300"
          >
            Dashboard
          </Link>
        )}
        <Link
          to="/checkout"
          onClick={() => setIsMenuOpen(false)}
          className="block md:inline-block py-2 md:py-0 hover:text-gray-300"
        >
          Check Out
        </Link>

        <Link
          to="/about"
          onClick={() => setIsMenuOpen(false)}
          className="block md:inline-block py-2 md:py-0 hover:text-gray-300"
        >
          Check Out
        </Link>

        {user ? (
          <button
            onClick={handleLogout}
            className="block md:inline-block bg-blue-50 text-red-600 p-2 rounded hover:bg-red-100 w-full md:w-auto text-left md:text-center mt-2 md:mt-0"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="block md:inline-block bg-gray-100 text-black p-2 rounded hover:bg-gray-200 w-full md:w-auto mt-2 md:mt-0"
          >
            Login
          </Link>
        )}
      </nav>

      {/* lg menu  */}
      <nav className="hidden lg:!flex items-center gap-5">
        <Link className="mr-5" to="/">Shop Now</Link>
        <Link className="mr-5" to="/allProducts">All Products</Link>
        <Link className="mr-5" to="/about">About Us</Link>
        {
          user?.role=='admin' ?<Link className="mr-5" to="/adminDashboard">Admin Dashboard</Link> :
          <Link className="mr-5" to="/userDashboard">Dashboard</Link>
        }
        <Link className="mr-5" to="/checkout">Check Out</Link>
        {user ? (
          <button
            onClick={handleLogout}
            className="mr-5 bg-blue-50 text-red-600 p-3 py-2 rounded-sm hover:bg-red-100"
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
