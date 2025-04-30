import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight relative z-10 !text-white text-shadow-md">
          AI & ML Consulting That Drives Real Results
        </h2>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 opacity-95 relative z-10 !text-white text-shadow-sm">
          We help organizations harness the power of intelligent systems through expert strategy, development, and hands-on implementation.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-lg relative z-10"
          aria-label="Book a free consultation"
        >
          Book a Free Consultation
        </Link>
      </div>
    </section>
  );
}


