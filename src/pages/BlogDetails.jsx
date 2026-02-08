import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";

export default function BlogDetails() {
    const { slug } = useParams();
    const { blogs, categories } = useContext(BlogContext);

    const blog = blogs.find(blog => blog.slug === slug);

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 text-lg font-semibold">
                    Blog not found
                </p>
            </div>
        );
    }

    const categoryName = categories.find(c => c._id === blog.category)?.name;

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Top Bar */}
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">
                        <span className="text-blue-600">Quick</span>blog
                    </h1>

                </div>
            </header>

            {/* Hero Image */}
            <div className="relative">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 text-white">
                    {categoryName && (
                        <span className="inline-block mb-3 px-4 py-1 text-sm rounded-full bg-blue-600">
                            {categoryName}
                        </span>
                    )}

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        {blog.title}
                    </h1>
                </div>
            </div>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 py-12">
                <article className="bg-white rounded-2xl shadow-sm p-8 md:p-10">

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-8">
                        <span>Published on Quickblog</span>
                        <span className="text-blue-600 font-medium">
                            {categoryName}
                        </span>
                    </div>

                    {/* Description */}
                    {blog.description && (
                        <p className="text-xl text-gray-800 font-medium leading-relaxed mb-8">
                            {blog.description}
                        </p>
                    )}

                    {/* Divider */}
                    <div className="w-full h-px bg-gray-200 mb-8"></div>

                    {/* Blog Content */}
                    <div
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    ></div>

                </article>

                {/* Actions */}
                <div className="flex justify-between items-center mt-10">
                    <Link
                        to="/"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        ← Back to blogs
                    </Link>

                </div>
            </main>
        </div>
    );
}
