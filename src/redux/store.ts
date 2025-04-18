import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage for web
import authReducer from "./features/auth/authSlice"; // Adjust path
import productReducer from "./features/products/productSlice"; // Adjust path
import cartReducer from "./features/cart/cartSlice"; // Adjust path
import userReducer from "./features/user/userSlice"; // Adjust path
import allUserReducer from "./features/user/allUserSlice"; // Adjust path
import orderReducer from "./features/order/orderSlice"; // Import order reducer (adjust path)
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Persistence configuration for auth
const persistConfigAuth = {
  key: "auth",
  storage,
};

// Persistence configuration for products
const persistConfigProducts = {
  key: "products",
  storage,
};

// Persistence configuration for cart
const persistConfigCart = {
  key: "cart",
  storage,
};

// Persistence configuration for user
const persistConfigUser = {
  key: "user",
  storage,
};

// Persistence configuration for allUsers
const persistConfigAllUsers = {
  key: "allUsers",
  storage,
};

// Persistence configuration for orders
const persistConfigOrders = {
  key: "orders",
  storage,
};

// Wrap reducers with persistReducer
const persistedAuthReducer = persistReducer(persistConfigAuth, authReducer);
const persistedProductReducer = persistReducer(persistConfigProducts, productReducer);
const persistedCartReducer = persistReducer(persistConfigCart, cartReducer);
const persistedUserReducer = persistReducer(persistConfigUser, userReducer);
const persistedAllUserReducer = persistReducer(persistConfigAllUsers, allUserReducer);
const persistedOrderReducer = persistReducer(persistConfigOrders, orderReducer); // Wrap order reducer

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // RTK Query reducer (not persisted)
    auth: persistedAuthReducer,
    products: persistedProductReducer,
    cart: persistedCartReducer,
    user: persistedUserReducer,
    allUsers: persistedAllUserReducer,
    orders: persistedOrderReducer, // Add persisted order reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);