import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import { AuthContext } from "../context/AuthContext";

// Skeleton card for loading 
function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full animate-pulse">
            <div className="h-56 bg-gray-200" />
            <div className="p-5 space-y-4 flex-1">
                <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
                <div className="h-8 bg-gray-200 rounded w-1/3 mt-4" />
            </div>
        </div>
    );
}

export default function Home() {
    const { blogs, categories } = useContext(BlogContext);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    // Filter only published blogs + search
    const filteredBlogs = blogs.filter(
        blog =>
            blog.published &&
            blog.title.toLowerCase().includes(search.toLowerCase())
    );

    const filteredCategories = categories.filter(category =>
        filteredBlogs.some(blog => blog.category === category._id)
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };

    const calculateReadTime = (text) => {
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    const finalBlogs = filteredBlogs.filter(blog => {
        if (activeCategory === "All") return true;
        const catName = categories.find(c => c._id === blog.category)?.name;
        return catName === activeCategory;
    });

    const isLoading = blogs.length === 0;

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">

            {/* 🔹 Sticky Navbar */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">Q</div>
                        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900">
                            Quick<span className="text-blue-600">blog</span>
                        </h1>
                    </div>

                    {user ? (
                        <div className="flex flex-row items-start sm:items-center gap-2 sm:gap-3">
                            <span className="hidden sm:block text-sm text-gray-600">
                                Welcome, <b>{user.name}</b>
                            </span>

                            <Link
                                to="/dashboard"
                                className="w-full sm:w-auto px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition text-center"
                            >
                                Dashboard
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="w-full sm:w-auto px-4 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition text-center"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-row gap-2 sm:gap-3">
                            <Link
                                to="/login"
                                className="w-full sm:w-auto px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition text-center"
                            >
                                Login
                                
                            </Link>
                            <Link
                                to="/signup"
                                className="w-full sm:w-auto px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition text-center whitespace-nowrap"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            {/* 🔹 Hero Section */}
            <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent -z-10" />

                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
                        Read, write, and <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            expand your mind.
                        </span>
                    </h2>

                    <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Discover stories, thinking, and expertise from writers on any topic.
                    </p>

                    <div className="max-w-xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search for articles, topics..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-full shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>
            </section>

            {/* 🔹 Main Content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

                {/* Categories */}
                <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                    <button
                        onClick={() => setActiveCategory("All")}
                        className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${activeCategory === "All"
                            ? "bg-gray-900 text-white shadow-md"
                            : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                    >
                        View All
                    </button>

                    {filteredCategories.map(cat => (
                        <button
                            key={cat._id}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${activeCategory === cat.name
                                ? "bg-gray-900 text-white shadow-md"
                                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

                    {!isLoading && finalBlogs.length > 0 ? (
                        finalBlogs.map(blog => {
                            const categoryName = categories.find(c => c._id === blog.category)?.name;

                            return (
                                <Link
                                    key={blog._id}
                                    to={`/blog/${blog.slug}`}
                                    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-800 rounded-lg shadow-sm">
                                                {categoryName || "General"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">
                                            <span>{formatDate(blog.createdAt)}</span>
                                            <span className="mx-2">•</span>
                                            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">{calculateReadTime(blog.content)} min read</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>

                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                                            {blog.description}
                                        </p>

                                        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold uppercase">
                                                    {blog.author?.name?.charAt(0) || "A"}
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {blog.author?.name || "Unknown"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        !isLoading && (
                            <div className="col-span-full py-20 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No articles found</h3>
                                <p className="text-gray-500 mt-1">Try adjusting your search or category filter.</p>
                                <button
                                    onClick={() => { setSearch(""); setActiveCategory("All"); }}
                                    className="mt-4 text-blue-600 font-medium hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )
                    )}
                </div>
            </section>
        </div>
    );
}
