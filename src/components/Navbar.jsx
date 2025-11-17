import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <style>{`
       

        .navbar {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: #ffffff;
          position: sticky;
          top: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          width: 100%;
        }

        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          position: relative;
          flex-direction: row-reverse;
        }

        .brand {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.3s ease;
          z-index: 1001;
          letter-spacing: 1px;
          margin-right: auto;
        }

        .brand:hover {
          transform: scale(1.05);
        }

        .desktop-nav {
          display: none;
          gap: 2.5rem;
          align-items: center;
          margin-left: auto;
          margin-right: 2rem;
        }

        .nav-link {
          color: #e0e0e0;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          cursor: pointer;
          position: relative;
          transition: color 0.3s ease;
          padding: 0.5rem 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #14b8a6, #06b6d4);
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #14b8a6;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .cta-button {
          background: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%);
          color: #ffffff;
          font-weight: 600;
          border-radius: 50px;
          padding: 0.75rem 1.75rem;
          text-decoration: none;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3);
          font-size: 1rem;
          display: inline-block;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(20, 184, 166, 0.5);
        }

        .cta-button:active {
          transform: translateY(0);
        }

        .desktop-cta {
          display: none;
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1001;
          margin-left: 0;
        }

        .hamburger-line {
          width: 30px;
          height: 3px;
          background: linear-gradient(90deg, #14b8a6, #06b6d4);
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        .hamburger.active .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translateY(11px);
        }

        .hamburger.active .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translateY(-11px);
        }

        .mobile-menu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.4s ease;
          opacity: 0;
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          position: absolute;
          top: 100%;
          left: 0;
          width: 80%;
          max-width: 300px;
          box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.3);
        }

        .mobile-menu.open {
          max-height: 600px;
          opacity: 1;
        }

        .mobile-link {
          display: block;
          color: #e0e0e0;
          text-decoration: none;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          font-size: 1.125rem;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .mobile-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: linear-gradient(180deg, #14b8a6, #06b6d4);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .mobile-link:hover {
          background-color: rgba(20, 184, 166, 0.1);
          padding-left: 2rem;
          color: #14b8a6;
        }

        .mobile-link:hover::before {
          transform: translateX(0);
        }

        .mobile-cta {
          display: block;
          text-align: center;
          margin: 1.5rem;
        }

        @media (min-width: 768px) {
          .nav-container {
            flex-direction: row;
          }

          .brand {
            margin-right: 0;
          }

          .desktop-nav {
            display: flex;
          }

          .desktop-cta {
            display: block;
          }

          .hamburger {
            display: none;
          }

          .mobile-menu {
            display: none;
          }
        }

        @media (min-width: 1024px) {
          .nav-container {
            padding: 1.25rem 2rem;
          }

          .brand {
            font-size: 2.25rem;
          }

          .desktop-nav {
            gap: 3rem;
            margin-right: 2.5rem;
          }

          .cta-button {
            padding: 0.75rem 2rem;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="brand" onClick={closeMenu}>
            HYRIND
          </Link>

          <div className="desktop-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>

          <Link to="/apply" className="cta-button desktop-cta">
            Apply Now
          </Link>

          <button
            className={`hamburger ${isOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>
        </div>

        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <Link to="/" className="mobile-link" onClick={closeMenu}>Home</Link>
          <Link to="/about" className="mobile-link" onClick={closeMenu}>About</Link>
          <Link to="/services" className="mobile-link" onClick={closeMenu}>Services</Link>
          <Link to="/blog" className="mobile-link" onClick={closeMenu}>Blog</Link>
          <Link to="/contact" className="mobile-link" onClick={closeMenu}>Contact</Link>
          <div className="mobile-cta">
            <Link to="/apply" className="cta-button" onClick={closeMenu}>
              Apply Now
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;