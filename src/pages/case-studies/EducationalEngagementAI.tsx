import React from 'react';

const EducationalEngagementAI: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
          Educational Engagement AI - Case Study
        </h1>
        <div className="prose prose-lg max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
          <p>
            Clue Analytics worked with a university to leverage AI for improving student retention rates through predictive analytics.
          </p>
          <h2>Challenge</h2>
          <p>
            The university faced high dropout rates due to late identification of at-risk students, impacting overall student success.
          </p>
          <h2>Solution</h2>
          <p>
            We implemented AI models that analyzed attendance, performance trends, and engagement metrics to flag at-risk students early and suggest targeted interventions.
          </p>
          <h2>Outcome</h2>
          <p>
            Over the course of a year, the university achieved:
            <ul>
              <li>18% increase in student retention</li>
              <li>25% improvement in early intervention success rates</li>
              <li>Enhanced student engagement through personalized support</li>
            </ul>
          </p>
          <h2>Next Steps</h2>
          <p>
            We are developing a student-facing dashboard to provide real-time feedback and resources to further support academic success.
          </p>
        </div>
      </section>
    </div>
  );
};

export default EducationalEngagementAI;
