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
import PaymentSuccess from "@/pages/checkOut/PaymentSuccess";
import PaymentFailed from "@/pages/checkOut/PaymentFailed";
import About from "@/pages/About";
import Overview from "@/pages/dashboard/Overview"; // New component
import Users from "@/pages/dashboard/Users"; // New component
import Products from "@/pages/dashboard/Products"; // New component
import Orders from "@/pages/dashboard/Orders"; // New component

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
        path: "payment-success/:trans_id",
        element: (
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment-fail/:trans_id",
        element: (
          <ProtectedRoute>
            <PaymentFailed />
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
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
      {
        path: "allProducts",
        element: <AllProducts />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "allProducts/productDetails/:productId",
        element: <ProductDetails />,
      },
    ],
  },
]);

export default router;