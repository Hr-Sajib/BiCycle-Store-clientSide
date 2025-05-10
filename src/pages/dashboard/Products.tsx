
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import { selectProducts, TProduct } from "@/redux/features/products/productSlice";
import { useOutletContext } from "react-router-dom";

const Products = () => {
  const products = useSelector(selectProducts);
  const { openUpdateModal, openAddModal } = useOutletContext<{
    openUpdateModal: (product: TProduct) => void;
    closeUpdateModal: () => void;
    openAddModal: () => void;
    closeAddModal: () => void;
    openUpdateOrderModal: (order: any) => void;
    closeUpdateOrderModal: () => void;
  }>();

  return (
    <div data-aos="fade-down" className="lg:!w-full w-[90vw]">
      <div className="flex justify-center gap-5 items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Products</h2>
        <button
          onClick={openAddModal}
          className="rounded-sm bg-gray-200 p-3 hover:bg-gray-300 text-gray-800 font-semibold"
        >
          Add Product
        </button>
      </div>
      {products.length > 0 ? (
        <div className="overflow-x-auto mb-12">
          <table className="lg:!w-[70vw] mx-auto bg-white shadow-md rounded-lg overflow-hidden table-fixed">
            <thead className="bg-gray-200">
              <tr>
                <th className="w-2/6 py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="w-1/6 py-3 px-4 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="w-1/6 py-3 px-4 text-left text-sm font-semibold text-gray-700">Quantity</th>
                <th className="w-1/6 py-3 px-4 text-left text-sm font-semibold text-gray-700">In Stock</th>
                <th className="w-1/6 py-3 px-4 text-left text-sm font-semibold text-gray-700">Update</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="w-2/6 py-3 px-4 text-sm text-gray-600 truncate">{product.name}</td>
                  <td className="w-1/6 py-3 px-4 text-sm text-gray-600">${product.price.toFixed(2)}</td>
                  <td className="w-1/6 py-3 px-4 text-sm text-gray-600">{product.quantity}</td>
                  <td className="w-1/6 py-3 px-4 text-sm text-gray-600">
                    {product.quantity > 0 ? "Yes" : "No"}
                  </td>
                  <td className="w-1/6 py-3 px-4 text-sm text-gray-600">
                    <button
                      onClick={() => openUpdateModal(product)}
                      className="py-1 px-3 rounded-sm text-white font-semibold bg-blue-500 hover:bg-blue-600 whitespace-nowrap"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4 mb-12">No products found.</p>
      )}
    </div>
  );
};

export default Products;