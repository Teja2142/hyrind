import React, { useEffect, Suspense, lazy } from 'react';
// Import Routes, Route, and useLocation
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

// Lazy Loaded Page Components
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Service = lazy(() => import('./Services'));
const Register = lazy(() => import('./Register'));
const Login = lazy(() => import('./Login'));
const Profile = lazy(() => import('./Profile'));
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy'));
const TermsConditions = lazy(() => import('./TermsConditions'));
const Admin = lazy(() => import('./Admin'));
const ContactUs = lazy(() => import('./Contact'));
const HowItWorksFlow = lazy(() => import('./HowItWorks'));
const ReviewsPage = lazy(() => import('./ReviewsPage'));
const RecruiterDashboard = lazy(() => import('./RecruiterDashboard'));
const Interest = lazy(() => import('./Intrest'));
const RecruiterRegister = lazy(() => import('./RecruiterRegister'));
const RecruiterLogin = lazy(() => import('./RecruiterLogin'));
const AdminLogin = lazy(() => import('./AdminLogin'));
const ScanAndConnect = lazy(() => import('./ScanAndConnect'));

const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    fontSize: '1.2rem',
    color: '#1e40af'
  }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');

      // Handle lazy loading: component might not be in DOM yet
      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      };

      // Try immediately
      if (!scrollToElement()) {
        // If not found (common with lazy loading), try again after a short delay
        const timer = setTimeout(scrollToElement, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        {/* Define routes with Lazy Loading */}
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/About" element={<About />} />
            <Route path="/services" element={<Service />} />
            <Route path="/apply" element={<Register />} /> {/* Assuming Apply is Register */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/TermsConditions" element={<TermsConditions />} />
            <Route path="/Contact" element={<ContactUs />} />
            <Route path="/how-it-works" element={<HowItWorksFlow />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
            <Route path="/interest" element={<Interest />} />
            <Route path="/recruiter-register" element={<RecruiterRegister />} />
            <Route path="/recruiter-login" element={<RecruiterLogin />} />
            <Route path="/scan-and-connect" element={<ScanAndConnect />} />
            <Route path="*" element={<h2>404: Page Not Found</h2>} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
