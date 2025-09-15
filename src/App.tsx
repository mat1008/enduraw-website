import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import TestingPage from './pages/services/TestingPage';
import EndurawPerformanceCenterPage from './pages/services/PerformanceCenterPage';
import AthleteSupportPage from './pages/services/AthleteSupportPage';
import PacingPlanPage from './pages/services/PacingPlanPage';
import EndurawReportPage from './pages/services/EndurawReportPage';
import EndurawDashboardPage from './pages/services/EndurawDashboardPage';
import EndurawAPIPage from './pages/services/EndurawAPIPage';
import AdminPage from './pages/AdminPage';
import BookingSuccessPage from './pages/BookingSuccessPage';

function App() {
  const [activeSection, setActiveSection] = useState<string>('');

  const handleScrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    
    // Reset after scrolling is complete
    setTimeout(() => setActiveSection(''), 1000);
  }, []);

  return (
    <Router>
      <div className="App min-h-screen bg-dark-bg">
        <ScrollToTop />
        <Navigation onScrollToSection={handleScrollToSection} />
        <Routes>
          <Route 
            path="/" 
            element={<HomePage activeSection={activeSection} />} 
          />
          <Route path="/news" element={<NewsPage />} />
          <Route 
            path="/services" 
            element={<ServicesPage activeSection={activeSection} />} 
          />
          <Route path="/services/testing" element={<TestingPage />} />
          <Route path="/endurawperformancecenter" element={<EndurawPerformanceCenterPage />} />
          <Route path="/services/athlete-support" element={<AthleteSupportPage />} />
          <Route path="/services/pacing-plan" element={<PacingPlanPage />} />
          <Route path="/services/enduraw-report" element={<EndurawReportPage />} />
          <Route path="/services/enduraw-dashboard" element={<EndurawDashboardPage />} />
          <Route path="/services/enduraw-api" element={<EndurawAPIPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/booking-success" element={<BookingSuccessPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
