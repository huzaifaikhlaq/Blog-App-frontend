import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from?.pathname || "/dashboard";

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser({ email, password });
            login(data);
            navigate(redirectTo, { replace: true });
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }

    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
            {error && (
                <p className="absolute top-1/5 text-red-600 text-lg text-center mb-2">{error}</p>
            )}
            <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 relative overflow-hidden">

                {/* Decorative Circle for Fun */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-100 rounded-full animate-pulse opacity-30"></div>

                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Quickblog Login
                </h1>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="relative">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300" />
                    </div>

                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300" />

                        {/* Eye Icon */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600"
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                    </div>


                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 shadow-md transform hover:scale-105 transition duration-300">
                        Login
                    </button>
                </form>

                <p className="text-center text-sm mt-6 text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-600 font-medium hover:underline">
                        Sign up
                    </Link>
                </p>

                {/* Optional small animation at bottom */}
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-100 rounded-full animate-pulse opacity-20"></div>
            </div>
        </div>

    );
}
