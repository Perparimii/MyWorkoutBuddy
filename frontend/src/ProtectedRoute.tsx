import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";


interface ProtectedRouteProps{
    children: ReactNode;
}

function ProtectedRoute({children}: ProtectedRouteProps){

    const token = localStorage.getItem("token");

    if(!token){
         return <Navigate to="/" />;
    }

    return children;

}
export default ProtectedRoute;