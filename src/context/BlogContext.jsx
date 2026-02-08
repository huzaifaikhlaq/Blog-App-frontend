import { createContext, useState, useEffect } from "react";
import { getAllBlogs } from "../services/blogService";
import { getAllCategories } from "../services/categoryService";

export const BlogContext = createContext();

export default function BlogContextProvider({ children }) {

    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchBlogs();
        fetchCategories();
    }, []);

    const fetchBlogs = async () => {
        try {
            const data = await getAllBlogs();
            setBlogs(data);
        } catch (err) {
            console.error("Error fetching blogs:", err);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };


    return (
        <BlogContext.Provider value={{ blogs, setBlogs, categories, setCategories }}>
            {children}
        </BlogContext.Provider>
    );
}

// =====static blogs =====
// {
//     {
//         id: 1,
//             title: "Team Collaboration Tips",
//                 image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
//                     category: "Technology",
//                 },
//     {
//         id: 2,
//             title: "Startup Ideas to Try",
//                 image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
//                     category: "Startup",
//                 },
//     {
//         id: 3,
//             title: "Digital Design Tools",
//                 image: "https://images.unsplash.com/photo-1760008486655-920728c9ae67?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fERpZ2l0YWwlMjBEZXNpZ24lMjBUb29sc3xlbnwwfHwwfHx8MA%3D%3D",
//                     category: "Lifestyle",
//                 },
//     {
//         id: 4,
//             title: "Investing 101",
//                 image: "https://images.unsplash.com/photo-1653378972336-103e1ea62721?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SW52ZXN0aW5nJTIwMTAxfGVufDB8fDB8fHww",
//                     category: "Finance",
//                 },
// }