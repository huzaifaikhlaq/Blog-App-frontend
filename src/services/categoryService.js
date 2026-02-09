const Base_URL = `${import.meta.env.VITE_API_URL}/api/categories`;

// =====Get all categories==== 
export const getAllCategories = async () => {
    const res = await fetch(Base_URL);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}

// =====Create new Category =====
export const createCategory = async (blogData) => {
    const res = await fetch(Base_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
    });
    if (!res.ok) throw new Error("Failed to create category");
    return res.json();
}      