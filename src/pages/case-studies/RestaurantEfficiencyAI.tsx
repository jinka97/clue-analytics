import React from 'react';

const RestaurantEfficiencyAI: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
          Restaurant Efficiency AI - Case Study
        </h1>
        <div className="prose prose-lg max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
          <p>
            Clue Analytics partnered with a regional restaurant chain to streamline operations and enhance customer satisfaction using AI.
          </p>
          <h2>Challenge</h2>
          <p>
            The restaurant chain struggled with overstaffing during slow periods, understaffing during peak times, and significant food waste due to inaccurate inventory predictions.
          </p>
          <h2>Solution</h2>
          <p>
            We developed AI models that analyzed historical sales data, customer footfall patterns, and seasonal trends to optimize staffing schedules and inventory management. The system also provided real-time recommendations for menu adjustments.
          </p>
          <h2>Outcome</h2>
          <p>
            Within four months, the restaurant chain achieved:
            <ul>
              <li>25% reduction in food waste</li>
              <li>15% improvement in staff utilization</li>
              <li>10% increase in customer satisfaction scores</li>
            </ul>
          </p>
          <h2>Next Steps</h2>
          <p>
            We are now integrating customer feedback analysis to further personalize dining experiences and improve menu offerings.
          </p>
        </div>
      </section>
    </div>
  );
};

export default RestaurantEfficiencyAI;
