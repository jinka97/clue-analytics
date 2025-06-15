import { useState } from "react";
import { motion } from "framer-motion";

export default function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = 'https://europe-west1-clue-analytics.cloudfunctions.net/api';

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    const { name, email, message } = formData;

    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!message) {
      setError("Please enter a message.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      console.log("Contact Form Submission:", data.message);
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-blue-900 dark:text-blue-300">
            About Clue Analytics
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Clue Analytics is a premier AI and ML consulting firm dedicated to empowering organizations to unlock the transformative potential of intelligent systems.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            With a team of seasoned engineers, data scientists, and AI strategists, we deliver end-to-end solutions—from AI readiness assessments to custom model development and team upskilling. Our mission is to make AI accessible, actionable, and aligned with your business goals.
          </p>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-blue-900 dark:text-blue-300">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Have a question or want to collaborate? Reach out to us, and we'll get back to you as soon as possible.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            You can also email us directly at: <a href="mailto:clueanalytics7@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">clueanalytics7@gmail.com</a>
          </p>
          {submitted ? (
            <motion.p
              className="text-green-600 dark:text-green-400 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              Thank you for your message! We'll be in touch soon.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <p className="text-red-600 dark:text-red-400 text-sm text-center" role="alert" id="form-error">
                  {error}
                </p>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  required
                  disabled={isLoading}
                  aria-describedby={error ? "form-error" : undefined}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  required
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
