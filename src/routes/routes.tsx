import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import AllProducts from "@/pages/product/AllProducts";
import Home from "@/pages/home/Home";
import Checkout from "@/pages/checkOut/Checkout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import UserDashboard from "@/pages/dashboard/UserDashboard";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import ProductDetails from "@/redux/features/products/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "checkOut",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "userDashboard",
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "adminDashboard",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "allProducts",
        element: <AllProducts />,
      },
      {
        path: "allProducts/productDetails/:productId", // Dynamic route with productId
        element: <ProductDetails />,
      },
    ],
  },
]);

export default router;