import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PreventAuth({ children }) {
    const { user } = useContext(AuthContext);
    return user ? <Navigate to="/" /> : children;
}
