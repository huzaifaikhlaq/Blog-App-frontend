import { Link } from 'react-router-dom';

export default function Header({ toggleSidebar }) {
    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm mb-6">

            {/* Mobile Menu Button */}
            <button className="md:hidden text-2xl" onClick={toggleSidebar}>
                ☰
            </button>

            <h1 className="text-xl font-semibold">QuickBlog Dashboard</h1>


        </div>
    );
}
