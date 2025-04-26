import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import NewsletterSignup from "./components/NewsletterSignup";

export default function App() {
  return (
    <main className="flex-grow space-y-32 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <HeroSection />
      <ServicesSection />
      <NewsletterSignup />
    </main>
  );
}
