import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, setProducts } from "@/redux/features/products/productSlice";
import { useGetProductQuery } from "@/redux/features/products/productsApi";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const { data, isLoading, error } = useGetProductQuery();

  useEffect(() => {
    if (data?.data) {
      dispatch(setProducts(data.data)); // Unwrap and store the products array
    }
  }, [data, dispatch]);

  console.log("Fetched Data:", data?.data);
  console.log("Store Products:", products);

  if (isLoading) return <div className="text-center py-8 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error loading products</div>;

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Featured Products</h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.brand}</p>
                <p className="text-gray-600 text-sm mt-1">{product.type}</p>
                <p className="text-sm mt-1">
                  {product.quantity > 0 ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </p>
              </div>
              <div className="flex justify-end">
                <button className="bg-black p-4 py-2 text-white hover:bg-gray-700 rounded-tl-xl">Add</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;