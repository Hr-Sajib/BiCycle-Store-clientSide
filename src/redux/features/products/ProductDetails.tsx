import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProducts, setProducts } from "@/redux/features/products/productSlice";
import { addToCart, selectCart } from "@/redux/features/cart/cartSlice";
import { useGetSingleProductQuery } from "./productsApi"; // Updated to use getSingleProduct
import Aos from "aos";

const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    Aos.init({
      duration: 600,
      once: true,
      offset: 20,
    });
  }, []);
  const { productId } = useParams<{ productId: string }>(); // Get productId from URL
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const cart = useSelector(selectCart);

  // Fetch single product using RTK Query
  const { data, isLoading, error } = useGetSingleProductQuery(productId!); // `!` assumes productId is always present

  // Update Redux store with the single product (optional, if you want it in the global list)
  useEffect(() => {
    if (data?.success && data.data) {
      // Check if the product is already in the store to avoid duplicates
      const existingProduct = products.find((p) => p._id === data.data._id);
      if (!existingProduct) {
        dispatch(setProducts([...products, data.data]));
      }
    }
  }, [data, dispatch, products]);

  // Use the product directly from the API response
  const product = data?.data;

  const handleAddToCart = (productId: string) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const isProductInCart = (productId: string) => {
    return cart.some((item) => item.productId === productId);
  };

  if (isLoading) return <div className="text-center py-8 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error loading product details: {JSON.stringify(error)}</div>;
  if (!product) return <div className="text-center py-8 text-gray-500">Product not found</div>;

  const inCart = isProductInCart(product._id);

  

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto mt-20">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">{product.name}</h2>
      <div data-aos='fade-down' className="bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-6">
        <img
        data-aos='zoom-in'
          src={product.image}
          alt={product.name}
          className="w-full h-[50vh] md:w-1/2 h-64 object-cover rounded-md"
        />
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <p className="text-gray-100 text-sm bg-blue-900 px-2 py-1 rounded">Brand</p>
            <p className="text-gray-600 text-sm bg-blue-100 px-2 py-1 rounded ml-2">{product.brand}</p>
          </div>
          <p className="text-gray-600 text-sm mb-2">Type: {product.type}</p>
          <p className="text-xl font-bold text-blue-700 mb-2">${product.price}</p>
          <p className="text-sm mb-2">
            {product.quantity > 0 ? (
              <span className="text-green-600">In Stock ({product.quantity} available)</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Description:</span>{" "}
            {product.description || "No description available."}
          </p>
          <button
            onClick={() => handleAddToCart(product._id)}
            className={`w-full py-2 text-white rounded-md ${
              inCart ? "bg-gray-300" : "bg-black hover:bg-gray-700"
            }`}
            disabled={product.quantity === 0}
          >
            {inCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;