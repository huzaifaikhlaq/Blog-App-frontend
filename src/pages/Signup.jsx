import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { signupUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("author");
    const [error, setError] = useState("");
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from?.pathname || "/dashboard";

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await signupUser({ name, email, password, role });
            signup(data);
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(err.message);
            console.log("signup failed", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 relative flex items-center justify-center px-6">
            {error && (
                <p className="absolute top-1/5 text-red-600 text-lg text-center mb-2">{error}</p>
            )}

            <div className="bg-white shadow rounded-lg w-full max-w-md p-8">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Create Account
                </h1>

                <form onSubmit={handleSignup} className="space-y-4">
                    {/* Name */}
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                    />

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                    />

                    {/* Role Selection */}
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                    >
                        <option value="author">Author</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
