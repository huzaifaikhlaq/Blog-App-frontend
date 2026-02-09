const Base_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

// ===== SIGNUP =====
export const signupUser = async (userData) => {
    const res = await fetch(`${Base_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to signup");
    }

    return data;
};


// ===== LOGIN =====
export const loginUser = async (credentials) => {
    const res = await fetch(`${Base_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    if (!res.ok) throw new Error("Failed to login");
    return res.json();
};

