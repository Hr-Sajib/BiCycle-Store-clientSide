import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store"; // Adjust path

// Define TProducts type for the products array
export type TProducts = {
  productId: string;
  quantity: number;
}[];

// Define the Order interface
export interface TOrder {
  _id: string; // Added for frontend use
  userEmail: string;
  products: TProducts;
  totalPrice: number;
  address: string;
  contactNumber: string;
  status: "unpaid" | "paid" | "progressing" | "delivered";
  createdAt: Date;
  updatedAt: Date;
}

// Define the state type for orders
type TOrderState = {
  orders: TOrder[];
};

// Initial state
const initialState: TOrderState = {
  orders: [],
};

// Create the order slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    },
  },
});

// Export actions and reducer
export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;

// Selectors
export const selectOrders = (state: RootState) => state.orders.orders;