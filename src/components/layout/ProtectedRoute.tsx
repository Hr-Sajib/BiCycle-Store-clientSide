import { useAppSelector } from "@/redux/hook";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children}:{children : ReactNode}) => {
    const {token} = useAppSelector(state => state.auth);
    console.log(token)
    if(!token){
        return <Navigate to="/login" replace={true}/>
    }

    return children;

};

export default ProtectedRoute;