import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, setProducts } from "@/redux/features/products/productSlice";
import { addToCart, selectCart } from "@/redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);
  const cart = useSelector(selectCart);

  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false); // Sidebar state

  const { data, isLoading, error } = useGetAllProductsQuery({
    search: search || undefined,
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
    AOS.init({
      duration: 600,
      once: true,
      offset: 20,
    });
  }, []);

  useEffect(() => {
    if (data?.data) {
      const productsArray = Array.isArray(data.data) ? data.data : data.data.products;
      if (productsArray) {
        dispatch(setProducts(productsArray));
      }
    }
  }, [data, dispatch]);

  const uniqueBrands = Array.from(new Set(products.map((product) => product.brand))).sort();
  const uniqueCategories = Array.from(new Set(products.map((product) => product.type))).sort();

  const handleAddToCart = (productId: string) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const isProductInCart = (productId: string) => {
    return cart.some((item) => item.productId === productId);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/allProducts/productDetails/${productId}`);
  };

  const handleSearch = () => {
    console.log("Searching with term:", searchInput);
    setSearch(searchInput);
  };

  // Reset all filters to default
  const handleResetFilters = () => {
    setPriceFilter("all");
    setCategoryFilter("all");
    setBrandFilter("all");
    setStockFilter("all");
    setSearchInput("");
    setSearch("");
  };

  const filteredProducts = products.filter((product) => {
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

    const categoryMatch =
      categoryFilter === "all" || product.type.toLowerCase() === categoryFilter.toLowerCase();
    const brandMatch =
      brandFilter === "all" || product.brand.toLowerCase() === brandFilter.toLowerCase();
    let stockMatch = true;
    switch (stockFilter) {
      case "inStock":
        stockMatch = product.quantity > 0;
        break;
      case "outOfStock":
        stockMatch = product.quantity === 0;
        break;
      case "all":
      default:
        stockMatch = true;
    }

    return priceMatch && categoryMatch && brandMatch && stockMatch;
  });

  if (isLoading) return <div className="text-center py-8 text-gray-500 mt-[20%]">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error loading products: {JSON.stringify(error)}</div>;

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto mt-24 relative">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">All Products</h2>

      {/* Filtering Options */}
      <div className="mb-8 flex gap-4 flex-wrap items-center justify-between">
        {/* Search Bar (Always Visible) */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="p-2 w-[200px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-blue-600 text-white h-10 rounded-md hover:bg-blue-700 flex items-center justify-center"
            title="Search"
          >
            <FaSearch size={18} />
          </button>
        </div>

        {/* Filter Button (Visible on Small Screens) */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="md:!hidden h-11 flex gap-2 z-40 p-2 bg-blue-600 fixed right-0 text-white rounded-l-md hover:bg-blue-700 flex items-center justify-center"
          title="Filter"
        >
          <FaFilter size={15} />Filter
        </button>

        {/* Inline Filters (Visible on Medium and Larger Screens) */}
        <div className="hidden md:!flex gap-4 flex-wrap">
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
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 w-[200px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            id="brandFilter"
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="p-2 w-[200px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Brands</option>
            {uniqueBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <select
            id="stockFilter"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="p-2 w-[200px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Stock</option>
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Sidebar Modal (Visible on Small Screens when Filter Button is Clicked) */}
      {isFilterOpen && (
        <div data-aos="fade-left" className="fadeToRight fixed inset-0 z-50 md:hidden">
          <div className="fixed top-0 right-0 w-80 h-full bg-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-600 hover:text-gray-800"
                title="Close"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <select
                id="priceFilterMobile"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <select
                id="categoryFilterMobile"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                id="brandFilterMobile"
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Brands</option>
                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <select
                id="stockFilterMobile"
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Stock</option>
                <option value="inStock">In Stock</option>
                <option value="outOfStock">Out of Stock</option>
              </select>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleResetFilters}
                className="w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products match your filters.</p>
      ) : (
        <div className="grid lg:!grid-cols-3 grid-cols-1 gap-4">
          {filteredProducts.map((product, index) => {
            const inCart = isProductInCart(product._id);
            const outOfStock = product.quantity === 0;

            return (
              <div
                key={product._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleProductClick(product._id)}
                // data-aos="fade-up"
                data-aos="zoom-out"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover"
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
                  <div className="flex gap-1">
                    <button onClick={()=>handleProductClick(product._id)} className="bg-black text-white p-4 py-2 rounded-t-xl">Details</button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product._id);
                      }}
                      className={`p-4 py-2 text-white rounded-tl-xl ${
                        outOfStock
                          ? "bg-gray-400"
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllProducts;