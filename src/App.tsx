import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector
import { selectCart } from "@/redux/features/cart/cartSlice"; // Import cart selector
import "./App.css";
import Navbar from "@/components/layout/Navbar"; // Adjusted path with @ alias
import { Link } from "react-router-dom";

function App() {
  const cart = useSelector(selectCart); // Fetch cart data from Redux store
  const cartItemCount = cart.length; // Number of unique products in cart

  return (
    <>
      <Navbar />
      <Link to="checkOut">
        <div className="fixed top-[90vh] left-[92vw] bg-blue-500 text-white p-3 rounded-sm z-20">
          <p className="bg-white text-black font-bold flex justify-center rounded-full">
            {cartItemCount} {/* Dynamic count */}
          </p>
          <p>Cart</p>
        </div>
      </Link>
      <Outlet />
    </>
  );
}

export default App;