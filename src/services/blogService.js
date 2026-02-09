const Base_URL = `${import.meta.env.VITE_API_URL}/api/blogs`;

// ===== Get all blogs==== 
export const getAllBlogs = async () => {
    const res = await fetch(Base_URL);
    if (!res.ok) throw new Error("Failed to fetch blogs");
    return res.json();
}

// ====Create new Blog =====
export const createBlog = async (blogData) => {
    const res = await fetch(Base_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
    });
    if (!res.ok) throw new Error("Failed to create blog");
    return res.json();
}

// ====update blog=====
export const updateBlog = async (id, blogData) => {
    const res = await fetch(`${Base_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
    });
    if (!res.ok) throw new Error("Failed to update blog");
    return res.json();
}

// ====Delete blog ====
export const deleteBlog = async (id) => {
    const res = await fetch(`${Base_URL}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete blog");
    return res.json();
}

// ====Publish Blog ====
export const publishBlog = async (id) => {
    const res = await fetch(`${Base_URL}/${id}/publish`, {
        method: "PATCH",
    });
    if (!res.ok) throw new Error("Failed to publish blog");
    return res.json();
}

// =====Unpublish Blog ====
export const unpublishBlog = async (id) => {
    const res = await fetch(`${Base_URL}/${id}/unpublish`, {
        method: "PATCH",
    });
    if (!res.ok) throw new Error("Failed to unpublish blog");
    return res.json();
}