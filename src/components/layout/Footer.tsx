import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-20 mt-20">
      <div className="grid grid-cols-1 md:!grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Cycles Garden</h2>
          <p className="text-gray-400">
            Premium bicycles and accessories crafted for performance and style.
            Ride with us for your next adventure.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/allProducts" className="hover:text-gray-300">All Products</Link></li>
            <li><Link to="/checkout" className="hover:text-gray-300">Checkout</Link></li>
            <li><Link to="/userDashboard" className="hover:text-gray-300">Dashboard</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="text-gray-400 space-y-2">
            <li className="flex items-center gap-2"><FaPhone /> +1 (234) 567-8901</li>
            <li className="flex items-center gap-2"><FaEnvelope /> support@highcycles.com</li>
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> 123 Cycle St, Sporty City</li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-xl">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
              <FaInstagram />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />
      <p className="text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} High Cycles. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
