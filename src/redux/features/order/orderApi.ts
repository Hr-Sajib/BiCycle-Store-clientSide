import { baseApi } from "../../api/baseApi"; // Adjust path
import { TOrder, TProducts } from "./orderSlice"; // Adjust path

// Define response types based on backend sendResponse
interface OrderResponse {
  success: boolean;
  message: string;
  data: TOrder;
}

interface OrdersResponse {
  success: boolean;
  message: string;
  data: TOrder[];
}

interface DeleteResponse {
  success: boolean;
  message: string;
  data: null;
}

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new order (POST /orders/)
    createOrder: builder.mutation<OrderResponse, { userEmail: string; products: TProducts; totalPrice: number; address: string; contactNumber: string }>({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
    }),

    // Get all orders (GET /orders/)
    getAllOrders: builder.query<OrdersResponse, void>({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),

    // Get a single order by ID (GET /orders/:orderId)
    getSingleOrder: builder.query<OrderResponse, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
    }),

    // Update an order by ID (PATCH /orders/:orderId)
    updateOrder: builder.mutation<OrderResponse, { orderId: string; data: Partial<TOrder> }>({
      query: ({ orderId, data }) => ({
        url: `/orders/${orderId}`,
        method: "PATCH",
        body: data,
      }),
    }),

    // Delete an order by ID (DELETE /orders/:orderId)
    deleteOrder: builder.mutation<DeleteResponse, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;

export default orderApi;