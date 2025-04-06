import { baseApi } from "../../api/baseApi";
import { TProduct } from "./productSlice"; // Adjust path as needed

// Define response types based on backend sendResponse
interface ProductResponse {
  success: boolean;
  message: string;
  data: TProduct;
}

interface ProductsResponse {
  success: boolean;
  message: string;
  data: TProduct[];
}

interface DeleteResponse {
  success: boolean;
  message: string;
  data: null;
}

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products (GET /products/)
    getAllProducts: builder.query<ProductsResponse, void>({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),

    // Get a single product by ID (GET /products/:productId)
    getSingleProduct: builder.query<ProductResponse, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),

    // Create a new product (POST /products/)
    createProduct: builder.mutation<ProductResponse, Partial<TProduct>>({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
    }),

    // Update a product by ID (PATCH /products/:productId)
    updateProduct: builder.mutation<ProductResponse, { productId: string; data: Partial<TProduct> }>({
      query: ({ productId, data }) => ({
        url: `/products/${productId}`,
        method: "PATCH",
        body: data,
      }),
    }),

    // Delete a product by ID (DELETE /products/:productId)
    deleteProduct: builder.mutation<DeleteResponse, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;

export default productApi;