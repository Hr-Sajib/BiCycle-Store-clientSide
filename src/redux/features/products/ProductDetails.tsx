/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProducts, setProducts } from "@/redux/features/products/productSlice";
import { addToCart, selectCart } from "@/redux/features/cart/cartSlice";
import { useGetSingleProductQuery, useGetAllProductsQuery } from "./productsApi";
import Aos from "aos";
import "aos/dist/aos.css";
import { toast } from "sonner";

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const cart = useSelector(selectCart);

  // Fetch single product
  const { data: productData, isLoading: isProductLoading, error: productError } = useGetSingleProductQuery(productId!);
  const product = productData?.data;

  // Fetch all products to find suggested ones with the same type
  const { data: allProductsData, isLoading: isAllProductsLoading } = useGetAllProductsQuery({});

  // Update Redux store with the single product
  useEffect(() => {
    if (productData?.success && productData.data) {
      const existingProduct = products.find((p) => p._id === productData.data._id);
      if (!existingProduct) {
        dispatch(setProducts([...products, productData.data]));
      }
    }
  }, [productData, dispatch, products]);

  // Filter suggested products by type, excluding the current product
  const suggestedProducts = (allProductsData?.data as unknown as any[])?.filter(
    (p: any) => p.type === product?.type && p._id !== product?._id
  ) || [];

  // AOS initialization
  useEffect(() => {
    window.scrollTo({ top: 0 });
    Aos.init({
      duration: 600,
      once: true,
      offset: 20,
    });
  }, []);

  const handleAddToCart = (productId: string) => {
    dispatch(addToCart({ productId, quantity: 1 }));
    toast("✅ Added to cart")
  };

  const isProductInCart = (productId: string) => {
    return cart.some((item) => item.productId === productId);
  };

  // Skeleton loading for the main product
  if (isProductLoading) {
    return (
      <div className="py-8 px-4 max-w-4xl mx-auto mt-20">
        <div className="h-10 bg-gray-200 animate-pulse rounded mb-6 w-1/2 mx-auto"></div>
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6">
          <div className="lg:w-[30vw] h-[45vh] md:w-1/2 bg-gray-200 animate-pulse rounded-md"></div>
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 animate-pulse rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3"></div>
            <div className="h-16 bg-gray-200 animate-pulse rounded w-full"></div>
            <div className="h-12 bg-gray-200 animate-pulse rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (productError) {
    return <div className="text-center py-8 text-red-600 mt-20">Error loading product details: {JSON.stringify(productError)}</div>;
  }

  if (!product) {
    return <div className="text-center py-8 text-gray-500 mt-20">Product not found</div>;
  }

  const inCart = isProductInCart(product._id);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto lg:mt-10">
      {/* Main Product Section data-aos="fade-down" */}
      <div className="bg-gray-100 rounded-lg shadow-lg lg:!p-5 p-3 flex items-center lg:!flex-row flex-col gap-8 mb-12" data-aos="fade-up">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="lg:w-[50vw] lg:!max-h-[55vh] rounded-lg shadow-md transition-transform duration-300 ease-in-out transform"
            data-aos="zoom-in"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col justify-between">
        <h2 className="text-4xl mb-10 font-bold text-gray-800" >{product.name}</h2>

          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="text-sm font-medium text-white bg-blue-900 px-3 py-1 rounded-full">Brand</span>
              <span className="text-sm font-medium text-gray-700 bg-blue-100 px-3 py-1 rounded-full">{product.brand}</span>
            </div>
            <p className="text-lg text-gray-600 mb-3"><span className="font-semibold">Type:</span> {product.type}</p>
            <p className="text-3xl font-bold text-blue-700 mb-3">${product.price}</p>
            <p className="text-md mb-4">
              {product.quantity > 0 ? (
                <span className="text-green-600 font-medium">In Stock ({product.quantity} available)</span>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </p>
            <p className="text-gray-700 mb-6 text-xl">
              <span className="font-semibold">Description:</span>{" "}
              {product.description || "No description available."}
            </p>
          </div>
          <button
            onClick={() => handleAddToCart(product._id)}
            className={`w-full py-3 text-white rounded-lg font-semibold transition-colors ${
              inCart
                ? "bg-gray-400 cursor-not-allowed"
                : product.quantity === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-black hover:bg-gray-700"
            }`}
            disabled={inCart || product.quantity === 0}
          >
            {inCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Suggested Products Section */}
      <div className="mt-16">
        <h3 className="text-3xl font-semibold text-gray-800 mb-8" data-aos="fade-down">Suggested Products</h3>
        {isAllProductsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : suggestedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {suggestedProducts.map((suggestedProduct: any) => {
              const isInCart = isProductInCart(suggestedProduct._id);
              return (
                <div
                  key={suggestedProduct._id}
                  className="bg-gray-50 lg:w-[40vw] flex gap-5 items-center rounded-lg shadow-lg p-2 hover:shadow-xl transition-shadow duration-300"
                  data-aos="fade-up"
                >
                  <img
                    src={suggestedProduct.image}
                    alt={suggestedProduct.name}
                    className="lg:!w-[10vw] w-[30vw] rounded-md mb-4 transition-transform duration-300 ease-in-out transform"
                  />
                  <div>
                    <h4 className="text-2xl font-semibold text-gray-800 mb-2">{suggestedProduct.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{suggestedProduct.brand}</p>
                    <p className="text-xl font-bold text-blue-700 mb-3">${suggestedProduct.price}</p>
                    <button
                    onClick={() => handleAddToCart(suggestedProduct._id)}
                    className={`w-42 py-2 text-white rounded-lg font-medium transition-colors ${
                      isInCart
                        ? "bg-gray-400 cursor-not-allowed"
                        : suggestedProduct.quantity === 0
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gray-600 hover:bg-gray-700"
                    }`}
                    disabled={isInCart || suggestedProduct.quantity === 0}
                  >
                    {isInCart ? "Added" : "Add to Cart"}
                  </button>
                  </div>
                  
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">No suggested products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;