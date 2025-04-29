import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom"; // Has
import Layout from "./components/Layout";
import App from "./App";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Admin from "./pages/Admin"; 
import CaseStudies from "./pages/CaseStudies";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/case-studies" element={<CaseStudies />} />
        </Routes>
      </Layout>
    </HashRouter>
  </React.StrictMode>
);
