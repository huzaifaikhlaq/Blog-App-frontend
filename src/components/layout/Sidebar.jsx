import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LogOut } from 'lucide-react';

export default function Sidebar({ isOpen, closeSidebar }) {
    const { logout } = useContext(AuthContext);

    return (
        <div className={`bg-white shadow-lg h-screen fixed top-0 left-0 p-6 z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 w-64 md:translate-x-0`}>
            <div className="flex justify-between items-center mb-8">
                <Link to="/" className="text-2xl font-bold">QuickBlog</Link>
                <button className="md:hidden text-2xl" onClick={closeSidebar}>✕</button>
            </div>

            <div className='flex flex-col justify-between h-[calc(100%-80px)]'>
                <ul className="space-y-2">
                    <li>
                        <NavLink onClick={closeSidebar} to="/dashboard" className={({ isActive }) => `block p-3 rounded-lg transition-colors ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={closeSidebar} to="/addBlogs" className={({ isActive }) => `block p-3 rounded-lg transition-colors ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}>
                            Add Blogs
                        </NavLink>
                    </li>
                </ul>
                <Link onClick={logout} to="/" className="flex items-center justify-center bg-red-600 text-white font-medium px-4 py-3 rounded-lg hover:bg-red-700 mb-4 transition">
                    <LogOut size={19} className="mr-1 transition-all rotate-180" />  Logout
                </Link>
            </div>
        </div>
    );
    
}