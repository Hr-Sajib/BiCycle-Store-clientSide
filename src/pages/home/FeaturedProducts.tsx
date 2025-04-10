import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, setProducts } from "@/redux/features/products/productSlice";
import { addToCart, selectCart } from "@/redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import AOS from "aos";
import "aos/dist/aos.css";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);
  const cart = useSelector(selectCart);
  const { data, isLoading, error } = useGetAllProductsQuery();

  if (error) {
    console.log(error);
  }

  // Set products in Redux store
  useEffect(() => {
    if (data?.data) {
      dispatch(setProducts(data.data));
    }
  }, [data, dispatch]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 20,
    });
  }, []);

  const handleAddToCart = (productId: string) => {
    dispatch(addToCart({ productId, quantity: 1 }));
    console.log(productId);
  };

  const isProductInCart = (productId: string) => {
    return cart.some((item) => item.productId === productId);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/allProducts/productDetails/${productId}`);
  };

  // Early returns after hooks
  if (isLoading) return <div className="text-center py-8 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error loading products</div>;

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Featured Products</h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid lg:!grid-cols-4 grid-cols-1 gap-4">
          {products.slice(0, 8).map((product) => {
            const inCart = isProductInCart(product._id);
            const outOfStock = product.quantity === 0;
            return (
              <div
                data-aos="fade-up"
                key={product._id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
                  <div className="flex">
                    <p className="text-gray-100 text-sm mt-1 bg-blue-900 px-2">Brand</p>
                    <p className="text-gray-600 text-sm mt-1 bg-blue-100 px-2">{product.brand}</p>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{product.type}</p>
                  <p className="text-sm mt-1">
                    {product.quantity > 0 ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="ml-4 mb-1 text-xl text-blue-700">${product.price}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product._id);
                    }}
                    className={`p-4 py-2 text-white rounded-tl-xl ${
                      outOfStock
                        ? "bg-gray-700"
                        : inCart
                        ? "bg-gray-300"
                        : "bg-black hover:bg-gray-700"
                    }`}
                    disabled={outOfStock}
                  >
                    {inCart && !outOfStock ? "Added" : "Add"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex justify-center mt-10">
        <Link to="/allProducts">
          <button className="bg-black p-4 py-2 text-white hover:bg-gray-700 rounded-sm">
            See All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;