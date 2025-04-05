import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="border scroll-container bg-gray-100 w-[90vw] rounded-md mt-5 flex justify-center gap-[50vw] fixed top-0 left-0 right-0 mx-auto p-4 z-10">
            <Link to="/"><p className='font-bold text-2xl'>High Cycles</p></Link>
            <nav className='flex items-center gap-5'>
              <Link className="mr-5" to="/">Shop Now</Link>
              <Link className="mr-5" to="/allProducts">All Products</Link>
              <Link className="mr-5" to="/checkOut">Check Out</Link>
              <Link className="mr-5 bg-black text-white p-3 py-2 rounded-sm" to="/login">Login</Link>           
            </nav>
            
          </div>
    );
};

export default Navbar;