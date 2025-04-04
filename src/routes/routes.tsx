import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import AllProducts from "@/pages/product/AllProducts";
import Home from "@/pages/home/Home";

const router = createBrowserRouter([
    {
    // root app route 
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