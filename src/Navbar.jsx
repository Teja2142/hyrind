import React, { useState } from "react";
import { Link, useLocation , useNavigate} from "react-router-dom";
import image from "./assets/image.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: #f8fafc;
          color: #0d47a1;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          padding-top: 80px;
        }

        .navbar {
          width: 100%;
          padding: 16px 5%;
          background: linear-gradient(135deg, #0d47a1 0%, #1565c0 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(13, 71, 161, 0.25);
          backdrop-filter: blur(10px);
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .logo {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: fill;
          border: 3px solid rgba(255, 255, 255, 0.3);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .logo:hover {
          transform: scale(1.1) rotate(5deg);
          border-color: rgba(255, 255, 255, 0.8);
        }

        .menu-icon {
          font-size: 28px;
          cursor: pointer;
          user-select: none;
          padding: 8px;
          transition: transform 0.2s ease, color 0.2s ease;
          display: none;
          color: white;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
        }

        .menu-icon:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.2);
        }

        .menu-icon:active {
          transform: scale(0.95);
        }

        .desktop-menu {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .desktop-menu a,
        .desktop-menu .nav-link {
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

        .desktop-menu a::before,
        .desktop-menu .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: white;
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }

        .desktop-menu a:hover,
        .desktop-menu .nav-link:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .desktop-menu a:hover::before,
        .desktop-menu .nav-link:hover::before {
          width: 70%;
        }

        .desktop-menu a.active,
        .desktop-menu .nav-link.active {
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .register-button {
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

        .register-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
          background: #f0f7ff;
        }

        .register-button:active {
          transform: translateY(0);
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          z-index: 998;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          backdrop-filter: blur(4px);
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 300px;
          max-width: 85vw;
          height: 100vh;
          background: white;
          padding: 90px 24px 24px;
          z-index: 999;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-right: 4px solid #0d47a1;
          overflow-y: auto;
          box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
        }

        .sidebar a,
        .sidebar .nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          margin: 6px 0;
          font-size: 16px;
          color: #0d47a1;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          cursor: pointer;
        }

        .sidebar a:hover,
        .sidebar .nav-link:hover {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          transform: translateX(5px);
          border-color: #0d47a1;
        }

        .sidebar a.active,
        .sidebar .nav-link.active {
          background: linear-gradient(135deg, #0d47a1 0%, #1565c0 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(13, 71, 161, 0.3);
        }

        .sidebar .register-button {
          width: 100%;
          margin-top: 16px;
          padding: 14px 24px;
          font-size: 16px;
        }

        /* Tablet styles */
        @media(max-width: 1024px) {
          .desktop-menu {
            gap: 6px;
          }
          
          .desktop-menu a {
            padding: 10px 14px;
            font-size: 14px;
          }

          .register-button {
            padding: 10px 18px;
            font-size: 14px;
          }
        }

        /* Mobile styles */
        @media(max-width: 768px) {
          .menu-icon { 
            display: block; 
          }
          
          .desktop-menu { 
            display: none; 
          }

          .navbar {
            padding: 14px 20px;
          }

          .logo {
            width: 45px;
            height: 45px;
          }
        }

        @media(max-width: 480px) {
          .navbar {
            padding: 12px 16px;
          }

          .logo {
            width: 40px;
            height: 40px;
          }

          .sidebar {
            padding: 80px 20px 20px;
          }

          .sidebar a {
            padding: 14px 16px;
            font-size: 15px;
          }
        }

        /* Smooth scrollbar for sidebar */
        .sidebar::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .sidebar::-webkit-scrollbar-thumb {
          background: #0d47a1;
          border-radius: 3px;
        }

        .sidebar::-webkit-scrollbar-thumb:hover {
          background: #1565c0;
        }
      `}</style>

      {/* overlay */}
      <div
        className="overlay"
        onClick={closeMenu}
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
        }}
      />

      {/* navbar */}
      <div className="navbar">
        <div className="logo-container">
          <img className="logo" src={image} alt="logo"/>
        </div>

        <div className="desktop-menu">
          <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
          <Link to="/about" className={isActive("/about") ? "active" : ""}>About</Link>
          <Link to="/services" className={isActive("/services") ? "active" : ""}>Services</Link>
          <Link to="/how-it-works" className={isActive("/how-it-works") ? "active" : ""}>How it works?</Link>
          <Link to="/reviews" className={isActive("/reviews") ? "active" : ""}>Reviews</Link>
          <Link to="/Contact" className={isActive("/Contact") ? "active" : ""}>Contact</Link>
          <button className="register-button" onClick={() => navigate("/Register")}> Register Now</button>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {open ? "✖" : "☰"}
        </div>
      </div>

      {/* sidebar */}
      <div
        className="sidebar"
        style={{
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <Link to="/" className={isActive("/") ? "active" : ""} onClick={closeMenu}>
          🏠 Home
        </Link>
        <Link to="/about" className={isActive("/about") ? "active" : ""} onClick={closeMenu}>
          ℹ️ About
        </Link>
        <Link to="/services" className={isActive("/services") ? "active" : ""} onClick={closeMenu}>
          ⚙️ Services
        </Link>
        <Link to="/how-it-works" className={isActive("/how-it-works") ? "active" : ""} onClick={closeMenu}>
          🔧 How it works?
        </Link>
        <Link to="/reviews" className={isActive("/reviews") ? "active" : ""} onClick={closeMenu}>
          ⭐ Reviews
        </Link>
        <Link to="/Contact" className={isActive("/Contact") ? "active" : ""} onClick={closeMenu}>
          📧 Contact
        </Link>
        <button className="register-button" onClick={closeMenu}>Register Now</button>
      </div>
    </>
  );
}