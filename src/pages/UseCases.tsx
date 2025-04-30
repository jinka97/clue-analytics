import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const useCases = [
  {
    sector: "Retail & E-Commerce",
    headline: "Product Recommendations",
    description: "Boost sales through personalized AI-driven recommendations based on browsing and purchase history.",
  },
  {
    sector: "Healthcare",
    headline: "Predictive Diagnostics",
    description: "Identify high-risk patients early using machine learning models trained on health records and clinical indicators.",
  },
  {
    sector: "Agriculture",
    headline: "Yield Forecasting",
    description: "Optimize planting and resource allocation with weather-based predictive analytics and satellite data.",
  },
  {
    sector: "Education",
    headline: "Student Retention",
    description: "Analyze attendance and performance trends to flag students at risk and suggest timely interventions.",
  },
  {
    sector: "Small Business",
    headline: "Operational Efficiency",
    description: "Automate repetitive tasks such as invoicing, inventory management, and marketing segmentation with ML.",
  },
  {
    sector: "Finance",
    headline: "Fraud Detection",
    description: "Leverage machine learning algorithms to detect unusual financial transactions in real-time.",
  },
];

const caseStudies = [
  {
    title: "Retail Chain Personalization",
    story: "A regional retail chain collaborated with Clue Analytics to implement an AI recommendation system. Personalized shopping experiences led to a 22% increase in repeat purchases within 3 months.",
    link: "/case-studies/retail-personalization",
  },
  {
    title: "Healthcare Predictive Risk",
    story: "A healthcare provider used our machine learning risk models to proactively identify 15% more high-risk patients, improving early intervention outcomes dramatically.",
    link: "/case-studies/healthcare-predictive-risk",
  },
  {
    title: "Smart Agriculture Forecasting",
    story: "An agritech startup improved crop yield forecasts by 30% by leveraging our custom ML models trained on weather and soil datasets.",
    link: "/case-studies/smart-agriculture-forecasting",
  },
  {
    title: "Educational Engagement AI",
    story: "A university partnered with us to predict student dropouts early using AI models — increasing student retention by 18% over a year.",
    link: "/case-studies/educational-engagement-ai",
  },
  {
    title: "Restaurant Efficiency AI",
    story: "A restaurant chain used our AI models to optimize staffing and inventory, reducing food waste by 25% and improving customer satisfaction.",
    link: "/case-studies/restaurant-efficiency-ai",
  },
];

const UseCases: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      {/* Use Cases Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-10">
          AI in Action: Real Use Cases Across Industries
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
          From automating daily operations to predicting customer behavior, AI and machine learning are transforming industries. Here are key sectors where Clue Analytics drives real-world success.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl transition"
            >
              <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-1">
                {item.sector}
              </h2>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {item.headline}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mini Case Studies Section with Swiper Carousel */}
      <section className="bg-blue-50 dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-10">
            Brief Case Studies
          </h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="mySwiper"
          >
            {caseStudies.map((caseStudy, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white dark:bg-gray-900 p-6 shadow-lg rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl transition h-full flex flex-col">
                  <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3">
                    {caseStudy.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 flex-grow">
                    {caseStudy.story}
                  </p>
                  <Link
                    to={caseStudy.link}
                    className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
            >
              Talk to Our Experts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseCases;
