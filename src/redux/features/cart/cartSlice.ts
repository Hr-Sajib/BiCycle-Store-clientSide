import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Define the CartItem interface
export interface CartItem {
  productId: string;
  quantity: number;
}

// Define the state type for cart
type TCartState = {
  cart: CartItem[];
};

// Initial state
const initialState: TCartState = {
  cart: [],
};

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.cart.find((i) => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cart.push(item);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.productId !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.cart.find((i) => i.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

// Export actions and reducer
export const { setCart, addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

// Selector
export const selectCart = (state: RootState) => state.cart.cart;