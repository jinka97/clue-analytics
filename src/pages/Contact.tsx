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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      console.log("Contact Form Submitted:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setError("");
    } else {
      setError("Please fill out all fields.");
    }
  };

  return (
    <div className="section bg-white">
      <div className="container">
        <motion.div
          className="max-w-lg mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-blue-900">Contact Us</h1>
          <p className="text-lg text-gray-700 mb-8">
            Have questions, proposals, or ready to start your AI journey? We’re here to help.
          </p>

          {submitted ? (
            <motion.p
              className="text-green-600 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              Thank you for reaching out! We’ll get back to you soon.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              {error && (
                <p className="text-red-600 text-sm text-center" role="alert">
                  {error}
                </p>
              )}
              <div>
                <label htmlFor="name" className="block mb-1 font-medium text-gray-900">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  required
                  aria-describedby={error && "name-error"}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 font-medium text-gray-900">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  required
                  aria-describedby={error && "email-error"}
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1 font-medium text-gray-900">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  required
                  aria-describedby={error && "message-error"}
                />
              </div>
              <button
                type="submit"
                className="btn w-full sm:w-auto"
                aria-label="Send message"
              >
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
