import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, setProducts } from "@/redux/features/products/productSlice";
import { addToCart, selectCart } from "@/redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);
  const cart = useSelector(selectCart);
  const { data, isLoading, error } = useGetAllProductsQuery();

  // State for filters
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    if (data?.data) {
      dispatch(setProducts(data.data));
    }
  }, [data, dispatch]);

  const handleAddToCart = (productId: string) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const isProductInCart = (productId: string) => {
    return cart.some((item) => item.productId === productId);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/allProducts/productDetails/${productId}`);
  };

  // Filter products based on price and category
  const filteredProducts = products.filter((product) => {
    // Price filter
    let priceMatch = true;
    switch (priceFilter) {
      case "under100":
        priceMatch = product.price < 100;
        break;
      case "100to500":
        priceMatch = product.price >= 100 && product.price <= 500;
        break;
      case "500to1000":
        priceMatch = product.price > 500 && product.price <= 1000;
        break;
      case "1000to1500":
        priceMatch = product.price > 1000 && product.price <= 1500;
        break;
      case "1500to2000":
        priceMatch = product.price > 1500 && product.price <= 2000;
        break;
      case "2000to3000":
        priceMatch = product.price > 2000 && product.price <= 3000;
        break;
      case "above3000":
        priceMatch = product.price > 3000;
        break;
      case "all":
      default:
        priceMatch = true;
    }

    // Category filter
    const categoryMatch =
      categoryFilter === "all" || product.type.toLowerCase() === categoryFilter.toLowerCase();

    return priceMatch && categoryMatch;
  });

  if (isLoading) return <div className="text-center py-8 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error loading products</div>;

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto mt-24">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">All Products</h2>

      {/* Filtering Options */}
      <div className="mb-8 flex gap-4">
        {/* Price Filter */}
        <div className="flex flex-col">
          <select
            id="priceFilter"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="p-2 w-[200px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Prices</option>
            <option value="under100">Under $100</option>
            <option value="100to500">$100 - $500</option>
            <option value="500to1000">$500 - $1000</option>
            <option value="1000to1500">$1000 - $1500</option>
            <option value="1500to2000">$1500 - $2000</option>
            <option value="2000to3000">$2000 - $3000</option>
            <option value="above3000">Above $3000</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex w-[300px] flex-col">
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="Mountain">Mountain</option>
            <option value="Road">Road</option>
            <option value="Hybrid">Hybrid</option>
            <option value="BMX">BMX</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products match your filters.</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const inCart = isProductInCart(product._id);
            return (
              <div
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
                      inCart ? "bg-gray-300" : "bg-black hover:bg-gray-700"
                    }`}
                    disabled={product.quantity === 0}
                  >
                    {inCart ? "Added" : "Add"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllProducts;