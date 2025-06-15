import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-center">Clue Analytics</h4>
            <p className="text-gray-400 text-center">Empowering businesses with cutting-edge AI and ML solutions.</p>
          </div>
          <div className="flex space-x-6 mb-4">
            <Link to="/" className="text-gray-300 hover:text-blue-400 transition">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-blue-400 transition">About</Link>
            <Link to="/blog" className="text-gray-300 hover:text-blue-400 transition">Blog</Link>
            <Link to="/case-studies" className="text-gray-300 hover:text-blue-400 transition">Case Studies</Link>
            <Link to="/clueagent" className="text-gray-300 hover:text-blue-400 transition">ClueAgent</Link>
            <Link to="/privacy-policy" className="text-gray-300 hover:text-blue-400 transition">Privacy Policy</Link>
          </div>
          <div className="flex space-x-4 mb-4">
            <a href="https://x.com/ClueAnalytics/" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg className="w-6 h-6 hover:text-blue-400 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/ClueAnalytics/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg className="w-6 h-6 hover:text-blue-400 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="mailto:clueanalytics7@gmail.com" aria-label="Email">
              <svg className="w-6 h-6 hover:text-blue-400 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
            </a>
          </div>
          <div className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Clue Analytics. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
