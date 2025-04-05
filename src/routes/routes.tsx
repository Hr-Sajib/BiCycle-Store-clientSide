import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import AllProducts from "@/pages/product/AllProducts";
import Home from "@/pages/home/Home";
import Checkout from "@/pages/checkOut/Checkout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

const router = createBrowserRouter([
    {

        path:"/",
        element:<App/>,
        children:[
            {
                path:"login",
                element:<Login/>,
            },
            {
                path:"register",
                element:<Register/>,
            },
            {
                index:true,
                element:<Home/>,
            },
        ]
    },
    {
        path:"allProducts",
        element:<AllProducts/>,
    },
    {
        path:"checkOut",
        element:<ProtectedRoute><Checkout/></ProtectedRoute>,
    },

    // admin app route 
    // {
    //     path:"/admin",
    //     element:<App/>,
    //     children: routeGenerator(adminRoutes)
    // },

    // faculty app route 
    // {
    //     path:"/faculty",
    //     element:<App/>,
    //     children: routeGenerator(facultyRoutes)
    // },
    // // student app route 
    // {
    //     path:"/student",
    //     element:<App/>,
    //     children: routeGenerator(studentRoutes)
    // },
    
])

export default router;