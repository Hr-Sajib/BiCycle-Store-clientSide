import { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, removeFromCart } from "@/redux/features/cart/cartSlice";
import { selectProducts } from "@/redux/features/products/productSlice";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const Checkout = () => {
  const dispatch = useDispatch(); // Add useDispatch for removing items
  const cart = useSelector(selectCart);
  const products = useSelector(selectProducts);
  const user = useSelector(selectCurrentUser);

  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    cart.reduce((acc, item) => ({ ...acc, [item.productId]: item.quantity }), {})
  );

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const cartItemsWithDetails = cart.map((cartItem) => {
    const product = products.find((p) => p._id === cartItem.productId);
    return {
      ...cartItem,
      name: product?.name || "Unknown Product",
      brand: product?.brand || "Unknown Brand",
      image: product?.image || "https://via.placeholder.com/50",
      price: product?.price || 0,
    };
  });

  const totalPrice = cartItemsWithDetails.reduce(
    (sum, item) => sum + item.price * (quantities[item.productId] || item.quantity),
    0
  );

  const handleQuantityChange = (productId: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, value),
    }));
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId)); // Dispatch remove action
  };

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();

    const updatedCart = cartItemsWithDetails.map((item) => ({
      productId: item.productId,
      quantity: quantities[item.productId] || item.quantity,
    }));

    const checkoutData = {
      userEmail: user?.userEmail || "unknown",
      products: updatedCart,
      status: "paid",
      contactPhone: phone,
      address: address,
    };

    console.log("Checkout Result:", checkoutData);
  };

  return (
    <div className="py-8 px-4 max-w-7xl ml-[4vw] mt-[10vh]">
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Image</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Price/Unit</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Quantity</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItemsWithDetails.map((item) => (
                  <tr key={item.productId} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="py-4 px-4 text-gray-900">{item.name}</td>
                    <td className="py-4 px-4 text-gray-600">${item.price.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <input
                        type="number"
                        min="1"
                        value={quantities[item.productId] || item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.productId, parseInt(e.target.value) || 1)
                        }
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="text-red-600 hover:text-red-800 font-bold text-lg"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-right">
            <p className="text-lg font-semibold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>

          <form onSubmit={handleCheckout} className="mt-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-[700px] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 123-456-7890"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 w-[700px] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 123 Main St, City, Country"
                  rows={3}
                  required
                />
              </div>
            </div>
            <div className="flex mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-3 rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Check Out
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;