import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector
import { selectCart } from "@/redux/features/cart/cartSlice"; // Import cart selector
import "./App.css";
import Navbar from "@/components/layout/Navbar"; // Adjusted path with @ alias
import { Link } from "react-router-dom";
import Footer from "./components/layout/Footer";
// Import the Swiper styles

function App() {
  const cart = useSelector(selectCart); // Fetch cart data from Redux store
  const cartItemCount = cart.length; // Number of unique products in cart

  return (
    <div className="">
      <Navbar/> {/* Added class for styling */}
      <div className="min-h-[60vh]">
        <Link to="checkOut">
          <div className="border fixed top-[90vh] lg:left-[92vw] left-[85vw] bg-black text-white p-3 rounded-lg z-20">
            <div>
              <p className="bg-white text-black font-bold flex justify-center rounded-full">
                {cartItemCount} {/* Dynamic count */}
              </p>
              <p>Cart</p>
            </div>

          </div>
        </Link>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;