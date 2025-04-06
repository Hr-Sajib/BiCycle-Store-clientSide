import { baseApi } from "../../api/baseApi";

// Define the TProducts type
type TProducts = {
  productId: string;
  quantity: number;
}[];

// Define the Order interface
export interface Order {
  userId: string; 
  userEmail: string;
  products: TProducts;
  totalPrice: number;
  address: string;
  contactNumber: string;
  status: "unpaid" | "paid" | "progressing" | "delivered";
}

// Define response shapes
interface OrderResponse {
  success: boolean;
  data: Order;
}

interface OrdersResponse {
  success: boolean;
  data: Order[];
}

// Define the orderApi
const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new order (POST /orders/)
    createOrder: builder.mutation<OrderResponse, Partial<Order>>({
      query: (orderData) => ({
        url: "/orders/",
        method: "POST",
        body: orderData,
      }),
    }),

    // Get all orders (GET /orders/)
    getAllOrders: builder.query<OrdersResponse, void>({
      query: () => ({
        url: "/orders/",
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
    updateOrder: builder.mutation<OrderResponse, { orderId: string; data: Partial<Order> }>({
      query: ({ orderId, data }) => ({
        url: `/orders/${orderId}`,
        method: "PATCH",
        body: data,
      }),
    }),

    // Delete an order by ID (DELETE /orders/:orderId)
    deleteOrder: builder.mutation<{ success: boolean }, string>({
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