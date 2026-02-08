import { useContext, useState } from 'react';
import { BlogContext } from '../context/BlogContext';
import { AuthContext } from '../context/AuthContext';
import { deleteBlog, publishBlog, unpublishBlog } from '../services/blogService';
import { Link } from 'react-router-dom';
import { Edit3, Trash2, Globe, FileText, Search, Plus } from 'lucide-react';

export default function Dashboard() {
    const { blogs, setBlogs } = useContext(BlogContext);
    const { user } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');

    const getAuthorId = (blog) => typeof blog.author === 'object' ? blog.author._id : blog.author;

    const viewableBlogs = blogs.filter((blog) => {
        if (user?.role === 'admin') return true;
        return getAuthorId(blog) === user._id;
    });

    const publishedCount = viewableBlogs.filter((b) => b.published).length;
    const unpublishedCount = viewableBlogs.filter((b) => !b.published).length;

    const filteredBlogs = viewableBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (blog) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            await deleteBlog(blog._id);
            setBlogs(blogs.filter((b) => b._id !== blog._id));
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    const togglePublish = async (blog) => {
        try {
            if (blog.published) {
                await unpublishBlog(blog._id);
            } else {
                await publishBlog(blog._id);
            }
            setBlogs(blogs.map((b) => b._id === blog._id ? { ...b, published: !b.published } : b));
        } catch (error) {
            console.error("Error toggling publish status:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
                    <Link to="/addBlogs" className="flex items-center justify-center gap-2 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-sm">
                        <Plus size={18} /> New Blog
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Articles</p>
                            <h2 className="text-3xl font-bold text-gray-800">{viewableBlogs.length}</h2>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-full text-blue-500">
                            <FileText size={24} />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Published</p>
                            <h2 className="text-3xl font-bold text-green-600">{publishedCount}</h2>
                        </div>
                        <div className="p-3 bg-green-50 rounded-full text-green-500">
                            <Globe size={24} />
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between sm:col-span-2 lg:col-span-1">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Drafts</p>
                            <h2 className="text-3xl font-bold text-yellow-600">{unpublishedCount}</h2>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-full text-yellow-500">
                            <Edit3 size={24} />
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                    {/* Search Bar Area */}
                    <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold text-slate-800">Your Articles</h3>
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* THE RESPONSIVE TABLE */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="hidden md:table-header-group bg-slate-50/50">
                                <tr className="text-slate-500 text-[13px] uppercase tracking-wider font-bold">
                                    <th className="px-6 py-4 text-left">Article Details</th>
                                    <th className="px-6 py-4 text-left">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredBlogs.map((blog) => (
                                    <tr key={blog._id} className="flex flex-col md:table-row hover:bg-slate-50/80 transition-colors">

                                        {/* Article Info */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                                                    <img src={blog.image} alt="" className="h-full w-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-800 line-clamp-1">{blog.title}</div>
                                                    <div className="text-xs text-slate-500 md:hidden mt-1 italic">Title</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Status Badge */}
                                        <td className="px-6 py-2 md:py-4">
                                            <div className="flex items-center justify-between md:justify-start">
                                                <span className="text-xs text-slate-500 font-medium md:hidden uppercase tracking-widest">Status</span>
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold leading-none ${blog.published ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${blog.published ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                                                    {blog.published ? "Published" : "Draft"}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Action Buttons */}
                                        <td className="px-6 py-4 md:text-right">
                                            <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
                                                <span className="text-xs text-slate-500 font-medium md:hidden uppercase tracking-widest">Controls</span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => togglePublish(blog)}
                                                        className={`p-2 rounded-lg transition-colors ${blog.published ? "text-slate-400 hover:bg-slate-100" : "text-indigo-600 hover:bg-indigo-50"}`}
                                                        title={blog.published ? "Unpublish" : "Publish"}
                                                    >
                                                        <Globe size={19} />
                                                    </button>

                                                    <Link to={`/addBlogs/${blog._id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                        <Edit3 size={19} />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(blog)}
                                                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={19} />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredBlogs.length === 0 && (
                        <div className="p-20 text-center">
                            <FileText size={48} className="mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-500 font-medium">No articles found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}