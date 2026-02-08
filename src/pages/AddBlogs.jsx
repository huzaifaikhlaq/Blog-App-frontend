import { useState, useRef, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bold, Italic, Underline, List, ListOrdered } from 'lucide-react';
import { BlogContext } from '../context/BlogContext';
import { AuthContext } from '../context/AuthContext';
import { createBlog, updateBlog } from '../services/blogService';
import { createCategory } from '../services/categoryService';
import { createSlug } from '../utils/slug';

export default function AddBlogs() {
    const { categories, setCategories, blogs, setBlogs } = useContext(BlogContext);
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [blogData, setBlogData] = useState({ title: '', description: '', categoryName: '' });
    const [imageFile, setImageFile] = useState(null);
    const [content, setContent] = useState('');
    const editorRef = useRef(null);

    useEffect(() => {
        if (id) {
            const blogToEdit = blogs.find(b => b._id === id);
            if (blogToEdit) {
                setBlogData({
                    title: blogToEdit.title,
                    description: blogToEdit.description,
                    categoryName: categories.find(c => c._id === blogToEdit.category)?.name || ''
                });
                setContent(blogToEdit.content);
                setImageFile(blogToEdit.image);
                if (editorRef.current) editorRef.current.innerHTML = blogToEdit.content;
            }
        }
    }, [id, blogs, categories]);

    const applyFormat = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const handlePublish = async () => {
        if (!blogData.title || !blogData.description || !blogData.categoryName || !imageFile || !content) {
            alert("Please fill all fields!");
            return;
        }
        try {
            let categoryId;
            const existingCat = categories.find(c => c.name.toLowerCase() === blogData.categoryName.toLowerCase());
            if (existingCat) {
                categoryId = existingCat._id;
            } else {
                const newCat = await createCategory({ name: blogData.categoryName });
                categoryId = newCat.category._id;
                setCategories(prev => [...prev, newCat.category]);
            }

            const blogPayload = {
                title: blogData.title,
                description: blogData.description,
                category: categoryId,
                content,
                image: imageFile,
                slug: createSlug(blogData.title),
                published: true,
                author: user._id
            };

            if (id) {
                const updatedBlog = await updateBlog(id, blogPayload);
                setBlogs(blogs.map(b => b._id === id ? { ...b, ...updatedBlog, _id: id } : b));
                alert("Updated successfully!");
            } else {
                const newBlog = await createBlog(blogPayload);
                setBlogs([...blogs, newBlog]);
                alert("Created successfully!");
            }
            navigate('/dashboard');
        } catch (error) {
            alert("Action failed.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-4 px-2 md:p-10">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-5 md:p-8">

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 md:p-8 text-center hover:border-indigo-400 transition cursor-pointer relative overflow-hidden bg-gray-50">
                        {imageFile ? (
                            <div className="relative">
                                <img src={imageFile} alt="Preview" className="w-full max-h-64 object-cover rounded-lg" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition flex items-center justify-center text-white font-medium">Change Image</div>
                            </div>
                        ) : (
                            <div className="py-4">
                                <span className="text-3xl">🖼️</span>
                                <p className="text-sm text-gray-500 mt-2">Click to upload blog cover</p>
                            </div>
                        )}
                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => setImageFile(event.target.result);
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                        <input type="text" value={blogData.title} onChange={(e) => setBlogData(prev => ({ ...prev, title: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Blog title..." />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description</label>
                        <input type="text" value={blogData.description} onChange={(e) => setBlogData(prev => ({ ...prev, description: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Brief summary..." />
                    </div>

                    {/* Rich Editor */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Content</label>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <div className="flex items-center gap-1 bg-gray-50 border-b p-2 flex-wrap">
                                <button type="button" onClick={() => applyFormat('bold')} className="p-2 hover:bg-gray-200 rounded"><Bold size={18} /></button>
                                <button type="button" onClick={() => applyFormat('italic')} className="p-2 hover:bg-gray-200 rounded"><Italic size={18} /></button>
                                <button type="button" onClick={() => applyFormat('underline')} className="p-2 hover:bg-gray-200 rounded"><Underline size={18} /></button>
                                <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block"></div>
                                <button type="button" onClick={() => applyFormat('insertUnorderedList')} className="p-2 hover:bg-gray-200 rounded"><List size={18} /></button>
                                <button type="button" onClick={() => applyFormat('insertOrderedList')} className="p-2 hover:bg-gray-200 rounded"><ListOrdered size={18} /></button>
                            </div>
                            <div ref={editorRef} contentEditable suppressContentEditableWarning className="w-full min-h-[250px] md:h-80 p-4 outline-none overflow-auto bg-white"
                                onInput={(e) => setContent(e.currentTarget.innerHTML)}
                                onFocus={() => { if (editorRef.current.innerHTML === 'Start typing...') editorRef.current.innerHTML = ''; }}
                            >
                                {id ? content : 'Start typing...'}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                        <input type="text" list="cat-list" value={blogData.categoryName} onChange={(e) => setBlogData(prev => ({ ...prev, categoryName: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none" placeholder="e.g. Technology" />
                        <datalist id="cat-list">
                            {categories.map(cat => <option key={cat._id} value={cat.name} />)}
                        </datalist>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end pt-8 mt-8 border-t">
                    <button type="button" onClick={() => navigate('/dashboard')} className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition order-2 sm:order-1">Cancel</button>
                    <button type="button" onClick={handlePublish} className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 shadow-md transition order-1 sm:order-2">
                        {id ? "Update Post" : "Publish Post"}
                    </button>
                </div>
            </div>
        </div>
    );
}