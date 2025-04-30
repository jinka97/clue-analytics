import React from 'react';

const RetailPersonalization: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
          Retail Chain Personalization - Case Study
        </h1>
        <div className="prose prose-lg max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
          <p>
            Clue Analytics partnered with a mid-sized regional retail chain to revolutionize their customer engagement using AI.
          </p>
          <h2>Challenge</h2>
          <p>
            The client faced stagnant repeat purchase rates and needed a smarter, personalized shopping experience for customers.
          </p>
          <h2>Solution</h2>
          <p>
            Our team developed and deployed a collaborative filtering recommendation engine, using historical browsing and purchasing data to suggest products dynamically.
          </p>
          <h2>Outcome</h2>
          <p>
            Within 90 days, the retailer achieved:
            <ul>
              <li>22% increase in repeat purchases</li>
              <li>18% higher customer satisfaction scores</li>
              <li>Reduction in inventory overstock by 12%</li>
            </ul>
          </p>
          <h2>Next Steps</h2>
          <p>
            Building on this success, Clue Analytics is now working on predictive inventory management models for the client.
          </p>
        </div>
      </section>
    </div>
  );
};

export default RetailPersonalization;
