import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logout } from "@/redux/features/auth/authSlice";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    setProfileMenuOpen(false);
    toast("✅ Logged Out");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close profile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky bg-gray-100  top-0 w-full mx-auto flex justify-between items-center p-4 z-90">
      {/* Brand */}
      <Link to="/" className="font-bold text-2xl flex gap-1 items-center">
        <p className="bg-white rounded-full w-8 h-8 flex justify-center items-center">🛞</p>
        {user?.role === "admin" ? "Cycles Garden Admin" : "Cycles Garden"}
      </Link>

      {/* Hamburger Icon */}
      <button
        className="md:hidden text-3xl focus:outline-none"
        onClick={toggleMenu}
      >
        {!isMenuOpen ? "☰" : "x"}
      </button>

      {/* Mobile Navigation Menu */}
      <nav
        className={`${
          isMenuOpen ? "block mobile-nav" : "hidden"
        } md:flex md:items-center mt-2 md:gap-5 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-100 md:bg-transparent p-4 md:p-0 rounded-md md:rounded-none transition-all duration-300 z-40`}
      >
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="block md:inline-block py-2 md:py-0 hover:text-gray-500"
        >
          Shop Now
        </Link>
        <Link
          to="/allProducts"
          onClick={() => setIsMenuOpen(false)}
          className="block md:inline-block py-2 md:py-0 hover:text-gray-500"
        >
          All Products
        </Link>
        {user?.role === "admin" ? (
          <Link
            to="/adminDashboard"
            onClick={() => setIsMenuOpen(false)}
            className="block md:inline-block py-2 md:py-0 hover:text-gray-500"
          >
            Admin Dashboard
          </Link>
        ) : (
          <Link
            to="/userDashboard"
            onClick={() => setIsMenuOpen(false)}
            className="block md:inline-block py-2 md:py-0 hover:text-gray-500"
          >
            Dashboard
          </Link>
        )}
        <Link
          to="/checkout"
          onClick={() => setIsMenuOpen(false)}
          className="block md:inline-block py-2 md:py-0 hover:text-gray-500"
        >
          Check Out
        </Link>
        <Link
          to="/about"
          onClick={() => setIsMenuOpen(false)}
          className="block md:inline-block py-2 md:py-0 hover:text-gray-500"
        >
          About Us
        </Link>
        {user ? (
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="border border-cyan-600 md:inline-block flex items-center bg-blue-50 text-teal-600 p-2 rounded hover:bg-teal-100 w-full md:w-auto text-left md:text-center mt-2 md:mt-0"
              aria-label="Open profile menu"
            >
              <FiUser size={20} className="mr-2" />
              Profile
            </button>
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-100 text-gray-700 rounded-md shadow-lg z-50 p-2">
                <Link
                  to={user.role === "admin" ? "/userDashboard" : "/userDashboard"}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setProfileMenuOpen(false);
                  }}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 rounded-md"
                  aria-label="Go to profile"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 rounded-md"
                  aria-label="Log out"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
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

      {/* lg menu */}
      <nav className="hidden lg:!flex items-center gap-5">
        <Link className="mr-5" to="/">
          Shop Now
        </Link>
        <Link className="mr-5" to="/allProducts">
          All Products
        </Link>
        <Link className="mr-5" to="/about">
          About Us
        </Link>
        {user?.role === "admin" ? (
          <Link className="mr-5" to="/adminDashboard">
            Admin Dashboard
          </Link>
        ) : (
          <Link className="mr-5" to="/userDashboard">
            Dashboard
          </Link>
        )}
        <Link className="mr-5" to="/checkout">
          Check Out
        </Link>
        {user ? (
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="border border-cyan-600 mr-5 flex items-center bg-blue-50 text-teal-600 p-3 py-2 rounded-sm hover:bg-teal-100"
              aria-label="Open profile menu"
            >
              <FiUser size={20} className="mr-2" />
              Profile
            </button>
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-100 text-gray-700 rounded-md shadow-lg z-50 p-2">
                <Link
                  to={user.role === "admin" ? "/userDashboard" : "/userDashboard"}
                  onClick={() => setProfileMenuOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 rounded-md"
                  aria-label="Go to profile"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 rounded-md"
                  aria-label="Log out"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
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