import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">Last updated: April 29, 2025</p>
      <p className="mb-4">
        At Clue Analytics, we value your privacy. This policy explains how we collect, use, and protect your data.
      </p>
      <h2 className="text-xl font-semibold mb-2">Data Collection</h2>
      <p className="mb-4">
        We use Google Analytics to collect anonymous data about your visit, such as pages viewed and time spent on the site. This helps us improve our services.
      </p>
      <h2 className="text-xl font-semibold mb-2">Cookies</h2>
      <p className="mb-4">
        We use cookies to enable Google Analytics tracking. You can accept or decline cookies via the popup on our site. Declining cookies will prevent tracking.
      </p>
      <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
      <p className="mb-4">
        For questions about this policy, contact us at <a href="mailto:clueanalytics7@gmail.com" className="underline">clueanalytics7@gmail.com</a>.
      </p>
      <p className="mt-8">
        <a href="#/" className="underline">Back to Home</a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
