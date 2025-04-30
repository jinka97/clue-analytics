import React from 'react';

const SmartAgricultureForecasting: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
          Smart Agriculture Forecasting - Case Study
        </h1>
        <div className="prose prose-lg max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
          <p>
            Clue Analytics partnered with an agritech startup to improve crop yield predictions using AI-driven forecasting models.
          </p>
          <h2>Challenge</h2>
          <p>
            The startup needed accurate yield forecasts to optimize planting schedules and resource allocation, but traditional methods were unreliable due to variable weather patterns.
          </p>
          <h2>Solution</h2>
          <p>
            We developed custom machine learning models that integrated weather data, soil health metrics, and satellite imagery to predict crop yields with high precision.
          </p>
          <h2>Outcome</h2>
          <p>
            After implementation, the startup saw:
            <ul>
              <li>30% improvement in yield forecast accuracy</li>
              <li>25% reduction in resource waste</li>
              <li>Increased farmer adoption rates by 40%</li>
            </ul>
          </p>
          <h2>Next Steps</h2>
          <p>
            We are expanding the models to include pest prediction and irrigation optimization for broader agricultural impact.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SmartAgricultureForecasting;
