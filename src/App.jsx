<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </>
  );
}
=======
import React , { useEffect } from 'react';
// Import BrowserRouter, Routes, and Route
import { BrowserRouter as Router, Routes, Route , useLocation } from 'react-router-dom'; 


import Navbar from './Navbar'; 
import Home from './Home';
import About from './About';
import Service from './Services';
import Register from './Register';
import Login from './Login';
import Profile from './Profile'; // Assuming you might have this page too
import PrivacyPolicy from './PrivacyPolicy';
import TermsConditions from './TermsConditions';
import Admin from './Admin';
import ContactUs from './Contact';
import HowItWorksFlow from './HowItWorks';
import ReviewsPage from './ReviewsPage';
import RecruiterDashboard from './RecruiterDashboard';
import Interest from './Intrest';
import Footer from './Footer';
import RecruiterRegister from './RecruiterRegister';
import RecruiterLogin from './RecruiterLogin';
import AdminLogin from './AdminLogin';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    // Use Router wrapper
    <Router>
      <ScrollToTop />
      <Navbar />
      <main>
        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
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
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
>>>>>>> 7ef1d77d4afc265b27b9e9f4fb00885373ee2114
