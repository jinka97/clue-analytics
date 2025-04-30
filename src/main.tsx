import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import App from "./App";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Admin from "./pages/Admin";
import UseCases from "./pages/UseCases";
import RetailPersonalization from "./pages/case-studies/RetailPersonalization";
import HealthcarePredictiveRisk from "./pages/case-studies/HealthcarePredictiveRisk";
import SmartAgricultureForecasting from "./pages/case-studies/SmartAgricultureForecasting";
import EducationalEngagementAI from "./pages/case-studies/EducationalEngagementAI";
import RestaurantEfficiencyAI from "./pages/case-studies/RestaurantEfficiencyAI";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/case-studies">
              <Route index element={<UseCases />} />
              <Route path="retail-personalization" element={<RetailPersonalization />} />
              <Route path="healthcare-predictive-risk" element={<HealthcarePredictiveRisk />} />
              <Route path="smart-agriculture-forecasting" element={<SmartAgricultureForecasting />} />
              <Route path="educational-engagement-ai" element={<EducationalEngagementAI />} />
              <Route path="restaurant-efficiency-ai" element={<RestaurantEfficiencyAI />} />
            </Route>
          </Routes>
        </Layout>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
