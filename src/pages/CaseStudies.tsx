import React from 'react';
import { Link } from 'react-router-dom';

const CaseStudies: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          AI & ML Case Studies
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Discover how Clue Analytics leverages AI and Machine Learning to drive transformative results across industries. From large enterprises to small businesses, our solutions empower organizations to innovate, optimize, and grow.
        </p>
      </section>

      {/* Case Studies Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Case Study 1: Healthcare (Large Business) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Healthcare: Improving Patient Outcomes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A large hospital network struggled with predicting patient outcomes for chronic disease management, leading to inefficiencies in resource allocation.
            </p>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              How Clue Analytics Helped
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We developed an AI-driven predictive model that analyzed patient data to forecast health risks with 92% accuracy. This allowed the hospital to prioritize high-risk patients, optimize staff scheduling, and reduce readmission rates by 15%.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Get in Touch
            </Link>
          </div>

          {/* Case Study 2: Retail (Small Business) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Retail: Smart Inventory Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A small retail store faced challenges with overstocking and stockouts, resulting in lost sales and increased costs.
            </p>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              How Clue Analytics Helped
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We implemented an ML-based inventory forecasting system that analyzed sales patterns and seasonal trends. The system reduced stockouts by 30% and cut excess inventory costs by 25%, boosting overall profitability.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Get in Touch
            </Link>
          </div>

          {/* Case Study 3: Finance (Domain-Specific) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Finance: Fraud Detection
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A mid-sized financial institution was losing revenue due to undetected fraudulent transactions, impacting customer trust.
            </p>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              How Clue Analytics Helped
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We deployed an AI-powered fraud detection system that analyzed transaction patterns in real-time, flagging anomalies with 98% accuracy. This reduced fraudulent losses by 40% and improved customer satisfaction.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center max-w-4xl mx-auto px-4 mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Ready to Transform Your Business?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Let Clue Analytics help you unlock the power of AI and ML for your organization. Contact us today to discuss your needs and start your journey toward innovation.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default CaseStudies;
