import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        body {
          background: white;
          color: #0d47a1;
        }

        .navbar {
          width: 100%;
          padding: 15px 20px;
          background: #0d47a1;
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .logo {
          font-size: 22px;
          font-weight: bold;
        }

        .menu-icon {
          font-size: 28px;
          cursor: pointer;
          user-select: none;
          padding: 5px;
          transition: transform 0.2s;
          display: none;
        }

        .desktop-menu {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .desktop-menu a {
          color: white;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 6px;
          transition: background 0.2s;
        }

        .desktop-menu a.active {
          background: rgba(255,255,255,0.2);
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          z-index: 998;
          transition: opacity 0.3s, visibility 0.3s;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          height: 100vh;
          background: white;
          padding: 80px 20px 20px;
          z-index: 999;
          transition: transform 0.3s ease;
          border-right: 3px solid #0d47a1;
        }

        .sidebar a {
          display: block;
          padding: 15px 20px;
          margin: 8px 0;
          font-size: 18px;
          color: #0d47a1;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 500;
        }

        @media(max-width: 768px){
          .menu-icon { display: block; }
          .desktop-menu { display: none; }
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
        <div className="logo">Hyrind</div>

        <div className="desktop-menu">
          <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
          <Link to="/about" className={isActive("/about") ? "active" : ""}>About</Link>
          <Link to="/services" className={isActive("/services") ? "active" : ""}>Services</Link>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link>
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
          boxShadow: open ? "2px 0 10px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <Link to="/" className={isActive("/") ? "active" : ""} onClick={closeMenu}>🏠 Home</Link>
        <Link to="/about" className={isActive("/about") ? "active" : ""} onClick={closeMenu}>ℹ️ About</Link>
        <Link to="/services" className={isActive("/services") ? "active" : ""} onClick={closeMenu}>⚙️ Services</Link>
        <Link to="/contact" className={isActive("/contact") ? "active" : ""} onClick={closeMenu}>📧 Contact</Link>
      </div>
    </>
  );
}
