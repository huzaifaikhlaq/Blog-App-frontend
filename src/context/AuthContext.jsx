import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const normalizerUser = (user) => {
    if (!user) return null;
    return {
        ...user,
        _id: user._id || user.id,
    };
};

export default function AuthProvider({ children }) {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser
            ? normalizerUser(JSON.parse(storedUser))
            : null;
    });

    const login = (data) => {
        const normalizedUser = normalizerUser(data.user);

        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(normalizedUser));

        setUser(normalizedUser);
    };

    const signup = (data) => {
        const normalizedUser = normalizerUser(data.user);

        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(normalizedUser));

        setUser(normalizedUser);
    };

    const logout = () => {
        sessionStorage.clear();
        setUser(null);

        setTimeout(() => {
            navigate("/", { replace: true });
        }, 0);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
}
