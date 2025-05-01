import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-900 dark:text-blue-300">Clue Analytics</Link>
        <div className="flex items-center space-x-6">
          <div className="space-x-6">
            <Link to="/" className={location.pathname === "/" ? "text-blue-600 font-semibold dark:text-blue-400" : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"}>Home</Link>
            <Link to="/about" className={location.pathname === "/about" ? "text-blue-600 font-semibold dark:text-blue-400" : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"}>About</Link>
            <Link to="/blog" className={location.pathname === "/blog" ? "text-blue-600 font-semibold dark:text-blue-400" : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"}>Blog</Link>
            <Link to="/case-studies" className={location.pathname === "/case-studies" ? "text-blue-600 font-semibold dark:text-blue-400" : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"}>Case Studies</Link>
            <Link to="/contact" className={location.pathname === "/contact" ? "text-blue-600 font-semibold dark:text-blue-400" : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"}>Contact</Link>
            <Link to="/fun" className={location.pathname === "/fun" ? "text-blue-600 font-semibold dark:text-blue-400" : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"}>Fun</Link>
          </div>
          <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
            {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}




