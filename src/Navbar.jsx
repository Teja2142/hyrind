import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import image from "./assets/image.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);
  const toggleProfileDropdown = () => setProfileDropdownOpen(!profileDropdownOpen);
  const closeProfileDropdown = () => setProfileDropdownOpen(false);
  const toggleMoreDropdown = () => setMoreDropdownOpen(!moreDropdownOpen);
  const closeMoreDropdown = () => setMoreDropdownOpen(false);

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
      if (moreDropdownOpen && !event.target.closest('.more-container')) {
        closeMoreDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen, moreDropdownOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    closeMenu();
    closeMoreDropdown();
  }, [location.pathname]);

  return (
    <>
      <style>{`
        .navbar-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 40;
          transition: opacity 0.3s;
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
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          position: sticky;
          top: 0;
          z-index: 50;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 60px;
          transition: all 0.3s ease;
        }

        @media (min-width: 768px) {
          .navbar-content {
            height: 70px;
          }
        }

        .navbar-logo img {
          height: 46px;
          width: auto;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @media (min-width: 768px) {
          .navbar-logo img {
            height: 56px;
          }
        }

        .navbar-logo img:hover {
          transform: scale(1.08);
        }

        .navbar-desktop {
          display: none;
          align-items: center;
          gap: 1.75rem;
        }

        @media (min-width: 768px) {
          .navbar-desktop {
            display: flex;
          }
        }

        .nav-link {
          padding: 0.6rem 0.8rem;
          border-radius: 0.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          color: #4b5563;
          position: relative;
        }

        .nav-link:hover {
          color: #2563eb;
          background-color: #f3f4f6;
          transform: translateY(-1px);
        }

        .nav-link.active {
          color: #2563eb;
          background-color: #eff6ff;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 1rem;
          right: 1rem;
          height: 3px;
          background-color: #2563eb;
          border-radius: 3px;
        }

        .register-btn {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 0.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
        }

        .register-btn:hover {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
        }

        .profile-container, .more-container {
          position: relative;
        }

        .profile-button, .more-button {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.4rem 0.6rem;
          border-radius: 0.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #4b5563;
          background: none;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .profile-button:hover, .more-button:hover {
          background-color: #f3f4f6;
          border-color: #e5e7eb;
        }

        .profile-icon {
          font-size: 1.25rem;
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

        .profile-dropdown, .more-dropdown {
          position: absolute;
          right: 0;
          margin-top: 1.5rem;
          width: 17rem;
          background-color: white;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          padding: 0.5rem;
          border: 1px solid rgba(0, 0, 0, 0.08);
          max-height: 500px;
          overflow-y: auto;
          z-index: 60;
          animation: dropdownSlideIn 0.2s ease-out;
        }

        @keyframes dropdownSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-header {
          padding: 0.75rem 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #f3f4f6;
        }

        .dropdown-item {
          width: 100%;
          text-align: left;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #4b5563;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: block;
          border-radius: 0.5rem;
          margin-bottom: 2px;
        }

        .dropdown-item:hover {
          background-color: #eff6ff;
          color: #2563eb;
        }

        .dropdown-item.logout {
          color: #dc2626;
        }

        .dropdown-item.logout:hover {
          background-color: #fef2f2;
        }

        .mobile-menu-button {
          display: block;
          font-size: 1.5rem;
          padding: 0.5rem;
          color: #374151;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }

        @media (min-width: 768px) {
          .mobile-menu-button {
            display: none;
          }
        }

        .mobile-menu-button:hover {
          color: #2563eb;
        }

        .mobile-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          height: 100%;
          width: 16rem;
          background-color: white;
          box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
          z-index: 50;
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
          overflow-y: auto;
        }

        .mobile-sidebar.open {
          transform: translateX(0);
        }

        .mobile-sidebar-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding-bottom: 2rem;
        }

        .mobile-close-button {
          display: flex;
          justify-content: flex-end;
          padding: 1rem;
        }

        .close-btn {
          font-size: 1.5rem;
          color: #374151;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }

        .close-btn:hover {
          color: #dc2626;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0 1rem;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          transition: all 0.2s;
          text-decoration: none;
          color: #374151;
        }

        .mobile-nav-link:hover {
          background-color: #f9fafb;
        }

        .mobile-nav-link.active {
          background-color: #eff6ff;
          color: #2563eb;
        }

        .mobile-section-header {
          padding: 0.75rem 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 1rem;
        }

        .mobile-profile-section {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        .mobile-profile-card {
          background-color: #f9fafb;
          border-radius: 0.375rem;
          padding: 1rem;
          margin-bottom: 0.5rem;
        }

        .mobile-profile-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .mobile-profile-title {
          font-weight: 500;
          color: #111827;
        }

        .mobile-profile-subtitle {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .mobile-profile-button {
          width: 100%;
          text-align: left;
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          color: #374151;
          background: none;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .mobile-profile-button:hover {
          background-color: #f3f4f6;
        }

        .mobile-logout-button {
          width: 100%;
          text-align: left;
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          color: #dc2626;
          background: none;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .mobile-logout-button:hover {
          background-color: #fef2f2;
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
              <Link to="/services" className={`nav-link ${isActive("/services") ? "active" : ""}`}>
                Services
              </Link>
              <Link to="/how-it-works" className={`nav-link ${isActive("/how-it-works") ? "active" : ""}`}>
                How it works?
              </Link>
              <Link to="/reviews" className={`nav-link ${isActive("/reviews") ? "active" : ""}`}>
                Reviews
              </Link>
              <a href="https://merchant.razorpay.com/policy/Rn2giKHxuBBdz0/contact_us" target="_blank" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>
                Contact
              </a>

              {/* More Dropdown */}
              <div className="more-container">
                <button onClick={toggleMoreDropdown} className="more-button">
                  <span>More</span>
                  <svg
                    className={`dropdown-arrow ${moreDropdownOpen ? "rotate" : ""}`}
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

                {moreDropdownOpen && (
                  <div className="more-dropdown">
                    <div className="dropdown-header">Additional</div>
                    <Link to="/interest" onClick={closeMoreDropdown} className="dropdown-item">
                      Interest
                    </Link>
                    <div className="dropdown-header" style={{ marginTop: '0.5rem' }}>For Recruiters</div>
                    <Link to="/recruiter-register" onClick={closeMoreDropdown} className="dropdown-item">
                      Recruiter Register
                    </Link>
                    <Link to="/recruiter-login" onClick={closeMoreDropdown} className="dropdown-item">
                      Recruiter Login
                    </Link>
                    <div className="dropdown-header" style={{ marginTop: '0.5rem' }}>Admin</div>
                    <Link to="/admin-login" onClick={closeMoreDropdown} className="dropdown-item">
                      Admin Login
                    </Link>
                  </div>
                )}
              </div>

              {!localStorage.getItem("accessToken") ? (
                <button
                  onClick={() => navigate("/register")}
                  className="register-btn"
                >
                  Register Now
                </button>
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
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item logout"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button onClick={toggleMenu} className="mobile-menu-button">
              {open ? "✖" : "☰"}
            </button>
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
            <Link
              to="/services"
              onClick={closeMenu}
              className={`mobile-nav-link ${isActive("/services") ? "active" : ""}`}
            >
              <span>⚙️</span>
              <span>Services</span>
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
              to="/contact"
              onClick={closeMenu}
              className={`mobile-nav-link ${isActive("/contact") ? "active" : ""}`}
            >
              <span>📧</span>
              <span>Contact</span>
            </Link>

            <div className="mobile-section-header">Additional</div>
            <Link
              to="/interest"
              onClick={closeMenu}
              className={`mobile-nav-link ${isActive("/interest") ? "active" : ""}`}
            >
              <span>💡</span>
              <span>Interest</span>
            </Link>

            <div className="mobile-section-header">For Recruiters</div>
            <Link
              to="/recruiter-register"
              onClick={closeMenu}
              className={`mobile-nav-link ${isActive("/recruiter-register") ? "active" : ""}`}
            >
              <span>✍️</span>
              <span>Recruiter Register</span>
            </Link>
            <Link
              to="/recruiter-login"
              onClick={closeMenu}
              className={`mobile-nav-link ${isActive("/recruiter-login") ? "active" : ""}`}
            >
              <span>🔑</span>
              <span>Recruiter Login</span>
            </Link>

            <div className="mobile-section-header">Admin</div>
            <Link
              to="/admin-login"
              onClick={closeMenu}
              className={`mobile-nav-link ${isActive("/admin-login") ? "active" : ""}`}
            >
              <span>🛡️</span>
              <span>Admin Login</span>
            </Link>

            {!localStorage.getItem("accessToken") && (
              <button
                onClick={() => {
                  closeMenu();
                  navigate("/register");
                }}
                className="register-btn"
                style={{ marginTop: '1rem' }}
              >
                Register Now
              </button>
            )}

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