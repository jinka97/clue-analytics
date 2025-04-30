import HeroSection from "./components/HeroSection.tsx";
import ServicesSection from "./components/ServicesSection.tsx";
import NewsletterSignup from "./components/NewsletterSignup.tsx";
import Analytics from "./components/Analytics.tsx";

export default function App() {
  return (
    <>
      <Analytics />
      <main className="flex-grow space-y-32 pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <HeroSection />
        <ServicesSection />
        <NewsletterSignup />
      </main>
    </>
  );
}



