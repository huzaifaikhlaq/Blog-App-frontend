import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import AddBlogs from "./pages/AddBlogs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BlogDetails from "./pages/BlogDetails";
import PreventAuth from "./middleware/PreventAuth";
import RequireAuth from "./middleware/RequireAuth";

export default function App() {
  return (
    <Routes>

      {/* Auth pages */}
      <Route path="/login" element={<PreventAuth><Login /></PreventAuth>} />
      <Route path="/signup" element={<PreventAuth><Signup /></PreventAuth>} />

      {/* Public pages */}
      <Route path="/" element={<Home />} />

      {/* Protected pages */}
      <Route path="/blog/:slug" element={<RequireAuth><BlogDetails /></RequireAuth>} />

      <Route path="/*" element={<RequireAuth><Layout /></RequireAuth>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="addBlogs" element={<AddBlogs />} />
        <Route path="addBlogs/:id" element={<AddBlogs />} />
      </Route>

    </Routes>
  );
}
