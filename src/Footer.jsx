import React from "react";
import { FaEnvelope, FaPhone, FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <style>
        {`
          .footer {
            background-color: #0d47a1;
            color: white;
            padding: 50px 30px;
            font-family: Arial, sans-serif;
          }

          .footer-container {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 50px;
            margin-bottom: 30px;
          }

          .footer-column {
            flex: 1;
            min-width: 220px;
          }

          .footer-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 15px;
          }

          .footer-link {
            margin-bottom: 10px;
            font-size: 15px;
          }

          /* FIXED LINK COLOR ISSUE */
          .footer-column a {
            color: #e0e8ff !important;
            text-decoration: none;
            transition: 0.3s;
          }

          .footer-column a:hover {
            color: #ffeb3b !important;
          }

          .qr-box {
            width: 150px;
            height: 150px;
            background: white;
            padding: 10px;
            border-radius: 8px;
          }

          .contact-item {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
            font-size: 15px;
          }

          .social-icons {
            display: flex;
            gap: 15px;
            margin-top: 10px;
          }

          .social-icons svg {
            font-size: 22px;
            cursor: pointer;
            transition: 0.3s;
          }

          .social-icons svg:hover {
            color: #ffeb3b;
          }

          .footer-bottom {
            text-align: center;
            border-top: 1px solid rgba(255,255,255,0.3);
            padding-top: 15px;
            font-size: 14px;
            color: #dce6ff;
          }

          @media (max-width: 768px) {
            .footer-container {
              text-align: center;
            }
            .social-icons {
              justify-content: center;
            }
          }
        `}
      </style>

      <footer className="footer">
        <div className="footer-container">

          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="footer-title">Quick Links</h3>
            <p className="footer-link"><Link to="/">Home</Link></p>
            <p className="footer-link"><Link to="/about">About Us</Link></p>
            <p className="footer-link"><Link to="/#homepage-services">Services</Link></p>
            <p className="footer-link"><Link to="/how-it-works">How it works</Link></p>
            <p className="footer-link"><Link to="/reviews">Reviews</Link></p>
            <p className="footer-link">
              <Link to="/interest">Contact us</Link>
            </p>
          </div>

          {/* Our Solutions */}
          <div className="footer-column">
            <h3 className="footer-title">Our Solutions</h3>
            <p className="footer-link">End-to-End Job Search Support</p>
            <p className="footer-link">Recruiter-Led Profile Marketing</p>
            <p className="footer-link">Resume Optimization for Every Application</p>
            <p className="footer-link">Interview & Screening Preparation</p>
            <p className="footer-link">Secure Candidate Data Handling</p>
          </div>

          {/* QR Code */}
          <div className="footer-column">
            <h3 className="footer-title">Scan & Connect</h3>
            <Link to="/scan-and-connect">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.origin}/scan-and-connect`}
                alt="QR Code"
                className="qr-box"
              />
            </Link>
            <p style={{ marginTop: "10px", fontSize: "14px" }}>Stay updated with job tips!</p>
          </div>

          {/* Contact Section */}
          <div className="footer-column">
            <h3 className="footer-title">Contact</h3>

            <div className="contact-item">
              <FaEnvelope /> <a href="mailto:support@hyrind.com">support@hyrind.com</a>
            </div>

            <div className="contact-item">
              <FaPhone /> <a href="tel:3143540634">314-354-0634</a>
            </div>

            <h3 className="footer-title" style={{ marginTop: "15px" }}>Social Media</h3>

            <div className="social-icons">
              <FaInstagram onClick={() => window.open('https://www.instagram.com/hyrind_usa/', '_blank')} />
              {/* <FaFacebook /> */}
              {/* <FaTwitter /> */}
              <FaLinkedin onClick={() => window.open('https://www.linkedin.com/company/hyrind/', '_blank')} />
              {/* <FaYoutube /> */}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Hyrind. All Rights Reserved |
          <a href="https://merchant.razorpay.com/policy/Rn2giKHxuBBdz0/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#dce6ff", textDecoration: "none" }}> Privacy Policy </a> |
          <a href="https://merchant.razorpay.com/policy/Rn2giKHxuBBdz0/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#dce6ff", textDecoration: "none" }}> Terms and Conditions </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
