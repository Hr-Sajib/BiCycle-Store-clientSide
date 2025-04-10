import React, { useState } from "react";
import { TProduct } from "@/redux/features/products/productSlice";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/products/productsApi";
import { toast } from "sonner";

interface UpdateProductModalProps {
  product: TProduct;
  onClose: () => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    brand: product.brand,
    price: product.price,
    image: product.image,
    type: product.type,
    description: product.description,
    quantity: product.quantity,
    inStock: product.inStock,
  });

  const [search] = useState<string>(""); // Match AdminDashboard search state (empty for now)
  const { refetch } = useGetAllProductsQuery({ search: search || undefined }); // Refetch with same search
  const [updateProduct, { isLoading: isUpdating, error: updateError }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting, error: deleteError }] = useDeleteProductMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateProduct({
        productId: product._id,
        data: formData,
      }).unwrap();
      console.log("Product updated successfully:", response.data);
      toast("✅ Product updated successfully.");
      await refetch(); // Refetch the products list
      onClose(); // Close modal after refetch
    } catch (err) {
      console.error("Failed to update product:", err);
      toast("❌ Failed to update product (See console)");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product._id).unwrap();
      console.log("Product deleted successfully");
      toast("🗑️ Product deleted successfully.");
      await refetch(); // Refetch the products list
      onClose(); // Close modal after refetch
    } catch (err) {
      console.error("Failed to delete product:", err);
      toast("❌ Failed to delete product (See console)");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              step="0.01"
              min="0"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="Mountain">Mountain</option>
              <option value="Road">Road</option>
              <option value="Hybrid">Hybrid</option>
              <option value="BMX">BMX</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              rows={3}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              min="0"
              required
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">In Stock</span>
            </label>
          </div>

          {updateError && (
            <p className="text-red-500 mb-4">Update Error: {JSON.stringify(updateError)}</p>
          )}
          {deleteError && (
            <p className="text-red-500 mb-4">Delete Error: {JSON.stringify(deleteError)}</p>
          )}

          <div className="flex justify-between space-x-2">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting || isUpdating}
              className={`py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 ${
                isDeleting || isUpdating ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating || isDeleting}
                className={`py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
                  isUpdating || isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;