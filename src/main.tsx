import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import App from './App';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Admin from './pages/Admin';
import UseCases from './pages/UseCases';
import './styles/global.css';

// Dynamically import case study pages
const RetailPersonalization = React.lazy(() => import('./pages/case-studies/RetailPersonalization'));
const HealthcarePredictiveRisk = React.lazy(() => import('./pages/case-studies/HealthcarePredictiveRisk'));
const SmartAgricultureForecasting = React.lazy(() => import('./pages/case-studies/SmartAgricultureForecasting'));
const EducationalEngagementAI = React.lazy(() => import('./pages/case-studies/EducationalEngagementAI'));
const RestaurantEfficiencyAI = React.lazy(() => import('./pages/case-studies/RestaurantEfficiencyAI'));
const Fun = React.lazy(() => import('./pages/Fun'));

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
            <Route path="/fun" element={<Fun />} />
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
