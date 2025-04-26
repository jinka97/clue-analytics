import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-900">Clue Analytics</Link>
        <div className="space-x-6">
          <Link to="/" className={location.pathname === "/" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition"}>Home</Link>
          <Link to="/about" className={location.pathname === "/about" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition"}>About</Link>
          <Link to="/blog" className={location.pathname === "/blog" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition"}>Blog</Link>
          <Link to="/contact" className={location.pathname === "/contact" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600 transition"}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}
