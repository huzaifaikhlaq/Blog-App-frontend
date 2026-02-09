import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function RequireAuth({ children }) {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
}