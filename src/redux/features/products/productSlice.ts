import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Define the BicycleType enum
export enum BicycleType {
  Mountain = "Mountain",
  Road = "Road",
  Hybrid = "Hybrid",
  BMX = "BMX",
  Electric = "Electric",
}

// Define the Product interface
export interface TProduct {
  _id: string
  name: string;
  brand: string;
  price: number;
  image: string;
  type: BicycleType;
  description: string;
  quantity: number;
  inStock: boolean;
}

// Define the state type for products
type TProductState = {
  products: TProduct[];
};

// Initial state
const initialState: TProductState = {
  products: [],
};

// Create the product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<TProduct[]>) => {
      state.products = action.payload;
    },
  },
});

// Export actions and reducer
export const { setProducts } = productSlice.actions;
export default productSlice.reducer;

// Selectors
export const selectProducts = (state: RootState) => state.products.products;