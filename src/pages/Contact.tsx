import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
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

    // Client-side validation
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
    <div className="section bg-white py-16">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-blue-900">
            Contact Us
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Have a question or want to collaborate? Reach out to us, and we’ll get back to you as soon as possible.
          </p>
          {submitted ? (
            <motion.p
              className="text-green-600 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              Thank you for your message! We’ll be in touch soon.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <p className="text-red-600 text-sm text-center" role="alert" id="form-error">
                  {error}
                </p>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  required
                  disabled={isLoading}
                  aria-describedby={error ? "form-error" : undefined}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  required
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                className={`btn w-full sm:w-auto ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
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
