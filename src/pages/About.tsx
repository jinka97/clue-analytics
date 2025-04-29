import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="section bg-white">
      <div className="container">
        {/* Mission Section */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-blue-900">About Clue Analytics</h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Clue Analytics is a premier AI and ML consulting firm dedicated to empowering organizations to unlock the transformative potential of intelligent systems.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            With a team of seasoned engineers, data scientists, and AI strategists, we deliver end-to-end solutions—from AI readiness assessments to custom model development and team upskilling. Our mission is to make AI accessible, actionable, and aligned with your business goals.
          </p>
          <Link to="/contact" className="btn" aria-label="Contact us to learn more">
            Get in Touch
          </Link>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Meet Our Team</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200" aria-hidden="true"></div>
              <h3 className="text-xl font-semibold text-gray-900">Dr. ID</h3>
              <p className="text-gray-600">Chief AI Strategist</p>
              <p className="text-gray-700 mt-2">PhD in ML/CS with 13+ years experience.</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200" aria-hidden="true"></div>
              <h3 className="text-xl font-semibold text-gray-900">M J</h3>
              <p className="text-gray-600">Lead Data Scientist</p>
              <p className="text-gray-700 mt-2">Expert in scalable ML pipelines and predictive analytics.</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200" aria-hidden="true"></div>
              <h3 className="text-xl font-semibold text-gray-900">H A</h3>
              <p className="text-gray-600">AI Training Director</p>
              <p className="text-gray-700 mt-2">Specialises in AI workshops and team upskilling programs.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
