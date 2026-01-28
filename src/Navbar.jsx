import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import image from "./assets/image.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);
  const toggleProfileDropdown = () => setProfileDropdownOpen(!profileDropdownOpen);
  const closeProfileDropdown = () => setProfileDropdownOpen(false);
  const toggleServicesDropdown = () => setServicesDropdownOpen(!servicesDropdownOpen);
  const closeServicesDropdown = () => setServicesDropdownOpen(false);
  const toggleLoginDropdown = () => setLoginDropdownOpen(!loginDropdownOpen);
  const closeLoginDropdown = () => setLoginDropdownOpen(false);

  // Fetch user data when component mounts or when token changes
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");
      const profileType = localStorage.getItem("profileType");

      if (token) {
        try {
          let apiUrl = "";

          // Determine API endpoint based on profile type
          if (profileType === "Candidate") {
            apiUrl = "http://127.0.0.1:8000/api/users/me/";
          } else if (profileType === "Recruiter") {
            apiUrl = "http://127.0.0.1:8000/api/recruiters/me/";
          } else if (profileType === "Admin") {
            apiUrl = "http://127.0.0.1:8000/api/admin/me/";
          }

          if (apiUrl) {
            const response = await fetch(apiUrl, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });

            if (response.ok) {
              const data = await response.json();
              // Set user name based on available fields
              const name = data.full_name || data.name || data.first_name || data.email?.split('@')[0] || "User";
              setUserName(name);
            } else {
              setUserName("User");
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserName("User");
        }
      } else {
        setUserName("");
      }
    };

    fetchUserData();
  }, [location.pathname]); // Re-fetch when route changes

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("profileType");
    setUserName("");
    closeProfileDropdown();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownOpen && !event.target.closest('.profile-container')) {
        closeProfileDropdown();
      }
      if (servicesDropdownOpen && !event.target.closest('.services-container')) {
        closeServicesDropdown();
      }
      if (loginDropdownOpen && !event.target.closest('.login-container')) {
        closeLoginDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen, servicesDropdownOpen, loginDropdownOpen]);

  useEffect(() => {
    closeMenu();
    closeServicesDropdown();
    closeLoginDropdown();
  }, [location.pathname]);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          padding-top: 80px;
        }

        .navbar-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 40;
          transition: opacity 0.3s;
          backdrop-filter: blur(4px);
        }
        
        .navbar-overlay.visible {
          opacity: 1;
          visibility: visible;
        }
        
        .navbar-overlay.hidden {
          opacity: 0;
          visibility: hidden;
        }

        .navbar {
          width: 100%;
          background: linear-gradient(135deg, #0d47a1 0%, #1565c0 100%);
          color: white;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(13, 71, 161, 0.25);
          backdrop-filter: blur(10px);
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 5%;
        }

        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80px;
          transition: all 0.3s ease;
        }
        .navbar-logo {
          position: absolute;
          left: 2%;
        }
        .navbar-logo img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: fill;
          border: 3px solid rgba(255, 255, 255, 0.3);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .navbar-logo img:hover {
          transform: scale(1.1) rotate(5deg);
          border-color: rgba(255, 255, 255, 0.8);
        }

        .navbar-desktop {
          display: none;
          align-items: center;
          gap: 1.75rem;
          margin-left: auto;
        }

        @media (min-width: 768px) {
          .navbar-desktop {
            display: flex;
            position: absolute;
            right: 2%;
          }
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          padding: 10px 18px;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
          white-space: nowrap;
          cursor: pointer;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0px;
          left: 50%;
          width: 0;
          height: 2px;
          background: white;
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          color: white;
        }

        .nav-link:hover::before {
          width: 70%;
        }

        .nav-link.active {
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          color: white;
        }

        .register-btn {
          background: white;
          color: #0d47a1;
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          white-space: nowrap;
        }

        .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
          background: #f0f7ff;
        }

        .profile-container, .services-container, .login-container {
          position: relative;
        }

        .profile-button, .services-button, .login-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 500;
          color: white;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .profile-button:hover, .services-button:hover, .login-button:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .profile-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0d47a1;
          font-size: 1.25rem;
          border: 2px solid rgba(255, 255, 255, 0.5);
        }

        .user-name {
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dropdown-arrow {
          width: 1rem;
          height: 1rem;
          transition: transform 0.2s;
        }

        .dropdown-arrow.rotate {
          transform: rotate(180deg);
        }

        .profile-dropdown, .services-dropdown, .login-dropdown {
          position: absolute;
          top: calc(100% + 15px);
          right: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          min-width: 240px;
          overflow: hidden;
          z-index: 1001;
          border: 1px solid rgba(0, 71, 161, 0.1);
          animation: dropdownSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes dropdownSlideIn {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-header {
          padding: 12px 20px;
          background: #f8fafc;
          color: #64748b;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dropdown-item {
          width: calc(100% - 16px);
          margin: 4px 8px;
          text-align: left;
          padding: 10px 12px;
          font-size: 14px;
          font-weight: 600;
          color: #334155;
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dropdown-item:hover {
          background-color: #f1f5f9;
          color: #0d47a1;
          transform: translateX(4px);
        }

        .dropdown-item svg {
          color: #94a3b8;
          transition: color 0.2s ease;
        }

        .dropdown-item:hover svg {
          color: #0d47a1;
        }

        .dropdown-item.logout {
          color: #dc2626;
          border-top: 1px solid #f1f5f9;
          margin-top: 8px;
          padding-top: 12px;
        }

        .dropdown-item.logout:hover {
          background-color: #fef2f2;
          color: #dc2626;
        }

        .dropdown-item.logout svg {
          color: #ef4444;
        }

        .mobile-menu-button {
          display: block;
          font-size: 1.5rem;
          padding: 8px;
          color: white;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        @media (min-width: 768px) {
          .mobile-menu-button {
            display: none;
          }
        }

        .mobile-menu-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .mobile-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .mobile-controls {
            display: none;
          }
        }

        .mobile-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 300px;
          max-width: 85vw;
          background-color: white;
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
          z-index: 50;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
          border-left: 4px solid #0d47a1;
        }

        .mobile-sidebar.open {
          transform: translateX(0);
        }

        .mobile-sidebar-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 80px 24px 24px;
        }

        .mobile-close-button {
          position: absolute;
          top: 20px;
          right: 20px;
        }

        .close-btn {
          font-size: 1.5rem;
          color: #0d47a1;
          background: rgba(13, 71, 161, 0.1);
          border: none;
          border-radius: 8px;
          padding: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: rgba(13, 71, 161, 0.2);
          color: #d32f2f;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-radius: 10px;
          transition: all 0.3s ease;
          text-decoration: none;
          color: #0d47a1;
          font-weight: 500;
          font-size: 16px;
        }

        .mobile-nav-link:hover {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          transform: translateX(5px);
        }

        .mobile-nav-link.active {
          background: linear-gradient(135deg, #0d47a1 0%, #1565c0 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(13, 71, 161, 0.3);
        }

        .mobile-section-header {
          padding: 12px 18px;
          font-size: 12px;
          font-weight: 700;
          color: #1565c0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 10px;
          opacity: 0.8;
        }

        .mobile-profile-section {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 2px solid #e0e0e0;
        }

        .mobile-profile-card {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-radius: 10px;
          padding: 16px;
          margin-bottom: 8px;
        }

        .mobile-profile-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mobile-profile-title {
          font-weight: 600;
          color: #0d47a1;
          font-size: 16px;
        }

        .mobile-profile-subtitle {
          font-size: 13px;
          color: #1565c0;
          margin-top: 4px;
        }

        .mobile-profile-button {
          width: 100%;
          text-align: left;
          padding: 12px 18px;
          border-radius: 8px;
          color: #0d47a1;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mobile-profile-button:hover {
          background: rgba(13, 71, 161, 0.05);
        }

        .mobile-logout-button {
          width: 100%;
          text-align: left;
          padding: 12px 18px;
          border-radius: 8px;
          color: #d32f2f;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 12px;
          border-top: 1px solid #e0e0e0;
          margin-top: 4px;
        }

        .mobile-logout-button:hover {
          background: #ffebee;
        }
      `}</style>

      {/* overlay */}
      <div
        className={`navbar-overlay ${open ? "visible" : "hidden"}`}
        onClick={closeMenu}
      />

      {/* navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            {/* Logo */}
            <Link to="/" className="navbar-logo">
              <img src={image} alt="Logo" />
            </Link>

            {/* Desktop Navigation */}
            <div className="navbar-desktop">
              <Link to="/" className={`nav-link ${isActive("/") || isActive("/home") ? "active" : ""}`}>
                Home
              </Link>
              <Link to="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`}>
                About
              </Link>
              {/* Services Dropdown */}
              <div className="services-container">
                <button onClick={toggleServicesDropdown} className="services-button">
                  <span className={isActive("/services") || isActive("/profile-marketing") || isActive("/interview-practice") || isActive("/skills-training") ? "nav-link active" : "nav-link"}>Services</span>
                  <svg
                    className={`dropdown-arrow ${servicesDropdownOpen ? "rotate" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {servicesDropdownOpen && (
                  <div className="services-dropdown" style={{ left: 0, right: 'auto' }}>
                    <div className="dropdown-header">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                      Our Services
                    </div>
                    <Link to="/services#profile-marketing" onClick={closeServicesDropdown} className="dropdown-item">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                      Profile Marketing
                    </Link>
                    <Link to="/services#interview-practice" onClick={closeServicesDropdown} className="dropdown-item">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M9 17.63l.5-.5a4 4 0 0 1 5.66 0l.5.5"></path><path d="M2 11a10 10 0 0 1 20 0"></path></svg>
                      Interview Practice
                    </Link>
                    <Link to="/services#skills-training" onClick={closeServicesDropdown} className="dropdown-item">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3.33 3 6.67 3 10 0v-5"></path></svg>
                      Skills Training
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/how-it-works" className={`nav-link ${isActive("/how-it-works") ? "active" : ""}`}>
                How it works?
              </Link>
              <Link to="/reviews" className={`nav-link ${isActive("/reviews") ? "active" : ""}`}>
                Reviews
              </Link>
              <Link to="/interest" className={`nav-link ${isActive("/interest") ? "active" : ""}`}>
                Contact Us
              </Link>

              {!localStorage.getItem("accessToken") ? (
                <div className="login-container">
                  <button onClick={toggleLoginDropdown} className="register-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>Login / Register</span>
                    <svg
                      className={`dropdown-arrow ${loginDropdownOpen ? "rotate" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {loginDropdownOpen && (
                    <div className="login-dropdown">
                      <div className="dropdown-header">
                        Portal Access
                      </div>
                      <Link to="/login" onClick={closeLoginDropdown} className="dropdown-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        Candidate Login / Register
                      </Link>
                      <Link to="/recruiter-login" onClick={closeLoginDropdown} className="dropdown-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        Recruiter Login / Register
                      </Link>
                      <Link to="/admin-login" onClick={closeLoginDropdown} className="dropdown-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        Admin Login
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="profile-container">
                  <button onClick={toggleProfileDropdown} className="profile-button">
                    <span className="profile-icon">👤</span>
                    <span className="user-name">{userName || "User"}</span>
                    <svg
                      className={`dropdown-arrow ${profileDropdownOpen ? "rotate" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Desktop Dropdown */}
                  {profileDropdownOpen && (
                    <div className="profile-dropdown">
                      <div className="dropdown-header">
                        {userName || "User"}
                      </div>
                      <button
                        onClick={() => {
                          closeProfileDropdown();
                          const profileType = localStorage.getItem('profileType');
                          if (profileType === 'Candidate') {
                            navigate('/profile');
                          } else if (profileType === 'Recruiter') {
                            navigate('/recruiter-dashboard');
                          } else if (profileType === 'Admin') {
                            navigate('/admin');
                          }
                        }}
                        className="dropdown-item"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item logout"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile controls */}
            <div className="mobile-controls">
              {localStorage.getItem("accessToken") && (
                <div className="profile-container">
                  <div onClick={toggleProfileDropdown} className="profile-icon" style={{ cursor: 'pointer' }}>
                    👤
                  </div>
                  {profileDropdownOpen && (
                    <div className="profile-dropdown">
                      <div className="dropdown-header">
                        {userName || "User"}
                      </div>
                      <button
                        onClick={() => {
                          closeProfileDropdown();
                          const profileType = localStorage.getItem('profileType');
                          if (profileType === 'Candidate') {
                            navigate('/profile');
                          } else if (profileType === 'Recruiter') {
                            navigate('/recruiter-dashboard');
                          } else if (profileType === 'Admin') {
                            navigate('/admin');
                          }
                        }}
                        className="dropdown-item"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item logout"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
              <button onClick={toggleMenu} className="mobile-menu-button">
                {open ? "✖" : "☰"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar */}
      <div className={`mobile-sidebar ${open ? "open" : ""}`}>
        <div className="mobile-sidebar-content">
          {/* Close button */}
          <div className="mobile-close-button">
            <button onClick={closeMenu} className="close-btn">
              ✖
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="mobile-nav-links">
            <div className="mobile-section-header">Main Menu</div>
            <Link
              to="/"
              onClick={closeMenu}
              className={`mobile-nav-link ${isActive("/") || isActive("/home") ? "active" : ""}`}
            >
              <span>🏠</span>
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className={`mobile-nav-link ${isActive("/about") ? "active" : ""}`}
            >
              <span>ℹ️</span>
              <span>About</span>
            </Link>
            <div className="mobile-section-header">Services</div>
            <Link
              to="/services#profile-marketing"
              onClick={closeMenu}
              className={`mobile-nav-link ${location.hash === "#profile-marketing" ? "active" : ""}`}
            >
              <span>🎯</span>
              <span>Profile Marketing</span>
            </Link>
            <Link
              to="/services#interview-practice"
              onClick={closeMenu}
              className={`mobile-nav-link ${location.hash === "#interview-practice" ? "active" : ""}`}
            >
              <span>🎤</span>
              <span>Interview Practice</span>
            </Link>
            <Link
              to="/services#skills-training"
              onClick={closeMenu}
              className={`mobile-nav-link ${location.hash === "#skills-training" ? "active" : ""}`}
            >
              <span>🎓</span>
              <span>Skills Training</span>
            </Link>
            <Link
              to="/how-it-works"
              onClick={closeMenu}
              className={`mobile-nav-link ${isActive("/how-it-works") ? "active" : ""}`}
            >
              <span>🔧</span>
              <span>How it works?</span>
            </Link>
            <Link
              to="/reviews"
              onClick={closeMenu}
              className={`mobile-nav-link ${isActive("/reviews") ? "active" : ""}`}
            >
              <span>⭐</span>
              <span>Reviews</span>
            </Link>
            <Link
              to="/interest"
              onClick={closeMenu}
              className={`mobile-nav-link ${isActive("/interest") ? "active" : ""}`}
            >
              <span>📧</span>
              <span>Contact Us</span>
            </Link>

            {!localStorage.getItem("accessToken") ? (
              <>
                <div className="mobile-section-header">Account</div>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={`mobile-nav-link ${isActive("/login") ? "active" : ""}`}
                >
                  <span>👤</span>
                  <span>Candidate Login / Register</span>
                </Link>
                <Link
                  to="/recruiter-login"
                  onClick={closeMenu}
                  className={`mobile-nav-link ${isActive("/recruiter-login") ? "active" : ""}`}
                >
                  <span>💼</span>
                  <span>Recruiter Login / Register</span>
                </Link>
                <Link
                  to="/admin-login"
                  onClick={closeMenu}
                  className={`mobile-nav-link ${isActive("/admin-login") ? "active" : ""}`}
                >
                  <span>🛡️</span>
                  <span>Admin Login</span>
                </Link>
              </>
            ) : null}

            {localStorage.getItem("accessToken") && (
              <div className="mobile-profile-section">
                <div className="mobile-profile-card">
                  <div className="mobile-profile-header">
                    <span style={{ fontSize: '1.5rem' }}>👤</span>
                    <span className="mobile-profile-title">{userName || "User"}</span>
                  </div>
                  <p className="mobile-profile-subtitle">Manage your profile</p>
                </div>
                <button
                  onClick={() => {
                    closeMenu();
                    const profileType = localStorage.getItem('profileType');
                    if (profileType === 'Candidate') {
                      navigate('/profile');
                    } else if (profileType === 'Recruiter') {
                      navigate('/recruiter-dashboard');
                    } else if (profileType === 'Admin') {
                      navigate('/admin');
                    }
                  }}
                  className="mobile-profile-button"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                  className="mobile-logout-button"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}