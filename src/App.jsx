import React from 'react';
// Import BrowserRouter, Routes, and Route
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import Navbar from './Navbar'; 
import Home from './Home';
import About from './About';
import Service from './Services';
import Register from './Register';
import Login from './Login';
import Profile from './Profile'; // Assuming you might have this page too
import PrivacyPolicy from './PrivacyPolicy';
import TermsConditions from './TermsConditions';

function App() {
  return (
    // Use Router wrapper
    <Router>
      <Navbar />
      <main>
        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/apply" element={<Register />} /> {/* Assuming Apply is Register */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsConditions" element={<TermsConditions />} />
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;