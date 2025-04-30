import { useEffect } from 'react';

const Analytics: React.FC = () => {
  const loadGoogleAnalytics = () => {
    const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID as string | undefined;
    if (!gaId) {
      console.error('Google Analytics ID is not defined in .env');
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(script2);
  };

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent === 'accepted') {
      loadGoogleAnalytics();
    }

    const handleConsentAccepted = () => {
      loadGoogleAnalytics();
    };

    window.addEventListener('cookieConsentAccepted', handleConsentAccepted);

    return () => {
      window.removeEventListener('cookieConsentAccepted', handleConsentAccepted);
    };
  }, []);

  return null;
};

export default Analytics;
