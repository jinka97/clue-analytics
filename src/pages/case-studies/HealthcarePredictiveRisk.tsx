import React from 'react';

const HealthcarePredictiveRisk: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
          Healthcare Predictive Risk - Case Study
        </h1>
        <div className="prose prose-lg max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
          <p>
            Clue Analytics collaborated with a leading healthcare provider to enhance patient care through predictive analytics.
          </p>
          <h2>Challenge</h2>
          <p>
            The healthcare provider struggled to identify high-risk patients early, leading to delayed interventions and increased hospital readmissions.
          </p>
          <h2>Solution</h2>
          <p>
            We developed machine learning models that analyzed electronic health records (EHRs) and clinical indicators to predict patient risk levels with high accuracy. The models flagged 15% more high-risk patients compared to traditional methods.
          </p>
          <h2>Outcome</h2>
          <p>
            Within six months, the provider achieved:
            <ul>
              <li>15% increase in early identification of high-risk patients</li>
              <li>20% reduction in hospital readmissions</li>
              <li>Improved patient satisfaction scores by 10%</li>
            </ul>
          </p>
          <h2>Next Steps</h2>
          <p>
            We are now integrating real-time monitoring capabilities to further enhance the predictive system, enabling proactive care adjustments.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HealthcarePredictiveRisk;
