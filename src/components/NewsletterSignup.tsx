import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    // Client-side validation
    if (!email) {
      setError("Please enter an email address.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://clue-analytics-backend.onrender.com/subscribe",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      setSubmitted(true);
      setEmail("");
      console.log("Newsletter Signup:", response.data.message);
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Failed to subscribe. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section bg-blue-50 py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-lg mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-6 text-blue-900">Stay Updated</h3>
          <p className="text-lg text-gray-700 mb-8">
            Subscribe to our newsletter for the latest AI and ML insights.
          </p>
          {submitted ? (
            <motion.p
              className="text-green-600 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              Thank you for subscribing! Check your inbox for updates.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
              {error && (
                <p className="text-red-600 text-sm text-center" role="alert" id="email-error">
                  {error}
                </p>
              )}
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm w-full sm:w-64"
                required
                disabled={isLoading}
                aria-describedby={error ? "email-error" : undefined}
              />
              <button
                type="submit"
                className={`btn sm:w-auto ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label="Subscribe to newsletter"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
