import { useCreateProductMutation } from "@/redux/features/products/productsApi"; // Adjust path
import { TProduct } from "@/redux/features/products/productSlice"; // Adjust path
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { postImage } from "@/utils/postImage"; // Adjust path
import AOS from "aos";
import "aos/dist/aos.css";

interface AddProductModalProps {
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose }) => {

   useEffect(() => {
       AOS.init({
            duration: 600,
            once: true,
            offset: 20,
          });
    }, []);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: 0,
    image: "", // Will store the uploaded image URL
    type: "Mountain" as TProduct["type"], // Default value
    description: "",
    quantity: 0,
    inStock: true, // Default to true
  });

  const [imageFile, setImageFile] = useState<File | null>(null); // Store the selected file
  const [isUploading, setIsUploading] = useState(false); // Track image upload status

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;

      // If an image file is selected, upload it first
      if (imageFile) {
        setIsUploading(true);
        imageUrl = await postImage(imageFile);
        setFormData((prev) => ({ ...prev, image: imageUrl }));
        setIsUploading(false);
      }

      if (!imageUrl) {
        throw new Error("Image upload failed or no image selected");
      }

      // Convert price and quantity to numbers
      const productData = {
        ...formData,
        image: imageUrl,
        price: parseFloat(formData.price as any) || 0,
        quantity: parseInt(formData.quantity as any, 10) || 0,
      };

      const response = await createProduct(productData).unwrap();
      console.log("Product created successfully:", response.data);
      toast("✅ Product added successfully");
      onClose(); // Close modal on success
    } catch (err) {
      console.error("Failed to create product:", err);
      toast("❌ Failed to create product (See console)");
      setIsUploading(false);
    }
  };

  return (
    <div data-aos="zoom-in" className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Product</h2>
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
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
            {imageFile && (
              <p className="text-sm text-gray-500 mt-1">Selected: {imageFile.name}</p>
            )}
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


          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating || isUploading}
              className={`py-2 px-4 bg-blue-700 text-white rounded-md hover:bg-green-600 ${
                (isCreating || isUploading) ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isCreating ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;